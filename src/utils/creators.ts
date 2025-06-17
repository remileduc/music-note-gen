import { BarlineType, type Factory, type StaveNote, type System, type Voice } from "vexflow";
import type { Note } from "./Note";

function splitArray<T>(arr: T[], chunkSize: number) {
	return Array.from(
		{ length: Math.ceil(arr.length / chunkSize) },
		(_, i) => arr.slice(i * chunkSize, i * chunkSize + chunkSize)
	);
}

export function createNotes(factory: Factory, notes: Note[], showName = false) : StaveNote[]
{
	return notes.map((note) => note.toVexFlox(factory).addModifier(factory.Annotation({ text: showName ? note.fname : "" })));
}

export function createVoices(factory: Factory, notes: StaveNote[]) : Voice[]
{
	const voices: Voice[] = [];
	const splittedNotes = splitArray(notes, 4);

	for (const subnotes of splittedNotes)
		voices.push(factory.Voice().addTickables(subnotes));
	return voices;
}

export function createSystems(factory: Factory, voices: Voice[], width = 200, clef = "treble") : System[]
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
