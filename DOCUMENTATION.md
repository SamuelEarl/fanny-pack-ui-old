# Kit Fox Component Library (kitfox) - Components Built with and for SvelteKit
**NOTE: Webpack throws errors with import statements that use aliases like `$`. So I don't think I can use Storybook. Oh, well. I will just create my own interactive documentation using MDSVEX. Webpack is pretty slow and I don't love using apps like Storybook because of the limitations that you run into sometimes, so I prefer to create my own interactive documentation.**


Other helpful guides for building component libraries:
* [The Ultimate Guide to Building a UI Component Library](https://www.telerik.com/blogs/ultimate-guide-to-building-ui-component-library-part-1-plan)
* [Case Study: Building a Component Library](https://dev.to/kathryngrayson/case-study-building-a-component-library-e90#installing)
* [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)

---

# How to develop new components or edit existing components
1. I should create the component first inside the `/src/lib` directory (which is where a component library would need to be created).
2. Then test that component out on a page in the `/src/routes` directory to make sure that the component works properly in a regular SvelteKit app.
3. Write comprehensive tests for the component.
4. Then, for documentation purposes and to give other developers the ability to try out different variations of each component, I will create interactive documentation with controls (similar to what Storybook does) for each component in the `/src/routes` directory.


## Documentation Ideas and Organization
I am referencing https://carbon-components-svelte.onrender.com/ for ideas on how to create this documentation.


## Should I use Svelte's --style-props?
No. Enabling the components to accept style props would (1) make the components unnecessarily complex and (2) that would defeat the purpose of the `kitfox-theme.css` file. The purpose of the `kitfox-theme.css` file is provide a consistent theme throughout the components (and an app) and allowing style props to customize theme settings for a few components would break the theme consistency that the `kitfox-theme.css` file is supposed to provide.

Any components that use style props should be refactored to accept regular props. See the `Button.svelte` component for an example of a component that accepts on regular props.

---

# How to package and publish the component library to npm
Source: https://blog.logrocket.com/build-your-own-component-library-svelte/

## Step 1: Organize your components so they can be imported easily
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


## Step 2: Turn your component library into an npm package
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


## Step 3: Login to npm
Read how to do login here: http://npm.github.io/installation-setup-docs/installing/logging-in-and-out.html


## Step 4: Publish to npm
In order to distribute this package to other developers and allow them to install it as an npm package you need to publish it to npm. To publish this as an npm module run the following command from inside the directory that contains your `package.json` file:

```
npm publish ./package
```

NOTE: You have to make sure that the package name and package version combination don't exist already; if so, the package will not be published on npm.

*https://blog.logrocket.com/build-your-own-component-library-svelte/*


# Step 5: When necessary, update to the latest version from the global npm registry
If you have installed kitfox from the global npm registry, then all you need to do to get the latest version is run the following inside the directory that contains your `package.json` file:

```
npm update "kitfox"
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

If you open your demo application's `package.json` file, you'll see a new `devDependency` for "kitfox" that looks like this:

```
"kitfox": "file:package",
```

This is a link that gives you the ability to use your components in your example app. This is how you would import a component into a `.svelte` file in the example app:

```
import { Button } from "kitfox";
```

*https://www.telerik.com/blogs/ultimate-guide-to-building-ui-component-library-part-2-environment*


## Step 4: Develop and edit components and update to the latest version from your local `package` directory
Since you have already installed the local `kitfox` library as a package, the link has been established from the files in the `package` folder to the `package.json` file. So now when you create any new components or update any existing components, all you need to do to get those updates is run the `npm run package` command to rebuild the `kitfox` library into a package. The link in the `package.json` file will simply reference the latest version of your library/package. And you can keep building/updating your components and then running `npm run package`.

---

# How to add `postcss-preset-env` (for native CSS nesting) and `mdsvex` (for Markdown documentation)
* The `postcss-preset-env` config and notes are below.
* Use `svelte-add` to install `mdsvex`, which will configure everything for you: https://github.com/svelte-add/mdsvex. Then you can create `.svelte.md` files and start creating regular Svelte components with Markdown syntax sprinkled throughout. I like to use Markdown to document code blocks in between opening and closing triple backticks. 
    * NOTE: I think `mdsvex` conflicts with Storybook's MDX installation and throws silent errors, so if you want to install `mdsvex` alongside Storybook then you might run into problems. I would just use the default MDX installation.

```js
// svelte.config.js

import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import postcssPresetEnv from "postcss-preset-env";
// __dirname is not available in ES modules: https://nodejs.org/api/esm.html#esm_no_filename_or_dirname
// This issue has a fix: https://github.com/nodejs/help/issues/2907
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import("@sveltejs/kit").Config} */
const config = {
	extensions: [".svelte", ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: {
				plugins: [
					// * How to configure the postcssPresetEnv plugin:
					// https://github.com/zamkevich/Svelte-preprocess-config/blob/master/README.md
					// * Disable "Svelte plugin CSS diagnostics" and install the "PostCSS Language Support" extension in VS Code to prevent false error highlighting:
					// https://www.ryanfiller.com/blog/tips/svelte-postcss-syntax-highlighting
					postcssPresetEnv({
						stage: 0,
						features: {
							"nesting-rules": true
						},
						browsers: "last 2 versions"
					})
				]
			}
		}),
		mdsvex(mdsvexConfig)
	],

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: "#svelte",

		vite: () => ({
			// Aliases: https://dev.to/danawoodman/how-to-add-module-import-aliases-in-sveltekit-2ck
			resolve: {
				alias: {
					$: path.resolve(__dirname, "/src")
				}
			},

			server: {
				fs: {
					allow: ["package"]
				}
			}
		})
	}
};

export default config;
```