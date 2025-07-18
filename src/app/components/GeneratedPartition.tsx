"use client";

import { useContext, useEffect, useRef } from "react";
import { Factory, type Tickable, type System } from "vexflow";
import { addNotesInteractivity, createPartition, toggleNoteName } from "@utils/creators";
import { getSVGHeight, SYSTEM_HEIGHT, SYSTEM_NUMBER, SYSTEM_WIDTH } from "@utils/global";
import { Note } from "@utils/Note";
import { randomMeasurePicker, randomNotePicker } from "@utils/randomNotePicker";
import { SettingsContext, type GeneratorSettings } from "./settings/GeneratorSettings";
import { InstrumentContext } from "./settings/GeneratorInstrument";
import styles from "./AllKeysForString.module.css";

function generatePartition(factory: Factory, settings: GeneratorSettings, clef: string, systemNumbers = 4) : System[]
{
	const notes: Note[][] = [];
	const selectedNotes = settings.selectedNotes.map((note) => new Note(note));

	if (selectedNotes.length !== 0 && settings.selectedDurations.length !== 0)
	{
		for (let i = 0 ; i < systemNumbers; i++)
		{
			const subnotes: Note[] = [];
			// pick a measure
			const measure = randomMeasurePicker(settings.selectedDurations);
			// generate notes
			for (const duration of measure)
			{
				const note = randomNotePicker(selectedNotes, settings.addModifiers);
				note.note.duration = duration;
				subnotes.push(note);
			}
			// append measure
			notes.push(subnotes);
		}
	}

	return createPartition(factory, notes, settings.showNames, clef, SYSTEM_WIDTH, SYSTEM_HEIGHT, 50);
}

export default function GeneratedPartition()
{
	const settings = useContext(SettingsContext);
	const instrument = useContext(InstrumentContext);
	const partition = useRef<null | HTMLDivElement>(null);

	useEffect(() => {
		if (!partition.current || !settings.settings.initialized || !instrument.instrument.initialized)
			return;

		document.getElementById("partition")?.replaceChildren();
		const factory = new Factory({
			renderer: {
				elementId: "partition",
				width: partition.current.clientWidth,
				height: getSVGHeight(SYSTEM_NUMBER, partition.current.clientWidth, SYSTEM_WIDTH, SYSTEM_HEIGHT)
			}
		});

		const systems = generatePartition(factory, settings.settings, instrument.instrument.clef, SYSTEM_NUMBER);

		factory.draw();

		// add interactivity on notes
		const notes: Tickable[] = [];
		for (const s of systems)
		{
			for (const voice of s.getVoices())
			{
				for (const t of voice.getTickables())
				{
					notes.push(t);
					// fix issue where classes are not passed to SVG element
					// see https://github.com/0xfe/vexflow/pull/1656
					if (!settings.settings.showNames)
						t.getSVGElement()?.classList.add("selected");
				}
			}
		}
		addNotesInteractivity(notes, toggleNoteName);
	}, [settings.settings, instrument.instrument.clef, instrument.instrument.initialized]);

	return (
		<div className={styles.allkeysforstring}>
			<h2>Notes de musique générées</h2>
			<div id="partition" ref={partition} />
		</div>
	);
}
