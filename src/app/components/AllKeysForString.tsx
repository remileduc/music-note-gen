"use client";

import { Note } from "@utils/Note";
import type { StringNotes } from "@utils/strings";
import{ useEffect } from "react";
import{ Factory } from "vexflow";
import { createPartition } from "@utils/creators";
import styles from "./AllKeysForString.module.css"

function splitArray<T>(arr: T[], chunkSize: number) {
	return Array.from(
		{ length: Math.ceil(arr.length / chunkSize) },
		(_, i) => arr.slice(i * chunkSize, i * chunkSize + chunkSize)
	);
}

export default function AllKeysForString({title, stringNotes}: {title: string, stringNotes: StringNotes})
{
	const partitionID = "partition" + title;

	useEffect(() => {
		document.getElementById(partitionID)?.replaceChildren();
		const factory = new Factory({
			renderer: { elementId: partitionID, width: 700, height: 160 },
		});

		const notes = splitArray(stringNotes.map(([note, octave]) => new Note(note, octave)), 4);

		createPartition(factory, notes, true, 350, 160);

		factory.draw();
	}, [partitionID, stringNotes]);

	return (
		<div className={styles.allkeysforstring}>
			<h2>{title}</h2>
			<div id={partitionID} />
		</div>
	);
}
