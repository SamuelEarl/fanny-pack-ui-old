<!--
  I borrowed some ideas from the Custom Select Box on this How To page:
  https://www.w3schools.com/howto/howto_custom_select.asp
-->

<script>import { onMount, afterUpdate, tick, createEventDispatcher } from "svelte";
import { Label } from "../Labels";
import { createId, calculateOptionsListHeight } from "../fp-utils";
export let label = "";
export let id = "";
export let options;
export let optionLabel = null;
export let optgroup = null;
export let value;
export let disabled = false;
export let padding = "var(--select-default-padding)";
export let fontSize = "var(--select-default-font-size)";
const dispatch = createEventDispatcher();
let componentId = createId();
let optionsDataType;
let optgroups = {};
let selectOptionsList;
let showSelectOptionsList = false;
const selectStyles = `padding:${padding}; font-size:${fontSize};`;
onMount(() => {
    determineOptionsDataType(options);
    if (optgroup) {
        sortOptions();
    }
});
afterUpdate(() => {
    determineOptionsDataType(options);
    if (optgroup) {
        sortOptions();
    }
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
function sortOptions() {
    try {
        options.sort(function (a, b) {
            if (a[optgroup] !== b[optgroup]) {
                let indexA = options.findIndex((option) => option[optgroup] === a[optgroup]);
                let indexB = options.findIndex((option) => option[optgroup] === b[optgroup]);
                return indexA - indexB;
            }
            else {
                return 0;
            }
        });
        let currentOptgroup = "";
        for (let i = 0; i < options.length; i++) {
            if (currentOptgroup !== options[i][optgroup]) {
                currentOptgroup = options[i][optgroup];
                optgroups[currentOptgroup] = [options[i]];
            }
            else {
                optgroups[currentOptgroup].push(options[i]);
            }
        }
    }
    catch (err) {
        console.error("sortOptions:", err);
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
function setSelectedOption(option) {
    value = option;
    toggleOptionsList();
    dispatch("change", option);
}
</script>


<Label {label} forVal={`fp-select-btn-${componentId}`} />
<div
  {id}
  class={`fp-select-container fp-select-container-${componentId}`}
>
  <!-- The <select> element is kept here, but it is hidden to preserve accessibility. -->
  <select bind:value={value} on:change {disabled}>
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

  <!-- When the `fp-select-options-list` element is opened, it receives focus. That allows the `fp-select-options-list` to respond to the `blur` event and close the `fp-select-options-list` when the user clicks outside of it. However, if the user clicks on the `fp-select-btn` element, then the `on:click={toggleOptionsList}` listener/handler causes the `fp-select-options-list` element to immediately open again after the `blur` event has fired and then closed the `fp-select-options-list`. However, the `active` class uses a `pointer-events: none` CSS rule to disable any pointer events on both the `fp-select-btn` and `fp-select-btn-overlay` elements when they are active. So the click event will not conflict with the `blur` event. -->  
  <div
    id={`fp-select-btn-${componentId}`} 
    class="fp-select-btn" 
    class:active={showSelectOptionsList}
    class:disabled={disabled}
    on:click={() => {
      if (disabled) return;
      toggleOptionsList();
    }}
  >
    <div 
      class="fp-select-btn-overlay" 
      class:active={showSelectOptionsList}
      style={selectStyles}
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
      id={`fp-select-options-list-${componentId}`}
      class="fp-select-options-list"
      tabindex="-1"
      bind:this={selectOptionsList}
      on:blur={(event) => {
        showSelectOptionsList = false;
      }}
    >
      {#if optionsDataType === "primitive"}
        {#each options as option}
          <div 
            class="fp-select-option"
            style={selectStyles}
            on:click={() => setSelectedOption(option)}
            title={option}
          >
            {option}
          </div>
        {/each}
      
      {:else if optionsDataType === "object"}
        <!-- List the options under their respective optgroups. -->
        {#if optgroup}
          {#each Object.entries(optgroups) as [key, value]}
            <div 
              class="fp-select-optgroup-label" 
              style={selectStyles}
              title={key}
            >
              {key}
            </div>
            {#each value as option}
              <div 
                class="fp-select-option"
                style={`${selectStyles} padding-left: calc(2 * ${padding});`}
                on:click={() => setSelectedOption(option)}
                title={option[optionLabel]}
              >
                {option[optionLabel]}
              </div>
            {/each}
          {/each}
        <!-- List the options without optgroups. -->
        {:else}
          {#each options as option}
            <div 
              class="fp-select-option"
              style={selectStyles}
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
  .fp-select-container {
    width: 100%;
    position: relative;

    /* Hide the <select> element. */
  }
  .fp-select-container select {
      display: none;
    }
  .fp-select-container .fp-select-btn {
      border: var(--border-default);
      border-color: var(--border-color-default);
      border-color: var(--custom-select-border-color, var(--border-color-default));
      border-radius: var(--border-radius);
      background-color: var(--bg-color-element-default);
      background-color: var(--custom-select-bg-color, var(--bg-color-element-default));
      color: var(--text-color-default);
      color: var(--custom-select-text-color, var(--text-color-default));
      cursor: pointer;
    }
  .fp-select-container .fp-select-btn:hover {
        -webkit-box-shadow: 0 0 0 2px var(--border-color-default);
                box-shadow: 0 0 0 2px var(--border-color-default);
        -webkit-box-shadow: 0 0 0 2px var(--custom-select-border-color, var(--border-color-default));
                box-shadow: 0 0 0 2px var(--custom-select-border-color, var(--border-color-default));
      }
  /* Style the arrow inside the select element */
  .fp-select-container .fp-select-btn:after {
        position: absolute;
        content: "›";
        top: 45%;
        right: 0;
        width: 0;
        height: 0;
        -webkit-transform: rotate(90deg);
                transform: rotate(90deg);
        font-size: 1.5rem;
      }
  .fp-select-container .fp-select-btn.active {
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        pointer-events: none;
      }
  .fp-select-container .fp-select-btn.disabled {
        border-color: var(--border-color-disabled);
        background-color: var(--bg-color-element-disabled);
        color: var(--text-color-disabled);
        pointer-events: none;
      }
  /* The overlay contains the text for the selected option. */
  .fp-select-container .fp-select-btn .fp-select-btn-overlay {
        /* Cut off any text that overflows the space provided for this Select component: */
        /* https://www.w3schools.com/cssref/css3_pr_text-overflow.asp */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }
  .fp-select-container .fp-select-btn .fp-select-btn-overlay.active {
          border-radius: var(--border-radius) var(--border-radius) 0 0;
          background-color: rgba(0, 0, 0, 0.1);
          pointer-events: none;
        }
  .fp-select-container .fp-select-options-list {
      position: absolute;
      left: 0;
      right: 0;
      overflow-y: auto;
      outline: none;
      border: 2px solid;
      border-color: var(--border-color-default);
      border-radius: 0 0 var(--border-radius) var(--border-radius);
      -webkit-box-shadow: var(--box-shadow-depth);
              box-shadow: var(--box-shadow-depth);
      background-color: var(--white);
      color: var(--text-color-default);
      z-index: 100;
    }
  .fp-select-container .fp-select-options-list .fp-select-optgroup-label {
        border: 1px solid;
        border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
        font-weight: bold;
        pointer-events: none;
        /* Cut off any text that overflows the space provided for this Select component: */
        /* https://www.w3schools.com/cssref/css3_pr_text-overflow.asp */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
  .fp-select-container .fp-select-options-list .fp-select-option {
        border: 1px solid;
        border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
        color: var(--text-color-default);
        /* Cut off any text that overflows the space provided for this Select component: */
        /* https://www.w3schools.com/cssref/css3_pr_text-overflow.asp */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }
  .fp-select-container .fp-select-options-list .fp-select-option:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
  /* For the last option in the select dropdown, make the bottom border 
        transparent so it looks hidden and gives a sharper appearance. */
  .fp-select-container .fp-select-options-list .fp-select-option:last-child {
          border-bottom-color: transparent;
        }</style>
