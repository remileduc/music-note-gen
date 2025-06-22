"use client";

import { type ChangeEvent, useContext } from "react";
import { type FrenchNoteName, Note } from "@utils/Note";
import { laStringNotes, miStringNotes, reStringNotes, solStringNotes, type StringNotes } from "@utils/strings";
import { SettingsContext } from "./GeneratorSettings";
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

	function changeHandler(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>)
	{
		settings.setSettings?.({
			...settings.settings,
			[event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
		});
	}

	function changeHandlerDurations(event: ChangeEvent<HTMLSelectElement>)
	{
		const values = Array.from(event.target.selectedOptions).map((option) => option.value);
		settings.setSettings?.({
			...settings.settings,
			[event.target.name]: values
		});
	}

	function changeHandlerNotes(event: ChangeEvent<HTMLSelectElement>)
	{
		const values = Array.from(event.target.selectedOptions).map((option) => {
			const [name, octave] = option.value.split("/");
			return new Note(name as FrenchNoteName, Number(octave));
		});
		settings.setSettings?.({
			...settings.settings,
			[event.target.name]: values
		});
	}

	return (
		<details className={styles.settingseditor}>
			<summary>Configuration</summary>
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
							value={settings.settings.selectedNotes.map((note) => `${note.fname}/${note.octave.toString()}`)}
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
