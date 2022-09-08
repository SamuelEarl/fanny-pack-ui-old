<script lang="ts">
  import { SelectNew } from "/src/lib";

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let selectedMonth = "July";

  let monthObjects = [
    { label: "JAN", value: "january" },
    { label: "FEB", value: "february" },
    { label: "MAR", value: "march" },
    { label: "APR", value: "april" },
    { label: "MAY", value: "may" },
    { label: "JUN", value: "june" },
    { label: "JUL", value: "july" },
    { label: "AUG", value: "august" },
    { label: "SEP", value: "september" },
    { label: "OCT", value: "october" },
    { label: "NOV", value: "november" },
    { label: "DEC", value: "december" },
  ];
  let selectedMonthObject = monthObjects[6];

  let monthArrays = [
    [ 1, "january", "JAN" ],
    [ 2, "february", "FEB" ],
    [ 3, "march", "MAR" ],
    [ 4, "april", "APR" ],
    [ 5, "may", "MAY" ],
    [ 6, "june", "JUN" ],
    [ 7, "july", "JUL" ],
    [ 8, "august", "AUG" ],
    [ 9, "september", "SEP" ],
    [ 10, "october", "OCT" ],
    [ 11, "november", "NOV" ],
    [ 12, "december", "DEC" ],
  ];
  let selectedMonthArray = monthArrays[6];

  let dinosaurObjects = [
    { label: "Tyrannosaurus", group: "Theropods" },
    { label: "Velociraptor", group: "Theropods" },
    { label: "Diplodocus", group: "Sauropods" },
    { label: "Saltasaurus", group: "Sauropods" },
    { label: "Deinonychus", group: "Theropods" },
    { label: "Apatosaurus", group: "Sauropods" },
  ];
  let selectedDinosaurObject = dinosaurObjects[0];

  let dinosaurArrays = [
    [ "Tyrannosaurus", "Theropods" ],
    [ "Diplodocus", "Sauropods" ],
    [ "Velociraptor", "Theropods" ],
    [ "Saltasaurus", "Sauropods" ],
    [ "Apatosaurus", "Sauropods" ],
    [ "Deinonychus", "Theropods" ],
  ];
</script>


# Select (single)

---

## Example Usage

### "primitive" data type of `options` elements

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

### "object" data type of `options` elements

<SelectNew
  label="Select an option"
  options={monthObjects}  
  bind:value={selectedMonthObject}
  id="object-options-id"
  size="md"
/>

Value of `selectedMonthObject`: <code>{JSON.stringify(selectedMonthObject)}</code>

```svelte
<script>
  import { Select } from "@fanny-pack-ui/svelte-kit";

  let monthObjects = [
    { label: "JAN", value: "january" },
    { label: "FEB", value: "february" },
    { label: "MAR", value: "march" },
    { label: "APR", value: "april" },
    { label: "MAY", value: "may" },
    { label: "JUN", value: "june" },
    { label: "JUL", value: "july" },
    { label: "AUG", value: "august" },
    { label: "SEP", value: "september" },
    { label: "OCT", value: "october" },
    { label: "NOV", value: "november" },
    { label: "DEC", value: "december" },
  ];
  let selectedMonthObject = monthObjects[6];
</script>

<Select
  label="Select an option"
  options={monthObjects}  
  bind:value={selectedMonthObject}
  id="object-options-id"
  size="md"
/>
```

Note that if you pass an array of objects to the `options` prop, then each object inside the array should have a `label` property. The rest of the properties in the object can be anything, but the `label` property is used as the label text for the options in the `<Select>` component. 

---

### "array" data type of `options` elements

<SelectNew
  label="Select an option"
  options={monthArrays}  
  bind:value={selectedMonthArray}
  id="array-options-id"
  labelIndex={2}
  size="md"
/>

Value of `selectedMonthArray`: <code>{JSON.stringify(selectedMonthArray)}</code>

```svelte
<script>
  import { Select } from "@fanny-pack-ui/svelte-kit";

  let monthArrays = [
    [ 1, "january", "JAN" ],
    [ 2, "february", "FEB" ],
    [ 3, "march", "MAR" ],
    [ 4, "april", "APR" ],
    [ 5, "may", "MAY" ],
    [ 6, "june", "JUN" ],
    [ 7, "july", "JUL" ],
    [ 8, "august", "AUG" ],
    [ 9, "september", "SEP" ],
    [ 10, "october", "OCT" ],
    [ 11, "november", "NOV" ],
    [ 12, "december", "DEC" ],
  ];
  let selectedMonthArray = monthArrays[6];
</script>

<Select
  label="Select an option"
  options={monthArrays}  
  bind:value={selectedMonthArray}
  id="array-options-id"
  labelIndex={2}
  size="md"
/>
```

Note that the `labelIndex` prop is only used if the elements within the `options` array are also arrays. The `labelIndex` prop indicates which element within each of the nested arrays will be used as the label text for the options in the `<Select>` component.

---

## Option Groups

You can group your options (similar to using the [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup) tag) by passing a property name to the `optgroup` prop. The property name that you pass should be a property name that exists in the objects that are within your `options` array. The `optgroup` prop is only used with `options` arrays that contain either objects or nested arrays, not with primitives.

<SelectNew
  label="Select an option"
  options={dinosaurObjects}
  optgroup="group"
  bind:value={selectedDinosaurObject}
  id="object-options-id"
  size="md"
/>

Value of `selectedDinosaurObject`: <code>{JSON.stringify(selectedDinosaurObject)}</code>

```svelte
<script>
  import { Select } from "@fanny-pack-ui/svelte-kit";

  let dinosaurObjects = [
    { label: "Tyrannosaurus", group: "Theropods" },
    { label: "Velociraptor", group: "Theropods" },
    { label: "Diplodocus", group: "Sauropods" },
    { label: "Saltasaurus", group: "Sauropods" },
    { label: "Deinonychus", group: "Theropods" },
    { label: "Apatosaurus", group: "Sauropods" },
  ];
  let selectedDinosaurObject = dinosaurObjects[0];
</script>

<Select
  label="Select an option"
  options={dinosaurObjects}
  optgroup="group"
  bind:value={selectedDinosaurObject}
  id="object-options-id"
  size="md"
/>

Value of `selectedMonthObject`: <code>{JSON.stringify(selectedMonthObject)}</code>
```

Note that the `optgroup`s within the `<Select>` component will be sorted based on the first appearance of the property that is passed to the `optgroup` prop. For example, in the `dinosaurObjects` array shown above, the `group` property is passed to the `optgroup` prop, so the `dinosaurObjects` array will be sorted based the `group` property. The first `group` property that appears in the `dinosaurObjects` array has a value of `Theropods`, so that will be the first `optgroup` listed in the `<Select>` component's options list. The second `group` property that appears has a value of `Sauropods`, so that will be the second `optgroup` listed in the `<Select>` component's options list. And so on.
