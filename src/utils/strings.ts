import type { FrenchNoteName } from "./Note"

export type StringNotes = [FrenchNoteName, number][];

type InstrumentNotes = Record<string, StringNotes>;

export const solStringNotes: StringNotes = [
	["sol", 3],
	["la", 3],
	["si", 3],
	["do", 4],
	["re", 4],
	["mi", 4],
	["fa", 4],
	["sol", 4]
];

export const reStringNotes: StringNotes = [
	["re", 4],
	["mi", 4],
	["fa", 4],
	["sol", 4],
	["la", 4],
	["si", 4],
	["do", 5],
	["re", 5]
];

export const laStringNotes: StringNotes = [
	["la", 4],
	["si", 4],
	["do", 5],
	["re", 5],
	["mi", 5],
	["fa", 5],
	["sol", 5],
	["la", 5]
];

export const miStringNotes: StringNotes = [
	["mi", 5],
	["fa", 5],
	["sol", 5],
	["la", 5],
	["si", 5],
	["do", 6],
	["re", 6],
	["mi", 6]
];

export const violin: InstrumentNotes = {
	"Corde Mi": miStringNotes,
	"Corde La": laStringNotes,
	"Corde Re": reStringNotes,
	"Corde Sol": solStringNotes
}
