<!--
  NOTES:
  * Localization: I think the browser will handle localization for the <input type="number"/> field. So users whose currency uses commas instead of periods to separate whole numbers from fractional numbers should be able to type commas into the number input field. I have not figured out how to test that though. There might be an option where I need to pass in a `lang` prop (or something like that) to handle localization for the number input field.
  * Internationalization API, see:
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
-->

<script lang="ts">
  import { tick } from "svelte";
  import { createId } from "../utils";
  import Label from "../Labels/Label.svelte";

  export let value = 0;
  export let locale = "en-US";
  export let currency = "USD";
  export let label = "";
  export let width = "full";
  export let placeholder = "";
  export let disabled = false;

  let componentId = createId();
  $: formattedValue = formatValue(value);
  let showNumberInput = false;
  let numberInput;

  async function handleClickTextInput() {
    showNumberInput = true;
    await tick();
    // Place the focus inside the number input field.
    numberInput.focus();
    // Highlight the value.
    numberInput.select();
  }

  /**
   * If the user clicks outside of the input field or presses "Enter" or "Esc",
   * then hide the "number" input field and show the "text" input field.
   */
  async function unfocus(event) {
    // NOTE: `event.keyCode` is deprecated. Use `event.key` instead. See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key.
    if (event.type === "blur" || event.key === "Enter" || event.key === "Escape" || event.key === "Tab") {
      // If a user deletes the number in the "number" input field and does not enter another number in its place, then `value` will be `null`. The `formatValue()` function will format `null` to be `$0.00`, so it will appear to be a valid value to the user. However, since `value` is actually `null` there could be negative consequences when `value` gets passed to another part of the app or saved to the database. To prevent any possible problems, the following `if` statement will set any values that are either `null` or `undefined` back to their default value of 0.
      // Also, if a user enters a negative value, then the following `if` statement will reset `value` to its default value of 0.
      if (value === null || value === undefined || value < 0) {
        value = 0;
      }
      // Remove all decimals numbers long than 2 decimal places.
      // Use the `toFixed()` method to handle decimal numbers. See https://javascript.info/number#imprecise-calculations.
      value = Number(value.toFixed(2));
      showNumberInput = false;
    }
  }

  function formatValue(value) {
    if (value > 0) {
      return new Intl.NumberFormat(locale, {style: "currency", currency: currency}).format(value);
    }
    else {
      return new Intl.NumberFormat(locale, {style: "currency", currency: currency}).format(0);
    }
  }
</script>


<Label {label} forId={`fpcl-input-${componentId}`} />
{#if showNumberInput}
  <!-- Using a "number" input here will allow a user's device to display a numeric virtual keyboard when the user clicks inside this input field. -->
  <input
    type="number"
    id={`fpcl-input-${componentId}`}
    class="{`${width}-width`}"
    step="0.01"
    min="0.00"
    placeholder={placeholder}
    disabled={disabled}
    bind:value={value}
    bind:this={numberInput}
    on:keyup={unfocus}
    on:blur={unfocus}
  />
{:else}
  <input
    type="text"
    id={`fpcl-input-${componentId}`}
    class="{`${width}-width`}"
    placeholder={placeholder}
    disabled={disabled}
    bind:value={formattedValue}
    on:click={handleClickTextInput}
  />
{/if}


<style>
  input {
    outline: none;
    padding: var(--fpcl-input-padding);
    border: var(--fpcl-input-border);
    border-radius: var(--fpcl-global-radius);
    background-color: var(--fpcl-input-bg-color);

    &.full-width {
      width: 100%;
    }
    &.auto-width {
      width: auto;
    }

    &::placeholder {
      color: var(--fpcl-input-placeholder-text-color);
    }

    &:hover, &:focus {
      box-shadow: var(--fpcl-input-box-shadow);
    }

    &:disabled {
      color: var(--fpcl-disabled-text-color);
      background-color: var(--fpcl-disabled-bg-color);
      cursor: default;
    }
  }
</style>
