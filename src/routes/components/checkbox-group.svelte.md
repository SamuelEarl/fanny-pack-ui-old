<script lang="ts">
  import { Checkbox, CheckboxGroup } from "/src/lib";

  let suvOptions = ["oversized wheels", "mud tires", "mud guards", "trail running boards", "roof rack"];
  let selectedSuvOptions = [];

  let suvOptionsObjects = [
    { label: "Oversized Wheels", value: "oversizedWheels" },
    { label: "Mud Tires", value: "mudTires" },
    { label: "Mud Guards", value: "mudGuards" },
    { label: "Trail Running Boards", value: "trailRunningBoards" },
    { label: "Roof Rack", value: "roofRack" },
  ];
  let selectedSuvOptionsObjects = [];
</script>

# Checkbox Group
This component will create multiple checkboxes that are part of the same group. In a checkbox group, the selected values will populate a single array that could then be sent to the backend for storage or processing. 

The `<CheckboxGroup>` component might be useful in a scenario where you are working with a dynamic array of data and you don't know what values are in the dynamic array (so you wouldn't know what checkbox values would be needed when you are coding the form). In that kind of scenario the `<CheckboxGroup>` component could be used to display one checkbox for each element in the array. 

You can read more about this component under the "Plain HTML vs Svelte Checkboxes" heading toward the bottom of this page.

---

## Example Usage

### "string" (or "number") arrayType

<p>Select any of the following options for your SUV:</p>
<CheckboxGroup
  checkboxGroupValues={suvOptions}
  arrayType="string"
  bind:selectedValues={selectedSuvOptions}
  disabled={false}
/>

<div>Value of <code>selectedSuvOptions</code>: <code>{JSON.stringify(selectedSuvOptions)}</code></div>


```svelte
<script>
  import { CheckboxGroup } from "fpcl";

  let suvOptions = ["oversized wheels", "mud tires", "mud guards", "trail running boards", "roof rack"];
  let selectedSuvOptions = [];
</script>

<p>Select any of the following options for your SUV:</p>
<CheckboxGroup
  checkboxGroupValues={suvOptions}
  arrayType="string"
  bind:selectedValues={selectedSuvOptions}
  disabled={false}
/>

<div>Value of <code>selectedSuvOptions</code>: <code>{JSON.stringify(selectedSuvOptions)}</code></div>
```

<br>

### "object" arrayType

<p>Select any of the following options for your SUV:</p>
<CheckboxGroup
  checkboxGroupValues={suvOptionsObjects}
  arrayType="object"
  bind:selectedValues={selectedSuvOptionsObjects}
  disabled={false}
/>

<div>Value of <code>selectedSuvOptionsObjects</code>: <code>{JSON.stringify(selectedSuvOptionsObjects)}</code></div>

```svelte
<script>
  import { CheckboxGroup } from "fpcl";

  let suvOptionsObjects = [
    { label: "Oversized Wheels", value: "oversizedWheels" },
    { label: "Mud Tires", value: "mudTires" },
    { label: "Mud Guards", value: "mudGuards" },
    { label: "Trail Running Boards", value: "trailRunningBoards" },
    { label: "Roof Rack", value: "roofRack" },
  ];
  let selectedSuvOptionsObjects = [];
</script>

<p>Select any of the following options for your SUV:</p>
<CheckboxGroup
  checkboxGroupValues={suvOptionsObjects}
  arrayType="object"
  bind:selectedValues={selectedSuvOptionsObjects}
  disabled={false}
/>

<div>Value of <code>selectedSuvOptions</code>: <code>{JSON.stringify(selectedSuvOptions)}</code></div>
```

Note that if you pass an array of objects to the `optionsArray` prop, then each object inside the array should have `label` and `value` properties.

<hr>

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `checkboxGroupValues` | `array` | Any array | NA | The array that is passed to this prop is the array of values that will be looped over to create the checkboxes. |
| `arrayType` | `string` | `string`, `number`, `object` | `string` | This prop tells what type of data is in the `checkboxGroupValues` array that is passed to this component. |
| `bind:selectedValues` | `array` | Any array | `[]` (an empty array) | The array that is passed to this prop will hold the values that the user will select. This array will usually be an empty array, but if you want any values to be pre-selected, then you could include any of the values from the `checkboxGroupValues` array. |
| `disabled` | `boolean` | `true`, `false` | `false` | This will disable all the checkboxes in the group. |

<br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:change` | This component forwards the `change` event, so you can call an event handler when a user checks this `<Checkbox>` component. |
| `on:input` | This component forwards the `input` event, so you can call an event handler when a user checks this `<Checkbox>` component. You would setup and use the `input` event the same way you would setup and use the `change` event. |

<br>

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

Notice that each checkbox is independent of the others. In other words, there is no `group` attribute or option.

When the form is submitted, the request will include the `name`/`value` pairs in the `request body`, which would look like this (assuming the first two checkboxes were checked):

```
oversized wheels=true&mud tires=true 
```

### Svelte Checkboxes
In Svelte, you can also create individual checkboxes, similar to how you would in plain HTML. (The [`<Checkbox>`](/components/checkbox) component is an example of this.) But Svelte also gives you a `bind:group` option. The `bind:group` option allows you to group a set of checkboxes together and the selected values from those checkboxes will populate a single array that could then be sent to the backend for storage or processing. So instead of a set of `name`/`value` pairs for each checkbox, the request `body` would include an array that contains the values from all the checkboxes that the user selected.

So the `bind:group` option for Svelte checkboxes is a nice add-on feature that does not exist in plain HTML. So when working with Svelte checkboxes, you could use either regular checkboxes or "grouped" checkboxes.

### Could I loop over a regular `<Checkbox>` component to create a group of checkboxes?
When creating "grouped" checkboxes, you could create them using regular `<Checkbox>` components inside an `{#each}` loop, but you might not get the results you want. This is one example of what that might look like in code:

```svelte
<script>
  let suvOptions = ["oversized wheels", "mud tires", "mud guards", "trail running boards", "roof rack"];
  let selectedSuvOptions = [];
</script>

<p>Select any of the following options for your SUV:</p>
{#each suvOptions as option, index}
  <Checkbox bind:checked={selectedSuvOptions[index]} label={option} />
{/each}
<div>Value of <code>selectedSuvOptions</code>: <code>{JSON.stringify(selectedSuvOptions)}</code></div>
```

But this is how the above code would actually work:

<p>Select any of the following options for your SUV:</p>
{#each suvOptions as option, index}
  <Checkbox bind:checked={selectedSuvOptions[index]} label={option} />
{/each}
<div>Value of <code>selectedSuvOptions</code>: <code>{JSON.stringify(selectedSuvOptions)}</code></div>

<br>

You can see that the `selectedSuvOptions` array gets populated, but it gets populated with `true`, `false`, and `null` values instead of the value of the checkbox that was selected. This may or may not work for your situation. There are other ways to work with "grouped" checkboxes and you can read more about this issue here: https://github.com/sveltejs/svelte/issues/2308.)

In most cases it would probably be best to either create a series of regular `<Checkbox>` components and bind each one to its own variable or use this `<CheckboxGroup>` component, which will bind the checkbox values to an array.
