"use client";

import { type ChangeEvent, useContext, useEffect, useState } from "react";
import { noteToString, type NoteDuration, type SimpleNote } from "@utils/Note";
import { allInstruments } from "@utils/strings";
import { InstrumentContext } from "./GeneratorInstrument";
import { generateEasySettings, generateHardSettings, settingsComparison, SettingsContext } from "./GeneratorSettings";
import styles from "./SettingsEditor.module.css";

function simpleNoteToID(note: SimpleNote)
{
	return `${note.name}/${note.octave.toString()}/${note.mod}`;
}

function getSelectNotes(selected = true) : SimpleNote[]
{
	const selects = document.querySelectorAll("[id^=selectedNotes]");
	let values: SimpleNote[] = [];
	for (const s of selects)
	{
		if (s.tagName.toLowerCase() === "select")
			values = values.concat(
				Array.from((s as HTMLSelectElement)[selected ? "selectedOptions" : "options"])
					.map((option) => {
						const [note, octave, mod] = option.value.split("/");
						return { name: note, octave: parseInt(octave, 10), mod: mod, duration: "q" } as SimpleNote;
					})
			);
	}
	return values;
}

export default function SettingsEditor()
{
	const settingsCtxt = useContext(SettingsContext);
	const instrCtxt = useContext(InstrumentContext);
	const [preset, setPreset] = useState<"easy" | "hard" | "custom">("easy");
	const tooltip = "Utiliser la touche CONTROL pour sélectionner plusieurs valeurs";

	function changeHandler(event: ChangeEvent<HTMLInputElement>)
	{
		settingsCtxt.setSettings({
			...settingsCtxt.settings,
			[event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
		});
	}

	function changeHandlerDurations(event: ChangeEvent<HTMLSelectElement>)
	{
		const values = Array.from(event.target.selectedOptions).map((option) => option.value);
		settingsCtxt.setSettings({
			...settingsCtxt.settings,
			"selectedDurations": values as NoteDuration[]
		});
	}

	function changeHandlerNotes()
	{
		settingsCtxt.setSettings({
			...settingsCtxt.settings,
			"selectedNotes": getSelectNotes()
		});
	}

	function changeHandlerPreset(event: ChangeEvent<HTMLSelectElement>)
	{
		const value = event.target.value;
		const easySettings = generateEasySettings(instrCtxt.instrument.name);
		const hardSettings = generateHardSettings(instrCtxt.instrument.name);

		if (value === "custom")
			return;
		if (value === "easy" && !settingsComparison(settingsCtxt.settings, easySettings))
			settingsCtxt.setSettings(easySettings);
		else if (value === "hard" && !settingsComparison(settingsCtxt.settings, hardSettings))
			settingsCtxt.setSettings(hardSettings);
	}

	useEffect(() => {
		if (settingsComparison(settingsCtxt.settings, generateEasySettings(instrCtxt.instrument.name)))
			setPreset("easy");
		else if (settingsComparison(settingsCtxt.settings, generateHardSettings(instrCtxt.instrument.name)))
			setPreset("hard");
		else
			setPreset("custom");
	}, [settingsCtxt.settings, instrCtxt.instrument.name]);

	return (
		<details className={styles.settingseditor}>
			<summary>
				<span className={styles.inputbox}>
					<span className={styles.noselection}>Configuration</span>

					<select
						id="preset"
						name="preset"
						value={preset}
						onChange={changeHandlerPreset}
					>
						<option value="easy">Facile</option>
						<option value="hard">Difficile</option>
						<option value="custom" disabled>Personnalisé</option>
					</select>

					<button onClick={() => { settingsCtxt.setSettings({...settingsCtxt.settings}); }}>Regénérer</button>
				</span>
			</summary>

			<form>
				<div className={styles.groupbox}>
					{/* showNames */}
					<div className={styles.inputbox}>
						<input type="checkbox" id="showNames" name="showNames" checked={settingsCtxt.settings.showNames} onChange={changeHandler} />
						<label htmlFor="showNames">Afficher le nom des notes</label>
					</div>

					{/* addModifiers */}
					<div className={styles.inputbox}>
						<input type="checkbox" id="addModifiers" name="addModifiers" checked={settingsCtxt.settings.addModifiers} onChange={changeHandler} />
						<label htmlFor="addModifiers">Ajouter des altérations (bémol, dièse)</label>
					</div>

					{/* number of systems */}
					<div className={styles.inputbox}>
						<label htmlFor="numberSystems">Nombre de mesures à générer</label>
						<input type="number" id="numberSystems" name="numberSystems" min="1" max="24" value={settingsCtxt.settings.numberSystems} onChange={changeHandler} />
					</div>
				</div>

				{/* durations */}
				<div className={styles.multiplebox} title={tooltip}>
					<label htmlFor="selectedDurations">Durées des notes</label>
					<select
						id="selectedDurations"
						name="selectedDurations"
						value={settingsCtxt.settings.selectedDurations}
						onChange={changeHandlerDurations}
						multiple
					>
						<option value="w">𝅝 Ronde (4 temps)</option>
						<option value="h">𝅗𝅥 Blanche (2 temps)</option>
						<option value="q">𝅘𝅥 Noire (1 temps)</option>
						<option value="8">𝅘𝅥𝅮 Croche (½ temps)</option>
					</select>
				</div>

				{/* notes */}
				{Object.entries(allInstruments[instrCtxt.instrument.name]).map(([stringName, stringNotes]) => {
					const id = "selectedNotes" + stringName.replaceAll(" ", "");
					return (
						<div className={styles.multiplebox} key={stringName} title={tooltip}>
							<label htmlFor={id}>{stringName}</label>
							<select
								id={id}
								name={id}
								value={settingsCtxt.settings.selectedNotes.map(simpleNoteToID)}
								onChange={changeHandlerNotes}
								multiple
							>
								{stringNotes.slice(0, Math.min(4, stringNotes.length)).map((note) => (
									<option key={simpleNoteToID(note)} value={simpleNoteToID(note)}>
										{noteToString(note)}
									</option>
								))}
							</select>
						</div>
					);
				})}
			</form>
	</details>
	);
}
