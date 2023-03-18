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

## Step 2: Customize your theme
Go to the [Customize Theme](/customize-theme) page and follow the instructions to create your own `theme.css` file. Then come back to this page.

<br>

## Step 3: Configure the theme for your app
The CSS theme that you create on the [Customize Theme](/customize-theme) page uses native CSS variables. These variables allow a lot of flexibility in how you can enable the CSS theme for your components, but this is my preferred way:

1. Create a `/src/assets/styles` folder in your SvelteKit project and create the following files inside of it:
    1. `preflight.css` (This file should hold any utility classes that you want to use in your app.)
    2. `fonts.css` (This file will hold all of your font definitions.)
    3. `theme.css` (This file will hold the CSS variables that make up your theme.)
    4. `utility-classes.css` (This file will hold any utility classes that you want to use in your app.)
    5. `base.css` (Default HTML element styles go in this file. The `preflight.css` file clears some of the default styles for HTML elements, so you need to define default styles for your HTML elements in this file.)
    6. `main.css` (This file will import the other CSS files in your `/src/assets/styles/` folder.)
2. Take the `theme.css` file that you downloaded from the [Customize Theme](/customize-theme) page and place it in the `/src/assets/styles/` folder (next to your `main.css` file).
5. Open your `/src/assets/styles/main.css` file and import all of your CSS files from your `/src/assets/styles` folder. Those imports might look something like this:

```css
@import "preflight.css";
@import "fonts.css";
@import "theme.css";
@import "utility-classes.css";
@import "base.css";
```

*NOTE: Since CSS styles that are declared later will override styles that are declared earlier, remember that the order of these imports matters.*

Then import the `/src/assets/styles/main.css` file into the `<style>` tag of the `/src/routes/+layout.svelte` file. That import would look like this:

```html
<style>
  @import "/src/assets/styles/main.css";
</style>
```

**TODO: I have replaced `normalize.css` with a slightly modified version of Tailwind's `preflight.css`. So I need to update all references to `normalize.css` to use `preflight.css`.**

