"use client";

import { type ChangeEvent, useContext, useEffect, useState } from "react";
import type { NoteDuration } from "@utils/Note";
import { violin, type StringNotes } from "@utils/strings";
import { easySettings, hardSettings, settingsComparison, SettingsContext } from "./GeneratorSettings";
import styles from "./SettingsEditor.module.css"

export default function SettingsEditor()
{
	const settings = useContext(SettingsContext);
	const [preset, setPreset] = useState<"easy" | "hard" | "custom">("easy");
	const tooltip = "Utiliser la touche CONTROL pour sélectionner plusieurs valeurs"

	function changeHandler(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>)
	{
		settings.setSettings({
			...settings.settings,
			[event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
		});
	}

	function changeHandlerDurations(event: ChangeEvent<HTMLSelectElement>)
	{
		const values = Array.from(event.target.selectedOptions).map((option) => option.value);
		settings.setSettings({
			...settings.settings,
			"selectedDurations": values as NoteDuration[]
		});
	}

	function changeHandlerNotes()
	{
		const selects = document.querySelectorAll("[id^=selectedNotes]");
		let values: StringNotes = [];
		for (const s of selects)
		{
			if (s.tagName.toLowerCase() === "select")
				values = values.concat(Array.from((s as HTMLSelectElement).selectedOptions).map((option) => option.value.split("/")) as StringNotes);
		}

		settings.setSettings({
			...settings.settings,
			"selectedNotes": values
		});
	}

	function changeHandlerPreset(event: ChangeEvent<HTMLSelectElement>)
	{
		const value = event.target.value;

		if (value === "custom")
			return;
		if (value === "easy" && !settingsComparison(settings.settings, easySettings))
			settings.setSettings(easySettings);
		else if (value === "hard" && !settingsComparison(settings.settings, hardSettings))
			settings.setSettings(hardSettings);
	}

	useEffect(() => {
		if (settingsComparison(settings.settings, easySettings))
			setPreset("easy");
		else if (settingsComparison(settings.settings, hardSettings))
			setPreset("hard");
		else
			setPreset("custom");
	}, [settings.settings]);

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

					<button onClick={() => { settings.setSettings({...settings.settings}); }}>Regénérer</button>
				</span>
			</summary>

			<form>
				<div className={styles.groupbox}>
					{/* showNames */}
					<div className={styles.inputbox}>
						<input type="checkbox" id="showNames" name="showNames" checked={settings.settings.showNames} onChange={changeHandler} />
						<label htmlFor="showNames">Afficher le nom des notes</label>
					</div>

					{/* addModifiers */}
					<div className={styles.inputbox}>
						<input type="checkbox" id="addModifiers" name="addModifiers" checked={settings.settings.addModifiers} onChange={changeHandler} />
						<label htmlFor="addModifiers">Ajouter des altérations (bémol, dièse)</label>
					</div>

					{/* clef */}
					<div className={styles.inputbox}>
						<label htmlFor="clef">Clef</label>
						<select id="clef" name="clef" value={settings.settings.clef} onChange={changeHandler}>
							<option value="treble">Clef de Sol</option>
							<option value="bass">Clef de Fa</option>
						</select>
					</div>
				</div>

				{/* durations */}
				<div className={styles.multiplebox} title={tooltip}>
					<label htmlFor="selectedDurations">Durées des notes</label>
					<select
						id="selectedDurations"
						name="selectedDurations"
						value={settings.settings.selectedDurations}
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
				{Object.entries(violin).map(([stringName, stringNotes]) => {
					const id = "selectedNotes" + stringName.replaceAll(" ", "");
					return (
						<div className={styles.multiplebox} key={stringName} title={tooltip}>
							<label htmlFor={id}>{stringName}</label>
							<select
								id={id}
								name={id}
								value={settings.settings.selectedNotes.map(([note, octave]) => `${note}/${octave.toString()}`)}
								onChange={changeHandlerNotes}
								multiple
							>
								{stringNotes.slice(0, Math.min(4, stringNotes.length)).map(([name, octave]) => (
									<option key={`${name}/${octave.toString()}`} value={`${name}/${octave.toString()}`}>
										{`${name} (${octave.toString()})`}
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
