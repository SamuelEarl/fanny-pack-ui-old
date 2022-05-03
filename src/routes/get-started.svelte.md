# Get Started

---

# Install
These instructions will show you how to install Fanny Pack and configure it to use a customized theme that matches your app.


## Step 1: Install Fanny Pack UI
```
npm install @fanny-pack-ui/svelte-kit
```

*NOTE: This will also install the `@iconify/svelte` package. So you can use Iconify icons throughout your SvelteKit app. See [Iconify for Svelte](https://docs.iconify.design/icon-components/svelte/) for more details.*


## Step 2: Configure the theme for your app
When you install and import the components into your app, the components will have a default theme that matches this Fanny Pack UI docs site. (NOTE: The fonts that are used in this site will not be included in your app because you have to [install your own fonts](#install-fonts).) The CSS theme is created with native CSS variables, which allows a lot of flexibility in how you can enable the CSS theme for your components, but this is my preferred way:

1. Create the following two files: `/src/assets/styles/theme.css` and `/src/assets/styles/main.css`
2. Copy all the code from the `fpui-theme.css` file in your `node_modules/@fanny-pack-ui/svelte-kit/` directory (note the `.css` file extension) and paste that code into your newly created `theme.css` file.
3. Inside your `theme.css` file, delete the variables in the `Color Palette` object and insert your own color variables.
4. Change any of the other variables *values* in your `theme.css` file to create the theme that you want for your app. (See the comments throughout the `fpui-theme.css` file for instructions and details.)
5. Then open your `/src/assets/styles/main.css` file and import all of your CSS files from your `/src/assets/styles` folder. That might look something like this:

```css
@import "normalize.css";
@import "fonts.css";
@import "theme.css";
@import "base.css";
```

*NOTE: Since CSS styles that are declared later will override styles that are declared earlier, remember that the order of these imports matters.*

Then import the `/src/assets/styles/main.css` file into the `<style>` tag of the `/src/routes/__layout.svelte` file. That import would look like this:

```html
<style>
  @import "/src/assets/styles/main.css";
</style>
```

*NOTE: You can create a `/src/assets/styles/normalize.css` file and copy and paste the code from [Normalize.css](https://necolas.github.io/normalize.css/) into it. The `fonts.css` and `base.css` files are explained below.*

Your theme should now be enabled when you start your app and you should have some CSS variables and utility classes available to you as well. As you see the components with the theme that you created, you might decide to change some of your variable values. Feel free to change your CSS variable values following the instructions inside your `theme.css` file.


## Step 3: Configure Media Queries
1. Create a `/src/assets/styles/media-queries.css` file.
2. Copy the code from this package's `fpui-media-queries.css` file and paste it into your `/src/assets/styles/media-queries.css` file.
3. It is recommended to leave the `@custom-media` variable definitions as they are defined in the `fpui-media-queries.css` file. However, if you really need to change any of the `@custom-media` queries, then make sure that you only change the pixel values. If you change any of the variable names or the `min-width` or `max-width` properties, then the component styles could break.
4. Install the `postcss-preset-env` package: `npm install --save-dev postcss-preset-env`
5. Open your `svelte.config.js` file and make the following changes:

Import `postcss-preset-env` at the top of the file:

```js
import postcssPresetEnv from "postcss-preset-env";
```

Change the `preprocess` config to this:

```js
preprocess: [
  preprocess({
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


## Step 4: Configure Native CSS Nesting Rules (Optional)
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


<h2 id="install-fonts">Step 5: Install &amp; Configure Fonts</h2>
The components in this library will inherit the fonts that you define for your app. Here is an easy way to install fonts in your app:

1. Go to [Google Fonts](https://fonts.google.com/) and search for the fonts you want to use.
2. When you select a font there is a button to the right of each font style (e.g. light, normal, bold) that says "Select this style". Select all the fonts that you want for your app. *(You usually only need to select one style of a particular font in order to download the entire font family.)*
3. There will be a panel on the right side of the screen labeled "Selected families". At the bottom of that panel is a button that says "Download all". When you click that button it will download all of the fonts that you selected into a zipped folder.
4. Create a `/src/assets/fonts/` folder. For each font, create a folder inside of the `/src/assets/fonts/` directory and name each folder after the name of the font. For example, the "Source Code Pro" font would have a folder named `source-code-pro`.
5. Unzip/extract the font folders that you downloaded from Google Fonts. When you open the unzipped font folders you should see either a bunch of files with `.ttf` file extensions or a `static` folder. *(You might see some files that have `VariableFont` as part of their name. Those fonts should have a `README` file that might explain more about how the `VariableFonts` can be used. I usually use the static versions because they are better supported right now.)* For each font copy all the static font files (they might be directly inside the font folder that you extracted or in the `static` folder) and paste them into their respective font folder that you created inside `/src/assets/fonts/`.
6. Create a `fonts.css` file inside your `/src/assets/styles` folder. Create an `@font-face` style rule for each of your fonts. For example, this is how an `@font-face` rule might look for the "Source Code Pro" font ([read about `@font-face` rules on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)):

```css
@font-face {
  font-family: "Source Code Pro";
  src: local("SourceCodePro"),
    url("../fonts/source-code-pro/SourceCodePro-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
```
7. In your `theme.css` file, find the `Typography` block and create your own font stacks for your app following the examples that are already there.
8. Create a `/src/assets/styles/base.css` file and define your font styles. You could add style like the following to the top of your `base.css` file, which will set the font styles for your app and the Fanny Pack components in your app:

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
@import "normalize.css";
@import "fonts.css";
@import "theme.css";
@import "base.css";
```


<h2 id="enable-js-vars">Step 6: Configure JavaScript variables for icons</h2>

1. Create a `/src/theme.ts` file.
2. Copy all the code from the `fpui-theme.js` file in your `node_modules/@fanny-pack-ui/svelte-kit/` directory (note the `.js` file extension) and paste that code into your newly created `/src/theme.ts` file.

*NOTE: The components are already referencing the `/src/theme.ts` file, so the values in your `/src/theme.ts` file should work without any additional configurations.*

You can now edit any of the variables in your `/src/theme.ts` file. You can read the instructions in that file to find out how to customize your JavaScript variables.

---

## How to update `@fanny-pack-ui/svelte-kit` to the latest version in your app
If you have installed `@fanny-pack-ui/svelte-kit` from the global npm registry, then you can do the following (inside the directory that contains your `package.json` file) to get the latest version in your app:

### See which packages are outdated:
```
npm outdated
```

### Install the `npm-ckeck-updates` package globally:
```
npm install -g npm-check-updates
```

### Update the `@fanny-pack-ui/svelte-kit` package:
```
ncu -u @fanny-pack-ui/svelte-kit
```
This will upgrade the `@fanny-pack-ui/svelte-kit` package version hint in your `package.json` file, so npm can install the updated version in the next step.

### Install the updated version:
```
npm install
```
The package version in your `node_modules` folder should now be updated.


***Source: [Update all the Node.js dependencies to their latest version](https://nodejs.dev/learn/update-all-the-nodejs-dependencies-to-their-latest-version)***
