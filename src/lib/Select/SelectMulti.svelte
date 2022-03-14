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
    optionsArray={columnHeaders}
    arrayType="string"
    bind:selectedOptions={fields.axes.y}
    dropDownDisplayText="-- Select the y-axis values --"
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
  1. optionsArray: This should be an array of strings or objects. The type of array should match the value passed to the `arrayType` prop. This array will be used to populate the selectable options in the select box.

  2. arrayType: If the data that this select box is displaying is an array of strings, then set this to "string". If it is an array of objects, then set this to "objects". NOTE: Each object inside the object array should have this structure:
    [{ value: "valueToBePassedToTheBackend", label: "Label displayed in the select box" }]

  3. bind:selectedOptions={arrayVariable}: The options that the user selects in the UI will be bound to the array variable that is assigned to the `bind:selectedOptions` prop. This array will be passed to the backend when the form is submitted. You need to have an array variable defined in the component where this <MultiSelect> component is imported and that array variable needs to be bound to the <MultiSelect> component with `bind:selectedOptions={arrayVariable}`.

  4. dropDownDisplayText (optional): This prop allows you to set the text that is displayed in this component's drop-down field. This prop defaults to "-- Select options --".

  5. tooltipText (optional): This MultiSelect component has a tooltip that can be used to provide some instructions or information. If you pass text to this prop, then the tooltip will be displayed. If you do not pass text to this prop, then the tooltip will be hidden.
-->


