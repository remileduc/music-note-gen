import type { Accidental as VAccidental } from "vexflow";
import { Note } from "../src/utils/Note"
import { MockFactory } from "./utils";

describe("Note", () => {
	describe("default constructor", () => {
		const note = new Note("do");

		it("should use default constructor properties", () => {
			expect(note.fname).toBe("do");
			expect(note.ename).toBe("c");
			expect(note.duration).toBe("q");
			expect(note.mod).toBe("");
			expect(note.octave).toBe(4);
		});
	});

	describe("parameterized constructor", () => {
		const note1 = new Note("fa", 3, "b", "8");
		it("should be initialized correctly", () => {
			expect(note1.fname).toBe("fa");
			expect(note1.ename).toBe("f");
			expect(note1.duration).toBe("8");
			expect(note1.mod).toBe("b");
			expect(note1.octave).toBe(3);
		});

		const note2 = new Note("mi", 5, "#", "w");
		it("should be initialized correctly", () => {
			expect(note2.fname).toBe("mi");
			expect(note2.ename).toBe("e");
			expect(note2.duration).toBe("w");
			expect(note2.mod).toBe("#");
			expect(note2.octave).toBe(5);
		});
	});

	describe("clone", () => {
		const note = new Note("sol", 3, "b");
		const clone = note.clone();

		it("should not be the same object", () => expect(clone).not.toBe(note));
		it("should be equal", () => expect(clone).toStrictEqual(note));
	});

	describe("toString", () => {
		const note = new Note("re", 3, "b", "8");

		it("should print correct string", () => expect(note.toString()).toBe("re (3)"));
	});

	describe("toVexflow", () => {
		const note = new Note("re", 3, "b", "h");

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
