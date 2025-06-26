"use client";

import { type ChangeEvent, useContext, useEffect, useState } from "react";
import { laStringNotes, miStringNotes, reStringNotes, solStringNotes, type StringNotes } from "@utils/strings";
import { easySettings, hardSettings, settingsComparison, SettingsContext } from "./GeneratorSettings";
import styles from "./SettingsEditor.module.css"

function StringOptGroup({title, notes}: {title: string, notes: StringNotes})
{
	return (
		<optgroup label={title}>
			{notes.map(([name, octave]) => (
				<option key={`${name}/${octave.toString()}`} value={`${name}/${octave.toString()}`}>
					{`${name} (${octave.toString()})`}
				</option>
			))}
		</optgroup>
	);
}

export default function SettingsEditor()
{
	const settings = useContext(SettingsContext);
	const [preset, setPreset] = useState<"easy" | "hard" | "custom">("easy");

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
			[event.target.name]: values
		});
	}

	function changeHandlerNotes(event: ChangeEvent<HTMLSelectElement>)
	{
		const values = Array.from(event.target.selectedOptions).map((option) => option.value.split("/"));
		settings.setSettings({
			...settings.settings,
			[event.target.name]: values
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
		if (settingsComparison(settings.settings, easySettings) && preset !== "easy")
			setPreset("easy");
		else if (settingsComparison(settings.settings, hardSettings) && preset !== "hard")
			setPreset("hard");
		else if (preset !== "custom")
			setPreset("custom");
	}, [settings.settings]); // eslint-disable-line react-hooks/exhaustive-deps

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
				</span>
			</summary>

			<form action="">
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
							<option value="bass">Clef de La</option>
						</select>
					</div>
				</div>

				{/* durations */}
				<div className={styles.groupbox}>
					<div className={styles.multiplebox}>
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
				</div>

				{/* notes */}
				<div className={styles.groupbox}>
					<div className={styles.multiplebox}>
						<label htmlFor="selectedNotes">Notes à générer</label>
						<select
							id="selectedNotes"
							name="selectedNotes"
							value={settings.settings.selectedNotes.map(([note, octave]) => `${note}/${octave.toString()}`)}
							onChange={changeHandlerNotes}
							multiple
						>
							{/* corde mi */}
							<StringOptGroup title="Corde Mi" notes={miStringNotes.slice(0, 4)} />
							{/* corde la */}
							<StringOptGroup title="Corde La" notes={laStringNotes.slice(0, 4)} />
							{/* corde re */}
							<StringOptGroup title="Corde Re" notes={reStringNotes.slice(0, 4)} />
							{/* corde sol */}
							<StringOptGroup title="Corde Sol" notes={solStringNotes.slice(0, 4)} />
						</select>
					</div>
				</div>
			</form>
	</details>
	);
}
