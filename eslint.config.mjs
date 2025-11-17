import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
        // tests
        "coverage/**",
    ]),
    // customize rules
    {
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
    }
]);
