"use client";

import { useContext } from "react";
import AllKeysForString from "@components/AllKeysForString";
import { InstrumentContext } from "@components/settings/GeneratorInstrument";
import { allInstruments } from "@utils/strings";

export default function CordesContent()
{
	const instrCtxt = useContext(InstrumentContext);

	return (
		<>
			{Object.entries(allInstruments[instrCtxt.instrument.instrName]).map(([stringName, stringNotes]) =>
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
