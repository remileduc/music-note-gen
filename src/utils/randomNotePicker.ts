import  { noBemol, noDiese, type NoteDuration, type Note } from "./Note";

const possibleMeasures: NoteDuration[][] = [
	["w"],
	["h", "h"],
	["h", "q", "q"],
	["h", "q", "8", "8"],
	["h", "8", "8", "8", "8"],
	["q", "q", "q", "q"],
	["q", "q", "q", "8", "8"],
	["q", "q", "8", "8", "8", "8"],
	["q", "8", "8", "8", "8", "8", "8"],
	["8", "8", "8", "8", "8", "8", "8", "8"],
]

function getRandomInt(max: number): number
{
	return Math.floor(crypto.getRandomValues(new Uint8Array(1))[0] / 256. * max);
}

function shuffleArray<T>(array: T[]): T[]
{
	for (let i = array.length - 1; i > 0; i--)
		{
		const j = getRandomInt(i + 1);
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export function randomNotePicker(notes: Note[], generateModifiers = true): Note
{
	const note = notes[getRandomInt(notes.length)].clone();

	if (!generateModifiers)
		return note;

	const modifier = getRandomInt(21);
	if (modifier <= 16)
		return note;

	if (modifier <= 18 || noDiese.has(note.fname))
		note.mod = "b";
	if (modifier > 18 || noBemol.has(note.fname))
		note.mod = "#";

	return note;
}

export function randomMeasurePicker(authorizedDurations: NoteDuration[]): NoteDuration[]
{
	const autorizedSet = new Set(authorizedDurations);

	const authorizedMeasures = possibleMeasures.filter((measures) => {
		for (const m of measures)
		{
			if (!autorizedSet.has(m))
				return false;
		}
		return true;
	});

	// pick a measure
	const measure = [...authorizedMeasures[getRandomInt(authorizedMeasures.length)]];
	return shuffleArray(measure);
}
