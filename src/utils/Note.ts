import type { Factory, StaveNote } from "vexflow";

export type FrenchNoteName = "do" | "re" | "mi" | "fa" | "sol" | "la" | "si";
export type EnglishNoteName = "c" | "d" | "e" | "f" | "g" | "a" | "b";
export type NoteModifier = "#" | "b" | "";
export type NoteDuration = "w" | "h" | "q" | "8" | "qr";

export const clefsEN = [
	"treble",
	"bass",
	"alto",
	"tenor",
//	"percussion",
	"soprano",
	"mezzo-soprano",
	"baritone-c",
	"baritone-f",
//	"subbass",
//	"french"
] as const;
export type NoteClef = (typeof clefsEN)[number];

export const engToFrClefs = new Map<NoteClef, string>([
	["treble", "sol"],
	["bass", "fa"],
	["alto", "ut 3e"],
	["tenor", "ut 4e"],
//	["percussion" ,"percussion"],
	["soprano", "ut 1re"],
	["mezzo-soprano", "ut 2e"],
	["baritone-c", "ut 5e"],
	["baritone-f", "fa 3e"],
//	["subbass", "fa 5e"],
//	["french", "sol 1re"]
]);

export const noBemol = new Set<FrenchNoteName>(["do", "fa"]);
export const noDiese = new Set<FrenchNoteName>(["mi", "si"]);

const frToEngNoteName = new Map<FrenchNoteName, EnglishNoteName>([
	["do", "c"],
	["re", "d"],
	["mi", "e"],
	["fa", "f"],
	["sol" ,"g"],
	["la", "a"],
	["si", "b"]
]);

export interface SimpleNote {
	name: FrenchNoteName,
	mod: NoteModifier,
	duration: NoteDuration,
	octave: number
}

export function noteToString(note: SimpleNote)
{
	if (note.duration === "qr")
		return "";
	return note.name + (note.mod ? " " + note.mod : "") + " (" + note.octave.toString() + ")";
}

export class Note
{
	note: SimpleNote = {
		name: "do",
		mod: "",
		duration: "q",
		octave: 4
	};
	nameEN: EnglishNoteName = "c";

	constructor(note: SimpleNote = { name: "do", mod: "", duration: "q", octave: 4 })
	{
		this.note = {...note};
		this.nameEN = frToEngNoteName.get(this.note.name) ?? "c";
	}

	clone()
	{
		return new Note(this.note);
	}

	toVexFlow(factory: Factory, clef = "treble") : StaveNote
	{
		return factory.StaveNote({
			keys: [this.nameEN + "/" + this.note.octave.toString()],
			duration: this.note.duration,
			clef: clef
		}).addModifier(factory.Accidental({ type: this.note.mod }));
	}

	toString()
	{
		return noteToString(this.note);
	}
}
