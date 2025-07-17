"use client";

import { type ChangeEvent, useContext } from "react";
import { allInstruments } from "@utils/strings";
import { InstrumentContext } from "./GeneratorInstrument";
import styles from "./InstrumentEditor.module.css";

export default function InstrumentEditor()
{
	const instrument = useContext(InstrumentContext);

	function changeHandler(event: ChangeEvent<HTMLSelectElement>)
	{
		instrument.setInstrument({
			...instrument.instrument,
			[event.target.name]: event.target.value
		});
	}

	return (
		<form className={styles.instrumenteditor}>
			{/* instrument */}
			<div className={styles.inputbox}>
				<label htmlFor="instrument">Instrument</label>
				<select id="instrument" name="instrument" value={instrument.instrument.instrument} onChange={changeHandler}>
					{Object.keys(allInstruments).map((inst) =>
						<option key={inst} value={inst}>{inst}</option>
					)}
				</select>
			</div>

			{/* clef */}
			<div className={styles.inputbox}>
				<label htmlFor="clef">Clef</label>
				<select id="clef" name="clef" value={instrument.instrument.clef} onChange={changeHandler}>
					<option value="treble">Clef de Sol</option>
					<option value="bass">Clef de Fa</option>
				</select>
			</div>
		</form>
	);
}
