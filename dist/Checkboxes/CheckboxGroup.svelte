<script>import { onMount } from "svelte";
import "./checkbox.css";
export let componentId = "";
export let checkboxGroupValues;
export let valueLabel = null;
export let selectedValues = [];
export let disabled = false;
export let marginBottom = "var(--checkbox-default-margin-bottom)";
export let verticalAlignment = "var(--checkbox-default-vertical-alignment)";
let valuesDataType;
const labelStyles = `margin-bottom: ${marginBottom}`;
const checkmarkStyles = `top: ${verticalAlignment}`;
onMount(() => {
    determineValuesDataType(checkboxGroupValues);
});
function determineValuesDataType(values) {
    try {
        if (values?.length > 0) {
            if (typeof values[0] === "object") {
                valuesDataType = "object";
            }
            else {
                valuesDataType = "primitive";
            }
        }
    }
    catch (err) {
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
    <!-- 
      * TODO: I need to add an `id` attribute to the checkbox elements (that does not conflict with the `id` attribute that is already here) and I need to add a `for` attribute on the <label> elements that uses the same value that is passed to the checkbox's `id` attribute. See the <Checkbox /> component for an example. 
      * NOTE: The <SelectMulti> component, which uses this <CheckboxGroup /> component, uses a componentId that is passed into this component. So I might need to recreate the <SelectMulti> component first (so it uses a accessible popup modal instead of the dropdown that it currently uses) and then I can come back to this component and fix the `id` and `for` attribute issue.
    -->
    <label
      class="fp-checkbox-label-wrapper" 
      class:disabled
      style={labelStyles}
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
        style={checkmarkStyles}
      ></span>
    </label><br>
  {/each}
{/if}

{#if valuesDataType === "object"}
  {#each checkboxGroupValues as obj}
    <label
      class="fp-checkbox-label-wrapper" 
      class:disabled
      style={labelStyles}
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
        style={checkmarkStyles}
      ></span>
    </label><br>
  {/each}
{/if}
