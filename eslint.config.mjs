import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
		"next"
    ),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: true,
            tsconfigRootDir: ".",
        },
    },

    rules: {
        "array-callback-return": ["error", {
            checkForEach: true,
        }],

        "no-await-in-loop": "error",
        "no-constant-binary-expression": "error",
        "no-constructor-return": "error",

        "no-duplicate-imports": ["error", {
            includeExports: true,
        }],

        "no-new-native-nonconstructor": "error",
        "no-promise-executor-return": "error",
        "no-self-compare": "error",
        "no-template-curly-in-string": "error",
        "no-unmodified-loop-condition": "error",
        "no-unused-private-class-members": "error",
        "class-methods-use-this": "error",
        "consistent-this": ["error", "self"],
        "default-param-last": "error",
        "dot-notation": "error",
        eqeqeq: ["error", "smart"],
        "no-alert": "error",

        "no-else-return": ["error", {
            allowElseIf: false,
        }],

        "no-var": "error",
        radix: "error",
        "@typescript-eslint/no-non-null-assertion": "warn",
    },
}]);