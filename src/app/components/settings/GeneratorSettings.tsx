"use client";

import { createContext, useEffect, useState } from "react";
import { noteToString, type NoteDuration, type SimpleNote } from "@utils/Note";

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
	selectedNotes: SimpleNote[],
	selectedDurations: NoteDuration[],
	showNames: boolean,
	addModifiers: boolean,
	numberSystems: number,
	initialized: boolean
};

const initSettings: GeneratorSettings = {
	selectedNotes: [
		{ fname: "sol", mod: "", duration: "q", octave: 3 },
		{ fname: "re", mod: "", duration: "q", octave: 4 },
		{ fname: "la", mod: "", duration: "q", octave: 4 },
		{ fname: "mi", mod: "", duration: "q", octave: 5 },
	],
	selectedDurations: ["w", "h"],
	showNames: true,
	addModifiers: false,
	numberSystems: 4,
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

	function simpleNotesToStrings(notes: SimpleNote[]): string[]
	{
		return notes.map(noteToString)
	}

	return (a.showNames === b.showNames)
		&& (a.addModifiers === b.addModifiers)
		&& (compareSets(simpleNotesToStrings(a.selectedNotes), simpleNotesToStrings(b.selectedNotes)))
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
