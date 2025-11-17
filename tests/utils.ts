import {
	type StaveNoteStruct,
	Accidental as VAccidental,
	Annotation as VAnnotation,
	StaveNote as VNote
} from "vexflow";

// mock for vexflow factory
export class MockFactory
{
	Accidental({ type }: {type: string}) { return new VAccidental(type); } // eslint-disable-line class-methods-use-this

	Annotation({ text }: {text: string}) { return new VAnnotation(text); } // eslint-disable-line class-methods-use-this

	StaveNote(props: StaveNoteStruct) { return new VNote(props); } // eslint-disable-line class-methods-use-this
}
