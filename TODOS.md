# TODOS
1. Should I create documentation similar to what I have done at the top of the Select.svelte component with the Example Usage and descriptions of each prop/slot? This will definitely be easier to create and maintain than a data table.
2. I need to package this up as an npm package and see if I can import it into Tremain Academy to make sure that these components work and that I am creating them correctly.
    1. Test this in a separate app to find out if this will work without installing the `@iconify/svelte` package or if the user needs to install that package also.
3. Finish organizing the theme variables in the `/lib/kitfox-theme.css` file.
4. Create the components and associated tests. See "How to develop new components or edit existing components" in the README.

* Figure out how to customize/edit fonts after the component library has been installed. This question asks the same thing: https://dev.to/kevinccbsg/comment/jgpk. I need to explore how this would work. Maybe I would define fonts style rules in the `kitfox-utils.css` file. I then need to update all styles that reference either "font-family" or "font-stack".

## Button Component
* For hover states, I was using lighter and darker shades of the primary, secondary, and tertiary colors. However, not all apps have lighter and darker variations of their colors. So I need to refactor the button component to use depth (i.e. box-shadows) instead of shades for hover states. Depth will probably be the easiest way to handle hover states.

## Select Component
* I need to parameterize as many styles as necessary (e.g. colors, padding). I am refactoring this component and removing all style props. Right now there are some `var()` functions that were being used with style props, but I need to remove those and create classes that are based off of props values.
* Test that text does not overlap with the dropdown arrow. However, if it does, that is probably not a problem. The select boxes are 100% width by default. So if the text overlaps with the dropdown arrow, then that is probably more of an issue with the size of the select box's parent element or with the length of the text in the select options. Hmmm.
* Clean up old code and documentation that no longer applies or that is commented out.
* Figure out how to get the select box to be at least as wide as the widest element in the options list. Regular select boxes have `width: auto` by default. When I put the select boxes in the TransactionsBudgetsHeader.svelte component and set them to `display: flex`, then you see what I am talking about. I need to replicate that in the example app here and fix that problem.
