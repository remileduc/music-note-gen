"use client";

import { useEffect } from "react";
import { Factory } from "vexflow";
import { createPartition } from "@utils/creators";
import { Note, type NoteDuration } from "@utils/Note";
import { randomMeasurePicker, randomNotePicker } from "@utils/randomNotePicker";
import { laStringNotes, miStringNotes, reStringNotes, solStringNotes } from "@utils/strings";
import styles from "./AllKeysForString.module.css"

const selectedNotes = miStringNotes.concat(laStringNotes, reStringNotes, solStringNotes).map(
	([name, octave]) => new Note(name, octave)
);

const selectedDurations = new Set<NoteDuration>(["w", "h", "q", "8"]);

const showNames = true;

const addModifiers = true;

function generatePartition(factory: Factory, systemNumbers = 4)
{
	const notes: Note[][] = [];

	for (let i = 0 ; i < systemNumbers; i++)
	{
		const subnotes: Note[] = [];
		// pick a measure
		const measure = randomMeasurePicker(selectedDurations);
		// generate notes
		for (const duration of measure)
		{
			const note = randomNotePicker(selectedNotes, addModifiers);
			note.duration = duration;
			subnotes.push(note);
		}
		// append measure
		notes.push(subnotes);
	}

	createPartition(factory, notes, showNames, 350, 100);
}

export default function GeneratedPartition()
{
	useEffect(() => {
		document.getElementById("partition")?.replaceChildren();
		const factory = new Factory({
			renderer: { elementId: "partition", width: 1400, height: 300 },
		});

		generatePartition(factory);

		factory.draw();
	}, []);

	return (
		<div className={styles.allkeysforstring}>
			<h2>Notes de musique générées</h2>
			<div id="partition" />
		</div>
	);
}
