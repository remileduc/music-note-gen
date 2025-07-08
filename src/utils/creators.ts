import { BarlineType, type Tickable, type Factory, type StaveNote, type System, type Voice } from "vexflow";
import type { Note } from "./Note";

export function createNotes(factory: Factory, notes: Note[], showName = false) : StaveNote[]
{
	return notes.map((note) => note.toVexFlow(factory)
		.addModifier(factory.Annotation({ text: note.fname }))
		.addClass(showName ? "" : "selected"));
}

export function createBeams(factory: Factory, staveNotes: StaveNote[][])
{
	for (const notes of staveNotes)
	{
		let toBeam: StaveNote[] = [];
		for (const n of notes)
		{
			if (n.getDuration() === "8")
				toBeam.push(n);
			else
			{
				if (toBeam.length > 1)
					factory.Beam({notes: toBeam, options: {autoStem: true}});
				toBeam = [];
			}
		}
		if (toBeam.length > 1)
			factory.Beam({notes: toBeam, options: {autoStem: true}});
	}
}

export function createVoices(factory: Factory, notes: StaveNote[][]) : Voice[]
{
	const voices: Voice[] = [];

	for (const subnotes of notes)
		voices.push(factory.Voice().addTickables(subnotes));
	return voices;
}

export function createSystems(factory: Factory, voices: Voice[], width = 200, yOffset = 30, clef = "treble") : System[]
{
	const systems: System[] = [];
	let x = 0;

	for (const v of voices)
	{
		const s = factory.System({ x: x, y: yOffset, width: width });
		x += width;
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

export function createPartition(factory: Factory, notes: Note[][], showName = false, width = 200, yOffset = 30, clef = "treble")
{
	const staveNotes = notes.map((n) => createNotes(factory, n, showName));
	createBeams(factory, staveNotes);

	return createSystems(
		factory,
		createVoices(
			factory,
			staveNotes
		),
		width,
		yOffset,
		clef
	);
}

export function toggleNoteName(note: Tickable)
{
	note.getSVGElement()?.classList.toggle("selected");
}

export function addNotesInteractivity(notes: Tickable[], callback: (note: Tickable) => void)
{
	for (const note of notes)
	{
		const svg = note.getSVGElement();
		if (!svg)
		{
			console.log("Error: no SVG! Draw before calling this function");
			continue;
		}

		svg.addEventListener("click", () => { callback(note) });
	}
}
