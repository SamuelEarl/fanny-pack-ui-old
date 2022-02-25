<!--
  Example Usage:

  <Select
    optionsArray={columnHeaders}  
    arrayType="string"
    bind:selectedOption={selectedColumn}
    defaultValue="avg"
    on:change={() => eventHandler(arg1, arg2, arg3)}
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
    [{ value: "valueToBePassedToTheBackend", text: "Text displayed in the select box" }]

  3. bind:selectedOption={stringVariable}: The option that the user selects in the UI will be bound to the <select> element and then passed to the backend when the form is submitted. You need to have a string variable defined in the component where this <Select> component is imported and that string variable needs to be bound to the <Select> component with `bind:selectedOption={stringVariable}`.

  4. `label` (optional): The text for the `<label>` element.

  5. defaultValue (optional): This is the value (from the array that is assigned to `optionsArray`) that you want to set as the default value for the select box. For "object" arrays, this should be the value of the `value` property. If you don't set this prop then it defaults to the empty string option.

  6. on:change (optional): If you want to call an event handler when the change event is fired, then you can add this prop and call your event handler.

  11. --border-color="blue" (optional): See number 7. This style prop will change the color of the border. Default is --gray-medium.

  12. --background-color="white" (optional): See number 7. This style prop will change the background color of the select element. Default is white.

  13. --color="blue" (optional): See number 7. This style prop will change the text color in the select box (including the down arrow) and the color in the select box drop-down. Default is black.
-->


<label for={label}>{label}</label>
<div class="{`jacl-select-container ${size}`}">
  <!-- The `on:change` attribute is called "event forwarding" in Svelte. This will pass all change events to the <Select> components and then you can do whatever you need to when the change event happens. -->
  <select
    id={label}
    class="{`jacl-select ${size}`}"
    bind:value={selectedOption} on:change>
    {#if arrayType === "string" || arrayType === "number"}
      {#each optionsArray as item}
        <option value={item}>{item}</option>
      {/each}
    {/if}
    {#if arrayType === "object"}
      {#each optionsArray as obj}
        <option value={obj.value}>{obj.text}</option>
      {/each}
    {/if}
  </select>
</div>

<script lang="ts">
  export let label = "";
  export let optionsArray;
  export let arrayType = "string";
  export let selectedOption;
  export let size = "medium";
  // export let selectedOption = optionsArray[0];
  // export let defaultValue = optionsArray[0];

  // When working with plain HTML <select> elements, you set the default value with the `selected` attribute. In Svelte you set the default value by setting the `selectedOption` variable (in `<select bind:value={selectedOption}>`) to equal the value from the `optionsArray` that you want to be the default value.
  
  // TODO: I need to verify that the follow 2 paragraphs are accurate with the refactors that I have made to this component.
  // The default value of this <Select> component is an empty string. However, if the user sets the `defaultValue` prop to a value other than the empty string, then the `selectedOption` needs to be set as that `defaultValue` so the `defaultValue` will be displayed in the UI.
  // Also, if a user has previously selected an option and saved it to the database, then that selected option will be passed into this component as the `selectedOption` prop and that `selectedOption` prop will set the value that is displayed in the UI. So, if the `selectedOption` has already been set by the user (which means that it will get passed into this component), then do not set the `selectedOption` prop/variable to the `defaultValue`.
  // if (!selectedOption) {
  //   selectedOption = defaultValue;
  // }
</script>

<style>
  /**************************************************
   * Select Element Styles
   * Resets: https://moderncss.dev/custom-select-styles-with-pure-css/
   * Styles: https://stackoverflow.com/questions/31531865/css-change-dropdown-arrow-to-unicode-triangle
  **************************************************/
  .jacl-select-container {
    /* width: var(--width, auto); */
    overflow: hidden;
    position: relative;
    border-radius: var(--global-radius);
    border: 1px solid var(--border-color, var(--gray-medium));
    /* box-shadow: 1px 1px 1px var(--gray-medium); */
    &:after {
      /* The HTML entity in the content rule uses the "&rsaquo;" entity.
      https://dev.w3.org/html5/html-author/charref */

      content: "›";
      transform: rotate(90deg);
      font-size: 1.5rem;
      height: 100%;
      position: absolute;
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

      /* Give some padding around the dropdown arrow icon. */
      &.small {
        right: var(--jacl-select-small-padding);
        padding-left: var(--jacl-select-small-padding);
        padding-right: var(--jacl-select-small-padding);
      }

      &.medium {
        right: var(--jacl-select-medium-padding);
        padding-left: var(--jacl-select-medium-padding);
        padding-right: var(--jacl-select-medium-padding);
      }

      &.large {
        right: var(--jacl-select-large-padding);
        padding-left: var(--jacl-select-large-padding);
        padding-right: var(--jacl-select-large-padding);
      }
    }

    & .jacl-select {
      /* Reset the styles, including removing the default dropdown arrow */
      appearance: none;
      min-width: 100%;
      margin: 0;
      /* This padding-right pushes the down arrow out enough so no text will overlap with it. */
      /* padding-right: 30px; */
      /* margin-right: 20px; */
      border: none;
      outline: none;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      background-color: var(--background-color, white);
      color: var(--color, black);
      cursor: pointer;

      &.small {
        padding: var(--jacl-select-small-padding);
        /* padding-right: var(--padding-arrow, 30px); */
      }

      &.medium {
        padding: var(--jacl-select-medium-padding);
        /* padding-right: var(--padding-arrow, 30px); */
      }

      &.large {
        padding: var(--jacl-select-large-padding);
        /* padding-right: var(--padding-arrow, 30px); */
      }

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
