<!--
  Component and Accessibility Notes:
  * This component aims to providing the usability of checkboxes instead of the default multi-select elements that are generated in HTML, as suggested by W3Schools.com:
      * Because of the different ways of selecting options (depending on the browser), and because you have to inform the user that multiple selection is available, it is more user-friendly to use checkboxes instead. See https://www.w3schools.com/tags/att_select_multiple.asp
  * This component uses WAI-ARIA attributes to replicate the accessibility of a multi-select element:
      * <div> elements may use any ARIA role. (https://www.w3.org/TR/html-aria/#dfn-any-role)
      * <select> elements with the `multiple` attribute are used to create multi-select elements. Multi-select elements have an implicit `listbox` ARIA role, so the <div> in this component that is used as the select button uses a `listbox` role. (https://www.w3.org/TR/html-aria/)
          * If more than one element is selectable at a time, then include `aria-multiselectable="true"` on the element that has the `listbox` role. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
      * <option> element within a multi-select element:
          * Each of the <option> elements within a multi-select element should use an `option` ARIA role for accessibility.  (https://www.w3.org/TR/html-aria/)
          * `input type=checkbox` elements can use the `option` role. (https://www.w3.org/TR/html-aria/)
          * For elements that use the `option` role, the `aria-selected` attribute should be used to indicate the current "selected" state. Include `aria-selected` only on the selectable options (i.e. the selectable elements that have an `option` role). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
          * Authors SHOULD NOT use the `aria-checked` attribute on `input type=checkbox` elements. The HTML `checked` attribute can be used instead of the `aria-checked` attribute for `menuitemcheckbox`, `option` or `switch` roles when used on `type=checkbox`. (https://www.w3.org/TR/html-aria/)
-->


<script lang="ts">
  import { tick } from "svelte";
  import { createId, calculateMenuHeight } from "../fpui-utils";
  // import isEqual from "lodash.isequal";
  import { Button } from "../Buttons";
  import { CheckboxGroup } from "../Checkboxes";
  import { Label } from "../Labels";

  export let label = "";
  export let tooltipText = "";
  export let valuesArray;
  export let arrayType;
  export let selectedValues;
  export let size = "md";
  export let disabled = false;

  let componentId = createId();
  let selectMenu;

  $: arraySortedBySelectionOrder([ ...selectedValues ]);
  let showSelectMenu = false;
  let previousArray = [ ...selectedValues ];

  /**
   * As a user selects values in this MultiSelect component, those values are added to the `selectedValues` array in the order in which they appear in the `valuesArray` that is passed to this component. This function will sort the values that are added to the `selectedValues` array in the order in which the user selects those values.
   * This function will compare the previous `selectedValues` array (`previousArray`) with the current `selectedValues` array (`currentArray`). Any elements that are added will be pushed to the end of the `currentArray` so the elements in the `currentArray` are in the order in which the user selected them.
   * NOTE: For multi-select elements that are used in Svelte (e.g. multiselect boxes, checkboxes) the values that are selected are always placed into the `bind:value` array in the order in which they are listed in the code/DOM. So if you want to have the values placed into the `bind:value` array in the order in which they are selected (rather than the order in which they are listed), then you will have to programmatically handle that. This might also be true for multi-select elements in plain HTML, but I haven't tested this because this app is written using Svelte and the behavior for plain HTML doesn't matter for this app.
   */
  async function arraySortedBySelectionOrder(currentArray) {
    try {
      // Get elements that are different between two arrays: https://stackoverflow.com/a/33034768
      let elementsAddedToPreviousArray = currentArray.filter(element => !previousArray.includes(element));
      let elementsRemovedFromPreviousArray = previousArray.filter(element => !currentArray.includes(element));

      // If a single element is removed from the MultiSelect component, then `elementsRemovedFromPreviousArray` will equal a single-element array that contains the element that was removed from the previousArray.
      if (elementsRemovedFromPreviousArray.length === 1) {        
        // Find the index of the element that was removed from the previousArray
        let index = previousArray.findIndex((element) => element === elementsRemovedFromPreviousArray[0]);
        // Remove the item from the `previousArray` whose index match the index above.
        if (index > -1) {
          previousArray.splice(index, 1);
        }
        // Set the currentArray to equal a copy of the updated previousArray.
        currentArray = [ ...previousArray ];
      }
      // If the user clicks the "Deselect all" button, then clear the previousArray. NOTE: If the user clicks the "Deselect all" button, then `elementsRemovedFromPreviousArray.length` will be equal to the length of the previousArray. 
      if (elementsRemovedFromPreviousArray.length > 1) {
        previousArray.length = 0;
        // Set the currentArray to equal a copy of the updated previousArray.
        currentArray = [ ...previousArray ];
      }

      // If a single element is added to the MultiSelect component, then `elementsAddedToPreviousArray` will equal a single-element array that contains the element that was add to the previousArray. If multiple elements where added to the MultiSelect component (e.g. if a user clicks "Select all" or "Select all remaining"), then `elementsAddedToPreviousArray` will equal a multi-element array. So take any newly added elements and add them to the end of the previousArray. Then set the currentArray to equal a copy of the previousArray, which now contains the newly added element(s) at the end.
      if (elementsAddedToPreviousArray.length > 0) {
        previousArray = [ ...previousArray, ...elementsAddedToPreviousArray ];
        currentArray = [ ...previousArray ];
      }

      // Reset the previousArray so that it now contains that same values as the currentArray.
      previousArray = [ ...currentArray ];
      
      // Setting the `selectedValues` array to equal the `currentArray` will set the values in the UI to match the user-selected order.
      selectedValues = currentArray;
    }
    catch(err) {
      console.error("arraySortedBySelectionOrder Error:", err);
    }
  }

  function removeValue(index) {
    selectedValues.splice(index, 1);
    selectedValues = selectedValues;
  }
</script>


<Label {label} forVal={`fpui-select-btn-${componentId}`} {tooltipText} />
<div class="fpui-multi-select"> 
  <div
    role="listbox" 
    aria-multiselectable="true" 
    id={`fpui-select-btn-${componentId}`} 
    class={`fpui-select-btn ${size}`}
    tabindex="-1"
    on:click={async () => {
      showSelectMenu = !showSelectMenu;
      // There is no need to run the following code if the menu is hidden, so only run it if the menu is shown.
      if (showSelectMenu)  {
        calculateMenuHeight(componentId, showSelectMenu, tick, window, document);
        // Wait for the menu element to be displayed in the DOM before setting `focus()` on it.
        await tick();
        selectMenu.focus();
      }
    }}
  >
    <!-- This <div class="selected-values-container"> element will display all the options that the user has selected. -->
    <div class="selected-values-container">
      {#if selectedValues.length === 0}
        <em>No values selected</em>
      {:else}
        {#if arrayType === "string" || arrayType === "number"}
          {#each selectedValues as item, index}
            <span class="value"><span class="value-text">{item}</span> <span class="remove-value" on:click={() => removeValue(index)}>&times;</span></span>
          {/each}
        {/if}
        {#if arrayType === "object"}
          {#each selectedValues as obj, index}
            <span class="value"><span class="value-text">{obj.label}</span> <span class="remove-value" on:click={() => removeValue(index)}>&times;</span></span>
          {/each}
        {/if}
      {/if}
    </div>
    <span class="fpui-select-btn-arrow">›</span>
  </div>

  <div
    id={`fpui-select-menu-${componentId}`} 
    class="fpui-select-menu"
    class:show={showSelectMenu}
    tabindex="-1"
    bind:this={selectMenu}
    on:blur={(event) => {
      // If a user clicks a button or a checkbox inside the selectMenu, then the the selectMenu will lose the focus. So it is necessary for the selectMenu to receive focus again so it will close when a user clicks outside of it.
      selectMenu.focus();
      let elementId = (event && event.relatedTarget && event.relatedTarget.id) ? event.relatedTarget.id : null;
      // See this function in the `<Select>` component for an explanation of how this if statement works.
      // This is basically saying if the user clicks on the select-btn or the one of the select-all-btns or a checkbox, then do not hide the selectMenu. If the user clicks the select-btn, then the select-btn's on:click event will hide the selectMenu.
      if (
        elementId !== `fpui-select-btn-${componentId}` && 
        elementId !== `fpui-select-all-btn-${componentId}` && 
        elementId !== `fpui-checkbox-input-${componentId}`
      ) {
        showSelectMenu = false;
      }
    }}
  >
    <!-- NOTE: If I use `{#if !isEqual(valuesArray, selectedValues)}`, then (for some strange reason) the "Select all" button is displayed if the two arrays have the same elements, but in different orders. My guess is that the `isEqual` function is reading old data because if you click "Select all" again, then the `selectedValues` array will be updated in the UI to match the order of the `valuesArray`. In this case, it is probably fine to use `{#if valuesArray.length !== selectedValues.length}` because if the two arrays are the same length, then they will also have the same elements in them. -->
    {#if valuesArray.length !== selectedValues.length}
      <!-- If the user has at least one option selected, but fewer than the total number of options selected, then show the "Select all remaining" button. -->
      {#if selectedValues.length > 0 && selectedValues.length < valuesArray.length}
        <div class="select-all-btn">
          <Button
            id={`fpui-select-all-btn-${componentId}`}
            size="sm"
            btnIcon=""
            on:click={() => selectedValues = [...valuesArray]}
          >Select all remaining</Button>
        </div>
      <!-- If the user has no options selected, then show the "Select all" button. -->
      {:else}
        <div class="select-all-btn">
          <Button
            id={`fpui-select-all-btn-${componentId}`}
            size="sm"
            btnIcon=""
            on:click={() => selectedValues = [...valuesArray]}
          >Select all</Button>
        </div>
      {/if}
    <!-- If the user has all of the options selected, then show the "Deselect all" button. -->
    {:else}
      <div class="select-all-btn">
        <Button
          id={`fpui-select-all-btn-${componentId}`}
          size="sm"
          btnIcon=""
          on:click={() => selectedValues.length = 0}
        >Deselect all</Button>
      </div>
    {/if}

    <!-- 
      TODO: The following commented code has usability attributes in it, so I don't want to remove this commented code until I have had a chance to create tests and see if the usability attributes work.
    -->
    <!-- {#if arrayType === "string" || arrayType === "number"}
      {#each valuesArray as item}          
        <label class="container">
          <input role="option" aria-selected={selectedValues.includes(item)} checked={selectedValues.includes(item)} type="checkbox" bind:group={selectedValues} value={item}> {item}
          <span class="checkmark"></span>
        </label>
      {/each}
    {/if}

    {#if arrayType === "objects"}
      {#each valuesArray as obj}
        <label class="container">
          <input role="option" aria-selected={selectedValues.includes(obj.value)} checked={selectedValues.includes(obj.value)} type="checkbox" bind:group={selectedValues} value={obj.value}> {obj.label}
          <span class="checkmark"></span>
        </label>
      {/each}
    {/if} -->

    <!--
      IMPORTANT NOTE:
      Since the <CheckboxGroup> component works perfectly for the options in the select menu of this component, I am simply using that component here.
    -->
    <CheckboxGroup
      {componentId}
      {arrayType}
      checkboxGroupValues={valuesArray}
      bind:selectedValues={selectedValues}
      {disabled}
    />
  </div>
</div>


<style>
  .fpui-multi-select {
    position: relative;

    & .fpui-select-btn {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid;
      border-color: var(--fpui-select-border-color, #c7c7c7);
      border-radius: var(--fpui-select-border-radius);
      background-color: var(--fpui-select-bg-color);
      color: var(--fpui-select-text-color);
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 0 1px var(--fpui-select-border-color, gray);
      }

      &.sm {
        padding: 5px;
        font-size: var(--font-size-sm, 12px);
      }
      &.md {
        padding: 10px;
        font-size: var(--font-size-base, 16px);
      }
      &.lg {
        padding: 15px;
        font-size: var(--font-size-lg, 20px);
      }

      & .selected-values-container {
        flex: 1;
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;

        & .value {
          display: flex;
          align-items: center;
          margin-right: 5px;
          padding: 0px 5px 0px 10px;
          border-radius: 20px;
          background-color: var(--primary-color);
          color: var(--fpui-btn-primary-text-color);

          & .value-text {
            white-space: nowrap;
            cursor: default;
          }

          & .remove-value {
            padding: 0 5px;
            cursor: pointer;
          }
        }
      }

      & .fpui-select-btn-arrow {
        margin-left: 10px;
        transform: rotate(90deg);
        font-size: 1.5rem;
        line-height: 1rem;
      }
    }
    
    & .fpui-select-menu {
      display: none;
      position: absolute;
      width: 100%;
      overflow-y: auto;
      padding: 10px;
      padding-top: 15px;
      border: 2px solid;
      border-color: var(--fpui-select-border-color);
      border-radius: var(--fpui-select-border-radius, 3px);
      box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.1);
      background-color: white;
      z-index: 100;

      &.show {
        display: block;
      }

      & .select-all-btn {
        margin-bottom: 15px;
      }
    }
  }
</style>
