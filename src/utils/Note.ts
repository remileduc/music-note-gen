import type { Factory, StaveNote } from "vexflow";

export type FrenchNoteName = "do" | "re" | "mi" | "fa" | "sol" | "la" | "si";
export type EnglishNoteName = "c" | "d" | "e" | "f" | "g" | "a" | "b";
export type NoteModifier = "#" | "b" | "";
export type NoteDuration = "w" | "h" | "q" | "8" | "qr";

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
	fname: FrenchNoteName,
	mod: NoteModifier,
	duration: NoteDuration,
	octave: number
}

export function noteToString(note: SimpleNote)
{
	if (note.duration === "qr")
		return "";
	return note.fname + (note.mod ? " " + note.mod : "") + " (" + note.octave.toString() + ")";
}

export class Note
{
	note: SimpleNote = {
		fname: "do",
		mod: "",
		duration: "q",
		octave: 4
	};
	ename: EnglishNoteName = "c";

	constructor(note: SimpleNote = { fname: "do", mod: "", duration: "q", octave: 4 })
	{
		this.note = {...note};
		this.ename = frToEngNoteName.get(this.note.fname) ?? "c";
	}

	clone()
	{
		return new Note(this.note);
	}

	toVexFlow(factory: Factory, clef = "treble") : StaveNote
	{
		return factory.StaveNote({
			keys: [this.ename + "/" + this.note.octave.toString()],
			duration: this.note.duration,
			clef: clef
		}).addModifier(factory.Accidental({ type: this.note.mod }));
	}

	toString()
	{
		return noteToString(this.note);
	}
}
