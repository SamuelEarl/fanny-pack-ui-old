<!--
  I borrowed some ideas from the Custom Select Box on this How To page:
  https://www.w3schools.com/howto/howto_custom_select.asp
-->

<!--
  TODOS:
  * Add an `optgroup` feature. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup.
  * Implement the `calculateMenuHeight()` function.
  * Add CSS Variables for colors and sizes.
  * Add the same style customization from the original <Select> component.
-->

<script lang="ts">
  import { onMount, tick, createEventDispatcher } from "svelte";
  import { Label } from "../Labels";
  import { createId } from "../fpui-utils";

  export let label = "";
  export let id = "";
  export let options;
  export let value;
  // The `labelIndex` is used for options arrays that contain nested arrays.
  export let labelIndex = 1;
  export let size = "md";

  const dispatch = createEventDispatcher();
  let componentId = createId();
  let optionsDataType;
  let selectOptionsList;
  let showSelectOptionsList = false;

  onMount(() => {
    determineOptionsDataType(options);
  });

  /**
   * This function will determine the data type of the data structures that are inside the `options` array.
   * The result will be either `array`, `object`, or `primitive`.
   */
  function determineOptionsDataType(options) {
    try {
      if (options?.length > 0) {
        // `typeof options[0] === "object"` will return `true` for arrays, so it is necessary to check for arrays with Array.isArray() before checking for objects. Otherwise an `options` array that contains nested arrays will be designated as an array of objects.
        if (Array.isArray(options[0])) {
          optionsDataType = "array";
        }
        else if (typeof options[0] === "object") {
          optionsDataType = "object";
        }
        else {
          optionsDataType = "primitive";
        }
      }
    }
    catch(err) {
      console.error("determineOptionsDataType:", err);
    }
  }

  async function toggleOptionsList() {
    showSelectOptionsList = !showSelectOptionsList;
    // There is no need to run the following code if the menu is hidden, so only run it if the menu is shown.
    if (showSelectOptionsList)  {
      // calculateMenuHeight(componentId, showSelectOptionsList, tick, window, document);
      // Wait for the menu element to be displayed in the DOM before setting `focus()` on it.
      await tick();
      selectOptionsList.focus();
    }
  }

  function setSelectedOption(option) {
    value = option;
    toggleOptionsList();
    dispatch("change", option);
  }
</script>


<Label {label} forVal={`fpui-select-btn-${componentId}`} />
<div
  {id}
  class={`fpui-select-container fpui-select-container-${componentId}`}
>
  <!-- The <select> element is kept here, but it is hidden to preserve accessibility. -->
  <select value={value} on:change>
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>

  <!-- When the `fpui-select-options-list` element is opened, it receives focus. That allows the `fpui-select-options-list` to respond to the `blur` event and close the `fpui-select-options-list` when the user clicks outside of it. However, if the user clicks on the `fpui-select-option-selected-overlay` element, then the `on:click={toggleOptionsList}` listener/handler causes the `fpui-select-options-list` element to immediately open again after the `blur` event has fired and closed the `fpui-select-options-list`. So if `showSelectOptionsList` is `true`, then the `fpui-select-option-selected-overlay` element will not include the `click` event so it does not conflict with the `blur` event. -->

  {#if optionsDataType === "primitive"}
    {#if showSelectOptionsList}
      <div class="fpui-select-option-selected active">
        <div class="fpui-select-option-selected-overlay active">
          {value}
        </div>
      </div>
    {:else}
      <div class="fpui-select-option-selected">
        <div class="fpui-select-option-selected-overlay" on:click={toggleOptionsList}>
          {value}
        </div>
      </div>
    {/if}
    {#if showSelectOptionsList}
      <div
        class="fpui-select-options-list"
        tabindex="-1"
        bind:this={selectOptionsList}
        on:blur={(event) => {
          showSelectOptionsList = false;
        }}
      >
        {#each options as option}
          <div 
            class="fpui-select-option"
            on:click={() => setSelectedOption(option)}
          >
            {option}
          </div>
        {/each}
      </div>
    {/if}

  {:else if optionsDataType === "object"}
    {#if showSelectOptionsList}
      <div class="fpui-select-option-selected active">
        <div class="fpui-select-option-selected-overlay active">
          {value.label}
        </div>
      </div>
    {:else}
      <div class="fpui-select-option-selected">
        <div class="fpui-select-option-selected-overlay" on:click={toggleOptionsList}>
          {value.label}
        </div>
      </div>
    {/if}
    {#if showSelectOptionsList}
      <div
        class="fpui-select-options-list"
        tabindex="-1"
        bind:this={selectOptionsList}
        on:blur={(event) => {
          showSelectOptionsList = false;
        }}
      >
        {#each options as option}
          <div 
            class="fpui-select-option"
            on:click={() => setSelectedOption(option)}
          >
            {option.label}
          </div>
        {/each}
      </div>
    {/if}

  {:else if optionsDataType === "array"}
    {#if showSelectOptionsList}
      <div class="fpui-select-option-selected active">
        <div class="fpui-select-option-selected-overlay active">
          {value[labelIndex]}
        </div>
      </div>
    {:else}
      <div class="fpui-select-option-selected">
        <div class="fpui-select-option-selected-overlay" on:click={toggleOptionsList}>
          {value[labelIndex]}
        </div>
      </div>
    {/if}
    {#if showSelectOptionsList}
      <div
        class="fpui-select-options-list"
        tabindex="-1"
        bind:this={selectOptionsList}
        on:blur={(event) => {
          showSelectOptionsList = false;
        }}
      >
        {#each options as option}
          <div 
            class="fpui-select-option"
            on:click={() => setSelectedOption(option)}
          >
            {option[labelIndex]}
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</div>


<style>
  /* The container must be positioned relative */
  .fpui-select-container {
    width: 100%;
    position: relative;

    /* Hide the <select> element. */
    & select {
      display: none;
    }

    & .fpui-select-option-selected {
      border: 1px solid var(--gray-60);
      border-radius: var(--border-radius);
      background-color: var(--white);

      &.active {
        border-radius: var(--border-radius) var(--border-radius) 0 0;
      }

      & .fpui-select-option-selected-overlay {
        height: 100%;
        color: var(--text-color);

        /* Style the arrow inside the select element */
        &:after {
          position: absolute;
          content: "";
          top: 14px;
          right: 10px;
          width: 0;
          height: 0;
          border: 6px solid transparent;
          border-color: var(--text-color) transparent transparent transparent;
        }
        
        &.active {
          border-radius: var(--border-radius) var(--border-radius) 0 0;
          background-color: rgba(0, 0, 0, 0.1);
        }
      
        /* Point the arrow upwards when the select box is open (active): */
        /* &:after {
          border-color: transparent transparent #fff transparent;
          top: 7px;
        } */
      }
    }

    /* Style the options, including the selected option: */
    & .fpui-select-option, & .fpui-select-option-selected-overlay {
      padding: 8px 16px;
      border: 1px solid transparent;
      cursor: pointer;
    }
    
    & .fpui-select-options-list {
      position: absolute;
      outline: none;
      border: 1px solid var(--gray-60);
      border-top: none;
      border-radius: 0 0 var(--border-radius) var(--border-radius);
      background-color: var(--white);
      top: 100%;
      left: 0;
      right: 0;
      z-index: 99;

      & .fpui-select-option {
        border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
        color: var(--text-color);

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        &:last-child {
          border-color: transparent;
        }
      }
    }
  }
</style>
