"use client";

import { createContext, useState, type Dispatch, type SetStateAction } from "react";
import { Note, type NoteDuration } from "@utils/Note";
import { laStringNotes, miStringNotes, reStringNotes, solStringNotes } from "@utils/strings";

export interface GeneratorSettings {
	selectedNotes: Note[],
	selectedDurations: NoteDuration[],
	showNames: boolean,
	addModifiers: boolean,
	clef: "treble" | "bass"
};

export const easySettings: GeneratorSettings = {
	selectedNotes: [
		new Note("sol", 3),
		new Note("re", 4),
		new Note("la", 4),
		new Note("mi", 5),
	],
	selectedDurations: ["w", "h"],
	showNames: true,
	addModifiers: false,
	clef: "treble"
};

export const hardSettings: GeneratorSettings = {
	selectedNotes: miStringNotes.slice(0, 4).concat(laStringNotes.slice(0, 4), reStringNotes.slice(0, 4), solStringNotes.slice(0, 4))
		.map(([name, octave]) => new Note(name, octave)),
	selectedDurations: ["w", "h", "q", "8"],
	showNames: false,
	addModifiers: true,
	clef: "bass"
};

export const SettingsContext = createContext<{settings: GeneratorSettings, setSettings: null | Dispatch<SetStateAction<GeneratorSettings>>}>({settings: easySettings, setSettings: null});

export default function GeneratorSettingsProvider({ children }: {children: React.ReactNode})
{
	const [settings, setSettings] = useState(easySettings);

	return (
		<SettingsContext value={{settings: settings, setSettings: setSettings}}>
			{children}
		</SettingsContext>
	);
}
