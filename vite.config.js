import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import("vite").UserConfig} */
const config = {
	plugins: [sveltekit()],

  server: {
    port: 5000,

    fs: {
      allow: ["package"]
    },
  },

  define: {
    "__APP_VERSION__": JSON.stringify(process.env.npm_package_version),
  },

  // TODO: Remove this setting if I decide not to use a downloadable `theme.css` file.
  // // If the files are minified during build, then the downloadable `theme.css` file will be compressed and unreadable.
  // build: {
  //   minify: false,
  // },
};

export default config;
