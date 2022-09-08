<script lang="ts">
  import { SelectNew } from "/src/lib";

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let selectedMonth = "July";

  let monthObjects = [
    { value: "january", label: "JAN" },
    { value: "february", label: "FEB" },
    { value: "march", label: "MAR" },
    { value: "april", label: "APR" },
    { value: "may", label: "MAY" },
    { value: "june", label: "JUN" },
    { value: "july", label: "JUL" },
    { value: "august", label: "AUG" },
    { value: "september", label: "SEP" },
    { value: "october", label: "OCT" },
    { value: "november", label: "NOV" },
    { value: "december", label: "DEC" },
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
</script>


# Select (single)

---

## Example Usage

### "primitive" data type of `options` elements

<SelectNew
  label="Select an option"
  id="primitive-options-id"
  options={months}  
  bind:value={selectedMonth}
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
  id="primitive-options-id"
  options={months}  
  bind:value={selectedMonth}
  size="md"
/>
```

---

### "object" data type of `options` elements

<SelectNew
  label="Select an option"
  id="object-options-id"
  options={monthObjects}  
  bind:value={selectedMonthObject}
  size="md"
/>

Value of `selectedMonthObject`: <code>{JSON.stringify(selectedMonthObject)}</code>

```svelte
<script>
  import { Select } from "@fanny-pack-ui/svelte-kit";

  let monthObjects = [
    { value: "january", label: "JAN" },
    { value: "february", label: "FEB" },
    { value: "march", label: "MAR" },
    { value: "april", label: "APR" },
    { value: "may", label: "MAY" },
    { value: "june", label: "JUN" },
    { value: "july", label: "JUL" },
    { value: "august", label: "AUG" },
    { value: "september", label: "SEP" },
    { value: "october", label: "OCT" },
    { value: "november", label: "NOV" },
    { value: "december", label: "DEC" },
  ];
  let selectedMonthObject = monthObjects[6];
</script>

<Select
  label="Select an option"
  id="object-options-id"
  options={monthObjects}  
  bind:value={selectedMonthObject}
  size="md"
/>
```

Note that if you pass an array of objects to the `options` prop, then each object inside the array should have a `label` property. The rest of the properties in the object can be anything, but the `label` property is used as the label text for the options in the `<Select>` component. 

---

### "array" data type of `options` elements

<SelectNew
  label="Select an option"
  id="array-options-id"
  options={monthArrays}  
  bind:value={selectedMonthArray}
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
  id="array-options-id"
  options={monthArrays}  
  bind:value={selectedMonthArray}
  labelIndex={2}
  size="md"
/>
```

Note that the `labelIndex` prop is only used if the elements within the `options` array are also arrays. The `labelIndex` prop indicates which element within each of the nested arrays will be used as the label text for the options in the `<Select>` component.
