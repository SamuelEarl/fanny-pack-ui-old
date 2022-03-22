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

<!--
  Example Usage:

  <MultiSelect
    valuesArray={columnHeaders}
    arrayType="string"
    bind:selectedValues={fields.axes.y}
    tooltipText="Tooltip goes here."
  />

  <script>
    let columnHeaders = [];
    let fields = {
      axes: {
        x: "",
        y: []
      }
    };
  </script>


  Documentation about props:
  1. valuesArray: This should be an array of strings or objects. The type of array should match the value passed to the `arrayType` prop. This array will be used to populate the selectable options in the select box.

  2. arrayType: If the data that this select box is displaying is an array of strings, then set this to "string". If it is an array of objects, then set this to "objects". NOTE: Each object inside the object array should have this structure:
    [{ value: "valueToBePassedToTheBackend", label: "Label displayed in the select box" }]

  3. bind:selectedValues={arrayVariable}: The options that the user selects in the UI will be bound to the array variable that is assigned to the `bind:selectedValues` prop. This array will be passed to the backend when the form is submitted. You need to have an array variable defined in the component where this <MultiSelect> component is imported and that array variable needs to be bound to the <MultiSelect> component with `bind:selectedValues={arrayVariable}`.

  5. tooltipText (optional): This MultiSelect component has a tooltip that can be used to provide some instructions or information. If you pass text to this prop, then the tooltip will be displayed. If you do not pass text to this prop, then the tooltip will be hidden.
-->


