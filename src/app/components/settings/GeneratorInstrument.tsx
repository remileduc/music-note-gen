"use client";

import { createContext, useEffect, useState } from "react";
import { validateInstrumentJson } from "@utils/jsonTypeValidator";
import type { NoteClef } from "@utils/Note";

export interface GeneratorInstrument {
	name: string,
	clef: NoteClef,
	initialized: boolean
};

const initInstrument: GeneratorInstrument = {
	name: "violon",
	clef: "treble",
	initialized: false
} as const;

export const InstrumentContext = createContext<{instrument: GeneratorInstrument, setInstrument: (value: GeneratorInstrument) => void}>({
	instrument: initInstrument,
	setInstrument: () => null
});

function storeInstrumentInStorage(instrument: GeneratorInstrument)
{
	const {initialized: _, ...filteredInstrument} = instrument; // eslint-disable-line @typescript-eslint/no-unused-vars
	localStorage.setItem("instrument", JSON.stringify(filteredInstrument));
}

function retrieveInstrumentInStorage(defaultValue = initInstrument): GeneratorInstrument
{
	const value = localStorage.getItem("instrument");
	if (!value)
		return defaultValue;

	const instrument = JSON.parse(value) as GeneratorInstrument;
	if (!validateInstrumentJson(instrument))
	{
		localStorage.removeItem("instrument");
		return defaultValue;
	}
	return instrument;
}

export default function GeneratorInstrumentProvider({ children }: {children: React.ReactNode})
{
	const [instrument, setInstrument] = useState(initInstrument);

	useEffect(() => {
		setInstrument({...retrieveInstrumentInStorage(initInstrument), initialized: true});
	}, []);

	return (
		<InstrumentContext value={{
			instrument: instrument,
			setInstrument: (value) => {
				storeInstrumentInStorage(value);
				setInstrument({...value, initialized: true});
			}
		}}>
			{children}
		</InstrumentContext>
	);
}
