// __dirname is not available in ES modules: https://nodejs.org/api/esm.html#esm_no_filename_or_dirname
// This issue has a fix: https://github.com/nodejs/help/issues/2907
// import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import adapterAuto from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import postcssPresetEnv from "postcss-preset-env";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	extensions: [".svelte", ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: {
				plugins: [
					// * How to configure the postcssPresetEnv plugin:
					// https://github.com/zamkevich/Svelte-preprocess-config/blob/master/README.md
					// * Disable "Svelte plugin CSS diagnostics" and install the "PostCSS Language Support" extension in VS Code to prevent false error highlighting:
					// https://www.ryanfiller.com/blog/tips/svelte-postcss-syntax-highlighting
					postcssPresetEnv({
						stage: 0,
						features: {
							"nesting-rules": true
						},
						browsers: "last 2 versions",
            importFrom: "src/assets/styles/media-queries.css",
					})
				]
			}
		}),
		mdsvex(mdsvexConfig)
	],

	kit: {
		adapter: adapterAuto(),

		vite: () => ({
			server: {
				fs: {
					allow: ["package"]
				}
			},

      define: {
        "__APP_VERSION__": JSON.stringify(process.env.npm_package_version),
      },
		}),
	}
};

export default config;
