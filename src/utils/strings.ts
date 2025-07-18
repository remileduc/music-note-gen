import type { SimpleNote } from "./Note";

export type InstrumentNotes = Record<string, SimpleNote[]>;

const doStringNotes: SimpleNote[] = [
	{ name: "do", mod: "", octave: 3 },
	{ name: "ré", mod: "", octave: 3 },
	{ name: "mi", mod: "", octave: 3 },
	{ name: "fa", mod: "", octave: 3 },
	{ name: "sol", mod: "", octave: 3 }
] as const;

const solStringNotes: SimpleNote[] = [
	{ name: "sol", mod: "", octave: 3 },
	{ name: "la", mod: "", octave: 3 },
	{ name: "si", mod: "", octave: 3 },
	{ name: "do", mod: "", octave: 4 },
	{ name: "ré", mod: "", octave: 4 }
] as const;

const reStringNotes: SimpleNote[] = [
	{ name: "ré", mod: "", octave: 4 },
	{ name: "mi", mod: "", octave: 4 },
	{ name: "fa", mod: "#", octave: 4 },
	{ name: "sol", mod: "", octave: 4 },
	{ name: "la", mod: "", octave: 4 }
] as const;

const laStringNotes: SimpleNote[] = [
	{ name: "la", mod: "", octave: 4 },
	{ name: "si", mod: "", octave: 4 },
	{ name: "do", mod: "#", octave: 5 },
	{ name: "ré", mod: "", octave: 5 },
	{ name: "mi", mod: "", octave: 5 }
] as const;

const miStringNotes: SimpleNote[] = [
	{ name: "mi", mod: "", octave: 5 },
	{ name: "fa", mod: "#", octave: 5 },
	{ name: "sol", mod: "#", octave: 5 },
	{ name: "la", mod: "", octave: 5 },
	{ name: "si", mod: "", octave: 5 }
] as const;

// violin family

export const violin: InstrumentNotes = {
	"Corde Mi": miStringNotes,
	"Corde La": laStringNotes,
	"Corde Ré": reStringNotes,
	"Corde Sol": solStringNotes
} as const;

export const viola: InstrumentNotes = {
	"Corde La": laStringNotes,
	"Corde Ré": reStringNotes,
	"Corde Sol": solStringNotes,
	"Corde Do": doStringNotes
} as const;

export const cello: InstrumentNotes = {
	"Corde La": [
		{ name: "la", mod: "", octave: 3 },
		{ name: "si", mod: "", octave: 3 },
		{ name: "do", mod: "", octave: 4 },
		{ name: "ré", mod: "", octave: 4 }
	],
	"Corde Ré": [
		{ name: "ré", mod: "", octave: 3 },
		{ name: "mi", mod: "", octave: 3 },
		{ name: "fa", mod: "", octave: 3 },
		{ name: "sol", mod: "", octave: 3 }
	],
	"Corde Sol": [
		{ name: "sol", mod: "", octave: 2 },
		{ name: "la", mod: "", octave: 2 },
		{ name: "si", mod: "", octave: 2 },
		{ name: "do", mod: "", octave: 3 }
	],
	"Corde Do": [
		{ name: "do", mod: "", octave: 2 },
		{ name: "ré", mod: "", octave: 2 },
		{ name: "mi", mod: "", octave: 2 },
		{ name: "fa", mod: "", octave: 2 }
	]
} as const;

export const doubleBass: InstrumentNotes = {
	"Corde Sol": [
		{ name: "sol", mod: "", octave: 3 },
		{ name: "sol", mod: "#", octave: 3 },
		{ name: "la", mod: "", octave: 3 },
		{ name: "si", mod: "b", octave: 3 }
	],
	"Corde Ré": [
		{ name: "ré", mod: "", octave: 3 },
		{ name: "mi", mod: "b", octave: 3 },
		{ name: "mi", mod: "", octave: 3 },
		{ name: "fa", mod: "", octave: 3 }
	],
	"Corde La": [
		{ name: "la", mod: "", octave: 2 },
		{ name: "si", mod: "b", octave: 2 },
		{ name: "si", mod: "", octave: 2 },
		{ name: "do", mod: "", octave: 3 }
	],
	"Corde Mi": [
		{ name: "mi", mod: "", octave: 2 },
		{ name: "fa", mod: "", octave: 2 },
		{ name: "fa", mod: "#", octave: 2 },
		{ name: "sol", mod: "", octave: 2 }
	]
} as const;

// guitar family

export const guitar: InstrumentNotes = {
	"Corde Mi (aiguë)": [
		{ name: "mi", mod: "", octave: 5 },
		{ name: "fa", mod: "", octave: 5 },
		{ name: "sol", mod: "", octave: 5 }
	],
	"Corde Si": [
		{ name: "si", mod: "", octave: 4 },
		{ name: "do", mod: "", octave: 5 },
		{ name: "ré", mod: "", octave: 5 }
	],
	"Corde Sol": [
		{ name: "sol", mod: "", octave: 4 },
		{ name: "la", mod: "", octave: 4 }
	],
	"Corde Ré": [
		{ name: "ré", mod: "", octave: 4 },
		{ name: "mi", mod: "", octave: 4 },
		{ name: "fa", mod: "", octave: 4 }
	],
	"Corde La": [
		{ name: "la", mod: "", octave: 3 },
		{ name: "si", mod: "", octave: 3 },
		{ name: "do", mod: "", octave: 4 }
	],
	"Corde Mi (grave)": [
		{ name: "mi", mod: "", octave: 3 },
		{ name: "fa", mod: "", octave: 3 },
		{ name: "sol", mod: "", octave: 3 }
	]
} as const;

export const bassGuitar: InstrumentNotes = {
	"Corde Sol": [
		{ name: "sol", mod: "", octave: 3 },
		{ name: "la", mod: "", octave: 3 },
		{ name: "si", mod: "", octave: 3 }
	],
	"Corde Ré": [
		{ name: "ré", mod: "", octave: 3 },
		{ name: "mi", mod: "", octave: 3 },
		{ name: "fa", mod: "", octave: 3 }
	],
	"Corde La": [
		{ name: "la", mod: "", octave: 2 },
		{ name: "si", mod: "", octave: 2 },
		{ name: "do", mod: "", octave: 3 }
	],
	"Corde Mi": [
		{ name: "mi", mod: "", octave: 2 },
		{ name: "fa", mod: "", octave: 2 },
		{ name: "sol", mod: "", octave: 2 }
	]
} as const;

// all

export const allInstruments: Record<string, InstrumentNotes> = {
	"violon": violin,
	"alto": viola,
	"violoncelle": cello,
	"contrebasse": doubleBass,
	"guitare": guitar,
	"basse": bassGuitar
} as const;

export const violins = [
	"violon",
	"alto",
	"violoncelle",
	"contrebasse"
] as const;

export const guitars = [
	"guitare",
	"basse"
] as const;
