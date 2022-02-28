<div align="center">
    <img src="fanny-pack.svg" alt="fanny pack" width="512" /><br>
</div>

---

# IMPORTANT
*This is a work in progress and is not ready for production yet.*

---

# Fanny Pack Component Library (fpcl)
Themable component library designed for responsiveness. The components are built with and for SvelteKit. 

This is not a UI kit or UI framework because we do not provide layout elements. Instead, we let you layout your pages the way you want and then you can throw whatever components you need into your pages.

The default styling based on Semantic UI.

---

# Install
These instructions will show you how to enable the theme for the components and customize the theme to meet your needs.


## Install @iconify/svelte
Some of the components use icons from Iconify's Svelte package, so you will need to install Iconify:

```
npm install --save-dev @iconify/svelte
```


## Create an alias for the `src` directory
In your `svelte.config.js` file add this code:

```js
// __dirname is not available in ES modules: https://nodejs.org/api/esm.html#esm_no_filename_or_dirname
// This issue has a fix: https://github.com/nodejs/help/issues/2907
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
...

const config = {
  ...

  kit: {
    ...

    vite: {
      resolve: {
        alias: {
          $: path.resolve(__dirname, "/src"),
        },
      },
    },
  }
}
```

And in your `tsconfig.json` file add this path to the `"paths"` property:

```json
"paths": {
  "$/*": ["src/*"],
  ...
}
```

For more information about aliases, see https://dev.to/danawoodman/how-to-add-module-import-aliases-in-sveltekit-2ck.


## CSS Variables & Utility Classes
When you install and import the components into your app, the components will not have a theme (i.e. colors, fonts) by default. The CSS theme is created mostly with native CSS variables, which allows a lot of flexibility in how you can enable the CSS theme for your components. These are a few different ways to add the `fpcl-theme.css` and `fpcl-utils.css` files to your app, this is my preferred way:

Create the following files inside a `/src/assets/styles` directory:

* `main.css`
* `fpcl-theme.css`
* `fpcl-utils.css`

Copy all the code from this package's `fpcl-theme.css` file into the `/src/assets/styles/fpcl-theme.css` file. Do the same thing with this package's `fpcl-utils.css` file and the `/src/assets/styles/fpcl-utils.css` file. Then import all of your CSS files from your `/src/assets/styles` folder into the `/src/assets/styles/main.css` file. That might look something like this:

```css
@import "normalize.css";
@import "fonts.css";
@import "theme.css";
@import "fpcl-theme.css";
@import "base.css";
@import "utils.css";
@import "fpcl-utils.css";
```

Then import the `/src/assets/styles/main.css` file into the `<style>` tag of the `/src/routes/__layout.svelte` file. That import would look like this:

```html
<style>
  @import "/src/assets/styles/main.css";
</style>
```

The default theme should now be enabled when you start your app and you should have some utility functions available to you as well. Now you can edit the variables to create the theme you want. Read the notes at the top of the `fpcl-theme.css` file for details.

IMPORTANT: If you change any settings that are set in pixels (e.g. `--fpcl-select-small-padding: 0px;`), then remember to keep the `px` suffix because some CSS rules use the `calc()` function and they expect a `px` suffix. For example, this will work: `--fpcl-select-small-padding: 0px;`, but this will break your style setting: `--fpcl-select-small-padding: 0;`.


## JavaScript Variables
Create a `/src/theme.ts` file and copy all the code from the `fpcl` package's `theme.js` file into your `/src/theme.ts` file. The components are already referencing the `/src/theme.ts` file using the alias `$/theme`, so you should be ready to go.

You can now edit any of the variables in the `/src/theme.ts` file. The values should come from [Iconify](https://icon-sets.iconify.design/). When you search for an icon and then select it, you will see a field to the right of your selected icon that is labelled "Selected icon". Copy the value from that field and replace the variable that you want to customize in your `/src/theme.ts` file.

NOTE: After selecting your icon, if you scroll down you will see a code example like this:
```html
<span class="iconify" data-icon="mdi:account"></span>
```
The "Selected icon" field should also match the `data-icon` property of that code example.
