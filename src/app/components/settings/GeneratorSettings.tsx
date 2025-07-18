"use client";

import { createContext, useEffect, useState } from "react";
import type { NoteDuration } from "@utils/Note";
import type { StringNotes } from "@utils/strings";

function compareSets<T>(a: T[], b: T[]): boolean
{
	const seta = new Set(a);
	const setb = new Set(b);

	return seta.symmetricDifference(setb).size === 0;
}

function storeSettingsInStorage(settings: GeneratorSettings)
{
	const {initialized: _, ...filteredSettings} = settings; // eslint-disable-line @typescript-eslint/no-unused-vars
	localStorage.setItem("settings", JSON.stringify(filteredSettings));
}

function retrieveSettingsInStorage(defaultValue = initSettings): GeneratorSettings
{
	const settings = localStorage.getItem("settings");
	if (!settings)
		return defaultValue;
	return JSON.parse(settings) as GeneratorSettings;
}

export interface GeneratorSettings {
	selectedNotes: StringNotes,
	selectedDurations: NoteDuration[],
	showNames: boolean,
	addModifiers: boolean,
	initialized: boolean
};

const initSettings: GeneratorSettings = {
	selectedNotes: [
		["sol", 3],
		["re", 4],
		["la", 4],
		["mi", 5],
	],
	selectedDurations: ["w", "h"],
	showNames: true,
	addModifiers: false,
	initialized: false
};

export const SettingsContext = createContext<{settings: GeneratorSettings, setSettings: (value: GeneratorSettings) => void}>({
	settings: initSettings,
	setSettings: () => null
});

export function settingsComparison(a: GeneratorSettings, b: GeneratorSettings): boolean
{
	if (a === b)
		return true;

	function stringNotesToStrings(notes: StringNotes): string[]
	{
		return notes.map(([name, octave]) => `${name}:${octave.toString()}`)
	}

	return (a.showNames === b.showNames)
		&& (a.addModifiers === b.addModifiers)
		&& (compareSets(stringNotesToStrings(a.selectedNotes), stringNotesToStrings(b.selectedNotes)))
		&& (compareSets(a.selectedDurations, b.selectedDurations));
}

export default function GeneratorSettingsProvider({ children }: {children: React.ReactNode})
{
	const [settings, setSettings] = useState(initSettings);

	useEffect(() => {
		setSettings({...retrieveSettingsInStorage(initSettings), initialized: true});
	}, []);

	return (
		<SettingsContext value={{
			settings: settings,
			setSettings: (value) => {
				storeSettingsInStorage(value);
				setSettings({...value, initialized: true});
			}
		}}>
			{children}
		</SettingsContext>
	);
}
