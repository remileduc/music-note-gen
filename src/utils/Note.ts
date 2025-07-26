import type { Factory, StaveNote } from "vexflow";

export type FrenchNoteName = "do" | "ré" | "mi" | "fa" | "sol" | "la" | "si";
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
	["ré", "d"],
	["mi", "e"],
	["fa", "f"],
	["sol" ,"g"],
	["la", "a"],
	["si", "b"]
]);

export interface SimpleNote {
	name: FrenchNoteName,
	mod: NoteModifier,
	octave: number
	duration?: NoteDuration,
}

export function noteToString(note: SimpleNote)
{
	if ((note.duration?.length ?? 0) > 1)
		return "";
	return note.name + (note.mod ? " " + note.mod : "") + " (" + note.octave.toString() + ")";
}

export class Note implements SimpleNote
{
	name: FrenchNoteName = "do";
	mod: NoteModifier = "";
	octave = 4;
	duration: NoteDuration = "q";

	readonly nameEN: EnglishNoteName = "c";

	constructor(note: SimpleNote = { name: "do", mod: "", octave: 4, duration: "q" })
	{
		this.name = frToEngNoteName.has(note.name) ? note.name : "do";
		this.mod = note.mod;
		this.octave = note.octave;
		this.duration = note.duration ?? "q";
		this.nameEN = frToEngNoteName.get(note.name) ?? "c";
	}

	toSimpleNote(): SimpleNote
	{
		return { name: this.name, mod: this.mod, octave: this.octave, duration: this.duration };
	}

	clone()
	{
		return new Note(this.toSimpleNote());
	}

	toVexFlow(factory: Factory, clef = "treble") : StaveNote
	{
		return factory.StaveNote({
			keys: [this.nameEN + "/" + this.octave.toString()],
			duration: this.duration,
			clef: clef
		}).addModifier(factory.Accidental({ type: this.mod }));
	}

	toString()
	{
		return noteToString(this.toSimpleNote());
	}
}
