<!-- `<select>` elements are difficult to style while maintaining accessibility. The easiest (and possibly the best) way to create an accessible `<Select />` component is to use the native `<select>` element and simply style the button part while leaving the dropdown as is provided natively by the browser. See https://www.filamentgroup.com/lab/select-css.html -->

<script>import { onMount, afterUpdate } from "svelte";
import { Label } from "../Labels";
import { createId } from "../fp-utils";
export let label = "";
export let options;
export let optionValue = null;
export let optionLabel = null;
export let optgroup = null;
export let value;
export let disabled = false;
export let padding = "var(--select-default-padding)";
export let fontSize = "var(--select-default-font-size)";
let isActive = false;
let componentId = createId();
$: optionsDataType = typeof options[0] === "object" ? "object" : "primitive";
const optgroups = {};
onMount(() => {
    if (optgroup) {
        sortOptionsIntoOptgroups();
    }
});
afterUpdate(() => {
    if (optgroup) {
        sortOptionsIntoOptgroups();
    }
});
function sortOptionsIntoOptgroups() {
    try {
        const sortedOptions = options.sort(function (a, b) {
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
        for (let i = 0; i < sortedOptions.length; i++) {
            if (currentOptgroup !== sortedOptions[i][optgroup]) {
                currentOptgroup = sortedOptions[i][optgroup];
                optgroups[currentOptgroup] = [sortedOptions[i]];
            }
            else {
                optgroups[currentOptgroup].push(sortedOptions[i]);
            }
        }
    }
    catch (err) {
        console.error("sortOptionsIntoOptgroups:", err);
    }
}
</script>

<Label {label} forVal={`fp-select-btn-${componentId}`} id={componentId} />
<div class="select-wrapper" class:isActive class:disabled>
  <!-- For some reason the disabled <select> element doesn't style the background color or text color properly. So when this component is disabled, then the <select> element gets replaced with a <div> element for now - at least until I can figure out what is causing that issue. -->
  {#if disabled}
    <div class="disabled-replacement" style={`padding:${padding}; font-size:${fontSize};`}>
      {value}
    </div>
  {:else}
    <select
      class="select-native"
      style={`padding:${padding}; font-size:${fontSize};`}
      aria-labelledby={componentId} 
      bind:value={value}
      on:change
      {...$$restProps}
      {disabled}
      on:focus={() => isActive = true}
      on:blur={() => isActive = false}
    >
      {#if optionsDataType === "primitive"}
        {#each options as option}
          <option value={option}>{option}</option>
        {/each}
      {:else if optionsDataType === "object"}
        {#if optgroup}
          {#each Object.entries(optgroups) as [key, value]}
            <optgroup label={key}>
              {#each value as option}
                <option value={option[optionValue]}>{option[optionLabel]}</option>
              {/each}
            </optgroup>
          {/each}
        {:else}
          {#each options as option}
            <option value={option[optionValue]}>{option[optionLabel]}</option>
          {/each}
        {/if}
      {/if}
    </select>
  {/if}
  <svg width="1em" height="1em" fill="var(--custom-select-text-color, var(--text-color-default))" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="transform: rotate(90deg);" class:disabled>
    <path d="M15.7 11.3l-6-6c-0.4-0.4-1-0.4-1.4 0s-0.4 1 0 1.4l5.3 5.3-5.3 5.3c-0.4 0.4-0.4 1 0 1.4 0.2 0.2 0.4 0.3 0.7 0.3s0.5-0.1 0.7-0.3l6-6c0.4-0.4 0.4-1 0-1.4z"></path>
  </svg>
</div>

<style>
  .select-wrapper {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    border-radius: var(--border-radius);
    background-color: var(--bg-color-element-default);
    background-color: var(--custom-select-bg-color, var(--bg-color-element-default));
  }.select-wrapper.isActive {
      background-color: rgba(0, 0, 0, 0.1);
    }.select-wrapper.disabled {
      border-color: var(--border-color-disabled);
      background-color: var(--bg-color-element-disabled);
      color: var(--text-color-disabled);
    }.select-wrapper .disabled-replacement {
      width: 100%;
      border: var(--border-default);
      border-color: var(--border-color-disabled);
      border-radius: var(--border-radius);
      color: var(--text-color-disabled);
    }.select-wrapper .select-native {
      display: block;
      width: 100%;
      max-width: 100%;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      border: var(--border-default);
      border-color: var(--border-color-default);
      border-color: var(--custom-select-border-color, var(--border-color-default));
      border-radius: var(--border-radius);
      background-color: transparent;
      color: var(--text-color-default);
      color: var(--custom-select-text-color, var(--text-color-default));
      cursor: pointer;
      /* background-image: url('data:image/svg+xml,<svg width="1.2em" height="1.2em" fill="var(--custom-select-text-color, var(--text-color-default))" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="transform: rotate(90deg);"><path d="M15.7 11.3l-6-6c-0.4-0.4-1-0.4-1.4 0s-0.4 1 0 1.4l5.3 5.3-5.3 5.3c-0.4 0.4-0.4 1 0 1.4 0.2 0.2 0.4 0.3 0.7 0.3s0.5-0.1 0.7-0.3l6-6c0.4-0.4 0.4-1 0-1.4z"></path></svg>');
      background-repeat: no-repeat, repeat;
      background-position: right 0.7em top 50%, 0 0;
      background-size: 1em auto, 100%; */
    }.select-wrapper .select-native:hover {
        -webkit-box-shadow: 0 0 0 2px var(--border-color-default);
                box-shadow: 0 0 0 2px var(--border-color-default);
        -webkit-box-shadow: 0 0 0 2px var(--custom-select-border-color, var(--border-color-default));
                box-shadow: 0 0 0 2px var(--custom-select-border-color, var(--border-color-default));
      }.select-wrapper .select-native:focus {
        outline: none;
      }.select-wrapper .select-native option {
        font-weight: normal;
        color: var(--text-color-default);
        color: var(--custom-option-text-color, var(--text-color-default));
      }.select-wrapper .select-native::-ms-expand {
      display: none;
    }/* Support for rtl text, explicit support for Arabic and Hebrew */.select-wrapper *[dir="rtl"] .select-native,
    .select-wrapper :root:lang(ar) .select-native,
    .select-wrapper :root:lang(iw) .select-native {
      background-position: left 0.7em top 50%, 0 0;
      padding: 0.6em 0.8em 0.5em 1.4em;
    }/* Disabled styles */.select-wrapper .select-native:disabled,
    .select-wrapper .select-native[aria-disabled="true"] {
      border-color: var(--border-color-disabled);
      background-color: var(--bg-color-element-disabled);
      color: var(--text-color-disabled);
      pointer-events: none;
    }.select-wrapper svg {
      position: absolute;
      right: 0.7em;
      pointer-events: none;
      
      /* Disabled styles */
    }.select-wrapper svg.disabled {
        fill: var(--text-color-disabled);
      }</style>
