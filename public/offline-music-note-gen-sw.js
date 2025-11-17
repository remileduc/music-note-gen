"use strict";

// constants

const CACHE_NAME = "offline-violon v0.9.5";

// utils functions

function logMessage(message)
{
	self.console.log(`[SW ${CACHE_NAME}] ${message}`);
}

async function getAllChuncks(listURI)
{
	let filesToCache = null;
	try
	{
		filesToCache = await fetch(listURI).then((response) => response.json());
		logMessage(`Successfully fetched '${listURI}'`)
	}
	catch(error)
	{
		logMessage(`ERROR when retreiving ${listURI}: ${error}`);
	}

	if (!filesToCache || !Array.isArray(filesToCache))
		return [];

	return filesToCache;
}

function cleanResponse(response)
{
	if (!response.redirected)
		return response;
	return new Response(response.body, {
		headers: response.headers,
		status: response.status,
		statusText: response.statusText
	});
}

// cache management

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

// fetch

async function fetchFromCacheFirst(request)
{
	const cache = await caches.open(CACHE_NAME);
	const cachedRsrc = await cache.match(request, { ignoreSearch: true });
	if (cachedRsrc)
		return cleanResponse(cachedRsrc);

	const fetchRsrc = await fetch(request.clone());
	putInCache(request, fetchRsrc.clone());
	return fetchRsrc;
}

// listeners

self.addEventListener("install", async (event) => {
	event.waitUntil((async () => {
		logMessage("Installing...");

		const chuncks = await getAllChuncks("./files_to_cache.json");
		logMessage(`Adding ${chuncks.length} chuncks to the cache`)
		await cacheResources(chuncks);

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

self.addEventListener("message", (event) => {
	if (event.data === "SKIP_WAITING")
		self.skipWaiting();
});
