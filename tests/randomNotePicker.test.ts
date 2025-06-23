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
			new Note("do", 4, "", "q"),
			new Note("re", 5, "", "h"),
		];

		it("clones notes and do not generate modifiers", () => {
			spy
				?.mockImplementationOnce(() => Uint8Array.from([0]))
				?.mockImplementationOnce(() => Uint8Array.from([232])); // 19
			const n = notes[0];
			n.mod = "";
			const res = randomNotePicker(notes, false);
			expect(res).not.toBe(n);
			expect(res.fname).toBe("do");
			expect(res.mod).toBe("");
			expect(n.mod).toBe("");
		});

		it("does not add modifier if <= 16", () => {
			spy
				?.mockImplementationOnce(() => Uint8Array.from([255])) // 1
				?.mockImplementationOnce(() => Uint8Array.from([196])); // 16
			const res = randomNotePicker(notes, true);
			expect(res.fname).toBe("re");
			expect(res.mod).toBe("");
		});

		it("adds modifier 'b'", () => {
			spy
				?.mockImplementationOnce(() => Uint8Array.from([255])) // 1
				?.mockImplementationOnce(() => Uint8Array.from([208])); // 17
			const res = randomNotePicker(notes, true);
			expect(res.fname).toBe("re");
			expect(res.mod).toBe("b");
		});

		it("adds modifier '#'", () => {
			spy
				?.mockImplementationOnce(() => Uint8Array.from([0])) // 1
				?.mockImplementationOnce(() => Uint8Array.from([232])); // 19
			const res = randomNotePicker(notes, true);
			expect(res.fname).toBe("do");
			expect(res.mod).toBe("#");
		});

		it("priorise bemol", () => {
			const n = new Note("mi", 4, "", "q");
			spy
				?.mockImplementationOnce(() => Uint8Array.from([0]))
				?.mockImplementationOnce(() => Uint8Array.from([208])); // 17
			const res = randomNotePicker([n], true);
			expect(res.fname).toBe("mi");
			expect(res.mod).toBe("b");
		});

		it("priorise #", () => {
			const n = new Note("fa", 3, "", "h");
			spy
				?.mockImplementationOnce(() => Uint8Array.from([0]))
				?.mockImplementationOnce(() => Uint8Array.from([232])); // 19
			const res = randomNotePicker([n], true);
			expect(res.fname).toBe("fa");
			expect(res.mod).toBe("#");
		});
	});
});

