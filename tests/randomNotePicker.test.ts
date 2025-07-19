// __tests__/randomNotePicker.test.ts
import { randomMeasurePicker, randomNotePicker } from "../src/utils/randomNotePicker";
import { Note, type NoteDuration } from "../src/utils/Note";

describe("randomNotePicker.ts", () => {
	let spy: jest.SpyInstance | null = null;

	beforeEach(() => { spy = jest.spyOn(crypto, "getRandomValues"); });
	afterEach(() => { spy?.mockRestore(); spy = null; });

	describe("randomMeasurePicker", () => {
		it("only erturns authorized durations", () => {
			const authorized: NoteDuration[] = ["q"];
			spy?.mockReturnValue(Uint8Array.from([0]));

			const m = randomMeasurePicker(authorized);
			expect(m).toEqual(["q", "q", "q", "q"]);
		});

		it("throws an error if no authorized measures set", () => {
			expect(() => randomMeasurePicker(["z" as any])).toThrow();
		});
	});

	describe("randomNotePicker", () => {
		const notes = [
			new Note({name: "do", octave: 4, mod: "", duration: "q"}),
			new Note({name: "re", octave: 5, mod: "", duration: "h"}),
		];

		it("clones notes and do not generate modifiers", () => {
			spy
				?.mockImplementationOnce(() => Uint8Array.from([0]))
				?.mockImplementationOnce(() => Uint8Array.from([19]));
			const n = notes[0];
			n.mod = "";
			const res = randomNotePicker(notes, false);
			expect(res).not.toBe(n);
			expect(res.name).toBe("do");
			expect(res.mod).toBe("");
			expect(n.mod).toBe("");
		});

		it("does not add modifier if <= 16", () => {
			spy
				?.mockImplementationOnce(() => Uint8Array.from([1]))
				?.mockImplementationOnce(() => Uint8Array.from([16]));
			const res = randomNotePicker(notes, true);
			expect(res.name).toBe("re");
			expect(res.mod).toBe("");
		});

		it("does not add modifier if one already exists", () => {
			const n = new Note({name: "re", octave: 4, mod: "#", duration: "q"});
			spy
				?.mockImplementationOnce(() => Uint8Array.from([1]))
				?.mockImplementationOnce(() => Uint8Array.from([17]));
			const res = randomNotePicker([n], true);
			expect(res.name).toBe("re");
			expect(res.mod).toBe("#");
		});

		it("adds modifier 'b'", () => {
			spy
				?.mockImplementationOnce(() => Uint8Array.from([1]))
				?.mockImplementationOnce(() => Uint8Array.from([17]));
			const res = randomNotePicker(notes, true);
			expect(res.name).toBe("re");
			expect(res.mod).toBe("b");
		});

		it("adds modifier '#'", () => {
			spy
				?.mockImplementationOnce(() => Uint8Array.from([0]))
				?.mockImplementationOnce(() => Uint8Array.from([19]));
			const res = randomNotePicker(notes, true);
			expect(res.name).toBe("do");
			expect(res.mod).toBe("#");
		});

		it("priorise bemol", () => {
			const n = new Note({name: "mi", octave: 4, mod: "", duration: "q"});
			spy
				?.mockImplementationOnce(() => Uint8Array.from([0]))
				?.mockImplementationOnce(() => Uint8Array.from([17]));
			const res = randomNotePicker([n], true);
			expect(res.name).toBe("mi");
			expect(res.mod).toBe("b");
		});

		it("priorise #", () => {
			const n = new Note({name: "fa", octave: 3, mod: "", duration: "h"});
			spy
				?.mockImplementationOnce(() => Uint8Array.from([0]))
				?.mockImplementationOnce(() => Uint8Array.from([19]));
			const res = randomNotePicker([n], true);
			expect(res.name).toBe("fa");
			expect(res.mod).toBe("#");
		});
	});
});

