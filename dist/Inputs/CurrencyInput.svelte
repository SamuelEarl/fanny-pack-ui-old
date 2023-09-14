<!--
  NOTES:
  * Localization: I think the browser will handle localization for the <input type="number"/> field. So users whose currency uses commas instead of periods to separate whole numbers from fractional numbers should be able to type commas into the number input field. I have not figured out how to test that though. There might be an option where I need to pass in a `lang` prop (or something like that) to handle localization for the number input field.
  * Internationalization API, see:
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
-->

<script>import { tick, createEventDispatcher } from "svelte";
import { createId } from "../fp-utils";
import { Label } from "../Labels";
export let value = 0;
export let valAlign = "right";
export let locale = "en-US";
export let currency = "USD";
export let label = "";
export let padding = "var(--input-default-padding)";
export let fontSize = "var(--input-default-font-size)";
export let labelAlign = "right";
export let placeholder = "";
export let disabled = false;
const dispatch = createEventDispatcher();
let componentId = createId();
$: formattedValue = formatValue(value);
let showNumberInput = false;
let numberInput;
const inputStyles = `padding:${padding}; font-size:${fontSize};`;
async function handleTextInputFocus() {
    showNumberInput = true;
    await tick();
    numberInput.focus();
    numberInput.select();
}
async function loseFocus(event) {
    if (event.type === "blur" || event.key === "Enter" || event.key === "Escape") {
        if (value === null || value === void 0 || value < 0) {
            value = 0;
        }
        value = Number(value.toFixed(2));
        showNumberInput = false;
        if (event.type === "blur") {
            dispatch("blur", event);
        }
    }
}
function formatValue(value2) {
    if (value2 > 0) {
        return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value2);
    }
    else {
        return new Intl.NumberFormat(locale, { style: "currency", currency }).format(0);
    }
}
</script>


<Label {label} forVal={`fp-input-${componentId}`} {labelAlign} />
{#if showNumberInput}
  <!-- Using a "number" input here will allow a user's device to display a numeric virtual keyboard when the user clicks inside this input field. -->
  <input
    type="number"
    id={`fp-input-${componentId}`}
    class={`fp-currency-input ${valAlign}`}
    style={inputStyles}
    step="0.01"
    min="0.00"
    placeholder={placeholder}
    disabled={disabled}
    bind:value={value}
    bind:this={numberInput}
    on:keyup={loseFocus}
    on:blur={loseFocus}
    on:change
    on:input
  />
{:else}
  <input
    type="text"
    id={`fp-input-${componentId}`}
    class={`fp-currency-input ${valAlign}`}
    style={inputStyles}
    placeholder={placeholder}
    disabled={disabled}
    bind:value={formattedValue}
    on:focus={handleTextInputFocus}
  />
{/if}


<style>
  /* Remove Arrows/Spinners */
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .fp-currency-input {
    width: 100%;
    outline: none;
    border: 1px solid;
    border-color: var(--border-color-default);
    border-color: var(--custom-input-border-color, var(--border-color-default));
    border-radius: var(--border-radius);
    background-color: var(--bg-color-element-default);
    background-color: var(--custom-input-bg-color, var(--bg-color-element-default));
    color: var(--text-color-default);
    color: var(--custom-input-text-color, var(--text-color-default));
  }

  .fp-currency-input.left {
      text-align: left;
    }

  .fp-currency-input.right {
      text-align: right;
    }

  .fp-currency-input::-webkit-input-placeholder {
      color: var(--placeholder-color-default);
      color: var(--custom-input-placeholder-text-color, var(--placeholder-color-default));
    }

  .fp-currency-input::-moz-placeholder {
      color: var(--placeholder-color-default);
      color: var(--custom-input-placeholder-text-color, var(--placeholder-color-default));
    }

  .fp-currency-input:-ms-input-placeholder {
      color: var(--placeholder-color-default);
      color: var(--custom-input-placeholder-text-color, var(--placeholder-color-default));
    }

  .fp-currency-input::-ms-input-placeholder {
      color: var(--placeholder-color-default);
      color: var(--custom-input-placeholder-text-color, var(--placeholder-color-default));
    }

  .fp-currency-input::placeholder {
      color: var(--placeholder-color-default);
      color: var(--custom-input-placeholder-text-color, var(--placeholder-color-default));
    }

  .fp-currency-input:hover, .fp-currency-input:focus {
      -webkit-box-shadow: 0 0 0 2px var(--border-color-default);
              box-shadow: 0 0 0 2px var(--border-color-default);
      -webkit-box-shadow: 0 0 0 2px var(--custom-input-border-color, var(--border-color-default));
              box-shadow: 0 0 0 2px var(--custom-input-border-color, var(--border-color-default));
    }

  .fp-currency-input:disabled {
      border-color: var(--border-color-disabled);
      -webkit-box-shadow: none;
              box-shadow: none;
      color: var(--text-color-disabled);
      background-color: var(--bg-color-element-disabled);
      cursor: default;
    }</style>
