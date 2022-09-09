<script lang="ts">
  import { SelectNew } from "/src/lib";

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

  let monthArrays = [
    [ 1, "Jan", "January" ],
    [ 2, "Feb", "February" ],
    [ 3, "Mar", "March" ],
    [ 4, "Apr", "April" ],
    [ 5, "May", "May" ],
    [ 6, "Jun", "June" ],
    [ 7, "Jul", "July" ],
    [ 8, "Aug", "August" ],
    [ 9, "Sep", "September" ],
    [ 10, "Oct", "October" ],
    [ 11, "Nov", "November" ],
    [ 12, "Dec", "December" ],
  ];
  let selectedMonthArray = monthArrays[6];

  let dinosaurObjects = [
    { name: "Tyrannosaurus", group: "Theropods" },
    { name: "Velociraptor", group: "Theropods" },
    { name: "Diplodocus", group: "Sauropods" },
    { name: "Saltasaurus", group: "Sauropods" },
    { name: "Deinonychus", group: "Theropods" },
    { name: "Apatosaurus", group: "Sauropods" },
  ];
  let selectedDinosaurObject = dinosaurObjects.find(obj => obj.name === "Diplodocus");

  let dinosaurArrays = [
    [ "Tyrannosaurus", "Theropods" ],
    [ "Velociraptor", "Theropods" ],
    [ "Diplodocus", "Sauropods" ],
    [ "Saltasaurus", "Sauropods" ],
    [ "Deinonychus", "Theropods" ],
    [ "Apatosaurus", "Sauropods" ],
  ];
  let selectedDinosaurArray = dinosaurArrays[2];
</script>


# Select (single)

---

## Example Usage

### `options` elements with primitive data type

<SelectNew
  label="Select an option"
  options={months}  
  bind:value={selectedMonth}
  id="primitive-options-id"
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
  options={months}  
  bind:value={selectedMonth}
  id="primitive-options-id"
  size="md"
/>
```

---

### `options` elements with "object" data type

<SelectNew
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
  size="md"
/>
```

Note that when the `optionaLabel` prop is used with an array of objects (passed to the `options` prop), the `optionLabel` prop will provide the property name that will be used as the label text for the `<Select>` component's options.

---

### `options` elements with "array" data type

<SelectNew
  label="Select an option"
  options={monthArrays}
  optionLabel={2}
  bind:value={selectedMonthArray}
  id="array-options-id"
  size="md"
/>

Value of `selectedMonthArray`: <code>{JSON.stringify(selectedMonthArray)}</code>

```svelte
<script>
  import { Select } from "@fanny-pack-ui/svelte-kit";

  let monthArrays = [
    [ 1, "Jan", "January" ],
    [ 2, "Feb", "February" ],
    [ 3, "Mar", "March" ],
    [ 4, "Apr", "April" ],
    [ 5, "May", "May" ],
    [ 6, "Jun", "June" ],
    [ 7, "Jul", "July" ],
    [ 8, "Aug", "August" ],
    [ 9, "Sep", "September" ],
    [ 10, "Oct", "October" ],
    [ 11, "Nov", "November" ],
    [ 12, "Dec", "December" ],
  ];

  let selectedMonthArray = monthArrays[6];
</script>

<Select
  label="Select an option"
  options={monthArrays}
  optionLabel={2}
  bind:value={selectedMonthArray}
  id="array-options-id"
  size="md"
/>
```

Note that when the `optionLabel` prop is used with an array of nested arrays (passed to the `options` prop), the `optionLabel` prop will provide the index of the element within each of the nested arrays that will be used as the label text for the `<Select>` component's options.

---

## Option Groups

You can group your options (similar to using the [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup) tag) by passing a property name to the `optgroup` prop. The property name that you pass should be a property name that exists in the objects that are within your `options` array. The `optgroup` prop is only used with `options` arrays that contain either objects or nested arrays, not with primitives.

<SelectNew
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

# TODO: Implement the `optgroup` feature for nested array `options`.

<SelectNew
  label="Select an option"
  options={dinosaurArrays}
  optionLabel={0}
  optgroup={1}
  bind:value={selectedDinosaurArray}
  id="array-optgroups-id"
  size="md"
/>


---

## Custom Select Styles
The original intention for these custom styles was to set `--custom-select-bg-color="transparent"` so the `<Select>` field would blend into the background. A few extra custom style rules have been provided for even more customizability.


You can set the following custom variables:
* `--custom-select-border-color`
* `--custom-select-bg-color`
* `--custom-select-text-color`

<div class="alt-background">
  <SelectNew
    options={months}  
    bind:value={selectedMonth}
    id="primitive-options-id"
    size="md"
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
  size="md"
  --custom-select-border-color="white"
  --custom-select-bg-color="transparent"
  --custom-select-text-color="white"
/>
```

---


<style>
  .alt-background {
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--secondary-color);
  }
</style>
