"use strict";

const CACHE_NAME = "offline-violon v1";

const PUBLIC_RESOURCES = [
	"./1001fonts-chopin-script-eula.txt",
	"./favicon.ico",
	"./github.svg",
	"./LICENSE",
	"./manifest.webmanifest",
	"./Open_Source_Initiative.svg",
	"./opengraph-image.png",
	"./remileduc.png",
	"./Screenshot-phone.jpg",
	"./Screenshot-wide.jpg",
	"./violin.96x96.png",
	"./violin.256x256.png",
	"./violin.512x512.png",
	"./violin.svg"
];

function logMessage(message)
{
	self.console.log(`[SW ${CACHE_NAME}] ${message}`);
}

async function getAllChuncks(appManifestFile)
{
	let appManifest = null;
	try
	{
		appManifest = await fetch(appManifestFile).then((response) => response.json());
		logMessage(`Successfully fetched '${appManifestFile}'`)
	}
	catch(error)
	{
		logMessage(`ERROR when retreiving ${appManifestFile}: ${error}`);
	}

	if (!appManifest || !("pages" in appManifest))
		return [];

	let chuncks = new Set(["./README"]);

	for (const page of Object.keys(appManifest.pages))
	{
		if (page.endsWith("/page"))
		{
			let pagename = "." + page.slice(0, page.lastIndexOf("/page"));
			if (pagename === "./_not-found")
				pagename = "./404";
			chuncks.add(pagename);
			chuncks.add(pagename === "." ? "./index.html" : pagename + '.html');
		}
		for (const c of appManifest.pages[page])
			chuncks.add("./_next/" + c);
	}

	return Array.from(chuncks);
}

async function clearOldCaches()
{
	const cacheKeys = await caches.keys();
	return await Promise.all(cacheKeys.map((key) => {
		if (key === CACHE_NAME)
			return undefined;
		return caches.delete(key);
	}));
}

async function cacheResources(resources)
{
	const cache = await caches.open(CACHE_NAME);
	await cache.addAll(resources);
	logMessage(`cached ${resources.length} resources`);
}

function putInCache(request, response)
{
	if (response.status < 300)
	{
		caches.open(CACHE_NAME)
			.then((cache) => {
				cache.put(request, response);
				logMessage(`Added resource in cache: ${request.url}`);
			})
			.catch((error) => {
				logMessage(`ERROR while adding resource ${request.url} in cache: ${error}`);
				throw error;
			});
	}
}

async function fetchFromCacheFirst(request)
{
	const cache = await caches.open(CACHE_NAME);
	const cachedRsrc = await cache.match(request);
	if (cachedRsrc)
		return cachedRsrc;
	// fix weird bug in nextjs
	const url = new URL(request.url);
	if (url.pathname.endsWith(".txt"))
	{
		url.pathname = url.pathname.replace(/\.txt$/, ".html");
		url.search = "";
		const cachedRsrcTxt = await cache.match(url.toString());
		if (cachedRsrcTxt)
			return cachedRsrcTxt;
	}

	const fetchRsrc = await fetch(request.clone());
	putInCache(request, fetchRsrc.clone());
	return fetchRsrc;
}

self.addEventListener("install", async (event) => {
	event.waitUntil((async () => {
		logMessage("Installing...");

		const chuncks = await getAllChuncks("./app-build-manifest.json");

		logMessage(`Adding ${chuncks.length} chuncks to the cache`)
		await cacheResources(PUBLIC_RESOURCES.concat(chuncks));

		logMessage("Installed");
	})());
});

self.addEventListener("activate", (event) => {
	clearOldCaches();
	event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
	event.respondWith(fetchFromCacheFirst(event.request));
});
