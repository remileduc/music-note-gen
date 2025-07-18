import type { Accidental as VAccidental } from "vexflow";
import { Note } from "../src/utils/Note"
import { MockFactory } from "./utils";

describe("Note", () => {
	describe("default constructor", () => {
		const note = new Note();

		it("should use default constructor properties", () => {
			expect(note.note.fname).toBe("do");
			expect(note.ename).toBe("c");
			expect(note.note.duration).toBe("q");
			expect(note.note.mod).toBe("");
			expect(note.note.octave).toBe(4);
		});
	});

	describe("parameterized constructor", () => {
		const note1 = new Note({fname: "fa", octave: 3, mod: "b", duration: "8"});
		it("should be initialized correctly", () => {
			expect(note1.note.fname).toBe("fa");
			expect(note1.ename).toBe("f");
			expect(note1.note.duration).toBe("8");
			expect(note1.note.mod).toBe("b");
			expect(note1.note.octave).toBe(3);
		});

		const note2 = new Note({fname: "mi", octave: 5, mod: "#", duration: "w"});
		it("should be initialized correctly", () => {
			expect(note2.note.fname).toBe("mi");
			expect(note2.ename).toBe("e");
			expect(note2.note.duration).toBe("w");
			expect(note2.note.mod).toBe("#");
			expect(note2.note.octave).toBe(5);
		});
	});

	describe("clone", () => {
		const note = new Note({fname: "sol", octave: 3, mod: "b", duration: "8"});
		const clone = note.clone();

		it("should not be the same object", () => expect(clone).not.toBe(note));
		it("should be equal", () => expect(clone).toStrictEqual(note));
	});

	describe("toString", () => {
		const note1 = new Note({fname: "re", octave: 3, mod: "b", duration: "8"});
		const note2 = new Note({fname: "re", octave: 3, mod: "", duration: "8"});

		it("should print correct string", () => {
			expect(note1.toString()).toBe("re b (3)");
			expect(note2.toString()).toBe("re (3)");
		});
	});

	describe("toVexflow", () => {
		const note = new Note({fname: "re", octave: 3, mod: "b", duration: "h"});

		// create factory
		const factory = new MockFactory();
		const vnote = note.toVexFlow(factory as any);

		it("should have the correct keys", () => {
			expect(vnote.getKeys().length).toBe(1);
			expect(vnote.getKeys()[0]).toBe("d/3");
		});

		it("should have the correct duration", () => expect(vnote.getDuration()).toBe("h"));

		it("should have the correct modifier", () => {
			expect(vnote.getModifiers().length).toBe(1);
			expect((vnote.getModifiers()[0] as VAccidental).type).toStrictEqual("b");
		});
	});
});
