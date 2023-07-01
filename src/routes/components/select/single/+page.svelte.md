<script lang="ts">
  import { Select, CurrencyInput } from "/src/lib";

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

  function handleChange(event) {
    // console.log("Selected Value:", event.detail);
  }

  let value = 0;

  const jobOptionsStrings = [
    "UI/UX Designer",
    "Frontend Engineer",
    "Backend Engineer",
    "QA Engineer",
    "Unicorn",
	];

  let selectedJobOptionString = jobOptionsStrings[0];

  const jobOptionsObjects = [
    { roleVal: "", roleLabel: "-- Select Role --" },
    { roleVal: "ds", roleLabel: "UI/UX Designer" },
    { roleVal: "fe", roleLabel: "Frontend Engineer" },
    { roleVal: "be", roleLabel: "Backend Engineer" },
    { roleVal: "qa", roleLabel: "QA Engineer" },
    { roleVal: "un", roleLabel: "Unicorn" },
	];

  const optionValue = "roleVal";
  const optionLabel = "roleLabel";
  let selectedValuePropertyFromJobOptionsObject = jobOptionsObjects[0][optionValue];
  $: console.log("selectedValuePropertyFromJobOptionsObject:", selectedValuePropertyFromJobOptionsObject);

  let dinosaurObjects = [
    { group: "Theropods", value: "tyrannosaurus", label: "Tyrannosaurus" },
    { group: "Theropods", value: "velociraptor", label: "Velociraptor" },
    { group: "Sauropods", value: "diplodocus", label: "Diplodocus" },
    { group: "Sauropods", value: "saltasaurus", label: "Saltasaurus" },
    { group: "Theropods", value: "deinonychus", label: "Deinonychus" },
    { group: "Sauropods", value: "apatosaurus", label: "Apatosaurus" },
  ];
  let selectedDinosaurValue = dinosaurObjects.find(obj => obj.value === "diplodocus")["value"];
</script>


# Select (single)

`<select>` elements are difficult to style while maintaining accessibility. The easiest (and possibly the best) way to create an accessible `<Select />` component is to use the native `<select>` element and simply style the button part while leaving the dropdown alone.

---

## Example Usage

### Option Groups

<div style="margin-bottom:20px;">
  <Select
    label="Select an option"
    options={dinosaurObjects}
    optionValue="value"
    optionLabel="label"
    optgroup="group"
    bind:value={selectedDinosaurValue}
    disabled={true}
    fontSize="md"
    padding="md"
  />
</div>

<br>

Value of `selectedDinosaurValue`: <code>{selectedDinosaurValue}</code>

<br>

---

<br>

### `options` elements with "primitive" data type

<!-- <Select 
  label="Main Job Role"
  options={jobOptionsStrings}
  bind:value={selectedJobOptionString}
  on:change={handleChange}
/> -->

<br>

Value of `selectedJobOptionString`: <code>{JSON.stringify(selectedJobOptionString)}</code>

<br>

---

<br>

### `options` elements with "object" data type

What if you wanted each option in your `<Select />` component to have different values and labels? For example, this element:

<div>
  <select>
    <option value="">-- Select role --</option>
    <option value="ds">UI/UX Designer</option>
    <option value="fe">Frontend Engineer</option>
    <option value="be">Backend Engineer</option>
    <option value="qa">QA Engineer</option>
    <option value="un">Unicorn</option>
  </select>
</div>

<br>

...would be coded like this:

```
<select>
  <option value="">-- Select Role --</option>
  <option value="ds">UI/UX Designer</option>
  <option value="fe">Frontend Engineer</option>
  <option value="be">Backend Engineer</option>
  <option value="qa">QA Engineer</option>
  <option value="un">Unicorn</option>
</select>
```

Notice how the values for each option are different from the labels in each option. You would probably have to pass an array of objects that looked something like this to the select element:

```
const jobOptionsObjects = [
  { roleVal: "", roleLabel: "-- Select Role --" },
  { roleVal: "ds", roleLabel: "UI/UX Designer" },
  { roleVal: "fe", roleLabel: "Frontend Engineer" },
  { roleVal: "be", roleLabel: "Backend Engineer" },
  { roleVal: "qa", roleLabel: "QA Engineer" },
  { roleVal: "un", roleLabel: "Unicorn" },
];
```

Well, native select elements can only handle primitive data types, so you would have to pass an array of strings to your Svelte select element and just live with that. No separate values or labels. However, you can pass an object to a native select element written with Svelte and just make a few adjustments to your Svelte code, which would look like this:

<!-- <div>
  <select bind:value={selectedValuePropertyFromJobOptionsObject}>
    {#each jobOptionsObjects as option}
      <option value={option[optionValue]}>{option[optionLabel]}</option>
    {/each}
  </select>
</div> -->

<br>

Value of `selectedValuePropertyFromJobOptionsObject`: <code>{selectedValuePropertyFromJobOptionsObject}</code>

```
const jobOptionsObjects = [
  { roleVal: "", roleLabel: "-- Select Role --" },
  { roleVal: "ds", roleLabel: "UI/UX Designer" },
  { roleVal: "fe", roleLabel: "Frontend Engineer" },
  { roleVal: "be", roleLabel: "Backend Engineer" },
  { roleVal: "qa", roleLabel: "QA Engineer" },
  { roleVal: "un", roleLabel: "Unicorn" },
];

const optionValue = "roleVal";
const optionLabel = "roleLabel";
let selectedValuePropertyFromJobOptionsObject = jobOptionsObjects[0][optionValue];

<select bind:value={selectedValuePropertyFromJobOptionsObject}>
  {#each jobOptionsObjects as option}
    <option value={option[optionValue]}>{option[optionLabel]}</option>
  {/each}
</select>
```


<br>

<!-- <Select 
  label="Main Job Role"
  options={jobOptionsObjects}
  optionValue="roleVal"
  optionLabel="roleLabel"
  bind:value={selectedValuePropertyFromJobOptionsObject}
  on:change={handleChange}
/> -->

<br>

Value of `selectedValuePropertyFromJobOptionsObject`: <code>{selectedValuePropertyFromJobOptionsObject}</code>

<br>

<!-- <div style="margin-bottom:20px">
  <Select
    label="Select an option"
    options={months}  
    bind:value={selectedMonth}
    id="id-for-select-box"
    on:change={handleChange}
    disabled={false}
    padding="sm"
    fontSize="md"
  />
</div> -->

<!-- Value of `selectedMonth`: <code>{selectedMonth}</code> -->

<br>
