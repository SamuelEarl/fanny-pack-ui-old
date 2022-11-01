<!--
  I borrowed some ideas from the Custom Select Box on this How To page:
  https://www.w3schools.com/howto/howto_custom_select.asp
-->

<script lang="ts">
  import { onMount, tick, createEventDispatcher } from "svelte";
  import { Label } from "../Labels";
  import { createId, calculateOptionsListHeight } from "../fpui-utils";

  export let label = "";
  export let id = "";
  export let options;
  export let optionLabel = null;
  export let optgroup = null;
  export let value;
  export let size = "md";
  export let disabled = false;

  const dispatch = createEventDispatcher();
  let componentId = createId();
  let optionsDataType;
  let optgroups = {};
  let selectOptionsList;
  let showSelectOptionsList = false;

  onMount(() => {
    determineOptionsDataType(options);
    if (optgroup) {
      sortOptions();
    }
  });

  /**
   * This function will determine the data type of the data structures that are inside the `options` array.
   * The result will be either `array`, `object`, or `primitive`.
   */
  function determineOptionsDataType(options) {
    try {
      if (options?.length > 0) {
        // NOTE: I am keeping this code here in case I want to support nested arrays as an `options` data structure.
        // `typeof options[0] === "object"` will return `true` for arrays, so it is necessary to check for arrays with Array.isArray() before checking for objects. Otherwise an `options` array that contains nested arrays will be designated as an array of objects.
        // if (Array.isArray(options[0])) {
        //   optionsDataType = "array";
        // }
        if (typeof options[0] === "object") {
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

  /**
   * This function will group the `options` by the order of first appearance of the `optgroup` prop.
   * https://stackoverflow.com/questions/44887733/group-array-items-by-order-of-their-first-appearance
   * 
   * How does the JavaScript Array.sort() method work?
   * https://www.javascripttutorial.net/javascript-array-sort/#:~:text=The%20sort()%20method%20allows,first%20and%20largest%20value%20last.
   */
  function sortOptions() {
    try {
      options.sort(function(a, b) {        
        // If `(a[optgroup] !== b[optgroup])`, then sort the two elements so that b (the first element) stays in the lower index position (i.e. b comes first).
        if (a[optgroup] !== b[optgroup]) {
          let indexA = options.findIndex(option => option[optgroup] === a[optgroup]);
          let indexB = options.findIndex(option => option[optgroup] === b[optgroup]);
          return indexA - indexB;
        }
        // Otherwise leave them where they are (i.e. do not sort them).
        else {
          return 0;
        }
      });

      let currentOptgroup = "";
      for (let i = 0; i < options.length; i++) {
        if (currentOptgroup !== options[i][optgroup]) {
          // Update the currentOptgroup value.
          currentOptgroup = options[i][optgroup];
          optgroups[currentOptgroup] = [ options[i] ];
        }
        else {
          optgroups[currentOptgroup].push(options[i]);
        }
      }
    }
    catch(err) {
      console.error("sortOptions:", err);
    }
  }

  async function toggleOptionsList() {
    showSelectOptionsList = !showSelectOptionsList;
    // There is no need to run the following code if the options list is hidden, so only run it if the options list is shown.
    if (showSelectOptionsList)  {
      calculateOptionsListHeight(componentId, showSelectOptionsList, tick, window);
      // Wait for the options list element to be displayed in the DOM before setting `focus()` on it.
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
  <select bind:value={value} on:change>
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

  <!-- When the `fpui-select-options-list` element is opened, it receives focus. That allows the `fpui-select-options-list` to respond to the `blur` event and close the `fpui-select-options-list` when the user clicks outside of it. However, if the user clicks on the `fpui-select-btn` element, then the `on:click={toggleOptionsList}` listener/handler causes the `fpui-select-options-list` element to immediately open again after the `blur` event has fired and then closed the `fpui-select-options-list`. However, the `active` class uses a `pointer-events: none` CSS rule to disable any pointer events on both the `fpui-select-btn` and `fpui-select-btn-overlay` elements when they are active. So the click event will not conflict with the `blur` event. -->  
  <div
    id={`fpui-select-btn-${componentId}`} 
    class="{`fpui-select-btn ${size}`}" 
    class:active={showSelectOptionsList} 
    on:click={toggleOptionsList}
  >
    <div 
      class="{`fpui-select-btn-overlay ${size}`}" 
      class:active={showSelectOptionsList} 
      title={optionsDataType === "primitive" ? value : value[optionLabel]}
    >
      {#if optionsDataType === "primitive"}
        {value}
      {:else if optionsDataType === "object"}
        {value[optionLabel]}
      {/if}
    </div>
  </div>

  {#if showSelectOptionsList}
    <div
      id={`fpui-select-options-list-${componentId}`}
      class="fpui-select-options-list"
      tabindex="-1"
      bind:this={selectOptionsList}
      on:blur={(event) => {
        showSelectOptionsList = false;
      }}
    >
      {#if optionsDataType === "primitive"}
        {#each options as option}
          <div 
            class="{`fpui-select-option ${size}`}"
            on:click={() => setSelectedOption(option)}
            title={option}
          >
            {option}
          </div>
        {/each}
      
      {:else if optionsDataType === "object"}
        {#if optgroup}
          {#each Object.entries(optgroups) as [key, value]}
            <div class="{`fpui-select-optgroup-label ${size}`}" title={key}>{key}</div>
            {#each value as option}
              <div 
                class="{`fpui-select-option ${size} optgroup`}"
                on:click={() => setSelectedOption(option)}
                title={option[optionLabel]}
              >
                {option[optionLabel]}
              </div>
            {/each}
          {/each}
        {:else}
          {#each options as option}
            <div 
              class="{`fpui-select-option ${size}`}"
              on:click={() => setSelectedOption(option)}
              title={option[optionLabel]}
            >
              {option[optionLabel]}
            </div>
          {/each}
        {/if}

      {/if}
    </div>
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

    & .fpui-select-btn {
      border: 1px solid;
      border-color: var(--custom-select-border-color, var(--fpui-select-border-color, #c7c7c7));
      border-radius: var(--fpui-select-border-radius);
      background-color: var(--custom-select-bg-color, var(--fpui-select-bg-color, white));
      color: var(--custom-select-text-color, var(--fpui-select-text-color, black));
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 0 1px var(--custom-select-border-color, var(--fpui-select-border-color, #c7c7c7));
      }

      /* Style the arrow inside the select element */
      &:after {
        position: absolute;
        content: "›";
        top: 45%;
        right: 0;
        width: 0;
        height: 0;
        transform: rotate(90deg);
        font-size: 1.5rem;
      }

      &.sm:after {
        top: 40%;
      }

      &.lg:after {
        font-size: 2rem;
      }

      &.active {
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        pointer-events: none;
      }

      /* The overlay contains the text for the selected option. */
      & .fpui-select-btn-overlay {
        /* Cut off any text that overflows the space provided for this Select component: */
        /* https://www.w3schools.com/cssref/css3_pr_text-overflow.asp */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;

        /* Change the padding and font-size for different sizes of the <Select> component. */
        &.sm {
          padding: var(--fpui-select-btn-padding-sm, 5px);
          font-size: var(--font-size-sm, 12px);
        }
        &.md {
          padding: var(--fpui-select-btn-padding-md, 10px);
          font-size: var(--font-size-base, 16px);
        }
        &.lg {
          padding: var(--fpui-select-btn-padding-lg, 15px);
          font-size: var(--font-size-lg, 20px);
        }
        
        &.active {
          border-radius: var(--border-radius) var(--border-radius) 0 0;
          background-color: rgba(0, 0, 0, 0.1);
          pointer-events: none;
        }
      }
    }
    
    & .fpui-select-options-list {
      position: absolute;
      left: 0;
      right: 0;
      overflow-y: auto;
      outline: none;
      border: 2px solid;
      border-color: var(--fpui-select-border-color);
      border-radius: 0 0 var(--fpui-select-border-radius) var(--fpui-select-border-radius);
      box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.1);
      background-color: var(--fpui-select-options-list-bg-color, white);
      color: var(--fpui-select-text-color);
      z-index: 100;

      & .fpui-select-optgroup-label {
        border: 1px solid;
        border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
        font-weight: bold;
        pointer-events: none;
        /* Cut off any text that overflows the space provided for this Select component: */
        /* https://www.w3schools.com/cssref/css3_pr_text-overflow.asp */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &.sm {
          padding: var(--fpui-select-option-padding-sm, 5px);
          font-size: var(--font-size-sm, 12px);
        }
        &.md {
          padding: var(--fpui-select-option-padding-md, 10px);
          font-size: var(--font-size-base, 16px);
        }
        &.lg {
          padding: var(--fpui-select-option-padding-lg, 15px);
          font-size: var(--font-size-lg, 20px);
        }
      }

      & .fpui-select-option {
        border: 1px solid;
        border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
        color: var(--text-color);
        /* Cut off any text that overflows the space provided for this Select component: */
        /* https://www.w3schools.com/cssref/css3_pr_text-overflow.asp */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        &.sm {
          padding: var(--fpui-select-option-padding-sm, 5px);
          font-size: var(--font-size-sm, 12px);

          &.optgroup {
            padding-left: calc(2 * var(--fpui-select-option-padding-sm, 5px));
          }
        }
        &.md {
          padding: var(--fpui-select-option-padding-md, 10px);
          font-size: var(--font-size-base, 16px);

          &.optgroup {
            padding-left: calc(2 * var(--fpui-select-option-padding-md, 10px));
          }
        }
        &.lg {
          padding: var(--fpui-select-option-padding-lg, 15px);
          font-size: var(--font-size-lg, 20px);

          &.optgroup {
            padding-left: calc(2 * var(--fpui-select-option-padding-lg, 15px));
          }
        }

        /* For the last option in the select dropdown, make the bottom border 
        transparent so it looks hidden and gives a sharper appearance. */
        &:last-child {
          border-bottom-color: transparent;
        }
      }
    }
  }
</style>
