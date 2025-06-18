import  { noBemol, noDiese, type Note } from "./Note";

function getRandomInt(max: number)
{
	return Math.floor(Math.random() * max);
}

export function randomNotePicker(notes: Note[]): Note
{
	const note = notes[getRandomInt(notes.length)];

	const modifier = getRandomInt(11);
	if (modifier <= 6)
		return note;

	if (modifier <= 8 || noDiese.has(note.fname))
		note.mod = "b";
	if (modifier > 8 || noBemol.has(note.fname))
		note.mod = "#";

	return note;
}
