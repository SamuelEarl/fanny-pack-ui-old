# TODOS
NOTE: Maybe I could look at how to theme the Carbon components rather than create my own component library. Actually, I don't think I could contribute themable components to that project because that project is based on the Carbon Design System and I want to create components that can be themed to fit other design systems. But maybe I could base my components off of the Carbon components for Svelte, so I could see how they create their components and use some of their ideas.



NEXT TODO: Remove the old "fpcl" package from "insightfull-web" and "financial-wreck-sveltekit". Install the new `@fanny-pack-ui/svelte-kit` package. Update the CSS files and `<style>` tags with the newly named variables.



* Look at my TODOS in the `get-started.svelte.md` file. I need to test the Get Started instructions in a new app and import the components into that new app.
* Convert these components to TypeScript.
* I need to test this: (1) Install this library into a test app. (2) Customize the theme in that app following the instructions from the README. (3) Improve the documentation in the README, if necessary. 
* Should I create documentation similar to what I have done at the top of the Select.svelte component with the Example Usage and descriptions of each prop/slot? This will definitely be easier to create and maintain than a data table.
    * UPDATE: Mimic the docs from Carbon Components Svelte (https://carbon-components-svelte.onrender.com/) and maybe from Semantic UI.
* Finish organizing the theme variables in the `/lib/fpui-theme.css` file.
* Create the components and associated tests. See "How to develop new components or edit existing components" in the README.
* Create fallback colors for each CSS variable in the components.
* Figure out how to customize/edit fonts after the component library has been installed.
    * I think I would let users define the fonts they want in their `theme.css` file and they would install those fonts themselves. The components would inherit the fonts that the user had defined. See the `example-theme.css` file for an example.
    * This question asks the same thing: https://dev.to/kevinccbsg/comment/jgpk. I need to explore how this would work. Maybe I would define fonts style rules in the `fpui-utils.css` file. I then need to update all styles that reference either "font-family" or "font-stack".
* Document the media queries and how to use them. The `media-queries.css` file has some examples that I could use in the documentation.


## Button Component
* Write more tests.
* Read over the documentation to make sure that I have covered everything.

## Checkbox
* Add usability attributes and features. See the `<SelectMulti>` component for some notes and possible attributes that I could use.
* Create documentation.

## Checkbox Group
* Add usability attributes and features. See the `<SelectMulti>` component for some notes and possible attributes that I could use.

## Date Picker
* Write tests.
    * NOTE: The `input type=date` element does not have any ARIA roles (see https://www.w3.org/TR/html-aria/#docconformance), so there is no reason to try to stick with a native date input element.
* Look at https://fluent-svelte.vercel.app/docs/components/calendarview from some other feature ideas.
* I haven't been able to figure out how to get the `locale` prop to work. I would like to document that in my documentation after I get it figured out.
* Implement the `size` prop in the `Calendar` component and increase or decrease the font sizes based on the `size` prop. The fonts will probably be smaller than 1rem, but I do want to increase or decrease the font-sizes in relation the the `size` prop.

## Input (currency)
* Write tests.

## Input (email, text)
* Add documentation for the email input.

## Modal
* Add responsive designs for small and large viewports.
* Look at https://semantic-ui.com/modules/modal.html for some additional features that I should add.
    * Add scrolling content.
* Add more custom style options.

## Select (multi)
* Test the tooltip to see if it works (i.e. got imported correctly) in production. If it does not work, then I probably need to look at how I am importing it into the `<SelectMulti>` component.

## Select (single)
* Write tests. I will be able to verify if the roles work with the `getByRole()` selector.
* On the "Button" doc page, there are multiple select boxes. If I click on one, it will open up. Then if I click on another without explicitly closing the first, then they will both stay open. So I need to figure out how to close the first select box in that scenario.
* Clean up old code and documentation that no longer applies or that is commented out.
    * There is a TODO in the Select.svelte component that I need to verify. In particular I need to test the part about a user previously selecting an option and saving it to the database.

## Tooltip
* Expose the `tooltipText` prop for every component that includes the `<Label>` component. See the MultiSelect component for an example.
    * Make sure to document the `tooltipText` prop for each component. Also mention that the default `labelTooltipIcon` can be changed in the `fpui-theme.ts` file.
* Remove the old code that is not related to the Tippy.js version of the tooltip.
* Manually test this component and write automated tests.
