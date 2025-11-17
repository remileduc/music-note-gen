import Ajv from "ajv/dist/jtd";
import type { GeneratorInstrument } from "@components/settings/GeneratorInstrument";
import type { GeneratorSettings } from "@components/settings/GeneratorSettings";
import { clefsEN } from "./Note";
import { allInstruments } from "./strings";

const instrumentSchema = {
	properties: {
		instrName: { enum: Object.keys(allInstruments) },
		clef: { enum: clefsEN },
		tempo: { type: "uint8" }
	},
	optionalProperties: {
		initialized: { type: "boolean" }
	}
} as const;

const settingsSchema = {
	definitions: {
		simple_note: {
			properties: {
				name: { enum: ["do", "ré", "mi", "fa", "sol", "la", "si"] },
				mod: { enum: ["#", "b", ""] },
				octave: { type: "uint8" }
			},
			optionalProperties: {
				duration: { enum: ["w", "h", "q", "8"] }
			}
		}
	},

	properties: {
		selectedNotes: { elements: { ref: "simple_note" }},
		selectedDurations: { elements: { enum: ["w", "h", "q", "8"] }},
		showNames: { type: "boolean" },
		addModifiers: { type: "boolean" },
		numberSystems: { type: "uint8" }
	},
	optionalProperties: {
		initialized: { type: "boolean" }
	}
} as const;

export function validateJson(json: object, schema: object) : boolean
{
	const ajv = new Ajv();
	const validator = ajv.compile(schema);

	return validator(json);
}

export function validateInstrumentJson(json: GeneratorInstrument)
{
	return validateJson(json, instrumentSchema);
}

export function validateSettingsJson(json: GeneratorSettings)
{
	return validateJson(json, settingsSchema);
}
