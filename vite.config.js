// import path from "path";
import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import("vite").UserConfig} */
const config = {
	plugins: [sveltekit()],

  server: {
    port: 5000,

    fs: {
      allow: ["package"]
    },

    // resolve: {
    //   alias: {
    //     src: path.resolve("src/"),
    //   },
    // },
  },

  define: {
    "__APP_VERSION__": JSON.stringify(process.env.npm_package_version),
  },

  // If the files are minified during build, then the downloadable `theme.css` file will be compressed and unreadable.
  build: {
    minify: false,
  },
};

export default config;
