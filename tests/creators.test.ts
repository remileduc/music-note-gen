import * as creators from "../src/utils/creators";
import { Note } from "../src/utils/Note";
import { MockFactory } from "./utils";

// partially generated with chatGPT

describe("cerators.ts", () => {
	const notes = [
		new Note("do", 4, "", "q"),
		new Note("re", 5, "", "h"),
	];

	describe("createNotes", () => {
		const result = creators.createNotes(new MockFactory() as any, notes);
		it("should transform Notes into StaveNotes", () => {
			expect(result.length).toBe(notes.length);
			expect(result[0].getKeys()[0]).toBe("c/4");
			expect(result[1].getKeys()[0]).toBe("d/5");
		});
	});
});
