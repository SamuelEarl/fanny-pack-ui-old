import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import("vite").UserConfig} */
const config = {
	plugins: [sveltekit()],

  server: {
    port: 5000,

    fs: {
      allow: ["package"]
    }
  },

  define: {
    "__APP_VERSION__": JSON.stringify(process.env.npm_package_version),
  },
};

export default config;
