// This config was borrowed from here https://stackoverflow.com/a/70711383/9453009 and the Vite docs (https://main.vitejs.dev/config/#using-environment-variables-in-config).

import path from "path";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, loadEnv } from "vite";

/** @type {import("vite").UserConfig} */
export default defineConfig(({ command, mode }) => {
  // Extend "process.env" to include all variables from the root ".env" file (including any `.env.production` or `.env.development" files - see https://main.vitejs.dev/guide/env-and-mode.html#env-files) and the "/fp-env-vars/.env" file.
  // Note that this does not affect the security features in SvelteKit's `$env/dynamic/private` module (https://kit.svelte.dev/docs/modules#$env-dynamic-private). In other words, SvelteKit will still throw an error if you try to import private environment variables into client-side code.
  process.env = {
    ...process.env,
    // This is Vite's default config, which will load the env vars from the root .env file.
    ...loadEnv(mode, process.cwd(), ""), 
    // Extend "process.env" by loading the Fanny Pack UI env vars.
    // ...loadEnv(mode, path.resolve(process.cwd(), "fp-env-vars"), "")
    ...loadEnv(mode, path.resolve(process.cwd(), "src/lib"), "")
  };
  return {
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
});


// ===================== Old Configs =====================
// TODO: This code can be deleted after I have been able
// to test the environment variables in the components.
// =======================================================
// import { sveltekit } from "@sveltejs/kit/vite";

// /** @type {import("vite").UserConfig} */
// const config = {
// 	plugins: [sveltekit()],

//   server: {
//     port: 5000,

//     fs: {
//       allow: ["package"]
//     },
//   },

//   define: {
//     "__APP_VERSION__": JSON.stringify(process.env.npm_package_version),
//   },

//   // TODO: Remove this setting if I decide not to use a downloadable `theme.css` file.
//   // // If the files are minified during build, then the downloadable `theme.css` file will be compressed and unreadable.
//   // build: {
//   //   minify: false,
//   // },
// };

// export default config;
