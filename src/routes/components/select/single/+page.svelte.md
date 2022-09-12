<script lang="ts">
  import { Select } from "/src/lib";

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let selectedMonth = "July";

  let monthObjects = [
    { shortMonth: "Jan", longMonth: "January" },
    { shortMonth: "Feb", longMonth: "February" },
    { shortMonth: "Mar", longMonth: "March" },
    { shortMonth: "Apr", longMonth: "April" },
    { shortMonth: "May", longMonth: "May" },
    { shortMonth: "Jun", longMonth: "June" },
    { shortMonth: "Jul", longMonth: "July" },
    { shortMonth: "Aug", longMonth: "August" },
    { shortMonth: "Sep", longMonth: "September" },
    { shortMonth: "Oct", longMonth: "October" },
    { shortMonth: "Nov", longMonth: "November" },
    { shortMonth: "Dec", longMonth: "December" },
  ];
  let selectedMonthObject = monthObjects[6];

  let dinosaurObjects = [
    { name: "Tyrannosaurus", group: "Theropods" },
    { name: "Velociraptor", group: "Theropods" },
    { name: "Diplodocus", group: "Sauropods" },
    { name: "Saltasaurus", group: "Sauropods" },
    { name: "Deinonychus", group: "Theropods" },
    { name: "Apatosaurus", group: "Sauropods" },
  ];
  let selectedDinosaurObject = dinosaurObjects.find(obj => obj.name === "Diplodocus");

  function handleChange() {
    console.log("Changed");
  }
</script>


# Select (single)

---

## Example Usage

### `options` elements with primitive data type

<Select
  label="Select an option"
  options={months}  
  bind:value={selectedMonth}
  id="primitive-options-id"
  size="md"
  on:change={handleChange}
/>

Value of `selectedMonth`: <code>{selectedMonth}</code>

```svelte
<script>
  import { Select } from "@fanny-pack-ui/svelte-kit";

  let months = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
  ];

  let selectedMonth = "July";
</script>

<Select
  label="Select an option"
  options={months}  
  bind:value={selectedMonth}
  id="primitive-options-id"
  size="md"
/>
```

---

### `options` elements with "object" data type

<Select
  label="Select an option"
  options={monthObjects}
  optionLabel="shortMonth"
  bind:value={selectedMonthObject}
  id="object-options-id"
  size="sm"
/>

Value of `selectedMonthObject`: <code>{JSON.stringify(selectedMonthObject)}</code>

```svelte
<script>
  import { Select } from "@fanny-pack-ui/svelte-kit";

  let monthObjects = [
    { shortMonth: "Jan", longMonth: "January" },
    { shortMonth: "Feb", longMonth: "February" },
    { shortMonth: "Mar", longMonth: "March" },
    { shortMonth: "Apr", longMonth: "April" },
    { shortMonth: "May", longMonth: "May" },
    { shortMonth: "Jun", longMonth: "June" },
    { shortMonth: "Jul", longMonth: "July" },
    { shortMonth: "Aug", longMonth: "August" },
    { shortMonth: "Sep", longMonth: "September" },
    { shortMonth: "Oct", longMonth: "October" },
    { shortMonth: "Nov", longMonth: "November" },
    { shortMonth: "Dec", longMonth: "December" },
  ];

  let selectedMonthObject = monthObjects[6];
</script>

<Select
  label="Select an option"
  options={monthObjects}
  optionLabel="shortMonth"
  bind:value={selectedMonthObject}
  id="object-options-id"
  size="sm"
/>
```

---

## Option Groups

You can group your options (similar to using the [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup) tag) by passing a property name to the `optgroup` prop. The property name that you pass should be a property name that exists in the objects that are within your `options` array. The `optgroup` prop is only used with `options` arrays that contain objects, not with `options` arrays that contain primitive values.

<Select
  label="Select an option"
  options={dinosaurObjects}
  optionLabel="name"
  optgroup="group"
  bind:value={selectedDinosaurObject}
  id="object-optgroups-id"
  size="md"
/>

Value of `selectedDinosaurObject`: <code>{JSON.stringify(selectedDinosaurObject)}</code>

