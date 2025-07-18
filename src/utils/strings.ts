import type { SimpleNote } from "./Note";

type InstrumentNotes = Record<string, SimpleNote[]>;

export const solStringNotes: SimpleNote[] = [
	{ fname: "sol", mod: "", duration: "q", octave: 3 },
	{ fname: "la", mod: "", duration: "q", octave: 3 },
	{ fname: "si", mod: "", duration: "q", octave: 3 },
	{ fname: "do", mod: "", duration: "q", octave: 4 },
	{ fname: "re", mod: "", duration: "q", octave: 4 }
];

export const reStringNotes: SimpleNote[] = [
	{ fname: "re", mod: "", duration: "q", octave: 4 },
	{ fname: "mi", mod: "", duration: "q", octave: 4 },
	{ fname: "fa", mod: "#", duration: "q", octave: 4 },
	{ fname: "sol", mod: "", duration: "q", octave: 4 },
	{ fname: "la", mod: "", duration: "q", octave: 4 }
];

export const laStringNotes: SimpleNote[] = [
	{ fname: "la", mod: "", duration: "q", octave: 4 },
	{ fname: "si", mod: "", duration: "q", octave: 4 },
	{ fname: "do", mod: "#", duration: "q", octave: 5 },
	{ fname: "re", mod: "", duration: "q", octave: 5 },
	{ fname: "mi", mod: "", duration: "q", octave: 5 }
];

export const miStringNotes: SimpleNote[] = [
	{ fname: "mi", mod: "", duration: "q", octave: 5 },
	{ fname: "fa", mod: "#", duration: "q", octave: 5 },
	{ fname: "sol", mod: "#", duration: "q", octave: 5 },
	{ fname: "la", mod: "", duration: "q", octave: 5 },
	{ fname: "si", mod: "", duration: "q", octave: 5 }
];

export const violin: InstrumentNotes = {
	"Corde Mi": miStringNotes,
	"Corde La": laStringNotes,
	"Corde Re": reStringNotes,
	"Corde Sol": solStringNotes
};

export const allInstruments: Record<string, InstrumentNotes> = {
	"violon": violin
};
