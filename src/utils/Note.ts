import type { Factory, StaveNote } from "vexflow";

export type FrenchNoteName = "do" | "re" | "mi" | "fa" | "sol" | "la" | "si";
export type EnglishNoteName = "c" | "d" | "e" | "f" | "g" | "a" | "b";
export type NoteModifier = "#" | "b" | "";
export type NoteDuration = "w" | "h" | "q" | "8";

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

export class Note
{
	fname: FrenchNoteName;
	ename: EnglishNoteName;
	mod: NoteModifier = "";
	duration: NoteDuration = "q";
	octave = 4;

	constructor(fname: FrenchNoteName, octave = 4, mod: NoteModifier = "", duration: NoteDuration = "q")
	{
		this.fname = fname;
		this.ename = frToEngNoteName.get(fname) ?? "a";
		this.octave = octave;
		this.mod = mod;
		this.duration = duration;
	}

	toVexFlox(factory: Factory) : StaveNote
	{
		return factory.StaveNote({
			keys: [this.ename + "/" + this.octave.toString()],
			duration: this.duration
		}).addModifier(factory.Accidental({ type: this.mod }));
	}

	toString()
	{
		return `${this.fname} (${this.octave.toString()})`;
	}
}
