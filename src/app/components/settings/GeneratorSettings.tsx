"use client";

import { createContext, useEffect, useState } from "react";
import { noteToString, type NoteDuration, type SimpleNote } from "@utils/Note";
import { allInstruments } from "@utils/strings";

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
		{ name: "sol", mod: "", duration: "q", octave: 3 },
		{ name: "re", mod: "", duration: "q", octave: 4 },
		{ name: "la", mod: "", duration: "q", octave: 4 },
		{ name: "mi", mod: "", duration: "q", octave: 5 },
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

export function generateEasySettings(instrument: string) : GeneratorSettings
{
	const easySettings: GeneratorSettings = {
		selectedNotes: [] as SimpleNote[],
		selectedDurations: ["w", "h"],
		showNames: true,
		addModifiers: false,
		numberSystems: 4,
		initialized: false
	};

	for (const corde of Object.values(allInstruments[instrument]))
		easySettings.selectedNotes.push(corde[0]);

	return easySettings;
}

export function generateHardSettings(instrument: string) : GeneratorSettings
{
	const hardSettings: GeneratorSettings = {
		selectedNotes: [] as SimpleNote[],
		selectedDurations: ["w", "h", "q", "8"],
		showNames: false,
		addModifiers: true,
		numberSystems: 8,
		initialized: false
	};

	for (const corde of Object.values(allInstruments[instrument]))
		hardSettings.selectedNotes = hardSettings.selectedNotes.concat(corde);

	return hardSettings;
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
