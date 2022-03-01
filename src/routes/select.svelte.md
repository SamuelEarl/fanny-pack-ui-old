# Select

---

<select role=select bind:value={selectedMonth}>
  {#each months as month}
    <option value={month} aria-selected={selectedMonth === month}>{month}</option>
  {/each}
</select>
<br><br>

<div style="width: 300px">
  <Select
    label=""
    optionsArray={longText}
    arrayType="string"
    bind:selectedOption={selectedText}
    size="small"
  />
</div>

---

<header style="display: flex; justify-content: space-around;">
  <div style="width: 200px">
    <Select
      label=""
      optionsArray={months}
      arrayType="string"
      bind:selectedOption={selectedMonth}
    />
  </div>

  <Select
    label=""
    optionsArray={years}
    arrayType="number"
    bind:selectedOption={selectedYear}
  />
</header>

---

## Example Usage

<Select
  label="Select an option"
  optionsArray={arrayOfValues}  
  arrayType="string"
  bind:selectedOption={selectedValue}
  size="medium"
/>

```svelte
<Select
  label="Select an option"
  optionsArray={arrayOfValues}  
  arrayType="string"
  bind:selectedOption={selectedValue}
  size="medium"
/>

<script>
  import { Select } from "fpcl";

  let arrayOfValues = ["First", "Second", "Third"];
  let selectedValue = "Second";
</script>
```

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `label`   | `string` | any string | NA | The text for the `<label>` element. |
| `optionsArray` | `Array` | any array | NA | This should be an array of strings, numbers, or objects. The type of array should match the value passed to the `arrayType` prop. This array will be used to populate the `<option>` elements in the select box.<br><br>NOTE: If you pass an array of objects through this prop, then each object inside the array should have `text` and `value` properties, like this:<br>```[{ text: "Text displayed in the select box", value: "valueOfOptionThatWillBePassedToTheBackend" } ]```|
| `arrayType` | `string` | `string`, `number`, `object` | `string` | This prop indicates the data type of the array that is used in the select box. |
| `bind:selectedOption` | TODO: Find out the data type(s) for this prop. Can this only be a string data type or can it be a number or an object data type for the other two array types that can be passed to the `optionsArray` prop? | NA | NA<br><br>There is no default value for this prop. However, you should set `bind:selectedOption` to equal a value from the array that you pass to the `optionsArray` prop. The value that `bind:selectedOption` is equal to will be the default value displayed in the select box. | The option that the user selects from the select box will be bound to the `<select>` element and then passed to the backend when the form is submitted. You need to have a variable defined in the same component where this `<Select>` component is imported and that variable needs to be bound to the `<Select>` component with `bind:selectedOption={nameOfVariable}`.
| `size` | `string` | `small`, `medium`, `large` | `medium` | This prop will set more or less padding for your select box to give the appearance of a larger or small select box. Note that the text size will remain the same for all sizes. |


## Styles
In the `fpcl-theme.css` file, you can edit any of the style variables under the "Select Boxes" section.

The following padding variables will change the sizes that correspond with the `size` prop:

```css
--fpcl-select-small-padding: 5px;
--fpcl-select-medium-padding: 10px;
--fpcl-select-large-padding: 15px;
```

---

## Additional Notes
This component will fill the width of its parent element. So if you want a `<Select />` component to be narrower, then you will have to set its parent element to be narrower. It is recommended to set the width of this component's parent element to a reasonable width to fit the text of the menu items (i.e. the options). If the text for any of the options is too long, then it will be cut off. But the user can still hover over the option and the entire text will be displayed in a popup tooltip.


<script lang="ts">
  import { Select } from "/src/lib";

  let arrayOfValues = ["First", "Second", "Third"];
  let selectedValue = "Second";

  let longText = [
    "This is a really long option that I am testing for testing sake",
    "This is short"
  ]
  let selectedText = "This is short";

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
  let selectedMonth = "March";

  let years = [ 2021, 2022 ];
  let selectedYear = 2022;
</script>