<script lang="ts">
  import { tick } from "svelte";
  import { createId, calculateMenuHeight } from "../fpcl-utils";
  import Icon from "@iconify/svelte";
  // import isEqual from "lodash.isequal";
  import { Button, CheckboxGroup, Label, Tooltip } from "/src/lib";

  export let label = "";
  export let tooltipText = "";
  export let valuesArray;
  export let arrayType;
  export let selectedValues;
  export let size = "md";
  export let disabled = false;

  let componentId = createId();

  $: arraySortedBySelectionOrder([ ...selectedValues ]);
  let showSelectMenu = false;
  let previousArray = [ ...selectedValues ];
  // $: calculateDropDownHeight(selectedValues);
  // $: calculateMenuHeight(componentId, showSelectMenu, tick, window, document);

  // /**
  //  * This function will set the height of the drop-down menu to be less-than or equal to the available space on the screen.
  //  */
  // async function calculateDropDownHeight(unusedParam) {
  //   // Only calculate the height of the drop-down if it is showing in the DOM.
  //   // A user can remove elements from the `selectedValues` array while the drop-down is not showing by clicking the `x` on the `.selected-values-container` buttons. So in that case I do not want to run this function unnecessarily.
  //   if (showSelectMenu) {
  //     // Wait for the drop-down element to exist in the DOM before getting the `fpcl-select-menu-${componentId}` element by ID.
  //     // This will also wait for the buttons to update in the DOM (inside the `.selected-values-container` element) before running this function.
  //     await tick();

  //     // Get window height: https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
  //     let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  //     // Get the dropDownBtn element.
  //     let dropDownBtn = document.getElementById(`fpcl-select-btn-${componentId}`).getBoundingClientRect();
  //     // Get the y-position of the bottom of the dropDownBtn element.
  //     let dropDownBtnBottom = dropDownBtn.bottom;
  //     // Get the y-position of the top of the dropDownBtn element.
  //     let dropDownBtnTop = dropDownBtn.top;
  //     // Calculate the amount of space below the dropDownBtn.
  //     let spaceBelowBtn = windowHeight - dropDownBtnBottom;
  //     // The amount of space above the dropDownBtn equals the y-position of the top of the dropDownBtn.
  //     let spaceAboveBtn = dropDownBtnTop;
  //     // Get the drop-down element.
  //     let dropDownElement = document.getElementById(`fpcl-select-menu-${componentId}`);

  //     // If the space between the bottom of the drop-down button and the bottom of the widow is less than 200px and if there is more space between the top of the drop-down button and the top of the window, then position the dropDownElement above the drop-down button.
  //     if (spaceBelowBtn < 200 && spaceAboveBtn > spaceBelowBtn) {
  //       // Remove the .display-below-btn class, if it exists, otherwise the two classes will conflict.
  //       dropDownElement.classList.remove("display-below-btn");
  //       // Add .display-above-btn class.
  //       dropDownElement.classList.add("display-above-btn");
  //       // Set the max-height property. See the comment about this in the `else` block below.
  //       dropDownElement.style.maxHeight = spaceAboveBtn + "px";
  //       // The dropDownElement already has a property of `position: absolute` set in the CSS. The following line will set the `bottom` property (i.e. the bottom edge) of the dropDownElement to be even with the top of the dropDownBtn.
  //       dropDownElement.style.bottom = dropDownBtn.height + "px";
  //     }
  //     else {
  //       // Remove the .display-above-btn class, if it exists, otherwise the two classes will conflict.
  //       dropDownElement.classList.remove("display-above-btn");
  //       // Add .display-below-btn class.
  //       dropDownElement.classList.add("display-below-btn");
  //       // Set the max-height of the dropDownElement to be the remaining space between the bottom of the drop-down button (dropDownElementTop) and the bottom of the window (windowHeight).
  //       // The `maxHeight` property will ensure that the drop-down element will not be taller than the list of options that it contains (i.e. the height of the drop-down element will fit the height of its content).
  //       dropDownElement.style.maxHeight = spaceBelowBtn + "px";
  //       // The dropDownElement already has a property of `position: absolute` set in the CSS. The following line will set the `bottom` property (i.e. the bottom edge) of the dropDownElement back to its default value of "auto" when the dropDownElement gets displayed below the dropDownBtn.
  //       dropDownElement.style.bottom = "auto";
  //     }
  //   }
  // }

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

  /**
   * This function for adding a "clickoutside" event is taken from this REPL post:
   * https://svelte.dev/repl/0ace7a508bd843b798ae599940a91783?version=3.16.7
   * 
   * NOTE: Could I use a negative tabindex (e.g. tabindex="-1") on the .fpcl-select-menu element and call `focus()` on the .fpcl-select-menu element when a user clicks on the .multi-select-btn and then use `on:blur={() => showSelectMenu = false}` on the .fpcl-select-menu element? Would that fix the issue that occurs where this MultiSelect component does not close right away when the user clicks on a select element? Note that the custom select box that is created here https://www.w3schools.com/howto/howto_custom_select.asp is also created by creating <div> elements and using a "click outside" event. That select box also has the same issue when you open it and then click on the regular select box next to it.
   * See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex.
   */
  function clickOutsideDropDown(node) {
    // When a click event is triggered, this `handleClick` function will be executed.
    let handleClick = event => {
      // When a click event is triggered, then the following if statement will look to see if...
      // (1) ...the `<div class="fpcl-select-menu">` node exists in the DOM.
      // (2) ...the node does not contain the element that was clicked on.
      // (3) ...the `event.preventDefault()` method was not used to cancel the event.
      // If all those checkout, then fire the custom "clickoutside" event. When the "clickoutside" event is fired, then `showSelectMenu` will be set to `false`.
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(
          new CustomEvent("clickoutside", node)
        )
      }
    }

    // Add the "click" event to the document when the .fpcl-select-menu element is added to the DOM.
    document.addEventListener("click", handleClick, true);
    
    return {
      destroy() {
        // Remove the "click" event from the document when the .fpcl-select-menu element is removed from the DOM.
        document.removeEventListener("click", handleClick, true);
      }
    }
  }

  function removeValue(index) {
    selectedValues.splice(index, 1);
    selectedValues = selectedValues;
  }
</script>


