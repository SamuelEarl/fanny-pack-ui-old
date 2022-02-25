# Select

---

<Select
  optionsArray={arrayOfValues}  
  arrayType="string"
  bind:selectedOption={selectedValue}
  on:change={handleChange}
  size="large"
  bgColor="primary"
  --border-color="blue"
  --color="blue"
/>

---

# Example Usage:

```svelte
<Select
  optionsArray={arrayOfValues}
  arrayType="string"
  bind:selectedOption={selectedValue}
  label="Select an option"
  defaultValue="avg"
  on:change={handleChange}
  --border-color="blue"
  --background-color="white"
  --color="blue"
/>

<script>
  import { Select } from "jacl";

  let arrayOfValues = ["First", "Second", "Third"];
  let selectedValue = "Second";

  function handleChange() {
    alert(`Select option was changed to "${selectedValue}"`);
  }
</script>
```


# Props:
1. `label` (optional): The text for the `<label>` element.
    1. Data Type: `string`
    2. Possible Values: NA
    3. Default Value: None

2. `optionsArray`: This should be an array of strings, numbers, or objects. The type of array should match the value passed to the `arrayType` prop. This array will be used to populate the `<option>` elements in the select box. NOTE: If you pass an array of objects through this prop, then each object inside the array should have `text` and `value` properties, like this:
    ```js
    [
      { 
        text: "Text displayed in the select box",
        value: "valueOfOptionThatWillBePassedToTheBackend"
      },
      ...
    ]
    ```
    1. Data Type: `Array`
    2. Examples of Possible Values: 
        1. String Array: `["string", "values"]`
        2. Number Array: `[1, 2, 3]`
        3. Object Array: See example above.
    3. Default Value: None

3. `arrayType`: This prop indicates the data type of the array that is used in the select box.
    1. Data Type: `string`
    2. Possible Values: `string`, `number`, `object`
    3. Default Value: `string`

4. `bind:selectedOption`: The option that the user selects from the select box will be bound to the `<select>` element and then passed to the backend when the form is submitted. You need to have a variable defined in the same component where this `<Select>` component is imported and that variable needs to be bound to the `<Select>` component with `bind:selectedOption={nameOfVariable}`.
    1. Data Type: TODO: Find out the data type(s) for this prop. Can this only be a string data type or can it be a number or an object data type for the other two array types that can be passed to the `optionsArray` prop?
    2. Possible Values: `string`, `number`, `object`
    3. Default Value: There is no default value for this prop. However, you should set `bind:selectedOption` to equal a value from the array that you pass to the `optionsArray` prop. The value that `bind:selectedOption` is equal to will be the default value displayed in the select box.

5. `on:change` (optional): If you want to call an event handler when the change event is fired, then you can add this prop and call your event handler.

11. --border-color="blue" (optional): See number 7. This style prop will change the color of the border. Default is --gray-medium.

12. --background-color="white" (optional): See number 7. This style prop will change the background color of the select element. Default is white.

13. --color="blue" (optional): See number 7. This style prop will change the text color in the select box (including the down arrow) and the color in the select box drop-down. Default is black.


<script lang="ts">
  import { Select } from "$/lib";

  let arrayOfValues = ["First", "Second", "Third"];
  let selectedValue = "Second";

  function handleChange() {
    alert(`Select option was changed to "${selectedValue}"`);
  }
</script>
