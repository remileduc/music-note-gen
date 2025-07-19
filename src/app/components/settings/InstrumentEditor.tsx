"use client";

import { type ChangeEvent, useContext } from "react";
import { clefsEN, engToFrClefs } from "@utils/Note";
import { guitars, violins } from "@utils/strings";
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
					<optgroup label="Cordes frottées">
						{violins.map((inst) =>
							<option key={inst} value={inst}>{inst}</option>
						)}
					</optgroup>
					<optgroup label="Cordes pincées">
						{guitars.map((inst) =>
							<option key={inst} value={inst}>{inst}</option>
						)}
					</optgroup>
				</select>
			</div>

			{/* clef */}
			<div className={styles.inputbox}>
				<label htmlFor="clef">Clef</label>
				<select id="clef" name="clef" value={instrument.instrument.clef} onChange={changeHandler}>
					{clefsEN.map((clef) =>
						<option key={clef} value={clef}>Clef de {engToFrClefs.get(clef)}</option>
					)}
				</select>
			</div>
		</form>
	);
}
