<script lang="ts">
  import { Calendar, DateInput } from "/src/lib";

  let date = new Date();
  let valid = false;
</script>


# Date Picker

NOTE: I have borrowed the code from this really great <a href="https://github.com/probablykasper/date-picker-svelte." class="underline primary">date picker component</a> and changed it a bit to make it more themable.

---

## Example Usage

### Date input field with calendar

{#if !valid}
  <div class="invalid-wrapper">
    <span class="invalid">Invalid Date</span>
  </div>
{/if}
<DateInput
  bind:value={date}
  bind:valid={valid}
  label="Set a date"
  size="md"
  visible={false}
  closeOnSelection={true}
  placeholder="Enter a date"
  dateInputIcon="mdi:calendar"
/>

```svelte
<script lang="ts">
  import { DateInput } from "fpcl";

  let date = new Date();
  let valid = false;
</script>

{#if !valid}
  <div class="invalid-wrapper">
    <span class="invalid">Invalid Date</span>
  </div>
{/if}
<DateInput
  bind:value={date}
  bind:valid={valid}
  label="Set a date"
  size="md"
  visible={false}
  closeOnSelection={true}
  placeholder="Enter a date"
  dateInputIcon="mdi:calendar"
/>

<style>
  .invalid-wrapper {
    margin-bottom: 5px;
  }
  .invalid {
    padding: 5px;
    border: 1px solid darkred;
    background-color: pink;
    color: darkred;
  }
</style>
```

### Calendar only

<Calendar
  bind:value={date}
  label="Select a date"
/>

```svelte
<Calendar
  bind:value={date}
  label="Select a date"
/>
```

<style>
  .invalid-wrapper {
    margin-bottom: 5px;
  }
  .invalid {
    padding: 5px;
    border: 1px solid darkred;
    background-color: pink;
    color: darkred;
  }
</style>