<Label {label} forVal={`fpcl-select-btn-${componentId}`} {tooltipText} />
<div class="fpcl-multi-select"> 
  <!-- The <div class="fpcl-select-btn"> element is the drop-down button that the user will click to show the selectable options. -->
  <div
    role="listbox" 
    aria-multiselectable="true" 
    id={`fpcl-select-btn-${componentId}`} 
    class={`multi-select-btn ${size}`}
    tabindex="-1"
    on:click={async () => {
      showSelectMenu = !showSelectMenu;
      // There is no need to run the following code if the menu is hidden, so only run it if the menu is shown.
      if (showSelectMenu)  {
        calculateMenuHeight(componentId, showSelectMenu, tick, window, document);
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
        {#if arrayType === "objects"}
          {#each selectedValues as obj, index}
            <span class="value"><span class="value-text">{obj.label}</span> <span class="remove-value" on:click={() => removeValue(index)}>&times;</span></span>
          {/each}
        {/if}
      {/if}
    </div>
    <span class="fpcl-select-btn-arrow">›</span>
  </div>
  <!-- {:else}
    The "click" event from the .multi-select-btn button and the "clickoutside" event from the .fpcl-select-menu box conflict with each other because they are both click events. When I click on the .multi-select-btn element it wants to show the drop-down box. When I click outside of the .fpcl-select-menu box it wants to hide the drop-down box. But if I click on the .multi-select-btn button, which is also outside of the .fpcl-select-menu box, then the drop-down box stays open rather than closing. Even if I change the function in the .multi-select-btn to toggle the drop-down box, the events still conflict with each other and the drop-down box stays open.
    The only way that I have been able to fix this issue so that a user can click on the .multi-select-btn to also hide the drop-down box is to duplicate the .multi-select-btn element but leave the click event out. Then I show the .multi-select-btn element with the click event when the drop-down box is hidden and I show the .multi-select-btn element without the click event when the drop-down box is showing. That way a user can click anywhere outside of the drop-down box, including the .multi-select-btn, and it will close the drop-down box. That is a better user experience.
    <div
      role="listbox" 
      aria-multiselectable="true" 
      id={`fpcl-select-btn-${componentId}`} 
      class="multi-select-btn"
    >
      {#if selectedValues && selectedValues.length > 0}
        <span>{selectedValues.length} value{#if selectedValues.length > 1}s{/if} selected</span>
      {:else}
        {dropDownDisplayText}
      {/if}
    </div> -->

    <!-- When this element is created in the DOM, then execute the `clickOutsideDropDown()` function. -->
  {#if showSelectMenu}
    <div
      id={`fpcl-select-menu-${componentId}`} 
      class="fpcl-select-menu" 
      use:clickOutsideDropDown 
      on:clickoutside={() => showSelectMenu = false}
    >
      <!-- NOTE: If I use `{#if !isEqual(valuesArray, selectedValues)}`, then (for some strange reason) the "Select all" button is displayed if the two arrays have the same elements, but in different orders. My guess is that the `isEqual` function is reading old data because if you click "Select all" again, then the `selectedValues` array will be updated in the UI to match the order of the `valuesArray`. In this case, it is probably fine to use `{#if valuesArray.length !== selectedValues.length}` because if the two arrays are the same length, then they will also have the same elements in them. -->
      {#if valuesArray.length !== selectedValues.length}
        <!-- If the user has at least one option selected, but fewer than the total number of options selected, then show the "Select all remaining" button. -->
        {#if selectedValues.length > 0 && selectedValues.length < valuesArray.length}
          <div class="select-all-btn">
            <Button
              size="sm"
              btnIcon=""
              on:click={() => selectedValues = [...valuesArray]}
            >Select all remaining</Button>
          </div>
        <!-- If the user has no options selected, then show the "Select all" button. -->
        {:else}
          <div class="select-all-btn">
            <Button
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
            size="sm"
            btnIcon=""
            on:click={() => selectedValues.length = 0}
          >Deselect all</Button>
        </div>
      {/if}

      <!-- 
        The following commented code has usability attributes in it, so I don't want to remove this commented code until I have had a chance to create tests and see if the usability attributes work.
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
        {arrayType}
        checkboxGroupValues={valuesArray}
        bind:selectedValues={selectedValues}
        {disabled}
      />

    </div>
  {/if}
</div>


<style>
  .fpcl-multi-select {
    position: relative;

    & .multi-select-btn {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid;
      border-color: var(--fpcl-select-border-color, #c7c7c7);
      border-radius: var(--fpcl-select-border-radius);
      background-color: var(--fpcl-select-bg-color);
      color: var(--fpcl-select-text-color);
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 0 1px var(--fpcl-select-border-color, gray);
      }

      &.sm {
        padding: 5px;
        font-size: var(--fpcl-font-size-sm, 12px);
      }
      &.md {
        padding: 10px;
        font-size: var(--fpcl-font-size-base, 16px);
      }
      &.lg {
        padding: 15px;
        font-size: var(--fpcl-font-size-lg, 20px);
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
          background-color: var(--fpcl-primary);
          color: var(--fpcl-btn-primary-text-color);

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

      & .fpcl-select-btn-arrow {
        margin-left: 10px;
        transform: rotate(90deg);
        font-size: 1.5rem;
        line-height: 1rem;
      }
    }
    
    & .fpcl-select-menu {
      position: absolute;
      width: 100%;
      overflow-y: auto;
      padding: 10px;
      padding-top: 15px;
      border: 1px solid;
      border-color: var(--fpcl-select-border-color);
      background-color: white;
      z-index: 100;

      &:global(.display-below-btn) {
        border-top: none;
      }

      &:global(.display-above-btn) {
        border-bottom: none;
      }

      & .drop-down-display-text {
        margin: -5px 0 15px 0;
      }

      & .select-all-btn {
        margin-bottom: 15px;
      }
    }
  }
</style>
