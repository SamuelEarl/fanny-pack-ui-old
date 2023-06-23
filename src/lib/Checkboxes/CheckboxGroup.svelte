<script lang="ts">
  import { onMount } from "svelte";
  import { defaults } from "/src/defaults";
  // Importing an external CSS file into the style block does not work. When this component gets packaged up and then imported into another app the styles will not be included. So the styles need to be imported into the script block.
  import "./checkbox.css";

  // The `<SelectMulti>` component needs to use a componentId, so it passes a componentId into this component.
  export let componentId = "";
  export let checkboxGroupValues;
  export let valueLabel = null;
  export let selectedValues = [];
  export let disabled = false;
  let valuesDataType;

  onMount(() => {
    determineValuesDataType(checkboxGroupValues);
  });

  /**
   * This function will determine the data type of the data structures that are inside the `checkboxGroupValues` array.
   * The result will be either `array`, `object`, or `primitive`.
   */
   function determineValuesDataType(values) {
    try {
      if (values?.length > 0) {
        // NOTE: I am keeping this code here in case I want to support nested arrays as a `checkboxGroupValues` data structure.
        // `typeof values[0] === "object"` will return `true` for arrays, so it is necessary to check for arrays with Array.isArray() before checking for objects. Otherwise a `checkboxGroupValues` array that contains nested arrays will be designated as an array of objects.
        // if (Array.isArray(values[0])) {
        //   valuesDataType = "array";
        // }
        if (typeof values[0] === "object") {
          valuesDataType = "object";
        }
        else {
          valuesDataType = "primitive";
        }
      }
    }
    catch(err) {
      console.error("determineValuesDataType:", err);
    }
  }
</script>


{#if valuesDataType === "primitive"}
  {#each checkboxGroupValues as item}
    <!--
      IMPORTANT NOTE: 
      `bind:group` does not work with nested components: https://github.com/sveltejs/svelte/issues/2308
      So I have just copied and pasted the code from the Checkbox.svelte component into this component.
    -->
    <!-- In Svelte you would use the `bind:group` property if you want to include all the values from a group of checkboxes into a single array of values that would then get sent to the backend for processing. So if the <Checkbox> component is used as part of a group of checkboxes, then use `bind:group` to bind to the `selectedValues` prop that is passed into this component. Otherwise, if this is a single checkbox (i.e. not part of a group of checkboxes), then do not use the `bind:group` property. -->
    <label
      class="fp-checkbox-label-wrapper" 
      class:disabled
      style={`margin-bottom: ${defaults.checkboxMarginBottom}`}
    >
      <input
        type="checkbox"
        id={`fp-checkbox-input-${componentId}`}
        class="fp-checkbox-input"
        bind:group={selectedValues}
        value={item}
        {disabled}
        on:change
        on:input
      > {item}
      <span
        class="fp-checkbox-checkmark"
        style={`top: ${defaults.checkboxVerticalAlignment}`}
      ></span>
    </label><br>
  {/each}
{/if}

{#if valuesDataType === "object"}
  {#each checkboxGroupValues as obj}
    <label
      class="fp-checkbox-label-wrapper" 
      class:disabled
      style={`margin-bottom: ${defaults.checkboxMarginBottom}`}
    >
      <input
        type="checkbox" 
        id={`fp-checkbox-input-${componentId}`}
        class="fp-checkbox-input"
        bind:group={selectedValues} 
        value={obj}
        {disabled}
        on:change
        on:input
      > {obj[valueLabel]}
      <span
        class="fp-checkbox-checkmark"
        style={`top: ${defaults.checkboxVerticalAlignment}`}
      ></span>
    </label><br>
  {/each}
{/if}
