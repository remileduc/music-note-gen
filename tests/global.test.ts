import * as global from "../src/utils/global";

describe("global.ts", () => {
	it("should export basePath", () => { expect(global.basePath).toBeDefined(); });

	it("should return same path if basepath is undefined", () => {
		const path = "/test";

		expect(global.rsrcPath(path)).toBe(path);
	});
});
