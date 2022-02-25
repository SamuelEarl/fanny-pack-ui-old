# TODOS
1. Should I create documentation similar to what I have done at the top of the Select.svelte component with the Example Usage and descriptions of each prop/slot? This will definitely be easier to create and maintain than a data table.
2. I need to package this up as an npm package and see if I can import it into Tremain Academy to make sure that these components work and that I am creating them correctly.
3. Finish organizing the theme variables in the `/lib/jacl-theme.css` file.
4. Create the components and associated tests. See "How to develop new components or edit existing components" in the README.

* Figure out how to customize/edit fonts after the component library has been installed. This question asks the same thing: https://dev.to/kevinccbsg/comment/jgpk. I need to explore how this would work. Maybe I would define fonts style rules in the `jacl-utils.css` file. I then need to update all styles that reference either "font-family" or "font-stack".
