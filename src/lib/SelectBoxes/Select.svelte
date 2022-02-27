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

<!-- The `on:change` attribute is called "event forwarding" in Svelte. This will pass all change events to the <Select> components and then you can do whatever you need to when the change event happens. -->
<!-- <label for={label}>{label}</label>
<div id="kitfox-select-container" class="{`kitfox-select-container ${size}`}">
  <select
    id={label}
    class="{`kitfox-select ${size}`}"
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
</div> -->


{#if label}
  <div class="kitfox-select-label-container">
    <label class="kitfox-select-label">{label}</label>
  </div>
{/if}
<div class="kitfox-select">
  <div class="{`kitfox-select-btn ${size}`}" on:click={() => showSelectMenu = !showSelectMenu}>
    <span class="kitfox-select-btn-text">{selectedOption}</span>
    <span class="kitfox-select-btn-arrow">›</span>
  </div>
  {#if showSelectMenu}
    <div class="{`kitfox-select-menu ${size}`}" in:slide out:blur>
      {#if arrayType === "string" || arrayType === "number"}
        {#each optionsArray as item}
          <div class="{`kitfox-select-option ${size}`}" on:click={() => setSelectedOption(item)}>{item}</div>
        {/each}
      {/if}
      {#if arrayType === "object"}
        {#each optionsArray as obj}
          <div class="{`kitfox-select-option ${size}`}" on:click={() => setSelectedOption(obj.item)}>{obj.item}</div>
        {/each}
      {/if}
    </div>
  {/if}
</div>


<script lang="ts">
  import { fade, blur, fly, slide, scale, draw, crossfade } from "svelte/transition";

  export let label;
  export let optionsArray;
  export let arrayType = "string";
  export let selectedOption;
  export let size = "medium";
  // export let selectedOption = optionsArray[0];
  // export let defaultValue = optionsArray[0];

  let showSelectMenu = false;

  // When working with plain HTML <select> elements, you set the default value with the `selected` attribute. In Svelte you set the default value by setting the `selectedOption` variable (in `<select bind:value={selectedOption}>`) to equal the value from the `optionsArray` that you want to be the default value.
  
  // TODO: I need to verify that the follow 2 paragraphs are accurate with the refactors that I have made to this component.
  // The default value of this <Select> component is an empty string. However, if the user sets the `defaultValue` prop to a value other than the empty string, then the `selectedOption` needs to be set as that `defaultValue` so the `defaultValue` will be displayed in the UI.
  // Also, if a user has previously selected an option and saved it to the database, then that selected option will be passed into this component as the `selectedOption` prop and that `selectedOption` prop will set the value that is displayed in the UI. So, if the `selectedOption` has already been set by the user (which means that it will get passed into this component), then do not set the `selectedOption` prop/variable to the `defaultValue`.
  // if (!selectedOption) {
  //   selectedOption = defaultValue;
  // }

  function setSelectedOption(option) {
    selectedOption = option;
    showSelectMenu = false;
  }
</script>


<style>
  .kitfox-select-label-container {
    margin-bottom: 5px;

    & .kitfox-select-label {
      font-size: 0.85rem;
      color: var(--gray140);
    }
  }

  .kitfox-select {
    position: relative;

    & .kitfox-select-btn {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: var(--kitfox-select-border);
      border-radius: var(--global-radius);
      background-color: var(--kitfox-select-background-color);
      color: var(--kitfox-select-text-color);
      cursor: pointer;

      /*
        Give some padding around the dropdown arrow icon so it does not get pressed into the right border of the select box.
      */
      &.small {
        padding: var(--kitfox-select-small-padding);
      }
      &.medium {
        padding: var(--kitfox-select-medium-padding);
      }
      &.large {
        padding: var(--kitfox-select-large-padding);
      }

      & .kitfox-select-btn-text {
        line-height: 1rem;
      }

      & .kitfox-select-btn-arrow {
        transform: rotate(90deg);
        font-size: 1.5rem;
        line-height: 1rem;
      }
    }

    & .kitfox-select-menu {
      position: absolute;
      /* This "top: 0px;" rule will cause the dropdown menu to display over the top of the select button. This will simplify this element and give a bit more space for the dropdown menu. Also, if a border-radius is applied, then it will make it much easier to simply cover up the select button with the dropdown menu and the dropdown menu can have the same border-radius. */
      top: 0px;
      width: 100%;
      /* Add top and bottom padding that is equal to the --global-radius so the menu options will get pushed down enough so they won't get cut off if a user sets a high --global-radius value. */
      padding: var(--global-radius) 0;
      border: var(--kitfox-select-border);
      border-radius: var(--global-radius);
      overflow-y: auto;
      background-color: var(--kitfox-select-background-color);
      color: var(--kitfox-select-text-color);
      z-index: 100;


      & .kitfox-select-option {

        &:hover {
          background-color: var(--kitfox-select-option-hover-background-color);
          color: var(--kitfox-select-option-hover-text-color);
          cursor: pointer;
        }

        /* 
        * Add top and bottom padding that is equal to the size of the select box that the user set (e.g. var(--kitfox-select-large-padding)). 
        * Also, add left and right padding that is equal to the size of the select box that the user set + the --global-radius so the menu options will get in from the sides enough so they won't get cut off if a user sets a high --global-radius value. */
        &.small {
          padding: var(--kitfox-select-small-padding) calc(var(--kitfox-select-small-padding) + var(--global-radius));
        }
        &.medium {
          padding: var(--kitfox-select-medium-padding) calc(var(--kitfox-select-medium-padding) + var(--global-radius));
        }
        &.large {
          padding: var(--kitfox-select-large-padding) calc(var(--kitfox-select-large-padding) + var(--global-radius));
        }
      }
    }
  }


  /* TODO: Remove all the following styles once I have refactored this component because these styles are no longer being used. */

  /**************************************************
   * Select Element Styles
   * Resets: https://moderncss.dev/custom-select-styles-with-pure-css/
   * Styles: https://stackoverflow.com/questions/31531865/css-change-dropdown-arrow-to-unicode-triangle
  **************************************************/
  .kitfox-select-container {
    overflow: hidden;
    position: relative;
    border-radius: var(--global-radius);
    border: 1px solid var(--border-color, var(--gray-medium));
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

      /*
        Give some padding around the dropdown arrow icon so it does not get pressed into the right border of the select box.
      */
      &.small {
        right: var(--kitfox-select-small-padding);
        padding-left: var(--kitfox-select-small-padding);
        padding-right: var(--kitfox-select-small-padding);
      }

      &.medium {
        right: var(--kitfox-select-medium-padding);
        padding-left: var(--kitfox-select-medium-padding);
        padding-right: var(--kitfox-select-medium-padding);
      }

      &.large {
        right: var(--kitfox-select-large-padding);
        padding-left: var(--kitfox-select-large-padding);
        padding-right: var(--kitfox-select-large-padding);
      }
    }

    & .kitfox-select {
      /* Reset the styles, including removing the default dropdown arrow */
      appearance: none;
      min-width: 100%;
      margin: 0;
      border: none;
      outline: none;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      background-color: var(--background-color, white);
      color: var(--color, black);
      cursor: pointer;

      &.small {
        padding: var(--kitfox-select-small-padding);
      }

      &.medium {
        padding: var(--kitfox-select-medium-padding);
      }

      &.large {
        padding: var(--kitfox-select-large-padding);
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
