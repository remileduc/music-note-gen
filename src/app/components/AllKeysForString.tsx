"use client";

import{ useEffect, useRef } from "react";
import{ Factory } from "vexflow";
import { createPartition } from "@utils/creators";
import { getSVGHeight, SYSTEM_WIDTH } from "@utils/global";
import { Note } from "@utils/Note";
import type { StringNotes } from "@utils/strings";
import styles from "./AllKeysForString.module.css";

function splitArray<T>(arr: T[], chunkSize: number) {
	return Array.from(
		{ length: Math.ceil(arr.length / chunkSize) },
		(_, i) => arr.slice(i * chunkSize, i * chunkSize + chunkSize)
	);
}

export default function AllKeysForString({title, stringNotes, clef = "treble"}: {title: string, stringNotes: StringNotes, clef: string})
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

		const notes = splitArray(stringNotes.map(([note, octave]) => new Note(note, octave)), 4);

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
