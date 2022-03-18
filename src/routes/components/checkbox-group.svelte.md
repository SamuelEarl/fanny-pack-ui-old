<script lang="ts">
  import { CheckboxGroup } from "/src/lib";

  let suvOptions = ["oversized wheels", "mud tires", "mud guards", "trail running boards", "roof rack"];
  let selectedSuvOptions = [];
</script>

# Checkbox Group
This component will create multiple checkboxes that are part of the same group. In a checkbox group, the selected values will populate a single array that could then be sent to the backend for storage or processing. 

The `<CheckboxGroup>` component might be useful in a scenario where you are working with a dynamic array of data and you don't know what values are in the dynamic array (so you wouldn't know what checkbox values would be needed when you are coding the form). In that kind of scenario the `<CheckboxGroup>` component could be used to display one checkbox for each element in the array. 

You can read more about this component under the "Plain HTML vs Svelte Checkboxes" heading toward the bottom of this page.

---

## Example Usage

Select any of the following options for your SUV:
<CheckboxGroup
  arrayType="string"
  checkboxGroupValues={suvOptions}
  bind:selectedValues={selectedSuvOptions}
/>

<div>Your selected options:</div>
{#if selectedSuvOptions.length === 0}
  <p><em>No options have been selected</em></p>
{:else}
  <ul>
    {#each selectedSuvOptions as option}
      <li>{option}</li>
    {/each}
  </ul>
{/if}

```svelte
<script>
  import { CheckboxGroup } from "fpcl";

  let suvOptions = ["oversized wheels", "mud tires", "mud guards", "trail running boards", "roof rack"];
  let selectedSuvOptions = [];
</script>

<CheckboxGroup
  arrayType="string"
  checkboxGroupValues={suvOptions}
  bind:selectedValues={selectedSuvOptions}
/>

<div>Your selected options:</div>
{#if selectedSuvOptions.length === 0}
  <p><em>No options have been selected</em></p>
{:else}
  <ul>
    {#each selectedSuvOptions as option}
      <li>{option}</li>
    {/each}
  </ul>
{/if}
```

<hr>

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `arrayType` | `string` | `string`, `number`, `object` | `string` | This prop tells what type of data is in the `checkboxGroupValues` array that is passed to this component. |
| `checkboxGroupValues` | `array` | any array | NA | The array that is passed to this prop is the array of values that will be looped over to create the checkboxes. |
| `selectedValues` | `array` | any array | `[]` (an empty array) | The array that is passed to this prop will hold the values that the user will select. This array will usually be an empty array, but if you want any values to be pre-selected, then you could include any of the values from the `checkboxGroupValues` array. |

<br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:change` | This component forwards the `change` event, so you can call an event handler when a user checks this `<Checkbox>` component. |
| `on:input` | This component forwards the `input` event, so you can call an event handler when a user checks this `<Checkbox>` component. You would setup and use the `input` event the same way you would setup and use the `change` event. |


## Plain HTML vs Svelte Checkboxes

### Plain HTML Checkboxes
In plain HTML, checkboxes are typically defined with `name`/`value` pairs inside a `<form>` element, like this:

```html
<form action="http://www.example.com" method="POST">
  <label>
  	<input type="checkbox" name="oversized wheels" value=true> Oversized Wheels
  </label>
  <br>
  <label>
  	<input type="checkbox" name="mud tires" value=true> Mud Tires
  </label>
  <br>
  <label>
  	<input type="checkbox" name="mud guards" value=true> Mud Guards
  </label>
  <br>
  <input type="submit" value="Submit">
</form>
```

Notice that each checkbox is independent of the others---there is no `group` attribute or option.

When the form is submitted, the request will include the `name`/`value` pairs in the `request body`, which would look like this (assuming the first two checkboxes were checked):

```
oversized wheels=true&mud tires=true 
```

### Svelte Checkboxes
In Svelte, you can also create individual checkboxes, similar to how you would in plain HTML. (The [`<Checkbox>`](/components/checkbox) component is an example of this.) But Svelte also gives you a `bind:group` option. The `bind:group` option allows you to group a set of checkboxes together and the selected values from those checkboxes will populate a single array that could then be sent to the backend for storage or processing. So instead of a set of `name`/`value` pairs for each checkbox, the request `body` would include an array that contains the values from all the checkboxes that the user selected.

So the `bind:group` option for Svelte checkboxes is a nice add-on feature that does not exist in plain HTML and you could use regular checkboxes instead of "grouped" checkboxes.

### Could I loop over a regular `<Checkbox>` component to create a group of checkboxes?
When creating "grouped" checkboxes, you cannot create them inside an `{#each}` loop like this:

```svelte
{#each suvOptions as option}
  <Checkbox checked={option} label={option} />
{/each}
```

At least one reason why this approach would not work is because you would have to work with two different arrays:
1. One array that could be looped over to provide all the checkbox values and labels.
2. Another array that you would have to bind the selected values to. But there is no easy way to bind the individually selected values to a second array.

So using two different arrays with a regular `<Checkbox>` component becomes very difficult (if not impossible) and the API would not be very user friendly. (You can read more information about this issue here: https://github.com/sveltejs/svelte/issues/2308.)

So it would be best to either create a series of regular `<Checkbox>` components and bind each one to its own variable or use this `<CheckboxGroup>` component, which will bind the checkbox values to an array.
