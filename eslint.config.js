import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  {
    rules: {
      "no-unused-vars": "warn",
      "react/prop-types": "off",
    },
  },
  {
    ignores: ["node_modules/", "dist/"],
  },
  {
    settings: {
      react: {
        version: "detect",
      }
    }
  },
  
];