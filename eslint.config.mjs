import { globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import * as reactHooks from "eslint-plugin-react-hooks";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config([
  {
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      "better-tailwindcss": {
        // tailwindcss 4: the path to the entry file of the css based tailwind config (eg: `src/global.css`)
        entryPoint: "src/app/global.css",
      },
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      globals: {
        self: true,
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  globalIgnores(["**/pnpm-lock.yaml", "**/node_modules", "**/.next"]),
  jsxA11y.flatConfigs.recommended,
  {
    ...importPlugin.flatConfigs.recommended,
    rules: { "import/no-named-as-default-member": "off" },
  },
  importPlugin.flatConfigs.typescript,
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    ...react.configs.flat.recommended,
    rules: {
      "react/prop-types": "off",
    },
  },
  react.configs.flat["jsx-runtime"],
  reactHooks.configs["recommended-latest"],
  stylistic.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      "better-tailwindcss": eslintPluginBetterTailwindcss,
    },
    rules: {
      "better-tailwindcss/no-unregistered-classes": [
        "error",
        {
          ignore: ["dark"],
        },
      ],
    },
  },
]);
