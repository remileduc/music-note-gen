"use client";

import { Note } from "@utils/Note";
import type { StringNotes } from "@utils/strings";
import{ useEffect } from "react";
import{ Factory } from "vexflow";
import { createNotes, createSystems, createVoices } from "@utils/creators";
import styles from "./AllKeysForString.module.css"

export default function AllKeysForString({title, stringNotes}: {title: string, stringNotes: StringNotes})
{
	let partitionID = "partition" + title;

	useEffect(() => {
		const factory = new Factory({
			renderer: { elementId: partitionID, width: 700, height: 150 },
		});

		const notes = createNotes(
			factory,
			stringNotes.map(([note, octave]) => new Note(note, octave)),
			true
		);

		const voices = createVoices(factory, notes);

		createSystems(factory, voices, 350);

		factory.draw();
	}, [stringNotes])

	return (
		<div className={styles.allkeysforstring}>
			<h2>{title}</h2>
			<div id={partitionID} />
		</div>
	);
}
