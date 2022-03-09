# TODOS
NOTE: Maybe I could look at how to theme the Carbon components rather than create my own component library. Actually, I don't think I could contribute themable components to that project because that project is based on the Carbon Design System and I want to create components that can be themed to fit other design systems. But maybe I could base my components off of the Carbon components for Svelte, so I could see how they create their components and use some of their ideas.

* I need to test this: (1) Install this library into a test app. (2) Customize the theme in that app following the instructions from the README. (3) Improve the documentation in the README, if necessary. 
* Should I create documentation similar to what I have done at the top of the Select.svelte component with the Example Usage and descriptions of each prop/slot? This will definitely be easier to create and maintain than a data table.
    * UPDATE: Mimic the docs from Carbon Components Svelte (https://carbon-components-svelte.onrender.com/) and maybe from Semantic UI.
* Finish organizing the theme variables in the `/lib/fpcl-theme.css` file.
* Create the components and associated tests. See "How to develop new components or edit existing components" in the README.
* Figure out how to bundle dependencies, like `@iconify/svelte` along with this project when I run `npm run package`. Right now users of this package have to install `@iconify/svelte` separately.
* Create fallback colors for each CSS variable in the components.
* Figure out how to customize/edit fonts after the component library has been installed.
    * I think I would let users define the fonts they want in their `theme.css` file and they would install those fonts themselves. The components would inherit the fonts that the user had defined. See the `example-theme.css` file for an example.
    * This question asks the same thing: https://dev.to/kevinccbsg/comment/jgpk. I need to explore how this would work. Maybe I would define fonts style rules in the `fpcl-utils.css` file. I then need to update all styles that reference either "font-family" or "font-stack".

## Button Component
* Write more tests.
* Read over the documentation to make sure that I have covered everything.

## Input Component
* Start working on this component next.

## Select Component
* Write tests. I will be able to verify if the roles work with the `getByRole()` selector.
* Clean up old code and documentation that no longer applies or that is commented out.
    * There is a TODO in the Select.svelte component that I need to verify. In particular I need to test the part about a user previously selecting an option and saving it to the database.

## Date Picker
* Write tests.
    * NOTE: The `input type=date` element does not have any ARIA roles (see https://www.w3.org/TR/html-aria/#docconformance), so there is no reason to try to stick with a native date input element.
* Look at https://fluent-svelte.vercel.app/docs/components/calendarview from some other feature ideas.
* I haven't been able to figure out how to get the `locale` prop to work. I would like to document that in my documentation after I get it figured out.
