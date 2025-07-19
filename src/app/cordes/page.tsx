"use client";

import { useContext } from "react";
import AllKeysForString from "@components/AllKeysForString";
import GeneratorInstrumentProvider, { InstrumentContext } from "@components/settings/GeneratorInstrument";
import GeneratorSettingsProvider from "@components/settings/GeneratorSettings";
import InstrumentEditor from "@components/settings/InstrumentEditor";
import { allInstruments } from "@utils/strings";

function CordesContent()
{
	const instrCtxt = useContext(InstrumentContext);

	return (
		<>
			{Object.entries(allInstruments[instrCtxt.instrument.name]).map(([stringName, stringNotes]) =>
				<AllKeysForString
					key={stringName}
					title={stringName}
					stringNotes={stringNotes}
					clef={instrCtxt.instrument.clef}
				/>
			)}
		</>
	);
}

export default function Cordes()
{
	return (
		<main>
			<GeneratorSettingsProvider>
				<GeneratorInstrumentProvider>
					<InstrumentEditor />
					<CordesContent />
				</GeneratorInstrumentProvider>
			</GeneratorSettingsProvider>
		</main>
	);
}
