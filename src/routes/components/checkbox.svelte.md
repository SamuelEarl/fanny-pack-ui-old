<script lang="ts">
  import { Checkbox, CheckboxGroup } from "/src/lib";

  let pto = false;
  let ptoLabel = "Would you like fries with that?";

  let toppingOptions = ["pepperoni", "bacon", "sausage", "olives", "green peppers"];
  let selectedToppings = [];
</script>

# Checkbox

---

## Example Usage

### A single checkbox
<Checkbox
  bind:checked={pto}
  label={ptoLabel}
/>

<p>Your selection: <strong>{pto}</strong></p>

<br>

### A group of checkboxes
In a group of checkboxes the selected values will populate an array that could then be sent to the backend for storage or processing.

<!-- I want to figure out how to simply pass a <Checkbox> component into an {#each} loop rather than do the following (commented out code), which is not intuitive. This seems to not work due to the error described here: https://github.com/sveltejs/svelte/issues/2308 -->
<CheckboxGroup
  arrayType="string"
  checkboxGroupValues={toppingOptions}
  bind:group={selectedToppings}
/>


<!-- {#each toppingOptions as topping}
  <Checkbox
    bind:group={selectedToppings}
    value={topping}
    label={topping}
  />
{/each} -->

<p>Your selected toppings:</p>
<ul>
  {#if selectedToppings.length === 0}
    <li>No toppings have been selected</li>
  {:else}
    {#each selectedToppings as topping}
      <li>{topping}</li>
    {/each}
  {/if}
</ul>
