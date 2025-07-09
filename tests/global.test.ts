import * as global from "../src/utils/global";

describe("global.ts", () => {
	it("should export basePath", () => { expect(global.basePath).toBeDefined(); });

	it("should return same path if basepath is undefined", () => {
		const path = "/test";

		expect(global.rsrcPath(path)).toBe(path);
	});

	describe("getSVGHeight", () => {
		const smallSize = global.getSVGHeight(10, 2, 3, 2);
		expect(smallSize).toBe(20);

		const bigSize = global.getSVGHeight(10, 200, 3, 2);
		expect(bigSize).toBe(2);

		const middleSize = global.getSVGHeight(10, 4, 1, 2);
		expect(middleSize).toBe(6);
	});
});
