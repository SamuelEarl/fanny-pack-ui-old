<script lang="ts">
  import { SelectMulti } from "/src/lib";

  let suvOptions = ["oversized wheels", "mud tires", "mud guards", "trail running boards", "roof rack"];
  let selectedSuvOptions = ["mud tires"];

  let suvOptionsObjects = [
    { label: "Oversized Wheels", value: "oversizedWheels" },
    { label: "Mud Tires", value: "mudTires" },
    { label: "Mud Guards", value: "mudGuards" },
    { label: "Trail Running Boards", value: "trailRunningBoards" },
    { label: "Roof Rack", value: "roofRack" },
  ];
  let selectedSuvOptionsObjects = [suvOptionsObjects[1]];
</script>


# Select (multi)

Because of the different ways of selecting options (depending on the browser), and because you have to inform the user that multiple selection is available, it is more user-friendly to use checkboxes instead of a `<select>` element with the `multiple` attribute. See https://www.w3schools.com/tags/att_select_multiple.asp.

This component is essentially the [`<CheckboxGroup>`](/components/checkbox-group) component inside a dropdown menu.

---

## Example Usage

### "string" (or "number") arrayType

<SelectMulti
  label="Select the options for your SUV"
  tooltipText="{`Select as many \n\n as you want`}"
  valuesArray={suvOptions}
  arrayType="string"
  bind:selectedValues={selectedSuvOptions}
/>

<br>

<div>Value of <code>selectedSuvOptions</code>: <code>{JSON.stringify(selectedSuvOptions)}</code></div>

```svelte
<script>
  import { SelectMulti } from "@fanny-pack-ui/svelte-kit";

  let suvOptions = ["oversized wheels", "mud tires", "mud guards", "trail running boards", "roof rack" ];
  let selectedSuvOptions = ["mud tires"];
</script>

<SelectMulti
  label="Select the options for your SUV"
  tooltipText="{`Select as many \n\n as you want`}"
  valuesArray={suvOptions}
  arrayType="string"
  bind:selectedValues={selectedSuvOptions}
/>
```

*NOTE: This component will preserve the order in which a user selects options. This feature can come in handy in certain types of applications and use cases.*

<br>

## "object" arrayType

<SelectMulti
  label="Select the options for your SUV"
  tooltipText="Select as many as you want"
  valuesArray={suvOptionsObjects}
  arrayType="object"
  bind:selectedValues={selectedSuvOptionsObjects}
/>

<br>

<div>Value of <code>selectedSuvOptionsObjects</code>: <code>{JSON.stringify(selectedSuvOptionsObjects)}</code></div>

```svelte
<script>
  import { SelectMulti } from "@fanny-pack-ui/svelte-kit";

  let suvOptionsObjects = [
    { label: "Oversized Wheels", value: "oversizedWheels" },
    { label: "Mud Tires", value: "mudTires" },
    { label: "Mud Guards", value: "mudGuards" },
    { label: "Trail Running Boards", value: "trailRunningBoards" },
    { label: "Roof Rack", value: "roofRack" },
  ];
  let selectedSuvOptionsObjects = [suvOptionsObjects[1]];
</script>

<SelectMulti
  label="Select the options for your SUV"
  tooltipText="Select as many as you want"
  valuesArray={suvOptionsObjects}
  arrayType="object"
  bind:selectedValues={selectedSuvOptionsObjects}
/>
```

Note that if you pass an array of objects to the `valuesArray` prop, then each object inside the array should have `label` and `value` properties.

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `label` (optional) | `string` | Any string | NA | The text for the `<label>` element that is displayed above the `<select>` element. If this prop is not provided, then no label will be displayed. |
| `tooltipText` (optional) | `string` | Any string | NA | This prop accepts a string argument that will act as the tooltip text when a user hovers over the tooltip element. Multi-line strings can be created with newline characters that are inside of backticks, which are inside of curly braces. (See the [Tooltip](/components/tooltip) component for code examples.) If no `tooltipText` is provided, then no tooltip will be displayed. |
| `valuesArray` | `array` | Any array | NA | The array that is passed to this prop is the array of values that will be looped over to create the checkboxes in the dropdown menu. |
| `arrayType` | `string` | `string`, `number`, `object` | `string` | This prop tells what type of data is in the `valuesArray` array that is passed to this component. |
| `bind:selectedValues` | `array` | Any array | `[]` (an empty array) | The array that is passed to this prop will hold the values that the user will select. This array will usually be an empty array, but if you want any values to be pre-selected, then you could include any of the values from the `valuesArray`. |
