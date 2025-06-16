"use client";

import { Note } from "@utils/Note";
import type { StringNotes } from "@utils/Strings";
import{ useEffect } from "react";
import{ BarlineType, Factory, type StaveNote, type System, type Voice } from "vexflow";

function splitArray<T>(arr: T[], chunkSize: number) {
	return Array.from(
		{ length: Math.ceil(arr.length / chunkSize) },
		(_, i) => arr.slice(i * chunkSize, i * chunkSize + chunkSize)
	);
}

function createVoices(factory: Factory, notes: StaveNote[][]) : Voice[]
{
	const voices: Voice[] = [];

	for (const subnotes of notes)
		voices.push(factory.Voice().addTickables(subnotes));
	return voices;
}

function createSystems(factory: Factory, voices: Voice[], width = 200, clef = "treble") : System[]
{
	const systems: System[] = [];
	let x = 0;

	for (const v of voices)
	{
		const s = factory.System({ x: x, width: width });
		x += width;
		width -= 60;
		s.addStave({ voices: [v] });
		systems.push(s);
	}

	if (systems.length > 0)
	{
		if (systems[0].getStaves().length > 0)
			systems[0].getStaves()[0].addClef(clef).addTimeSignature("4/4");
		if (systems[systems.length - 1].getStaves().length > 0)
			systems[systems.length - 1].getStaves()[0].setEndBarType(BarlineType.END);
	}

	return systems;
}

export default function AllKeysForString({stringNotes}: {stringNotes: StringNotes})
{
	useEffect(() => {
		const factory = new Factory({
			renderer: { elementId: 'partition', width: 1000, height: 200 },
		});
		const notes = splitArray(
			stringNotes.map(
				([note, octave]) =>
					new Note(note, octave)
						.toVexFlox(factory)
						.addModifier(factory.Annotation({ text: note }))
			),
			4
		);

		const voices = createVoices(factory, notes);
		createSystems(factory, voices, 350);

		factory.draw();
	}, [stringNotes])

	return <div id="partition" />;
}
