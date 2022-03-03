<script lang="ts">
  import { Calendar, DateInput } from "/src/lib";

  let date = new Date();
  let valid = false;
</script>


# Date Picker

NOTE: I have borrowed the code from this really great <a href="https://github.com/probablykasper/date-picker-svelte." class="underline primary">date picker component</a> and changed it a bit to make it more themable.

---

## Example Usage

<DateInput
  bind:value={date}
  format="yyyy-MM-dd"
  closeOnSelection={true}
  placeholder="Click to select date"
  bind:valid={valid}
/>


```svelte
<script lang="ts">
  import { DateInput } from "fpcl";

  let date = new Date();
  let valid = false;
</script>

<DateInput
  bind:value={date}
  format="yyyy-MM-dd"
  closeOnSelection={true}
  placeholder="Click to select date"
  bind:valid={valid}
/>
```

TODO: I need to verify that these props are accurate:
<Calendar
  bind:value={date}
  format="yyyy-MM-dd"
  closeOnSelection={true}
  placeholder="Click to select date"
  bind:valid={valid}
/>


<style>
  .date-time-field {

    & input {
      padding: 10px;
    }
  }
</style>
