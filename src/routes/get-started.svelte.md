# Get Started

---

# Install
These instructions will show you how to install Fanny Pack and configure it to use a customized theme that matches your app.


## Step 1: Install Fanny Pack Component Library
```
npm install --save-dev fpcl
```


## Step 2: Install @iconify/svelte
Some of the components use icons from Iconify's Svelte package, so you will need to install Iconify:

```
npm install --save-dev @iconify/svelte
```


## Step 3: Enable CSS Variables & Utility Classes
When you install and import the components into your app, the components will not have a theme (i.e. colors, fonts) by default. The CSS theme is created mostly with native CSS variables, which allows a lot of flexibility in how you can enable the CSS theme for your components, but this is my preferred way:

Create the following files inside a `/src/assets/styles` directory:

* `main.css`
* `theme.css`
* `fpcl-theme.css`
* `fpcl-theme-overrides.css`
* `fpcl-utils.css`

Copy all the code from this package's `fpcl-theme.css` file into the `/src/assets/styles/fpcl-theme.css` file. Do the same thing with this package's `fpcl-utils.css` file and the `/src/assets/styles/fpcl-utils.css` file.

You can customize the theme for the Fanny Pack components in the `fpcl-theme-overrides.css` file. 
1. Create your own theme in the `theme.css` file. You can refer to the `example-theme.css` file in the `fpcl` package's folder for some ideas.
2. In the `fpcl-theme.css` file, copy the `Primary, Secondary, Tertiary colors, etc.` block and the `Global Styles` block and paste them into the overrides file. 
3. Adjust the values of the colors and global styles to match your theme. That should handle most of your theme customizations.
4. If you want to customize individual components, then copy the component style blocks that you want to customize from the `fpcl-theme.css` file and paste them in your `fpcl-theme-overrides.css` file and adjust the values to match your theme.

Then open your `/src/assets/styles/main.css` file and import all of your CSS files from your `/src/assets/styles` folder. That might look something like this:

```css
@import "normalize.css";
@import "fonts.css";
@import "theme.css";
@import "fpcl-theme.css";
@import "fpcl-theme-overrides.css";
@import "base.css";
@import "utils.css";
@import "fpcl-utils.css";
```

NOTE: Since CSS styles that are declared later will override styles that are declared earlier, remember that the order of these imports matters. So make sure that `fpcl-theme-overrides.css` is imported after `fpcl-theme.css` and that `fpcl-utils.css` is imported last.

Then import the `/src/assets/styles/main.css` file into the `<style>` tag of the `/src/routes/__layout.svelte` file. That import would look like this:

```html
<style>
  @import "/src/assets/styles/main.css";
</style>
```

The default theme should now be enabled when you start your app and you should have some utility functions available to you as well. Now you can edit the variables to create the theme you want. Read the notes at the top of the `fpcl-theme.css` file for details.

IMPORTANT: If you change any of the CSS variable values that use a length measurement (e.g. 10px, 20%, 0.5rem), then make sure to include the units after the value that you set (e.g. px, %, rem). Some of the CSS rules use the `calc()` function and they require a unit along with the length value in order to work properly. For example, this will work: `--fpcl-select-sm-padding: 0px;`, but this will break your style setting: `--fpcl-select-sm-padding: 0;`.


## Step 4: Enable JavaScript Variables
Create a `/src/theme.ts` file and copy all the code from the `fpcl` package's `theme.js` file into your `/src/theme.ts` file. The components are already referencing the `/src/theme.ts` file, so you should be ready to go.

You can now edit any of the variables in the `/src/theme.ts` file. The values should come from [Iconify](https://icon-sets.iconify.design/). When you search for an icon and then select it, you will see a field to the right of your selected icon that is labelled "Selected icon". Copy the value from that field and replace the variable that you want to customize in your `/src/theme.ts` file.

NOTE: After selecting your icon, if you scroll down you will see a code example like this:
```html
<span class="iconify" data-icon="mdi:account"></span>
```
The "Selected icon" field should also match the `data-icon` property of that code example.

---

## Update `fpcl` to the latest version in your app
If you have installed `fpcl` from the global npm registry, then you can do the following (inside the directory that contains your `package.json` file) to get the latest version in your app:

### See which packages are outdated:
```
npm outdated
```

### Install the `npm-ckeck-updates` package globally:
```
npm install -g npm-check-updates
```

### Update the `fpcl` package:
```
ncu -u fpcl
```
This will upgrade the `fpcl` package version hint in your `package.json` file, so npm can install the updated version in the next step.

### Install the updated version:
```
npm install
```
The package version in your `node_modules` folder should now be updated.


***Source: [Update all the Node.js dependencies to their latest version](https://nodejs.dev/learn/update-all-the-nodejs-dependencies-to-their-latest-version)***