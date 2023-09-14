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


<script>import { onMount, tick } from "svelte";
import { createId, calculateOptionsListHeight } from "../fp-utils";
import { Button } from "../Buttons";
import { CheckboxGroup } from "../Checkboxes";
import { Label } from "../Labels";
export let label = "";
export let id = "";
export let options;
export let optionLabel = null;
export let optgroup = null;
export let values;
export let size = "md";
export let tooltipText = "";
export let disabled = false;
let componentId = createId();
let optgroups = {};
let selectOptionsList;
let showSelectOptionsList = false;
let optionsDataType;
$: arraySortedBySelectionOrder([...values]);
let previousArray = [...values];
onMount(() => {
    determineOptionsDataType(options);
});
function determineOptionsDataType(options2) {
    try {
        if (options2?.length > 0) {
            if (typeof options2[0] === "object") {
                optionsDataType = "object";
            }
            else {
                optionsDataType = "primitive";
            }
        }
    }
    catch (err) {
        console.error("determineOptionsDataType:", err);
    }
}
async function toggleOptionsList() {
    showSelectOptionsList = !showSelectOptionsList;
    if (showSelectOptionsList) {
        calculateOptionsListHeight(componentId, showSelectOptionsList, tick, window);
        await tick();
        selectOptionsList.focus();
    }
}
async function arraySortedBySelectionOrder(currentArray) {
    try {
        let elementsAddedToPreviousArray = currentArray.filter((element) => !previousArray.includes(element));
        let elementsRemovedFromPreviousArray = previousArray.filter((element) => !currentArray.includes(element));
        if (elementsRemovedFromPreviousArray.length === 1) {
            let index = previousArray.findIndex((element) => element === elementsRemovedFromPreviousArray[0]);
            if (index > -1) {
                previousArray.splice(index, 1);
            }
            currentArray = [...previousArray];
        }
        if (elementsRemovedFromPreviousArray.length > 1) {
            previousArray.length = 0;
            currentArray = [...previousArray];
        }
        if (elementsAddedToPreviousArray.length > 0) {
            previousArray = [...previousArray, ...elementsAddedToPreviousArray];
            currentArray = [...previousArray];
        }
        previousArray = [...currentArray];
        values = currentArray;
    }
    catch (err) {
        console.error("arraySortedBySelectionOrder Error:", err);
    }
}
function removeValue(index) {
    values.splice(index, 1);
    values = values;
}
</script>


<Label {label} forVal={`fp-select-btn-${componentId}`} {tooltipText} />
<div 
  {id}
  class="{`fp-select-multi-container fp-select-multi-container-${componentId}`}"
