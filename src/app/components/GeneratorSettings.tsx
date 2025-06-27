"use client";

import { createContext, useEffect, useState } from "react";
import type { NoteDuration } from "@utils/Note";
import { laStringNotes, miStringNotes, reStringNotes, solStringNotes, type StringNotes } from "@utils/strings";

function compareSets<T>(a: T[], b: T[]): boolean
{
	const seta = new Set(a);
	const setb = new Set(b);

	return seta.symmetricDifference(setb).size === 0;
}

export interface GeneratorSettings {
	selectedNotes: StringNotes,
	selectedDurations: NoteDuration[],
	showNames: boolean,
	addModifiers: boolean,
	clef: "treble" | "bass"
};

export const easySettings: GeneratorSettings = {
	selectedNotes: [
		["sol", 3],
		["re", 4],
		["la", 4],
		["mi", 5],
	],
	selectedDurations: ["w", "h"],
	showNames: true,
	addModifiers: false,
	clef: "treble"
};

export const hardSettings: GeneratorSettings = {
	selectedNotes: miStringNotes.slice(0, 4).concat(laStringNotes.slice(0, 4), reStringNotes.slice(0, 4), solStringNotes.slice(0, 4)),
	selectedDurations: ["w", "h", "q", "8"],
	showNames: false,
	addModifiers: true,
	clef: "bass"
};

export const SettingsContext = createContext<{settings: GeneratorSettings, setSettings: (value: GeneratorSettings) => void}>({
	settings: easySettings,
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
		&& (a.clef === b.clef)
		&& (compareSets(stringNotesToStrings(a.selectedNotes), stringNotesToStrings(b.selectedNotes)))
		&& (compareSets(a.selectedDurations, b.selectedDurations));
}

export function storeSettingsInStorage(settings: GeneratorSettings)
{
	localStorage.setItem("settings", JSON.stringify(settings));
}

export function retrieveSettingsInStorage(defaultValue = easySettings): GeneratorSettings
{
	const settings = localStorage.getItem("settings");
	if (!settings)
		return defaultValue;
	return JSON.parse(settings) as GeneratorSettings;
}

export default function GeneratorSettingsProvider({ children }: {children: React.ReactNode})
{
	const [settings, setSettings] = useState(easySettings);

	useEffect(() => {
		setSettings(retrieveSettingsInStorage(easySettings));
	}, []);

	return (
		<SettingsContext value={{settings: settings, setSettings: (value) => { storeSettingsInStorage(value); setSettings(value); }}}>
			{children}
		</SettingsContext>
	);
}
