# SvelteKit Component Library (SCL)
* Start here and follow these setup instructions: [Integrating Storybook with SvelteKit](https://codingcat.dev/tutorial/integrating-storybook-with-sveltekit)
* Read this to learn more about Storybook and how to use it with Svelte: [Build your own component library with SvelteKit](https://blog.logrocket.com/build-your-own-component-library-svelte/)

Other helpful guides for building component libraries:
* [The Ultimate Guide to Building a UI Component Library](https://www.telerik.com/blogs/ultimate-guide-to-building-ui-component-library-part-1-plan)
* [Case Study: Building a Component Library](https://dev.to/kathryngrayson/case-study-building-a-component-library-e90#installing)
* [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

---

# How to develop new components or edit existing components
I should create the components first inside the `/src/lib` directory (which is where a component library would need to be created) and then try those components on a page in the `/src/routes` directory to make sure that the components work properly in a regular Svelte app. (Storybook doesn't support everything that Svelte does right now, so I want to make sure that the reusable components that are created will actually work properly in a Svelte app.) Then, for documentation purposes and to give other developers the ability to try out different variations of the components, I will create Storybook stories in the `/src/stories` directory.

---

# TODOS
* How to customize/edit fonts after the component library has been installed. This question asks the same thing: https://dev.to/kevinccbsg/comment/jgpk. I need to explore how this would work.

---

# How to publish and share your components in Storybook
See https://storybook.js.org/docs/svelte/sharing/publish-storybook

---

# How to enable the theme for the components and customize it

## CSS Variables
When you install and import the SCL components into your app, the components will not have a theme (i.e. colors, fonts) by default. The CSS theme is created mostly with native CSS variables, which allows a lot of flexibility in how you can enable the CSS theme for your components. This is one way:

Create a `/static/theme.css` file and copy all the code from the `scl` package's `theme.css` file into the `/static/theme.css` file. Then import the `/static/theme.css` file into the `<style>` tag of the `/src/routes/__layout.svelte` file. That import would look like this:

```html
<style>
  @import "/static/theme.css";
</style>
```

The default theme should now be enabled when you start your app. Now you can edit the variables to create the theme you want. Read the notes at the top of the `theme.css` file for details.

## JavaScript Variables
Create a `/static/theme.js` file and copy all the code from the `scl` package's `theme.js` file into the `/static/theme.js` file. The components are already referencing the `/static/theme.js` file, so you should be ready to go.

You can now edit any of the variables in the `/static/theme.js` file. The values should come from [Iconify](https://icon-sets.iconify.design/). When you search for an icon and then select it, you will see a field to the right of your selected icon that is labelled "Selected icon". The value in that field is what you will copy and paste into your `theme.js` values. 

NOTE: After selecting your icon, if you scroll down you will see a code example like this:
```html
<span class="iconify" data-icon="mdi:account"></span>
```
The "Selected icon" field should also match the `data-icon` property of that code example.

TODO: Test this in a separate app to find out if this will work without installing the `@iconify/svelte` package or if the user needs to install that package also.

---

# How to get Storybook to use the project's CSS variables
You can import a CSS file at the top of the `.storybook/preview.js` file:

```js
import "../src/lib/theme.css";

// ... rest of the settings
```

This way it will be available across all pages in your Storybook.

*https://stackoverflow.com/a/70203687*

---

# How to package and publish the component library to npm

## Step 1: Turn your component library into an npm package
Install the `svelte2tsx` package:

```
npm install --save-dev svelte2tsx
```

Then run the following from the root of the project:

```
npm run package
```

This command will take all the files that are under the `src/lib` folder and make them available as a package. This command generates a new directory called `package` at the root of your project, and inside this, you will notice that there is a new `package.json` file. This file consists of an attribute called `exports`, which consists of all the paths or entry points to the individual components that we have developed.

*https://blog.logrocket.com/build-your-own-component-library-svelte/*


## Step 2: Organize your components so they can be imported easily
Inside of the `src/lib` folder, create a folder for each component. Inside of each of those folders create an `index.js` file that exports the component, like this:

```
export { default as Button } from "./Button.svelte";
```

Now create an `index.js` file directly inside of the `src/lib` folder. That `index.js` file should re-export each component, like this:

```
export { Button } from "./Button";
```

To see an example of this component exporting and re-exporting, look at the `carbon-components-svelte` GitHub repo: https://github.com/carbon-design-system/carbon-components-svelte/tree/master/src.

*https://blog.logrocket.com/build-your-own-component-library-svelte/*


## Step 3: Publish to npm
In order to distribute this package to other developers and allow them to install it as an npm package you need to publish it to npm. Make sure that you have already To publish this as an npm module run the following command from inside the directory that contains your `package.json` file:

```
npm publish ./package
```

NOTE: You have to make sure that the package name and package version combination don't exist already; if so, the package will not be published on npm.

*https://blog.logrocket.com/build-your-own-component-library-svelte/*


# Step 4: When necessary, update to the latest version from the global npm registry
If you have installed this SvelteKit component library from the global npm registry, then all you need to do to get the latest version is run the following inside the directory that contains your `package.json` file:

```
npm update "scl"
```

* *https://docs.npmjs.com/updating-packages-downloaded-from-the-registry*
* *https://docs.npmjs.com/cli/v8/commands/npm-update*

---

# How to import the components into the "example" app in this repo

## Step 1: Turn your component library into a package
Follow steps 1 and 2 under the heading "How to package and publish this component library to npm".

You can then either publish this package to npm and install it from there (above - this is good for distributing the component library to other developers to use in their projects), or you can install the local `package` directory as a package in your `package.json` file (below - this is good for locally developing the component library).


## Step 2: Allow Vite to serve files from the `package` folder
Vite will not serve files from the `package` folder by default. If you try to use your components in a `src/routes` file, then you will see the following error:

```
The request url "/path/to/files" is outside of Vite serving allow list.
```

To fix this problem, open the `svelte.config.js` file, add the following `vite.server.fs.allow` config:

```
kit: {
  ...

  vite: () => ({
    server: {
      fs: {
        allow: [
          "package"
        ]
      }
    }
  }),
},
```

See:
* https://vitejs.dev/config/#server-fs-allow
* https://github.com/sveltejs/kit/issues/2701


## Step 3: Install your local library/package and import components
In order to use your components in the example app (i.e. the example component app inside the `src/routes` directory), you will have to install them. From the project root directoy run the following command:

```
npm install --save-dev ./package
```

When you use `npm install` you almost always want to install npm packages from the global npm registry. For example, `npm install --save-dev svelte` tells npm to look for a package named "svelte" in its registry, and to install it into your application.

However, npm can also install local packages (aka a directory on your local machine that has a `package.json` file in it), and you can do so by passing npm a path to the directory to install. So in this case, `npm install --save-dev ./package` tells npm to install the package in the `package` directory in your demo app.

If you open your demo application's `package.json` file, you'll see a new `devDependency` for "scl" that looks like this:

```
"scl": "file:package",
```

This is a link that gives you the ability to use your components in your example app. This is how you would import a component into a `.svelte` file in the example app:

```
import { Button } from "scl";
```

*https://www.telerik.com/blogs/ultimate-guide-to-building-ui-component-library-part-2-environment*


## Step 4: Develop and edit components and update to the latest version from your local `package` directory
Since you have already installed the local `scl` library as a package, the link has been established from the files in the `package` folder to the `package.json` file. So now when you create any new components or update any existing components, all you need to do to get those updates is run the `npm run package` command to rebuild the `scl` library into a package. The link in the `package.json` file will simply reference the latest version of your library/package. And you can keep building/updating your components and then running `npm run package`.
