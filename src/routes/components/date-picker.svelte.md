<script lang="ts">
  import { Calendar, DateInput } from "/src/lib";

  let date = new Date();
  let valid = false;
</script>


# Date Picker

The code for this component was taken from this great [date picker component](https://github.com/probablykasper/date-picker-svelte) and has been modified to make it more themable.

---

## Example Usage

### Date input field with calendar
* You can directly enter a date value into the input field or select a date from the calendar that pops up. 
* If a user enters a date into the input field that does not match the `YYYY-MM-DD` format, then a validation error is triggered.

<div class="date-wrapper">
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
    showCalendar={false}
    min={new Date(2022, 2, 5)}
    max={new Date(2023, 4, 15)}
    closeOnSelection={true}
    placeholder="Enter a date"
    dateInputIcon="mdi:calendar"
  />
</div>

```svelte
<script>
  import { DateInput } from "@fanny-pack-ui/svelte-kit";

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
  showCalendar={false}
  min={new Date(2022, 2, 5)}
  max={new Date(2023, 4, 15)}
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

*NOTE: The `<DateInput />` component is designed to fill the entire width of its parent element.*

<br>

### Calendar only

<Calendar
  bind:value={date}
  label="Select a date"
  min={new Date(2022, 2, 5)}
  max={new Date(2023, 4, 15)}
/>

```svelte
<script>
  import { Calendar } from "@fanny-pack-ui/svelte-kit";

  let date = new Date();
</script>

<Calendar
  bind:value={date}
  label="Select a date"
  min={new Date(2022, 2, 5)}
  max={new Date(2023, 4, 15)}
/>
```

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `value` | `Date` or `null` (`null` if the input field is empty) | any date | You can define `let date = new Date();` and today's date will be the default value. | The selected date. |
| `valid`<br>(`<DateInput />` only, optional) | `boolean` | `true`, `false` | `false` | This prop indicates whether the text that has been entered into the input field is a valid date and/or is formatted correctly.<br><br>It would probably be preferable to run all your validations through a validation library, like Yup. |
| `label`<br>(optional) | `string` | Any string | NA | The text for the `<label>` element. If this prop is not provided, then no label will be displayed. |
| `size`<br>(`<DateInput />` only) | `string` | `sm`, `md`, `lg` | `md` | This prop will set more or less padding for the input field to give the appearance of a larger or smaller input field. The text size and icon size will also increase or decrease based on this `size` prop. |
| `showCalendar`<br>(`<DateInput />` only) | `boolean` | `true`, `false` | `false` | This prop will allow you to either show or hide the calendar. If you are using the `<DateInput />` component, then clicking the button will toggle the calendar to be shown or hidden. |
| `min` | `Date` | any Date with `year`, `month`, and `day` arguments | 01 Jan, 10 years before the current year. | This prop defines the earliest date that a user can select. |
| `max` | `Date` | any Date with `year`, `month`, and `day` arguments | 31 Dec, 10 years after the current year. | This prop defines the latest date that a user can select. |
| `closeOnSelection`<br>(`<DateInput />` only) | `boolean` | `true`, `false` | `true` | Close the calendar when a date is selected. |
| `locale`<br>(optional) | | | | See the docs for [date-picker-svelte](https://date-picker-svelte.kasper.space/docs).<br><br>*NOTE: The `weekStartsOn` property represents the day that the week starts on. `0` = Sunday. The default value in this component is `0`.* |
| `placeholder`<br>(`<DateInput />` only) | `string` | Any string | `YYYY-MM-DD` | This prop will act as the placeholder when the date value is null (i.e. when the input field is empty). |
| `dateInputIcon`<br>(`<DateInput />` only) | `string` | Any icon name from the Iconify library. | The default value can be set in the `/src/fpui-theme.ts` file. | See the README file for instructions on how to set the default value. There is a link to the README file on the home page. |


<style>
  .date-wrapper {
    width: 250px;
  }

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
