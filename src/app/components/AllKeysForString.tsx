"use client";

import{ useEffect, useRef } from "react";
import{ Factory } from "vexflow";
import { createPartition } from "@utils/creators";
import { getSVGHeight, SYSTEM_WIDTH } from "@utils/global";
import { Note, type SimpleNote } from "@utils/Note";
import styles from "./AllKeysForString.module.css";

function splitArray<T>(arr: T[], chunkSize: number) {
	return Array.from(
		{ length: Math.ceil(arr.length / chunkSize) },
		(_, i) => arr.slice(i * chunkSize, i * chunkSize + chunkSize)
	);
}

export default function AllKeysForString({title, stringNotes, clef = "treble"}: {title: string, stringNotes: SimpleNote[], clef: string})
{
	const partition = useRef<null | HTMLDivElement>(null);
	const partitionID = "partition" + title.replaceAll(" ", "");

	useEffect(() => {
		if (!partition.current)
			return;

		document.getElementById(partitionID)?.replaceChildren();
		const factory = new Factory({
			renderer: {
				elementId: partitionID,
				width: partition.current.clientWidth,
				height: getSVGHeight(2, partition.current.clientWidth, SYSTEM_WIDTH, 160)
			}
		});

		const notes = splitArray(stringNotes.map((note) => new Note(note)), 4);
		if (notes.length > 0 && notes[notes.length - 1].length < 4)
		{
			const ns = notes[notes.length - 1];
			for (let i = ns.length; i < 4; i++)
				ns.push(new Note({name: notes[0][0].note.name, octave: notes[0][0].note.octave, mod: "", duration: "qr"}));
		}

		createPartition(factory, notes, true, clef, SYSTEM_WIDTH, 160);

		factory.draw();
	}, [partitionID, stringNotes, clef]);

	return (
		<div className={styles.allkeysforstring}>
			<h2>{title}</h2>
			<div id={partitionID} ref={partition} />
		</div>
	);
}