```svelte
<script>
  import { Select } from "@fanny-pack-ui/svelte-kit";

  let dinosaurObjects = [
    { name: "Tyrannosaurus", group: "Theropods" },
    { name: "Velociraptor", group: "Theropods" },
    { name: "Diplodocus", group: "Sauropods" },
    { name: "Saltasaurus", group: "Sauropods" },
    { name: "Deinonychus", group: "Theropods" },
    { name: "Apatosaurus", group: "Sauropods" },
  ];

  let selectedDinosaurObject = dinosaurObjects.find(obj => obj.name === "Diplodocus");
</script>

<Select
  label="Select an option"
  options={dinosaurObjects}
  optionLabel="name"
  optgroup="group"
  bind:value={selectedDinosaurObject}
  id="object-optgroups-id"
  size="md"
/>
```

Note that the `optgroup`s within the `<Select>` component will be sorted based on the first appearance of the property that is passed to the `optgroup` prop. For example, in the `dinosaurObjects` array shown above, the `group` property is passed to the `optgroup` prop, so the `dinosaurObjects` array will be sorted based the `group` property. The first `group` property that appears in the `dinosaurObjects` array has a value of `Theropods`, so that will be the first `optgroup` listed in the `<Select>` component's options list. The second `group` property that appears has a value of `Sauropods`, so that will be the second `optgroup` listed in the `<Select>` component's options list. And so on.

---

## Notes
* The `<Select />` component will fill the width of its parent element. So if you want a `<Select />` component to be narrower, then you will have to set its parent element to be narrower.
* It is recommended to set the width of this component's parent element to a reasonable width to fit the text of the options in the dropdown list. If the text for any of the options is too long, then it will be cut off. But the user can still hover over the option and the entire text will be displayed in a popup tooltip.

---

## Custom Select Styles
The original intention for these custom styles was to set `--custom-select-bg-color="transparent"` so the `<Select>` field would blend into the background. A few extra custom style rules have been provided for even more customizability.


You can set the following custom variables:
* `--custom-select-border-color`
* `--custom-select-bg-color`
* `--custom-select-text-color`

<div class="alt-background">
  <Select
    options={months}  
    bind:value={selectedMonth}
    id="primitive-options-id"
    size="lg"
    --custom-select-border-color="white"
    --custom-select-bg-color="transparent"
    --custom-select-text-color="white"
  />
</div>

```svelte
<Select
  options={months}  
  bind:value={selectedMonth}
  id="primitive-options-id"
  size="lg"
  --custom-select-border-color="white"
  --custom-select-bg-color="transparent"
  --custom-select-text-color="white"
/>
```

---


## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `label`<br>(optional) | `string` | Any string | `""` (an empty string) | The text for the `<label>` element that is displayed above the `<select>` element. If this prop is not provided, then no label will be displayed. |
| `options` | `Array` | any array | NA | This should be an array of strings, numbers, booleans, or objects. This array will be used to populate the `<option>` elements in the `<Select />` component's dropdown list. |
| `optionLabel` (only used with arrays of objects) | `string` | Any property name from the objects that are passed to the `options` array | `null` | When the `optionLabel` prop is used with an array of objects (which are passed to the `options` prop), the `optionLabel` prop will provide the property name that will be used as the label text for the `<Select>` component's options. |
| `optgroup` (only used with arrays of objects) | `string` | Any property name from the objects that are passed to the `options` array | `null` | You can group your options (similar to using the [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup) tag) by passing a property name to the `optgroup` prop. The property name that you pass should be a property name that exists in the objects that are within your `options` array. The `optgroup` prop is only used with `options` arrays that contain objects, not with `options` arrays that contain primitive values. |
| `bind:value` | `string`, `number`, `boolean`, `object` | Any element from the `options` array | NA<br><br>There is no default value for this prop. However, you should set `bind:value` to equal a value from the array that you pass to the `options` prop. The value that `bind:value` is equal to will be the default value displayed in the select box. | When a user selects an option from the `<Select />` component, that option will be bound to the variable that is passed to this prop.
| `id` | `string` | Any string | `""` (an empty string) | You can give your `<Select />` components an `id` attribute. |
| `size` | `string` | `sm`, `md`, `lg` | `md` | This prop will set more or less padding for your `<Select />` component to give the appearance of a larger or smaller `<Select />` component. The text size will also increase or decrease based on this `size` prop. |

<br><br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:change` | This component forwards the `change` event, so you can call an event handler when a user selects a value in the `<Select />` component. |


<style>
  .alt-background {
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--secondary-color);
  }
</style>
