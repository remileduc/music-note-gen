import type { SimpleNote } from "./Note";

export type InstrumentNotes = Record<string, SimpleNote[]>;

const doStringNotes: SimpleNote[] = [
	{ fname: "do", mod: "", duration: "q", octave: 3 },
	{ fname: "re", mod: "", duration: "q", octave: 3 },
	{ fname: "mi", mod: "", duration: "q", octave: 3 },
	{ fname: "fa", mod: "", duration: "q", octave: 3 },
	{ fname: "sol", mod: "", duration: "q", octave: 3 }
];

const solStringNotes: SimpleNote[] = [
	{ fname: "sol", mod: "", duration: "q", octave: 3 },
	{ fname: "la", mod: "", duration: "q", octave: 3 },
	{ fname: "si", mod: "", duration: "q", octave: 3 },
	{ fname: "do", mod: "", duration: "q", octave: 4 },
	{ fname: "re", mod: "", duration: "q", octave: 4 }
];

const reStringNotes: SimpleNote[] = [
	{ fname: "re", mod: "", duration: "q", octave: 4 },
	{ fname: "mi", mod: "", duration: "q", octave: 4 },
	{ fname: "fa", mod: "#", duration: "q", octave: 4 },
	{ fname: "sol", mod: "", duration: "q", octave: 4 },
	{ fname: "la", mod: "", duration: "q", octave: 4 }
];

const laStringNotes: SimpleNote[] = [
	{ fname: "la", mod: "", duration: "q", octave: 4 },
	{ fname: "si", mod: "", duration: "q", octave: 4 },
	{ fname: "do", mod: "#", duration: "q", octave: 5 },
	{ fname: "re", mod: "", duration: "q", octave: 5 },
	{ fname: "mi", mod: "", duration: "q", octave: 5 }
];

const miStringNotes: SimpleNote[] = [
	{ fname: "mi", mod: "", duration: "q", octave: 5 },
	{ fname: "fa", mod: "#", duration: "q", octave: 5 },
	{ fname: "sol", mod: "#", duration: "q", octave: 5 },
	{ fname: "la", mod: "", duration: "q", octave: 5 },
	{ fname: "si", mod: "", duration: "q", octave: 5 }
];

// violin family

export const violin: InstrumentNotes = {
	"Corde Mi": miStringNotes,
	"Corde La": laStringNotes,
	"Corde Re": reStringNotes,
	"Corde Sol": solStringNotes
};

export const viola: InstrumentNotes = {
	"Corde La": laStringNotes,
	"Corde Re": reStringNotes,
	"Corde Sol": solStringNotes,
	"Corde Do": doStringNotes
};

export const cello: InstrumentNotes = {
	"Corde La": [
		{ fname: "la", mod: "", duration: "q", octave: 3 },
		{ fname: "si", mod: "", duration: "q", octave: 3 },
		{ fname: "do", mod: "", duration: "q", octave: 4 },
		{ fname: "re", mod: "", duration: "q", octave: 4 }
	],
	"Corde Re": [
		{ fname: "re", mod: "", duration: "q", octave: 3 },
		{ fname: "mi", mod: "", duration: "q", octave: 3 },
		{ fname: "fa", mod: "", duration: "q", octave: 3 },
		{ fname: "sol", mod: "", duration: "q", octave: 3 }
	],
	"Corde Sol": [
		{ fname: "sol", mod: "", duration: "q", octave: 2 },
		{ fname: "la", mod: "", duration: "q", octave: 2 },
		{ fname: "si", mod: "", duration: "q", octave: 2 },
		{ fname: "do", mod: "", duration: "q", octave: 3 }
	],
	"Corde Do": [
		{ fname: "do", mod: "", duration: "q", octave: 2 },
		{ fname: "re", mod: "", duration: "q", octave: 2 },
		{ fname: "mi", mod: "", duration: "q", octave: 2 },
		{ fname: "fa", mod: "", duration: "q", octave: 2 }
	]
};

