import type { GeneratorInstrument } from "../src/app/components/settings/GeneratorInstrument";
import type { GeneratorSettings } from "../src/app/components/settings/GeneratorSettings";
import { validateInstrumentJson, validateSettingsJson } from "../src/utils/jsonTypeValidator";
import type { NoteClef } from "../src/utils/Note";

// __tests__/randomNotePicker.test.ts
describe("jsonTypeValidator.ts", () => {
	describe("validateInstrumentJson", () => {
		it("should validate default value", () => {
			const instrument: GeneratorInstrument = {
				name: "violon",
				clef: "treble",
				tempo: 128,
				initialized: false
			};

			expect(validateInstrumentJson(instrument)).toBe(true);
		});

		it("should validate without initialized", () => {
			const instrument = {
				name: "basse",
				clef: "alto",
				tempo: 30
			} as GeneratorInstrument;

			expect(validateInstrumentJson(instrument)).toBe(true);
		});

		it("should not validate bad input", () => {
			const instrument = {
				name: "piano",
				clef: "bass",
				tempo: 30
			} as GeneratorInstrument;

			expect(validateInstrumentJson(instrument)).toBe(false);
		});

		it("should not validate bad input", () => {
			const instrument = {
				name: "contrebasse",
				clef: "lol" as NoteClef,
				tempo: 12
			} as GeneratorInstrument;

			expect(validateInstrumentJson(instrument)).toBe(false);
		});

		it("should not validate bad input", () => {
			const instrument = {
				name: "contrebasse",
				clef: "bass",
				tempo: 3000
			} as GeneratorInstrument;

			expect(validateInstrumentJson(instrument)).toBe(false);
		});
	});

	describe("validateSettingsJson", () => {
		it("should validate correct settings", () => {
			const settings: GeneratorSettings = {
				selectedNotes: [
					{ name: "ré", mod: "", octave: 3 },
					{ name: "mi", mod: "", octave: 3 },
					{ name: "fa", mod: "", octave: 3 }
				],
				selectedDurations: ["w", "h"],
				showNames: true,
				addModifiers: false,
				numberSystems: 4,
				initialized: false
			};

			expect(validateSettingsJson(settings)).toBe(true);
		});

		it("should validate correct settings", () => {
			const settings: GeneratorSettings = {
				selectedNotes: [
					{ name: "sol", mod: "", octave: 3 },
					{ name: "la", mod: "", octave: 3 },
					{ name: "si", mod: "", octave: 3 },
					{ name: "do", mod: "", octave: 4 },
					{ name: "ré", mod: "", octave: 4 }
				],
				selectedDurations: ["w", "h", "q", "8"],
				showNames: false,
				addModifiers: true,
				numberSystems: 32,
				initialized: true
			};

			expect(validateSettingsJson(settings)).toBe(true);
		});

		it("should validate without initialized", () => {
			const settings = {
				selectedNotes: [{ name: "mi", mod: "", octave: 3 }],
				selectedDurations: ["w", "8"],
				showNames: false,
				addModifiers: true,
				numberSystems: 7
			} as GeneratorSettings;

			expect(validateSettingsJson(settings)).toBe(true);
		});

		it("should not validate bad input", () => {
			const settings = {
				selectedNotes: [{ name: "mi", mod: "", octave: 3 }],
				selectedDurations: ["w", "8"]
			} as GeneratorSettings;

			expect(validateSettingsJson(settings)).toBe(false);
		});

		it("should not validate bad input", () => {
			const settings = {
				selectedNotes: [{ name: "mi", mod: "", octave: 3 }],
				selectedDurations: ["w", "8"],
				showNames: false,
				addModifiers: true,
				numberSystems: 307
			} as GeneratorSettings;

			expect(validateSettingsJson(settings)).toBe(false);
		});
	});
});
