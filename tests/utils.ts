import {
	type StaveNoteStruct,
	Accidental as VAccidental,
	Annotation as VAnnotation,
	StaveNote as VNote
} from "vexflow";

// mock for vexflow factory
export class MockFactory
{
	Accidental({ type }: {type: string}) { return new VAccidental(type); }

	Annotation({ text }: {text: string}) { return new VAnnotation(text); }

	StaveNote(props: StaveNoteStruct) { return new VNote(props); }
}
