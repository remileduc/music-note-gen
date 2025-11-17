"use client";

import { type Dispatch, type JSX, type SetStateAction, useEffect, useState } from "react";
import { rsrcPath } from "@utils/global";
import styles from "./ServiceWorkerRegister.module.css"

function PopupUpdate({ registration }: { registration: ServiceWorkerRegistration })
{
	function postMessage()
	{
		if (registration.waiting)
			registration.waiting.postMessage("SKIP_WAITING");
	}

	return (
		<button type="button" className={styles.swPopup} onClick={postMessage}>
			Click to install update
		</button>
	);
}

async function registerServiceWorker(setElement: Dispatch<SetStateAction<JSX.Element>>)
{
	const name = rsrcPath("/offline-music-note-gen-sw.js");
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
	{
		console.log(`[SW ${name}] Failed to register the service worker`);
		return;
	}

	if (registration.installing)
		console.log(`[SW ${name}] Installing service worker`);
	else if (registration.waiting)
	{
		console.log(`[SW ${name}] Service worker installed`);
		setElement(<PopupUpdate registration={registration} />);
	}
	else if (registration.active)
		console.log(`[SW ${name}] Service worker installed and active`);

	// create popup if update is found
	registration.addEventListener("updatefound", () => {
		if (!registration.installing)
			return;

		registration.installing.addEventListener("statechange", () => {
			if (!registration.waiting)
				return;

			if (navigator.serviceWorker.controller)
				setElement(<PopupUpdate registration={registration} />);
			else
				console.log(`[SW ${name}] first time initialization`);
		});
	});

	// reload page if service worker activated
	let refreshing = false;
	navigator.serviceWorker.addEventListener("controllerchange", () => {
		if (!refreshing)
		{
			window.location.reload();
			refreshing = true;
		}
	});
}

export default function ServiceWorkerRegister()
{
	const [element,  setElement] = useState(<></>);

	useEffect(() => {
		console.log(process.env.NODE_ENV);
		if (process.env.NODE_ENV !== "development" && "serviceWorker" in navigator)
			void registerServiceWorker(setElement);
	}, []);

	return element;
}
