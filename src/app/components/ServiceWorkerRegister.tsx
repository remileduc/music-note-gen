"use client";

import { useEffect } from "react";
import { rsrcPath } from "@utils/global";

async function registerServiceWorker(name: string)
{
	let registration: ServiceWorkerRegistration | null = null;
	try {
		registration = await navigator.serviceWorker.register(
			name,
			{ scope: rsrcPath("/") }
		);
	}
	catch (error)
	{
		console.log(`[SW ${name}] Failed to register the service worker: '${error as Error}'`);
	}

	if (!registration)
		console.log(`[SW ${name}] Failed to register the service worker`);

	else if (registration.installing)
		console.log(`[SW ${name}] Installing service worker`);
	else if (registration.waiting)
		console.log(`[SW ${name}] Service worker installed`);
	else if (registration.active)
		console.log(`[SW ${name}] Service worker installed and active`);
}

export default function ServiceWorkerRegister()
{
	useEffect(() => {
		if ("serviceWorker" in navigator)
			void registerServiceWorker(rsrcPath("/offline-music-note-gen-sw.js")); // "void" to tell typescript we do not await the call on purpose
	}, []);

	return <></>;
}