export const doubleBass: InstrumentNotes = {
	"Corde Sol": [
		{ fname: "sol", mod: "", duration: "q", octave: 3 },
		{ fname: "sol", mod: "#", duration: "q", octave: 3 },
		{ fname: "la", mod: "", duration: "q", octave: 3 },
		{ fname: "si", mod: "b", duration: "q", octave: 3 }
	],
	"Corde Re": [
		{ fname: "re", mod: "", duration: "q", octave: 3 },
		{ fname: "mi", mod: "b", duration: "q", octave: 3 },
		{ fname: "mi", mod: "", duration: "q", octave: 3 },
		{ fname: "fa", mod: "", duration: "q", octave: 3 }
	],
	"Corde La": [
		{ fname: "la", mod: "", duration: "q", octave: 2 },
		{ fname: "si", mod: "b", duration: "q", octave: 2 },
		{ fname: "si", mod: "", duration: "q", octave: 2 },
		{ fname: "do", mod: "", duration: "q", octave: 3 }
	],
	"Corde Mi": [
		{ fname: "mi", mod: "", duration: "q", octave: 2 },
		{ fname: "fa", mod: "", duration: "q", octave: 2 },
		{ fname: "fa", mod: "#", duration: "q", octave: 2 },
		{ fname: "sol", mod: "", duration: "q", octave: 2 }
	]
};

// guitar family

export const guitar: InstrumentNotes = {
	"Corde Mi (aiguë)": [
		{ fname: "mi", mod: "", duration: "q", octave: 5 },
		{ fname: "fa", mod: "", duration: "q", octave: 5 },
		{ fname: "sol", mod: "", duration: "q", octave: 5 }
	],
	"Corde Si": [
		{ fname: "si", mod: "", duration: "q", octave: 4 },
		{ fname: "do", mod: "", duration: "q", octave: 5 },
		{ fname: "re", mod: "", duration: "q", octave: 5 }
	],
	"Corde Sol": [
		{ fname: "sol", mod: "", duration: "q", octave: 4 },
		{ fname: "la", mod: "", duration: "q", octave: 4 }
	],
	"Corde Re": [
		{ fname: "re", mod: "", duration: "q", octave: 4 },
		{ fname: "mi", mod: "", duration: "q", octave: 4 },
		{ fname: "fa", mod: "", duration: "q", octave: 4 }
	],
	"Corde La": [
		{ fname: "la", mod: "", duration: "q", octave: 3 },
		{ fname: "si", mod: "", duration: "q", octave: 3 },
		{ fname: "do", mod: "", duration: "q", octave: 4 }
	],
	"Corde Mi (grave)": [
		{ fname: "mi", mod: "", duration: "q", octave: 3 },
		{ fname: "fa", mod: "", duration: "q", octave: 3 },
		{ fname: "sol", mod: "", duration: "q", octave: 3 }
	]
};

export const bassGuitar: InstrumentNotes = {
	"Corde Sol": [
		{ fname: "sol", mod: "", duration: "q", octave: 3 },
		{ fname: "la", mod: "", duration: "q", octave: 3 },
		{ fname: "si", mod: "", duration: "q", octave: 3 }
	],
	"Corde Re": [
		{ fname: "re", mod: "", duration: "q", octave: 3 },
		{ fname: "mi", mod: "", duration: "q", octave: 3 },
		{ fname: "fa", mod: "", duration: "q", octave: 3 }
	],
	"Corde La": [
		{ fname: "la", mod: "", duration: "q", octave: 2 },
		{ fname: "si", mod: "", duration: "q", octave: 2 },
		{ fname: "do", mod: "", duration: "q", octave: 3 }
	],
	"Corde Mi": [
		{ fname: "mi", mod: "", duration: "q", octave: 2 },
		{ fname: "fa", mod: "", duration: "q", octave: 2 },
		{ fname: "sol", mod: "", duration: "q", octave: 2 }
	]
};

// all

export const allInstruments: Record<string, InstrumentNotes> = {
	"violon": violin,
	"alto": viola,
	"violoncelle": cello,
	"contrebasse": doubleBass,
	"guitare": guitar,
	"basse": bassGuitar
};

export const violins = [
	"violon",
	"alto",
	"violoncelle",
	"contrebasse"
];

export const guitars = [
	"guitare",
	"basse"
];
