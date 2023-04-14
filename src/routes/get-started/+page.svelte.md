# Get Started

---

# Install
These instructions will show you how to install Fanny Pack and configure it to use a customized theme that matches your app.


## Step 1: Install Fanny Pack UI
```
npm install @fanny-pack-ui/svelte-kit
```

*NOTE: This will also install the `@iconify/svelte` package. So you can use Iconify icons throughout your SvelteKit app. See [Iconify for Svelte](https://docs.iconify.design/icon-components/svelte/) for more details.*

<br>

## Step 2: Configure the theme for your app
The CSS theme that you create on the [Customize Theme](/customize-theme) page uses native CSS variables. These variables allow a lot of flexibility in how you can enable the CSS theme for your components, but this is my preferred way:

1. Create a `/src/assets/styles` folder in your SvelteKit project.
2. Open your `node_modules/@fanny-pack-ui/svelte-kit/` directory and copy the following files into your `/src/assets/styles` directory:
    1. `fp-preflight.css` : This contains TailwindCSS's [Preflight](https://tailwindcss.com/docs/preflight) code with a few minor modifications. (You can read the comments at the top of the `fp-preflight.css` file for details of the modifications.) Since Preflight is built on top of [modern-normalize](https://github.com/sindresorhus/modern-normalize), this file is used instead of a normalize CSS file.
    2. `fp-theme.css` : This file contains the CSS variables that make up your theme. Follow the instructions in that file to create your theme. You will update the color palette and any other variable values that feel are necessary.
    3. `fp-utility-classes.css` and the `utility-classes` folder : The `fp-utility-classes.css` file contains utility classes that are used throughout the components and that can be used in your app. Feel free to add more utility classes as needed, but don't change the existing class names otherwise you will break styles in the components. The utility classes are organized in the `utility-classes` folder, so it is important that you copy this folder from `node_modules/@fanny-pack-ui/svelte-kit/` into your `/src/assests/styles` folder.
    4. `fp-base.css` : This file contains default styles for HTML elements. The `fp-preflight.css` file clears many of the default styles for HTML elements, so you need to define default styles for your HTML elements in this file.
    5. `fp-media-queries.css` : This file contains the media queries that are used in the components and that can be used throughout your app.
3. Rename each of those CSS files by removing the `fp-` prefix in each filename.
4. Create a `fonts.css` file inside of your `/src/assets/styles` directory. This file will hold all of your font definitions.
5. Create a `main.css` file inside of your `/src/assets/styles` directory and add the following imports:

```css
@import "preflight.css";
@import "fonts.css";
@import "theme.css";
@import "utility-classes.css";
@import "base.css";
```

*NOTE: CSS styles that are declared later will override styles that are declared earlier, so the order of these imports matters.*

Import the `/src/assets/styles/main.css` file into the `<script>` tag of the `/src/routes/+layout.svelte` file, like this:

```html
<script>
  import "/src/assets/styles/main.css";
</script>
```

<br>

## Step 3: Configure Media Queries

1. Install `svelte-preprocess` and `@csstools/postcss-global-data` as `devDependencies` :<br>`npm install --save-dev svelte-preprocess @csstools/postcss-global-data`
2. Open your `svelte.config.js` file and change the code to match this:

```js
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";
import sveltePreprocess from "svelte-preprocess";
import postcssGlobalData from "@csstools/postcss-global-data";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    sveltePreprocess({
      postcss: {
        plugins: [
          postcssGlobalData({
            files: [
              "src/assets/styles/media-queries.css",
            ],
          }),
        ],
      },
    }),
  ],
  
  kit: {
    adapter: adapter(),
  },
};

export default config;
```

<br>

Now you can use media queries like this throughout your app:

```css
@media (--xs-up) {
  .selector {
    padding: 15px;
  }
}

@media (--m-up) {
  .selector {
    padding: 20px;
  }
}

@media (--xl-min) and (--xl-max) {
  .selector {
    padding: 25px;
  }
}
```

*NOTES:*

* *It is recommended to leave the `@custom-media` variable definitions as they are defined in your `media-queries.css` file. However, if you really need to change any of the `@custom-media` queries, then make sure that you only change the pixel values. If you change any of the variable names or the `min-width` or `max-width` properties, then the component styles could break.*
* *For more details about `@custom-media` rules see [PostCSS Custom Media](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media).*
* *This link provides an example of how to configure the `svelte-preprocess` config: https://github.com/zamkevich/Svelte-preprocess-config/blob/master/README.md.*

<br>

## Step 4: Configure Native CSS Nesting Rules (Optional)

You can use [native CSS nesting](https://kilianvalkhof.com/2021/css-html/css-nesting-specificity-and-you/) by adding the `postcssPresetEnv()` config in your `svelte.config.js` file.

1. Install `postcss-preset-env` as a `devDependencies` package :<br>`npm install --save-dev postcss-preset-env`
2. Update your `svelte.config.js` file to match this:

```js
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";
import sveltePreprocess from "svelte-preprocess";
import postcssGlobalData from "@csstools/postcss-global-data";
import postcssPresetEnv from "postcss-preset-env";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    sveltePreprocess({
      postcss: {
        plugins: [
          postcssGlobalData({
            files: [
              "src/assets/styles/media-queries.css",
            ],
          }),
          postcssPresetEnv({
            stage: 0,
            features: {
              "nesting-rules": true,
            },
            browsers: "last 2 versions",
          }),
        ],
      },
    }),
  ],
  
  kit: {
    adapter: adapter(),
  },
};

export default config;
```

*NOTES:*

* *Configure nesting rules through the `postcss-preset-env` plugin: [PostCSS Preset Env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env)*
* *If you are using VS Code and would like to configure it to provide syntax highlighting for native CSS nesting rules, then in VS Code disable "Svelte plugin CSS diagnostics" and install the "PostCSS Language Support" extension. This will prevent false error highlighting. See [PostCSS Syntax Highlighting with Svelte in VS Code](https://www.ryanfiller.com/blog/tips/svelte-postcss-syntax-highlighting)*

<br>

<h2 id="install-fonts">Step 5: Install &amp; Configure Fonts</h2>

No fonts are included in your theme files. However, the components in this library will inherit the fonts that you define for your app. Here is an easy way to install fonts in your app:

1. Go to [Google Fonts](https://fonts.google.com/) and search for the fonts you want to use.
2. When you select a font there is a button in the top-right of the screen that says "Download family". Click that button.
3. Create a `/src/assets/fonts/` folder in your SvelteKit project. For each font, create a folder inside of the `/src/assets/fonts/` directory and name each folder after the name of the font. For example, the "Source Code Pro" font would have a folder named `source-code-pro`.
4. Unzip/extract the font folders that you downloaded from Google Fonts. When you open the unzipped font folders you should see either a bunch of files with `.ttf` file extensions or a `static` folder. *(You might see some files that have `VariableFont` as part of their name. Those fonts should have a `README` file that might explain more about how the `VariableFonts` can be used. I usually use the static versions because they are better supported right now.)*
5. For each font, copy all the static font files (they might be directly inside the font folder that you extracted or in the `static` folder) and paste them into their respective font folder that you created inside `/src/assets/fonts/`.
6. Open your `/src/assets/styles/fonts.css` file and create an `@font-face` style rule for each of your fonts. For example, this is how an `@font-face` rule might look for the "Source Code Pro" font ([read about `@font-face` rules on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)):

```css
@font-face {
  font-family: "Source Code Pro";
  src: local("SourceCodePro"),
    url("../fonts/source-code-pro/SourceCodePro-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
```

7. In your `theme.css` file, find the `Font Families` variables under the `TYPOGRAPHY` section:

```css
/* TYPOGRAPHY */
:root {
  /* Font Families */
  --sans-serif: Montserrat, "sans-serif";
  --serif: "Bitstream Charter", "serif";
  --cursive: Audiowide, cursive;
  --monospace: "Source Code Pro", "monospace";

  ...
```

There are a few font family variables already defined. You can change the values to match your fonts and even add other font family variables. Note that the font names that are used in the font family variables are taken from the `font-family` properties in your `/src/assets/styles/fonts.css` file.

In your `/src/assets/styles/base.css` file, find all the `font-family` rules and update them to match your font family variables. Feel free to add more `font-family` rules to other elements as needed.

<br>

<h2 id="configure-default-component-settings">Step 6: Configure Default Component Settings</h2>

1. Open your `node_modules/@fanny-pack-ui/svelte-kit/` directory and copy the `fp-defaults.js` file into your `/src` directory.
2. Rename your `src/fp-defaults.js` file to `src/defaults.ts`.
3. Update your `vite.config.ts` file with an alias:

```js
import path from "path";
import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

const config: UserConfig = {
	plugins: [sveltekit()],

  server: {
    port: 5000,
  },

  // This alias is necessary so your app will resolve the following
  // import statements in your Fanny Pack components properly:
  // import { defaults } from "/src/defaults";
  resolve: {
    alias: {
      src: path.resolve("src/"),
    },
  },
};

export default config;
```

You will need to...

1. Add `import path from "path"` at the top of the file.
2. Add `resolve: { alias: ... }` inside the config object.

*Source: https://stackoverflow.com/a/73754976/9453009*

*NOTE: The components are already referencing the `src/defaults.ts` file, so the values in your `src/defaults.ts` file should work without any additional configurations.*

You can now edit any of the variables in your `src/defaults.ts` file. You can read the instructions in that file to find out how to customize your JavaScript variables.

<br>

## Conclusion
Your theme should now be enabled when you start your app. You can use the CSS variables from your `theme.css` file and the utility classes throughout your app. When you use the components with the theme that you created, you might decide to change some of your variable values. Feel free to change your CSS variable values following the instructions inside your `theme.css` file or the default component settings following the instructions inside your `defaults.ts` file.
