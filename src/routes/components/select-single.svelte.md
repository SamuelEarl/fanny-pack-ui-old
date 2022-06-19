<script lang="ts">
  import { Select } from "/src/lib";

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let selectedMonth = "July";

  let monthObjects = [
    { text: "JAN", value: "january" },
    { text: "FEB", value: "february" },
    { text: "MAR", value: "march" },
    { text: "APR", value: "april" },
    { text: "MAY", value: "may" },
    { text: "JUN", value: "june" },
    { text: "JUL", value: "july" },
    { text: "AUG", value: "august" },
    { text: "SEP", value: "september" },
    { text: "OCT", value: "october" },
    { text: "NOV", value: "november" },
    { text: "DEC", value: "december" },
  ];
  let selectedMonthObject = monthObjects[6];

  let monthArrays = [
    [ 1, "JAN", "january" ],
    [ 2, "FEB", "february" ],
    [ 3, "MAR", "march" ],
    [ 4, "APR", "april" ],
    [ 5, "MAY", "may" ],
    [ 6, "JUN", "june" ],
    [ 7, "JUL", "july" ],
    [ 8, "AUG", "august" ],
    [ 9, "SEP", "september" ],
    [ 10, "OCT", "october" ],
    [ 11, "NOV", "november" ],
    [ 12, "DEC", "december" ],
  ];
  let selectedMonthArray = monthArrays[6];
</script>


# Select (single)

---

## Example Usage

### "string" (or "number" or "boolean") arrayType
<Select
  label="Select an option"
  optionsArray={months}  
  arrayType="string"
  bind:selectedOption={selectedMonth}
  size="md"
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
  optionsArray={months}  
  arrayType="string"
  bind:selectedOption={selectedMonth}
  size="md"
/>
```

<br>

### "object" arrayType

<Select
  label="Select an option"
  optionsArray={monthObjects}
  arrayType="object"
  bind:selectedOption={selectedMonthObject}
  size="sm"
/>

Value of `selectedMonthObject`: <code>{JSON.stringify(selectedMonthObject)}</code>

```svelte
<script>
  import { Select } from "@fanny-pack-ui/svelte-kit";

  let monthObjects = [
    { text: "JAN", value: "january" },
    { text: "FEB", value: "february" },
    { text: "MAR", value: "march" },
    { text: "APR", value: "april" },
    { text: "MAY", value: "may" },
    { text: "JUN", value: "june" },
    { text: "JUL", value: "july" },
    { text: "AUG", value: "august" },
    { text: "SEP", value: "september" },
    { text: "OCT", value: "october" },
    { text: "NOV", value: "november" },
    { text: "DEC", value: "december" },
  ];
  let selectedMonthObject = monthObjects[6];
</script>

<Select
  label="Select an option"
  optionsArray={monthObjects}
  arrayType="object"
  bind:selectedOption={selectedMonthObject}
  size="sm"
/>
```

Note that if you pass an array of objects to the `optionsArray` prop, then each object inside the array should have `text` and `value` properties.

<br>

### "array" arrayType
This `arrayType` is used when you want to pass an array that contain nested arrays to the `optionsArray` prop.

<Select
  label="Select an option"
  optionsArray={monthArrays}
  arrayType="array"
  displayElementAtIndex={1}
  bind:selectedOption={selectedMonthArray}
  size="sm"
/>

Value of `selectedMonthArray`: <code>{JSON.stringify(selectedMonthArray)}</code>

```svelte
<script>
  import { Select } from "@fanny-pack-ui/svelte-kit";

  let monthArrays = [
    [ 1, "JAN", "january" ],
    [ 2, "FEB", "february" ],
    [ 3, "MAR", "march" ],
    [ 4, "APR", "april" ],
    [ 5, "MAY", "may" ],
    [ 6, "JUN", "june" ],
    [ 7, "JUL", "july" ],
    [ 8, "AUG", "august" ],
    [ 9, "SEP", "september" ],
    [ 10, "OCT", "october" ],
    [ 11, "NOV", "november" ],
    [ 12, "DEC", "december" ],
  ];
  let selectedMonthArray = monthArrays[6];
</script>

<Select
  label="Select an option"
  optionsArray={monthArrays}
  arrayType="array"
  displayElementAtIndex={1} 
  bind:selectedOption={selectedMonthArray}
  size="sm"
/>
```

---

## Notes
* This component will fill the width of its parent element. So if you want a `<Select />` component to be narrower, then you will have to set its parent element to be narrower.
* It is recommended to set the width of this component's parent element to a reasonable width to fit the text of the menu items (i.e. the options that are listed in the menu). If the text for any of the options is too long, then it will be cut off. But the user can still hover over the option and the entire text will be displayed in a popup tooltip.

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `label` (optional) | `string` | Any string | NA | The text for the `<label>` element that is displayed above the `<select>` element. If this prop is not provided, then no label will be displayed. |
| `optionsArray` | `Array` | any array | NA | This should be an array of strings, numbers, booleans, objects, or arrays. The type of array should match the value passed to the `arrayType` prop. This array will be used to populate the `<option>` elements in the select box. |
| `arrayType` | `string` | `string`, `number`, `boolean`, `object`, `array` | `string` | This prop indicates the data type of the array that is used in the select box. |
| `displayElementAtIndex` | `number` | An index value for an element that exists in the nested arrays. | NA | This prop only applies to `arrayTypes` that are `array`. The element that exists within the nested arrays at this index is the element that will be displayed in the `<Select>` component's dropdown. |
| `bind:selectedOption` | `string`, `number`, `object` | Any string, number, boolean, or object | NA<br><br>There is no default value for this prop. However, you should set `bind:selectedOption` to equal a value from the array that you pass to the `optionsArray` prop. The value that `bind:selectedOption` is equal to will be the default value displayed in the select box. | The option that the user selects from the select box will be bound to the `<select>` element and then passed to the backend when the form is submitted. You need to have a variable defined in the same component where this `<Select>` component is imported and that variable needs to be bound to the `<Select>` component with `bind:selectedOption={nameOfVariable}`.
| `size` | `string` | `sm`, `md`, `lg` | `md` | This prop will set more or less padding for your select box to give the appearance of a larger or smaller select box. The text size will also increase or decrease based on this `size` prop. |

<br><br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:change` | Normally a `<select>` element could forward the `on:change` event, but this `<Select>` component is not created with a `<select>` element due to the inability to customize styles and behaviors of the `<option>`s in a `<select>` element. However, this component will dispatch a custom `change` event. So you can still listen for an `on:change` <em>custom</em> event like this: <br><br>`function handlerFunction(event) {`<br>`&nbsp;&nbsp;console.log("Change Event:", event.detail)};`<br>`}`<br><br>`<Select on:change={handlerFunction} />` <br><br>  The value on the `event.detail` property will be the value that was selected in the `<Select>` component. |
