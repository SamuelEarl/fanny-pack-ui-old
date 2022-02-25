# Select

---

# Example Usage:

```svelte
<Select
  optionsArray={columnHeaders}  
  arrayType="string"
  bind:selectedOption={selectedColumn}
  emptyValueDisplayText="-- Select a column from your dataset --"
  defaultValue="avg"
  on:change={() => eventHandler(arg1, arg2, arg3)}
  --width="90%"
  --padding-vertical="5px"
  --padding-horizontal="15px"
  --padding-arrow="40px"
  --border-color="blue"
  --background-color="white"
  --color="blue"
/>

<script>
  import { Select } from "jacl";

  let columnHeaders = [];
  let selectedColumn = "";
</script>
```


# Props:
1. `optionsArray`: This should be an array of strings or objects. The type of array should match the value passed to the `arrayType` prop. This array will be used to populate the `<option>` elements in the select box.

2. `arrayType`: If the data that this select box is displaying is an array of strings, then set this to "string". If it is an array of objects, then set this to "object". The default is "string". NOTE: Each object inside the object array should have this structure:
  ```js
  [{ value: "valueToBePassedToTheBackend", label: "Label displayed in the select box" }]
  ```

3. `bind:selectedOption={stringVariable}`: The option that the user selects in the UI will be bound to the `<select>` element and then passed to the backend when the form is submitted. You need to have a string variable defined in the component where this `<Select>` component is imported and that string variable needs to be bound to the `<Select>` component with `bind:selectedOption={stringVariable}`.

4. `emptyValueDisplayText` (optional): This prop allows you to set the text that is displayed in this component's "empty value" option. If you do not pass set this prop, then no "empty value" option will be displayed.

5. `defaultValue` (optional): This is the value (from the array that is assigned to `optionsArray`) that you want to set as the default value for the select box. For "object" arrays, this should be the value of the `value` property. If you don't set this prop then it defaults to the empty string option.

6. `on:change` (optional): If you want to call an event handler when the change event is fired, then you can add this prop and call your event handler.

7. `--width="90%"` (options): This uses Svelte's --style-props feature. See https://svelte.dev/docs#style_props. Default is auto, which will fill the full width of it's parent element.

8. --padding-vertical="5px" (optional): See number 7. Set a larger vertical padding. Defaults to 7px.
  
9. --padding-horizontal="15px" (optional): See number 7. Set a larger horizontal padding. Defaults to 10px.

10. --padding-arrow="40px" (optional): See number 7. Give the drop-down arrow more space away from the options text. Defaults to 30px.

11. --border-color="blue" (optional): See number 7. This style prop will change the color of the border. Default is --gray-medium.

12. --background-color="white" (optional): See number 7. This style prop will change the background color of the select element. Default is white.

13. --color="blue" (optional): See number 7. This style prop will change the text color in the select box (including the down arrow) and the color in the select box drop-down. Default is black.