*NOTE: You can create a `/src/assets/styles/normalize.css` file and copy and paste the code from [Normalize.css](https://necolas.github.io/normalize.css/) into it. The `fonts.css` and `base.css` files are explained below.*

<br>

## Step 4: Configure Media Queries
1. Create a `/src/assets/styles/media-queries.css` file in your SvelteKit project.
2. Open your `node_modules/@fanny-pack-ui/svelte-kit/` directory and copy all the code from the `fpui-media-queries.css` file and paste it into your `/src/assets/styles/media-queries.css` file.
3. It is recommended to leave the `@custom-media` variable definitions as they are defined in the `fpui-media-queries.css` file. However, if you really need to change any of the `@custom-media` queries, then make sure that you only change the pixel values. If you change any of the variable names or the `min-width` or `max-width` properties, then the component styles could break.
4. Install the `postcss-preset-env` package: `npm install --save-dev postcss-preset-env`
5. Open your `svelte.config.js` file and make the following changes:

<br>

Change this import statement

```js
import preprocess from "svelte-preprocess";
``` 

to this:

```js
import sveltePreprocess from "svelte-preprocess";
```

<br>

Import `postcss-preset-env` at the top of the file:

```js
import postcssPresetEnv from "postcss-preset-env";
```

Change the `preprocess` config to this:

```js
preprocess: [
  sveltePreprocess({
    postcss: {
      plugins: [
        postcssPresetEnv({
          importFrom: "src/assets/styles/media-queries.css",
        })
      ]
    }
  }), 
],
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

For more details about `@custom-media` rules see https://github.com/postcss/postcss-custom-media.

FYI: This provides an example of how to configure the Svelte `preprocess` config: https://github.com/zamkevich/Svelte-preprocess-config/blob/master/README.md.

<br>

## Step 5: Configure Native CSS Nesting Rules (Optional)
You can use [native CSS nesting](https://kilianvalkhof.com/2021/css-html/css-nesting-specificity-and-you/) by updating the `postcssPresetEnv()` config in your `svelte.config.js` file like this:

```js
preprocess: [
  preprocess({
    postcss: {
      plugins: [
        postcssPresetEnv({
          stage: 0,
          features: {
            "nesting-rules": true,
          },
          browsers: "last 2 versions",
          importFrom: "src/assets/styles/media-queries.css",
        })
      ]
    }
  }), 
],
```

If you are using VS Code and would like to configure it to provide syntax highlighting for native CSS nesting rules, then read this post: [PostCSS Syntax Highlighting with Svelte in VS Code](https://www.ryanfiller.com/blog/tips/svelte-postcss-syntax-highlighting)

<br>

<h2 id="install-fonts">Step 5: Install &amp; Configure Fonts</h2>

When you [customize your theme](/customize-theme) no fonts are included in your `theme.css` file. However, the components in this library will inherit the fonts that you define for your app. Here is an easy way to install fonts in your app:

1. Go to [Google Fonts](https://fonts.google.com/) and search for the fonts you want to use.
2. When you select a font there is a button in the top-right of the screen that says "Download family". Click that button.
3. Create a `/src/assets/fonts/` folder in your SvelteKit project. For each font, create a folder inside of the `/src/assets/fonts/` directory and name each folder after the name of the font. For example, the "Source Code Pro" font would have a folder named `source-code-pro`.
4. Unzip/extract the font folders that you downloaded from Google Fonts. When you open the unzipped font folders you should see either a bunch of files with `.ttf` file extensions or a `static` folder. *(You might see some files that have `VariableFont` as part of their name. Those fonts should have a `README` file that might explain more about how the `VariableFonts` can be used. I usually use the static versions because they are better supported right now.)* For each font, copy all the static font files (they might be directly inside the font folder that you extracted or in the `static` folder) and paste them into their respective font folder that you created inside `/src/assets/fonts/`.
5. Create a `fonts.css` file inside your `/src/assets/styles` folder. Create an `@font-face` style rule for each of your fonts. For example, this is how an `@font-face` rule might look for the "Source Code Pro" font ([read about `@font-face` rules on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)):

```css
@font-face {
  font-family: "Source Code Pro";
  src: local("SourceCodePro"),
    url("../fonts/source-code-pro/SourceCodePro-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
```

6. In your `utility-classes.css` file, create a `Typography` block and create your own font stack variables, which would look like this:

```css
/*************
  Typography
**************/
:root {
  --serif-font-stack: "Playfair Display", serif;
  --sans-serif-font-stack: "Inter", sans-serif;
  --mono-font-stack: "Source Code Pro", monospace;
}
```

7. Create a `/src/assets/styles/base.css` file and define your font styles. You could add styles like the following to the top of your `base.css` file, which will set the font styles for both your app and the Fanny Pack components that you use in your app:

```css
/* 
  base.css
  * General HTML element styles go in this file. 
  * These form the base styles that can be modified in your .svelte files. 
*/

html, body {
  font-size: var(--font-size-base, 16px);
  font-family: var(--sans-serif-font-stack);
  color: var(--text-color);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--cursive-font-stack);
  font-weight: normal;
}
```

9. Import your `fonts.css` and `base.css` files into your `/src/assets/styles/main.css` file. Your `/src/assets/styles/main.css` file might look something like this:

```css
@import "preflight.css";
@import "fonts.css";
@import "theme.css";
@import "utility-classes.css";
@import "base.css";
```

<br>

<h2 id="configure-js-vars">Step 6: Configure JavaScript variables</h2>

1. Create a `/src/theme.ts` file in your SvelteKit project.
2. Open your `node_modules/@fanny-pack-ui/svelte-kit/` directory and copy all the code from the `fpui-theme.js` file (note the `.js` file extension) and paste that code into your newly created `/src/theme.ts` file.

*NOTE: The components are already referencing the `/src/theme.ts` file, so the values in your `/src/theme.ts` file should work without any additional configurations.*

You can now edit any of the variables in your `/src/theme.ts` file. You can read the instructions in that file to find out how to customize your JavaScript variables.

<br>

## Conclusion
Your theme should now be enabled when you start your app and you should have some CSS variables and utility classes available for you to use, which are all found in your `theme.css` file. When you use the components with the theme that you created, you might decide to change some of your variable values. Feel free to change your CSS variable values following the instructions inside your `theme.css` file or your JavaScript variable values following the instructions inside your `theme.ts` file.
