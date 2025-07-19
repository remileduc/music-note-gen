import type { Accidental as VAccidental } from "vexflow";
import { type FrenchNoteName, Note } from "../src/utils/Note"
import { MockFactory } from "./utils";

describe("Note", () => {
	describe("default constructor", () => {

		it("should use default constructor properties", () => {
			const note = new Note();
			expect(note.name).toBe("do");
			expect(note.nameEN).toBe("c");
			expect(note.duration).toBe("q");
			expect(note.mod).toBe("");
			expect(note.octave).toBe(4);
		});
	});

	describe("parameterized constructor", () => {
		it("should be initialized correctly", () => {
			const note = new Note({name: "fa", octave: 3, mod: "b", duration: "8"});
			expect(note.name).toBe("fa");
			expect(note.nameEN).toBe("f");
			expect(note.duration).toBe("8");
			expect(note.mod).toBe("b");
			expect(note.octave).toBe(3);
		});

		it("should be initialized correctly", () => {
			const note = new Note({name: "mi", octave: 5, mod: "#", duration: "w"});
			expect(note.name).toBe("mi");
			expect(note.nameEN).toBe("e");
			expect(note.duration).toBe("w");
			expect(note.mod).toBe("#");
			expect(note.octave).toBe(5);
		});

		it("should initialize correctly missing / wrong parameters", () => {
			const note = new Note({name: "lol" as FrenchNoteName, octave: 5, mod: "#"});
			expect(note.name).toBe("do");
			expect(note.nameEN).toBe("c");
			expect(note.duration).toBe("q");
			expect(note.mod).toBe("#");
			expect(note.octave).toBe(5);
		});
	});

	describe("clone", () => {
		const note = new Note({name: "sol", octave: 3, mod: "b", duration: "8"});
		const clone = note.clone();

		it("should not be the same object", () => expect(clone).not.toBe(note));
		it("should be equal", () => expect(clone).toStrictEqual(note));
	});

	describe("toString", () => {

		it("should print correct string", () => {
			const note1 = new Note({name: "ré", octave: 3, mod: "b", duration: "8"});
			const note2 = new Note({name: "ré", octave: 3, mod: "", duration: "8"});
			expect(note1.toString()).toBe("ré b (3)");
			expect(note2.toString()).toBe("ré (3)");
		});
		it("should print nothing for silences", () => {
			const note = new Note({name: "ré", octave: 3, mod: "", duration: "qr"});
			expect(note.toString()).toBe("");
		});
	});

	describe("toVexflow", () => {
		const note = new Note({name: "ré", octave: 3, mod: "b", duration: "h"});

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
