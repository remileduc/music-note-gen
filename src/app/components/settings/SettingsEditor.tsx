"use client";

import { type ChangeEvent, useContext, useState } from "react";
import { noteToString, type NoteDuration, type SimpleNote } from "@utils/Note";
import { allInstruments } from "@utils/strings";
import { InstrumentContext } from "./GeneratorInstrument";
import { generateEasySettings, generateHardSettings, type GeneratorSettings, settingsComparison, SettingsContext } from "./GeneratorSettings";
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
						return { name: note, octave: Number(octave), mod: mod, duration: "q" } as SimpleNote;
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
		let attribute: keyof typeof event.target = "value";
		switch (event.target.type)
		{
		case "checkbox":
			attribute = "checked";
			break;
		case "number":
			attribute = "valueAsNumber";
			break;
		default:
			attribute = "value"
		}
		const settings = {
			...settingsCtxt.settings,
			[event.target.name]: event.target[attribute]
		};
		settingsCtxt.setSettings(settings);
		checkPreset(settings);
	}

	function changeHandlerDurations(event: ChangeEvent<HTMLSelectElement>)
	{
		const values = Array.from(event.target.selectedOptions).map((option) => option.value);
		const settings = {
			...settingsCtxt.settings,
			"selectedDurations": values as NoteDuration[]
		};
		settingsCtxt.setSettings(settings);
		checkPreset(settings);
	}

	function changeHandlerNotes()
	{
		const settings = {
			...settingsCtxt.settings,
			"selectedNotes": getSelectNotes()
		};
		settingsCtxt.setSettings(settings);
		checkPreset(settings);
	}

	function changeHandlerPreset(event: ChangeEvent<HTMLSelectElement>)
	{
		const value = event.target.value;
		const easySettings = generateEasySettings(instrCtxt.instrument.instrName);
		const hardSettings = generateHardSettings(instrCtxt.instrument.instrName);

		if (value === "custom")
			return;
		if (value === "easy" && !settingsComparison(settingsCtxt.settings, easySettings))
			settingsCtxt.setSettings(easySettings);
		else if (value === "hard" && !settingsComparison(settingsCtxt.settings, hardSettings))
			settingsCtxt.setSettings(hardSettings);
	}

	function generateHandler()
	{
		settingsCtxt.setSettings({ ...settingsCtxt.settings });
		document.getElementById("partition")?.scrollIntoView({ behavior: "smooth", block: "start" });
	}

	function checkPreset(settings: GeneratorSettings)
	{
		if (settingsComparison(settings, generateEasySettings(instrCtxt.instrument.instrName)))
			setPreset("easy");
		else if (settingsComparison(settings, generateHardSettings(instrCtxt.instrument.instrName)))
			setPreset("hard");
		else
			setPreset("custom");
	}

	return (
		<details className={styles.settingseditor}>
			<summary ref={ summary => { if (summary) checkPreset(settingsCtxt.settings) } }>
				<span className={styles.inputbox}>
					<span className={styles.noselection}>Configuration</span>

					<select
						id="preset"
						name="preset"
						aria-label="preset"
						value={preset}
						onChange={changeHandlerPreset}
					>
						<option value="easy">Facile</option>
						<option value="hard">Difficile</option>
						<option value="custom" disabled>Personnalisé</option>
					</select>

					<button onClick={generateHandler}>Regénérer</button>
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
						<input
							type="number"
							id="numberSystems"
							name="numberSystems"
							min="1"
							max="24"
							value={settingsCtxt.settings.numberSystems}
							onChange={changeHandler}
							list="numberSystemsList"
						/>
						<datalist id="numberSystemsList">
							<option>4</option>
							<option>8</option>
							<option>16</option>
							<option>20</option>
							<option>24</option>
						</datalist>
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
				{Object.entries(allInstruments[instrCtxt.instrument.instrName]).map(([stringName, stringNotes]) => {
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
