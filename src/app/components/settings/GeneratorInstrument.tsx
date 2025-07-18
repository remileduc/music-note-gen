"use client";

import { createContext, useEffect, useState } from "react";
import type { NoteClef } from "@utils/Note";

export interface GeneratorInstrument {
	instrument: string,
	clef: NoteClef,
	initialized: boolean
};

const initInstrument: GeneratorInstrument = {
	instrument: "violon",
	clef: "treble",
	initialized: false
};

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
	const instrument = localStorage.getItem("instrument");
	if (!instrument)
		return defaultValue;
	return JSON.parse(instrument) as GeneratorInstrument;
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
