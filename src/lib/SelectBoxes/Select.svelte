<!--
  Example Usage:

  <Select
    optionsArray={columnHeaders}  
    arrayType="string"
    bind:selectedOption={selectedColumn}
    emptyValueDisplayText="-- Select a column from your dataset --"
    defaultValue="avg"
    on:change={() => eventHandler(arg1, arg2, arg3)}
    --width="90%"
    --padding-vertical="5px"
    --padding-horizontal="15px"
    --padding-arrow="40px"
    --border-color="blue"
    --background-color="white"
    --color="blue"
  />

  <script>
    let columnHeaders = [];
    let selectedColumn = "";
  </script>


  Documentation about props:
  1. optionsArray: This should be an array of strings or objects. The type of array should match the value passed to the `arrayType` prop. This array will be used to populate the <option> elements in the select box.

  2. arrayType: If the data that this select box is displaying is an array of strings, then set this to "string". If it is an array of objects, then set this to "object". The default is "string". NOTE: Each object inside the object array should have this structure:
    [{ value: "valueToBePassedToTheBackend", label: "Label displayed in the select box" }]

  3. bind:selectedOption={stringVariable}: The option that the user selects in the UI will be bound to the <select> element and then passed to the backend when the form is submitted. You need to have a string variable defined in the component where this <Select> component is imported and that string variable needs to be bound to the <Select> component with `bind:selectedOption={stringVariable}`.

  4. emptyValueDisplayText (optional): This prop allows you to set the text that is displayed in this component's "empty value" option. If you do not pass set this prop, then no "empty value" option will be displayed.

  5. defaultValue (optional): This is the value (from the array that is assigned to `optionsArray`) that you want to set as the default value for the select box. For "object" arrays, this should be the value of the `value` property. If you don't set this prop then it defaults to the empty string option.

  6. on:change (optional): If you want to call an event handler when the change event is fired, then you can add this prop and call your event handler.

  7. --width="90%" (options): This uses Svelte's --style-props feature. See https://svelte.dev/docs#style_props. Default is auto, which will fill the full width of it's parent element.

  8. --padding-vertical="5px" (optional): See number 7. Set a larger vertical padding. Defaults to 7px.
   
  9. --padding-horizontal="15px" (optional): See number 7. Set a larger horizontal padding. Defaults to 10px.
  
  10. --padding-arrow="40px" (optional): See number 7. Give the drop-down arrow more space away from the options text. Defaults to 30px.

  11. --border-color="blue" (optional): See number 7. This style prop will change the color of the border. Default is --gray-medium.

  12. --background-color="white" (optional): See number 7. This style prop will change the background color of the select element. Default is white.

  13. --color="blue" (optional): See number 7. This style prop will change the text color in the select box (including the down arrow) and the color in the select box drop-down. Default is black.
-->


<div class="select-wrapper">
  <!-- The `on:change` attribute is called "event forwarding" in Svelte. This will pass all change events to the <Select> components and then you can do whatever you need to when the change event happens. -->
  <select bind:value={selectedOption} on:change>
    {#if emptyValueDisplayText}
      <option value="">{emptyValueDisplayText}</option>
    {/if}
    {#if arrayType === "string" || arrayType === "number"}
      {#each optionsArray as item}
        <option value={item}>{item}</option>
      {/each}
    {/if}
    {#if arrayType === "object"}
      {#each optionsArray as obj}
        <option value={obj.value}>{obj.label}</option>
      {/each}
    {/if}
  </select>
</div>

<script lang="ts">
  export let optionsArray;
  export let arrayType = "string";
  export let selectedOption;
  export let emptyValueDisplayText = "";
  export let defaultValue = "";

  // When working with plain HTML <select> elements, you set the default value with the `selected` attribute. In Svelte you set the default value by setting the `selectedOption` variable (in `<select bind:value={selectedOption}>`) to equal the value from the `optionsArray` that you want to be the default value.
  // The default value of this <Select> component is an empty string. However, if the user sets the `defaultValue` prop to a value other than the empty string, then the `selectedOption` needs to be set as that `defaultValue` so the `defaultValue` will be displayed in the UI.
  // Also, if a user has previously selected an option and saved it to the database, then that selected option will be passed into this component as the `selectedOption` prop and that `selectedOption` prop will set the value that is displayed in the UI. So, if the `selectedOption` has already been set by the user (which means that it will get passed into this component), then do not set the `selectedOption` prop/variable to the `defaultValue`.
  if (!selectedOption) {
    selectedOption = defaultValue;
  }
</script>

<style>
  /**************************************************
   * Select Element Styles
   * Resets: https://moderncss.dev/custom-select-styles-with-pure-css/
   * Styles: https://stackoverflow.com/questions/31531865/css-change-dropdown-arrow-to-unicode-triangle
  **************************************************/
  .select-wrapper {
    width: var(--width, auto);
    overflow: hidden;
    position: relative;
    border-radius: var(--global-radius);
    border: 1px solid var(--border-color, var(--gray-medium));
    /* box-shadow: 1px 1px 1px var(--gray-medium); */
    &:after {
      /* The HTML entity in the content rule uses the "&rsaquo;" entity.
      https://dev.w3.org/html5/html-author/charref */
      /* content: "›";
      transform: rotate(90deg);
      font-size: 2rem;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      color: var(--color, black);
      pointer-events: none; */

      content: "›";
      transform: rotate(90deg);
      font-size: 1.5rem;
      height: 100%;
      position: absolute;
      /* Give a 10px padding after the dropdown arrow icon. */
      right: 10px;
      bottom: 0;
      color: var(--color, black);
      pointer-events: none;

      /* position: absolute;
      content: "";
      top: 14px;
      right: 10px;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-color: var(--color, black) transparent transparent transparent; */
    }

    & select {
      /* Reset the styles, including removing the default dropdown arrow */
      appearance: none;
      min-width: 100%;
      margin: 0;
      padding: var(--padding-vertical, 7px) var(--padding-horizontal, 10px);
      /* This padding-right pushes the down arrow out enough so no text will overlap with it. */
      padding-right: var(--padding-arrow, 30px);
      border: none;
      outline: none;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      background-color: var(--background-color, white);
      color: var(--color, black);
      cursor: pointer;

      & option {
        background-color: var(--background-color, white);
        color: var(--color, black);
      }
    }
  }
  /**************************************************
  End Select Element Styles
  **************************************************/
</style>
