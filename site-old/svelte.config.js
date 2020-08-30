/** @type {import('svelte-preprocess')["default"]} */
// @ts-ignore
const sveltePreprocess = require("svelte-preprocess");
const path = require("path");

module.exports = {
  preprocess: sveltePreprocess({
    typescript: true,
    scss: {
      includePaths: [path.resolve("src"), path.resolve("node_modules")]
    }
  }),
  preserveWhitespace: true,
  dev: true
};