>
  <!-- The <select> element is kept here, but it is hidden to preserve accessibility. -->
  <select multiple bind:value={values} on:change>
    {#if optionsDataType === "object"}
      {#if optgroup}
        {#each Object.entries(optgroups) as [key, value]}
          <optgroup label={key}>
            {#each value as option}
              <option value={option[optionLabel]}>{option[optionLabel]}</option>
            {/each}
          </optgroup>
        {/each}
      {:else}
        {#each options as option}
          <option value={option[optionLabel]}>{option[optionLabel]}</option>
        {/each}
      {/if}
    {:else}
      {#each options as option}
        <option value={option}>{option}</option>
      {/each}
    {/if}
  </select>

  <div
    role="listbox" 
    aria-multiselectable="true" 
    id={`fp-select-btn-${componentId}`} 
    class={"fp-select-btn"}
    class:active={showSelectOptionsList}
    tabindex="-1"
    on:click={toggleOptionsList}
  >
    <div class="{`fp-select-btn-overlay ${size}`}" class:active={showSelectOptionsList}>
      <!-- This <div class="selected-values-container"> element will display all the options that the user has selected. -->
      <div class="selected-values-container">
        {#if values.length === 0}
          <em>No values selected</em>
        {:else}
          {#if optionsDataType === "primitive"}
            {#each values as item, index}
              <span class="value">
                <span class="value-text">{item}</span> <span class="remove-value" on:click={() => removeValue(index)}>&times;</span>
              </span>
            {/each}
          {:else if optionsDataType === "object"}
            {#each values as obj, index}
              <span class="value">
                <span class="value-text">{obj[optionLabel]}</span> <span class="remove-value" on:click={() => removeValue(index)}>&times;</span>
              </span>
            {/each}
          {/if}
        {/if}
      </div>
      <span class="fp-select-btn-arrow">›</span>
    </div>
  </div>

  {#if showSelectOptionsList}
    <div
      id={`fp-select-options-list-${componentId}`} 
      class="fp-select-options-list"
      tabindex="-1"
      bind:this={selectOptionsList}
      on:blur={(event) => {
        // If a user clicks a button or a checkbox inside the selectOptionsList, then the the selectOptionsList will lose the focus. So it is necessary for the selectOptionsList to receive focus again so it will close when a user clicks outside of it.
        selectOptionsList.focus();
        // The following `if` statement is basically saying that if the user clicks on the select-btn or on one of the select-all-btns or a checkbox, then do not hide the selectOptionsList. If the user clicks the select-btn, then the select-btn's on:click event will hide the selectOptionsList.
        // In a blur event, the "event.target" is the element that has lost focus. When a "blur" event occurs, how can I find out which element received the focus? Use "event.relatedTarget": https://stackoverflow.com/a/33325953.
        // Keep in mind that the element that is supposed to receive the focus needs to have a tabindex="-1" attribute in order to receive the focus. So in this case, I am trying to see if the user clicked on the `#fp-select-btn-${componentId}` element, so that element has to have a tabindex="-1" attribute in order to receive focus, which will allow me to see if that element was clicked. (If that element did not have a tabindex="-1" attribute, then it would show that the user clicked on the <body> element.) 
        // **If the user did click on the `#fp-select-btn-${componentId}` element, then do NOT set `showSelectOptionsList = false` because the `on:click` event in the `#fp-select-btn-${componentId}` will set `showSelectOptionsList = false`. If the user did NOT click on the `#fp-select-btn-${componentId}` element, then set `showSelectOptionsList = false`.**
        // If the event and the event.relatedTarget exist, then see if the id of the relatedTarget (i.e. the id of the element that was clicked) does NOT match the `#fp-select-btn-${componentId}` element. If all those checks return true, then hide the select menu.
        // I have also found that sometimes when I click outside of the selectOptionsList that event.relatedTarget === null. The following `if` statement will check for those scenarios too. So if `event.relatedTarget` does not exist, then set `showSelectOptionsList` to false.
        let elementId = event?.relatedTarget?.id ? event.relatedTarget.id : null;
        if (
          elementId !== `fp-select-btn-${componentId}` && 
          elementId !== `fp-select-all-btn-${componentId}` && 
          elementId !== `fp-checkbox-input-${componentId}`
        ) {
          showSelectOptionsList = false;
        }
      }}
    >
      <!-- NOTE: If I use `{#if !isEqual(options, values)}`, then (for some strange reason) the "Select all" button is displayed if the two arrays have the same elements, but in different orders. My guess is that the `isEqual` function is reading old data because if you click "Select all" again, then the `values` array will be updated in the UI to match the order of the `options`. In this case, it is probably fine to use `{#if options.length !== values.length}` because if the two arrays are the same length, then they will also have the same elements in them. -->
      {#if options.length !== values.length}
        <!-- If the user has at least one option selected, but fewer than the total number of options selected, then show the "Select all remaining" button. -->
        {#if values.length > 0 && values.length < options.length}
          <div class="select-all-btn">
            <Button
              id={`fp-select-all-btn-${componentId}`}
              size="sm"
              btnIcon=""
              on:click={() => values = [...options]}
            >Select all remaining</Button>
          </div>
        <!-- If the user has no options selected, then show the "Select all" button. -->
        {:else}
          <div class="select-all-btn">
            <Button
              id={`fp-select-all-btn-${componentId}`}
              size="sm"
              btnIcon=""
              on:click={() => values = [...options]}
            >Select all</Button>
          </div>
        {/if}
      <!-- If the user has all of the options selected, then show the "Deselect all" button. -->
      {:else}
        <div class="select-all-btn">
          <Button
            id={`fp-select-all-btn-${componentId}`}
            size="sm"
            btnIcon=""
            on:click={() => values.length = 0}
          >
            Deselect all
          </Button>
        </div>
      {/if}

      <!-- 
        TODO: The following commented code has usability attributes in it, so I don't want to remove this commented code until I have had a chance to create tests and see if the usability attributes work.
      -->
      <!-- {#if arrayType === "string" || arrayType === "number"}
        {#each options as item}          
          <label class="container">
            <input role="option" aria-selected={values.includes(item)} checked={values.includes(item)} type="checkbox" bind:group={values} value={item}> {item}
            <span class="checkmark"></span>
          </label>
        {/each}
      {/if}

      {#if arrayType === "objects"}
        {#each options as obj}
          <label class="container">
            <input role="option" aria-selected={values.includes(obj.value)} checked={values.includes(obj.value)} type="checkbox" bind:group={values} value={obj.value}> {obj.label}
            <span class="checkmark"></span>
          </label>
        {/each}
      {/if} -->

      <!--
        IMPORTANT NOTES:
        * Since the <CheckboxGroup> component works perfectly for the options in the select options list of this component, I am simply using that component here.
        * The `on:change={() => selectOptionsList.focus()}` event is necessary for this component to work in Firefox.
      -->
      {#if optionsDataType === "object"}
        <CheckboxGroup
          {componentId}
          checkboxGroupValues={options}
          valueLabel={optionLabel}
          bind:selectedValues={values}
          {disabled}
          on:change={() => selectOptionsList.focus()}
        />
      {:else}
        <CheckboxGroup
          {componentId}
          checkboxGroupValues={options}
          bind:selectedValues={values}
          {disabled}
          on:change={() => selectOptionsList.focus()}
        />
      {/if}
    </div>
  {/if}
</div>


<style>
  .fp-select-multi-container {
    position: relative;

    /* Hide the <select> element. */
  }.fp-select-multi-container select {
      display: none;
    }.fp-select-multi-container .fp-select-btn {
      position: relative;
      border: var(--border-default);
      border-radius: var(--border-radius);
      background-color: var(--bg-color-element-default);
      background-color: var(--custom-select-bg-color, var(--bg-color-element-default));
      color: var(--text-color-default);
      cursor: pointer;
    }.fp-select-multi-container .fp-select-btn:hover {
        -webkit-box-shadow: 0 0 0 2px var(--border-color-default);
                box-shadow: 0 0 0 2px var(--border-color-default);
        -webkit-box-shadow: 0 0 0 2px var(--custom-select-border-color, var(--border-color-default));
                box-shadow: 0 0 0 2px var(--custom-select-border-color, var(--border-color-default));
      }.fp-select-multi-container .fp-select-btn.active {
        pointer-events: none;
      }.fp-select-multi-container .fp-select-btn .fp-select-btn-overlay {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
            -ms-flex-pack: justify;
                justify-content: space-between;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
      }.fp-select-multi-container .fp-select-btn .fp-select-btn-overlay.active {
          background-color: rgba(0, 0, 0, 0.1);
          pointer-events: none;
        }.fp-select-multi-container .fp-select-btn .fp-select-btn-overlay.sm {
          padding: 5px;
          font-size: 12px;
          font-size: var(--font-size-sm, 12px);
        }.fp-select-multi-container .fp-select-btn .fp-select-btn-overlay.md {
          padding: 10px;
          font-size: 16px;
          font-size: var(--font-size-base, 16px);
        }.fp-select-multi-container .fp-select-btn .fp-select-btn-overlay.lg {
          padding: 15px;
          font-size: 20px;
          font-size: var(--font-size-lg, 20px);
        }.fp-select-multi-container .fp-select-btn .fp-select-btn-overlay .selected-values-container {
          -webkit-box-flex: 1;
              -ms-flex: 1;
                  flex: 1;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
        }.fp-select-multi-container .fp-select-btn .fp-select-btn-overlay .selected-values-container .value {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
                -ms-flex-align: center;
                    align-items: center;
            margin-right: 5px;
            padding: 0px 5px 0px 10px;
            border-radius: 20px;
            background-color: var(--primary-color);
            color: var(--text-color-for-primary-bg);
          }.fp-select-multi-container .fp-select-btn .fp-select-btn-overlay .selected-values-container .value .value-text {
              white-space: nowrap;
              cursor: default;
            }.fp-select-multi-container .fp-select-btn .fp-select-btn-overlay .selected-values-container .value .remove-value {
              padding: 0 5px;
              cursor: pointer;
            }.fp-select-multi-container .fp-select-btn .fp-select-btn-overlay .fp-select-btn-arrow {
          margin-left: 10px;
          -webkit-transform: rotate(90deg);
                  transform: rotate(90deg);
          font-size: 1.5rem;
          line-height: 1rem;
        }.fp-select-multi-container .fp-select-options-list {
      position: absolute;
      width: 100%;
      overflow-y: auto;
      padding: 10px;
      padding-top: 15px;
      outline: none;
      border: 2px solid;
      border-color: var(--border-color-default);
      border-radius: var(--border-radius);
      -webkit-box-shadow: var(--box-shadow-depth);
              box-shadow: var(--box-shadow-depth);
      background-color: var(--white);
      z-index: 100;
    }.fp-select-multi-container .fp-select-options-list .select-all-btn {
        margin-bottom: 15px;
      }</style>
