# Get Started

---

# Install
These instructions will show you how to install Fanny Pack and configure it to use a customized theme that matches your app.


## Step 1: Install Fanny Pack UI
```
npm install @fanny-pack-ui/svelte-kit
```

NOTE: This will also install the `@iconify/svelte` package. So you can use Iconify icons throughout your SvelteKit app. See [Iconify for Svelte](https://docs.iconify.design/icon-components/svelte/) for more details.


## Step 2: Create the theme for your app
1. Create a `/src/assets/styles/theme.css` file. 
2. Copy the code from the `theme-template.css` file in the `fpui` package's folder and paste it into your newly created `theme.css` file.
3. Delete the variables in the `Color Palette` object and insert your own color variables.
4. Change any of the other variables throughout your `theme.css` file to create the theme that you want to use throughout your entire app.


## Step 3: Enable CSS Variables & Utility Classes
When you install and import the components into your app, the components will not have a theme (i.e. colors, fonts) by default. The CSS theme is created mostly with native CSS variables, which allows a lot of flexibility in how you can enable the CSS theme for your components, but this is my preferred way:

Create the following files inside a `/src/assets/styles` directory:

* `main.css`
* `theme.css`
* `fpui-theme.css`
* `fpui-utils.css`

Copy all the code from this package's `fpui-theme.css` file into the `/src/assets/styles/fpui-theme.css` file. Do the same thing with this package's `fpui-utils.css` file and the `/src/assets/styles/fpui-utils.css` file.


**TODOS:**
* I need to improve the following instructions and make them more clear. I might need to show some examples to illustrate these steps more clearly. 
* The `font-stack` instructions should go in their own section below and I think they should include this: "The components in this library will inherit the fonts that you define for your app." 
    * However, I need to test this to make sure that these components will inherit the font stack that is defined in the user's app and I need to make sure that the components all look good with any font stack (specifically the sizes of large vs small fonts).
* I Should show a demo of how to create a `theme.css` file and then how to transfer the variables from the `theme.css` file to the `fpui-theme.css` file so the components will also have the same theme.


You can customize the theme for the Fanny Pack components in the `fpui-theme.css` file.
2. In the `fpui-theme.css` file, change the variable **values** (not the variable names) of any of the variables in the `Global Component Styles` block to match the theme in your `theme.css` file. This will cause your components to use the same values that your `theme.css` file has for things like colors (i.e. primary, secondary, tertiary colors), border radius, etc. Updating those variables should handle most of your theme customizations.
3. If you want to customize individual components, then change the variable **values** for any component style blocks that you want to customize.
    1. WARNING: If you customize any of the individual components, then you will risk losing the global theme that is intended to give your app consistent branding throughout all the components.
    2. The button text colors might need to be changed if they do not provide enough contrast against the background colors of your primary, secondary, and/or tertiary buttons.

Then open your `/src/assets/styles/main.css` file and import all of your CSS files from your `/src/assets/styles` folder. That might look something like this:

```css
@import "normalize.css";
@import "fonts.css";
@import "theme.css";
@import "fpui-theme.css";
@import "base.css";
@import "utils.css";
@import "fpui-utils.css";
```

NOTE: Since CSS styles that are declared later will override styles that are declared earlier, remember that the order of these imports matters.

Then import the `/src/assets/styles/main.css` file into the `<style>` tag of the `/src/routes/__layout.svelte` file. That import would look like this:

```html
<style>
  @import "/src/assets/styles/main.css";
</style>
```

The default theme should now be enabled when you start your app and you should have some utility functions available to you as well. Now you can edit the variables to create the theme you want. Read the notes at the top of the `fpui-theme.css` file for details.

**IMPORTANT:** If you change any of the CSS variable values that use a length measurement (e.g. 10px, 20%, 0.5rem), then make sure to include the units after the value that you set (e.g. px, %, rem). Some of the CSS rules use the `calc()` function and they require a unit along with the length value in order to work properly. For example, this will work: `--fpui-border-radius: 5px;`, but this could break some styles: `--fpui-border-radius: 0;`.


## Step 4: Configure Media Queries
* Create a `/src/assets/styles/media-queries.css` file.
* Copy the code from this package's `fpui-media-queries.css` file and paste it into your `/src/assets/styles/media-queries.css` file.
* It is recommended to leave the `@custom-media` variable definitions as they are, but you can change any of the pixel values if you really need to. Just make sure that you change only the pixel values and nothing else otherwise the component styles could break.
* Install `postcss-preset-env`: `npm install --save-dev postcss-preset-env`
* Open your `svelte.config.js` file and make the following changes:

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

FYI: This provides an example of how to configure Svelte preprocess: https://github.com/zamkevich/Svelte-preprocess-config/blob/master/README.md.


## Step 5: Configure Native CSS Nesting Rules (Optional)
You can use [native CSS nesting](https://kilianvalkhof.com/2021/css-html/css-nesting-specificity-and-you/) by updating the `postcssPresetEnv()` config like this:

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

If you are using VS Code and would like to configure it to provide syntax highlighting for native CSS nesting rules, then you can read this post: [PostCSS Syntax Highlighting with Svelte in VS Code](https://www.ryanfiller.com/blog/tips/svelte-postcss-syntax-highlighting)


<h2 id="install-fonts">Step 6: Install Fonts</h2>
TODO: Provide a step-by-step tutorial for how to install fonts, use them in your CSS styles, and make sure those fonts are inherited by these components.


<h2 id="enable-js-vars">Step 7: Enable JavaScript Variables</h2>
Create a `/src/fpui-theme.ts` file and copy all the code from the `fpui` package's `fpui-theme.js` file into your `/src/fpui-theme.ts` file. NOTE: The components are already referencing the `/src/fpui-theme.ts` file, so you should be ready to go.

You can now edit any of the variables in the `/src/fpui-theme.ts` file. The values should come from [Iconify](https://icon-sets.iconify.design/). When you search for an icon and then select it, you will see a field to the right of your selected icon that is labelled "Selected icon". Copy the value from that field and replace the variable that you want to customize in your `/src/fpui-theme.ts` file.

NOTE: After selecting your icon, if you scroll down you will see a code example like this:
```html
<span class="iconify" data-icon="mdi:account"></span>
```
The "Selected icon" field should also match the `data-icon` property of that code example.

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
