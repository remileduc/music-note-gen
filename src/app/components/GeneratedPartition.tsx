"use client";

import { useContext, useEffect } from "react";
import { Factory } from "vexflow";
import { createPartition } from "@utils/creators";
import { Note } from "@utils/Note";
import { randomMeasurePicker, randomNotePicker } from "@utils/randomNotePicker";
import { SettingsContext, type GeneratorSettings } from "./GeneratorSettings";
import styles from "./AllKeysForString.module.css"

function generatePartition(factory: Factory, settings: GeneratorSettings, systemNumbers = 4)
{
	const notes: Note[][] = [];
	const selectedNotes = settings.selectedNotes.map(([note, octave]) => new Note(note, octave));

	for (let i = 0 ; i < systemNumbers; i++)
	{
		const subnotes: Note[] = [];
		// pick a measure
		const measure = randomMeasurePicker(settings.selectedDurations);
		// generate notes
		for (const duration of measure)
		{
			const note = randomNotePicker(selectedNotes, settings.addModifiers);
			note.duration = duration;
			subnotes.push(note);
		}
		// append measure
		notes.push(subnotes);
	}

	createPartition(factory, notes, settings.showNames, 350, 100, settings.clef);
}

export default function GeneratedPartition()
{
	const settings = useContext(SettingsContext);

	useEffect(() => {
		document.getElementById("partition")?.replaceChildren();
		const factory = new Factory({
			renderer: { elementId: "partition", width: 1400, height: 300 },
		});

		generatePartition(factory, settings.settings);

		factory.draw();
	}, [settings.settings]);

	return (
		<div className={styles.allkeysforstring}>
			<h2>Notes de musique générées</h2>
			<div id="partition" />
		</div>
	);
}