<div class="multi-select">
  
  <!-- This <div class="selected-values-container"> element will display all the options that the user has selected. -->
  <div class="selected-values-container">
    {#if tooltipText}
      <span use:tooltip={{ content: tooltipText }}>
        <Icon icon="entypo:info-with-circle" />
      </span>
      &nbsp;
    {/if}
    {#if selectedOptions.length === 0}
      <em>No values selected</em>
    {:else}
      {#if arrayType === "string"}
        {#each selectedOptions as item, index}
          <span class="value">{item} <span class="delete" on:click={() => removeValue(index)}>&times;</span></span>
        {/each}
      {/if}
      {#if arrayType === "objects"}
        {#each selectedOptions as obj, index}
          <span class="value">{obj.label} <span class="delete" on:click={() => removeValue(index)}>&times;</span></span>
        {/each}
      {/if}
    {/if}
  </div>

  {#if !showDropDown}
    <!-- The <div class="multi-select-btn"> element is the drop-down button that the user will click to show the selectable options. -->
    <div role="listbox" aria-multiselectable="true" id={`multi-select-btn-${uuid}`} class="multi-select-btn" on:click={() => {
      // The drop-down element has be be present in the DOM before you can calculated its dimensions.
      // The `showDropDown = true` option needs to be left out of the `calculateDropDownHeight()` function. If it is included at the beginning of that function, then there will be strange errors.
      showDropDown = true;
      calculateDropDownHeight(null);
    }}>
      <!-- If the user has selected at least one option, then display "1 value selected". -->
      {#if selectedOptions && selectedOptions.length > 0}
        <span>{selectedOptions.length} value{#if selectedOptions.length > 1}s{/if} selected</span>
      <!-- If the user has not selected any options, then show the `dropDownDisplayText`. -->
      {:else}
        {dropDownDisplayText}
      {/if}
    </div>
  {:else}
    <!-- The "click" event from the .multi-select-btn button and the "clickoutside" event from the .multi-select-drop-down box conflict with each other because they are both click events. When I click on the .multi-select-btn element it wants to show the drop-down box. When I click outside of the .multi-select-drop-down box it wants to hide the drop-down box. But if I click on the .multi-select-btn button, which is also outside of the .multi-select-drop-down box, then the drop-down box stays open rather than closing. Even if I change the function in the .multi-select-btn to toggle the drop-down box, the events still conflict with each other and the drop-down box stays open. -->
    <!-- The only way that I have been able to fix this issue so that a user can click on the .multi-select-btn to also hide the drop-down box is to duplicate the .multi-select-btn element but leave the click event out. Then I show the .multi-select-btn element with the click event when the drop-down box is hidden and I show the .multi-select-btn element without the click event when the drop-down box is showing. That way a user can click anywhere outside of the drop-down box, including the .multi-select-btn, and it will close the drop-down box. That is a better user experience. -->
    <div role="listbox" aria-multiselectable="true" id={`multi-select-btn-${uuid}`} class="multi-select-btn">
      {#if selectedOptions && selectedOptions.length > 0}
        <span>{selectedOptions.length} value{#if selectedOptions.length > 1}s{/if} selected</span>
      {:else}
        {dropDownDisplayText}
      {/if}
    </div>

    <!-- When this element is created in the DOM, then execute the `clickOutsideDropDown()` function. -->
    <div id={`multi-select-drop-down-${uuid}`} class="multi-select-drop-down" use:clickOutsideDropDown on:clickoutside={() => showDropDown = false}>

      <!-- If the user has selected at least one value, then show the `dropDownDisplayText` inside the drop-down box. -->
      {#if selectedOptions.length > 0}
        <div class="drop-down-display-text">{dropDownDisplayText}</div>
      {/if}

      <!-- NOTE: If I use `{#if !isEqual(optionsArray, selectedOptions)}`, then (for some strange reason) the "Select all" button is displayed if the two arrays have the same elements, but in different orders. My guess is that the `isEqual` function is reading old data because if you click "Select all" again, then the `selectedOptions` array will be updated in the UI to match the order of the `optionsArray`. In this case, it is probably fine to use `{#if optionsArray.length !== selectedOptions.length}` because if the two arrays are the same length, then they will also have the same elements in them. -->
      {#if optionsArray.length !== selectedOptions.length}
        <!-- If the user has at least one option selected, but fewer than the total number of options selected, then show the "Select all remaining" button. -->
        {#if selectedOptions.length > 0 && selectedOptions.length < optionsArray.length}
          <div class="select-all-btn">
            <button class="btn primary" on:click={() => selectedOptions = [...optionsArray]}>Select all remaining</button>
          </div>
        <!-- If the user has no options selected, then show the "Select all" button. -->
        {:else}
          <div class="select-all-btn">
            <button class="btn primary" on:click={() => selectedOptions = [...optionsArray]}>Select all</button>
          </div>
        {/if}
      <!-- If the user has all of the options selected, then show the "Deselect all" button. -->
      {:else}
        <div class="select-all-btn">
          <button class="btn primary" on:click={() => selectedOptions.length = 0}>Deselect all</button>
        </div>
      {/if}

      {#if arrayType === "string"}
        {#each optionsArray as item}
          <!--
            IMPORTANT NOTE: 
            `bind:group` does not work with nested components: https://github.com/sveltejs/svelte/issues/2308
            So I have just copied and pasted the code from the Checkbox.svelte component into this component.
          -->
          <!-- <Checkbox bind:group={selectedOptions} value={item} label={item} on:change /> -->
          <label class="container">
            <input role="option" aria-selected={selectedOptions.includes(item)} checked={selectedOptions.includes(item)} type="checkbox" bind:group={selectedOptions} value={item}> {item}
            <span class="checkmark"></span>
          </label>
        {/each}
      {/if}

      {#if arrayType === "objects"}
        {#each optionsArray as obj}
          <!-- <Checkbox bind:group={selectedOptions} value={obj.value} label={obj.label} /> -->
          <label class="container">
            <input role="option" aria-selected={selectedOptions.includes(obj.value)} checked={selectedOptions.includes(obj.value)} type="checkbox" bind:group={selectedOptions} value={obj.value}> {obj.label}
            <span class="checkmark"></span>
          </label>
        {/each}
      {/if}

    </div>
  {/if}
</div>

<script lang="ts">
  import { tick } from "svelte";
  import { v4 as uuidv4 } from "uuid";
  import Icon from "@iconify/svelte";
  // import isEqual from "lodash.isequal";
  import tooltip from "/src/components/ui/tooltip.js";
  // import Checkbox from "./Checkbox.svelte";

  export let optionsArray;
  export let arrayType;
  export let selectedOptions;
  export let dropDownDisplayText = "-- Select options --";
  export let tooltipText = "";

  $: arraySortedBySelectionOrder([ ...selectedOptions ]);
  let showDropDown = false;
  let previousArray = [ ...selectedOptions ];
  let uuid = uuidv4();
  $: calculateDropDownHeight(selectedOptions);

  /**
   * This function will set the height of the drop-down menu to be less-than or equal to the available space on the screen.
   */
  async function calculateDropDownHeight(unusedParam) {
    // Only calculate the height of the drop-down if it is showing in the DOM.
    // A user can remove elements from the `selectedOptions` array while the drop-down is not showing by clicking the `x` on the `.selected-values-container` buttons. So in that case I do not want to run this function unnecessarily.
    if (showDropDown) {
      // Wait for the drop-down element to exist in the DOM before getting the `multi-select-drop-down-${uuid}` element by ID.
      // This will also wait for the buttons to update in the DOM (inside the `.selected-values-container` element) before running this function.
      await tick();

      // Get window height: https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
      let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      // Get the dropDownBtn element.
      let dropDownBtn = document.getElementById(`multi-select-btn-${uuid}`).getBoundingClientRect();
      // Get the y-position of the bottom of the dropDownBtn element.
      let dropDownBtnBottom = dropDownBtn.bottom;
      // Get the y-position of the top of the dropDownBtn element.
      let dropDownBtnTop = dropDownBtn.top;
      // Calculate the amount of space below the dropDownBtn.
      let spaceBelowBtn = windowHeight - dropDownBtnBottom;
      // The amount of space above the dropDownBtn equals the y-position of the top of the dropDownBtn.
      let spaceAboveBtn = dropDownBtnTop;
      // Get the drop-down element.
      let dropDownElement = document.getElementById(`multi-select-drop-down-${uuid}`);

      // If the space between the bottom of the drop-down button and the bottom of the widow is less than 200px and if there is more space between the top of the drop-down button and the top of the window, then position the dropDownElement above the drop-down button.
      if (spaceBelowBtn < 200 && spaceAboveBtn > spaceBelowBtn) {
        // Remove the .display-below-btn class, if it exists, otherwise the two classes will conflict.
        dropDownElement.classList.remove("display-below-btn");
        // Add .display-above-btn class.
        dropDownElement.classList.add("display-above-btn");
        // Set the max-height property. See the comment about this in the `else` block below.
        dropDownElement.style.maxHeight = spaceAboveBtn + "px";
        // The dropDownElement already has a property of `position: absolute` set in the CSS. The following line will set the `bottom` property (i.e. the bottom edge) of the dropDownElement to be even with the top of the dropDownBtn.
        dropDownElement.style.bottom = dropDownBtn.height + "px";
      }
      else {
        // Remove the .display-above-btn class, if it exists, otherwise the two classes will conflict.
        dropDownElement.classList.remove("display-above-btn");
        // Add .display-below-btn class.
        dropDownElement.classList.add("display-below-btn");
        // Set the max-height of the dropDownElement to be the remaining space between the bottom of the drop-down button (dropDownElementTop) and the bottom of the window (windowHeight).
        // The `maxHeight` property will ensure that the drop-down element will not be taller than the list of options that it contains (i.e. the height of the drop-down element will fit the height of its content).
        dropDownElement.style.maxHeight = spaceBelowBtn + "px";
        // The dropDownElement already has a property of `position: absolute` set in the CSS. The following line will set the `bottom` property (i.e. the bottom edge) of the dropDownElement back to its default value of "auto" when the dropDownElement gets displayed below the dropDownBtn.
        dropDownElement.style.bottom = "auto";
      }
    }
  }

  /**
   * As a user selects values in this MultiSelect component, those values are added to the `selectedOptions` array in the order in which they appear in the `optionsArray` that is passed to this component. This function will sort the values that are added to the `selectedOptions` array in the order in which the user selects those values.
   * This function will compare the previous `selectedOptions` array (`previousArray`) with the current `selectedOptions` array (`currentArray`). Any elements that are added will be pushed to the end of the `currentArray` so the elements in the `currentArray` are in the order in which the user selected them.
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
      
      // Setting the `selectedOptions` array to equal the `currentArray` will set the values in the UI to match the user-selected order.
      selectedOptions = currentArray;
    }
    catch(err) {
      console.error("arraySortedBySelectionOrder Error:", err);
    }
  }

  /**
   * This function for adding a "clickoutside" event is taken from this REPL post:
   * https://svelte.dev/repl/0ace7a508bd843b798ae599940a91783?version=3.16.7
   * 
   * NOTE: Could I use a negative tabindex (e.g. tabindex="-1") on the .multi-select-drop-down element and call `focus()` on the .multi-select-drop-down element when a user clicks on the .multi-select-btn and then use `on:blur={() => showDropDown = false}` on the .multi-select-drop-down element? Would that fix the issue that occurs where this MultiSelect component does not close right away when the user clicks on a select element? Note that the custom select box that is created here https://www.w3schools.com/howto/howto_custom_select.asp is also created by creating <div> elements and using a "click outside" event. That select box also has the same issue when you open it and then click on the regular select box next to it.
   * See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex.
   */
  function clickOutsideDropDown(node) {
    // When a click event is triggered, this `handleClick` function will be executed.
    let handleClick = event => {
      // When a click event is triggered, then the following if statement will look to see if...
      // (1) ...the `<div class="multi-select-drop-down">` node exists in the DOM.
      // (2) ...the node does not contain the element that was clicked on.
      // (3) ...the `event.preventDefault()` method was not used to cancel the event.
      // If all those checkout, then fire the custom "clickoutside" event. When the "clickoutside" event is fired, then `showDropDown` will be set to `false`.
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(
          new CustomEvent("clickoutside", node)
        )
      }
    }

    // Add the "click" event to the document when the .multi-select-drop-down element is added to the DOM.
    document.addEventListener("click", handleClick, true);
    
    return {
      destroy() {
        // Remove the "click" event from the document when the .multi-select-drop-down element is removed from the DOM.
        document.removeEventListener("click", handleClick, true);
      }
    }
  }

  function removeValue(index) {
    selectedOptions.splice(index, 1);
    selectedOptions = selectedOptions;
  }
</script>

<style>
  .multi-select {
    position: relative;

    & .selected-values-container {
      width: 100%;
      /* This is the height of the .selected-values-container when an option has been selected. */
      min-height: 33px;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;

      & .value {
        margin-bottom: 5px;
        margin-right: 5px;
        padding: 0 5px 3px 10px;
        border-radius: 15px;
        background-color: $kemper-blue;
        color: white;

        & .delete {
          padding: 0 5px;
          cursor: pointer;
        }
      }
    }

    &.multi-select-btn {
      width: 100%;
      padding: 7px 10px;
      /* This padding-right pushes the down arrow out enough so no text will overlap with it. */
      padding-right: 25px;
      overflow: hidden;
      position: relative;
      border-radius: $radius;
      background-color: white;
      border: 1px solid darken($geyser-gray, 10%);
      cursor: pointer;
      &:after {
        /*
          The HTML entity in the content rule us the "&rsaquo;" entity.
          https://dev.w3.org/html5/html-author/charref
        */
        content: "›";
        transform: rotate(90deg);
        font-size: 1.5rem;
        height: 100%;
        position: absolute;
        right: 5px;
        top: 0;
        pointer-events: none;
      }
    }
    
    & .multi-select-drop-down {
      position: absolute;
      width: 100%;
      overflow-y: auto;
      padding: 10px;
      padding-top: 15px;
      border: 1px solid darken($geyser-gray, 10%);
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

      /* 
        ---------------------------
        Custom Checkbox Styles (https://www.w3schools.com/howto/howto_css_custom_checkbox.asp)
        ---------------------------
        Customize the label (the container).
      */
      & .container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        user-select: none;
        /* On mouse-over, add a grey background color. */
        &:hover input ~ .checkmark {
          background-color: $geyser-gray;
        }

        /* Hide the browser's default checkbox. */
        & input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
          /* When the checkbox is checked, make the border blue, add a blue background, and remove the box-shadow. */
          &:checked ~ .checkmark {
            border-color: $kemper-blue;
            background-color: $kemper-blue;
            box-shadow: none;
            /* Show the checkmark when checked. */
            &:after {
              display: block;
            }
          }
        }

        /* Create a custom checkbox. */
        & .checkmark {
          position: absolute;
          top: -3px;
          left: 0;
          height: 25px;
          width: 25px;
          border: 1px solid darken($geyser-gray, 10%);
          box-shadow: 1px 1px 1px darken($geyser-gray, 10%);
          background-color: white;
          &:after {
            /* Create the checkmark/indicator (hidden when not checked). */
            content: "";
            position: absolute;
            display: none;
            /* Style the checkmark/indicator. */
            left: 7px;
            top: -1px;
            width: 10px;
            height: 20px;
            border: solid white;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
          }
        }
      }
    }
  }
</style>
