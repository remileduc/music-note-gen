"use client";

import { type ChangeEvent, useContext } from "react";
import { clefsEN, engToFrClefs } from "@utils/Note";
import { guitars, violins } from "@utils/strings";
import { InstrumentContext } from "./GeneratorInstrument";
import { generateEasySettings, SettingsContext } from "./GeneratorSettings";
import styles from "./InstrumentEditor.module.css";

export default function InstrumentEditor()
{
	const settingsCtxt = useContext(SettingsContext);
	const instrCtxt = useContext(InstrumentContext);

	function changeHandler(event: ChangeEvent<HTMLSelectElement>)
	{
		instrCtxt.setInstrument({
			...instrCtxt.instrument,
			[event.target.name]: event.target.value
		});
	}

	function changeHandlerInstrument(event: ChangeEvent<HTMLSelectElement>)
	{
		changeHandler(event);
		settingsCtxt.setSettings({
			...generateEasySettings(event.target.value),
			showNames: settingsCtxt.settings.showNames,
			addModifiers: settingsCtxt.settings.addModifiers,
			numberSystems: settingsCtxt.settings.numberSystems
		});
	}

	return (
		<form className={styles.instrumenteditor}>
			{/* instrument */}
			<div className={styles.inputbox}>
				<label htmlFor="name">Instrument</label>
				<select id="name" name="name" value={instrCtxt.instrument.name} onChange={changeHandlerInstrument}>
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
				<select id="clef" name="clef" value={instrCtxt.instrument.clef} onChange={changeHandler}>
					{clefsEN.map((clef) =>
						<option key={clef} value={clef}>Clef de {engToFrClefs.get(clef)}</option>
					)}
				</select>
			</div>
		</form>
	);
}
