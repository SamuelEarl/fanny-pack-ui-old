<script lang="ts">
  import { Calendar, DateInput, TabsContainer, TabBar, Tab, TabPanel } from "/src/lib";

  let date = new Date();
  let dateIsValid = false;
</script>


# Date Picker

The code for this component was taken from this great [date picker component](https://github.com/probablykasper/date-picker-svelte) and has been modified to make it more themable.

---

## Example Usage

### Date input field with calendar
* You can directly enter a date value into the input field or select a date from the calendar that pops up. 
* If a user enters a date into the input field that does not match the `YYYY-MM-DD` format, then a validation error is triggered.

<div class="date-wrapper">
  {#if !dateIsValid}
    <div class="invalid-wrapper">
      <span class="invalid">Invalid Date</span>
    </div>
  {/if}
  <DateInput
    bind:value={date}
    bind:valid={dateIsValid}
    label="Set a date"
    size="md"
    showCalendar={false}
    min={new Date(2022, 2, 5)}
    max={new Date(2023, 4, 15)}
    closeOnSelection={true}
    placeholder="Enter a date"
    dateInputIcon="mdi:calendar"
    disabled={false}
  />
</div>

```svelte
<script>
  import { DateInput } from "@fanny-pack-ui/svelte-kit";

  let date = new Date();
  let dateIsValid = false;
</script>

<div class="date-wrapper">
  {#if !dateIsValid}
    <div class="invalid-wrapper">
      <span class="invalid">Invalid Date</span>
    </div>
  {/if}
  <DateInput
    bind:value={date}
    bind:valid={dateIsValid}
    label="Set a date"
    size="md"
    showCalendar={false}
    min={new Date(2022, 2, 5)}
    max={new Date(2023, 4, 15)}
    closeOnSelection={true}
    placeholder="Enter a date"
    dateInputIcon="mdi:calendar"
    disabled={false}
  />
</div>

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
```

*NOTE: The `<DateInput />` component is designed to fill the entire width of its parent element. So, for example, you can put a wrapper `<div>` element around the `<DateInput />` component and put a width on the `<div>` and the `<DateInput />` component will be as wide as the `<div>` wrapper.*

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

## Custom DateInput Styles
The original intention for these custom styles was to set `--custom-date-picker-bg-color="transparent"` so the `<DateInput>` field would blend into the background. A few extra custom style rules have been provided for even more customizability.

You can set the following custom variables:
* `--custom-date-picker-bg-color`
* `--custom-date-picker-border-color`
* `--custom-date-picker-text-color`
* `--custom-date-input-placeholder-text-color`
* `--custom-date-input-btn-bg-color`
* `--custom-date-input-btn-icon-color`

<DateInput
  bind:value={date}
  bind:valid={dateIsValid}
  placeholder="Enter a date"
  --custom-date-picker-bg-color="var(--neutral-tone-200)"
  --custom-date-picker-border-color="var(--primary-color)"
  --custom-date-picker-text-color="var(--primary-color)"
  --custom-date-input-placeholder-text-color="var(--neutral-tone-400)"
  --custom-date-input-btn-bg-color="var(--primary-color)"
  --custom-date-input-btn-icon-color="white"
/>

```svelte
<DateInput
  bind:value={date}
  bind:valid={dateIsValid}
  placeholder="Enter a date"
  --custom-date-picker-bg-color="var(--neutral-tone-200)"
  --custom-date-picker-border-color="var(--primary-color)"
  --custom-date-picker-text-color="var(--primary-color)"
  --custom-date-input-placeholder-text-color="var(--neutral-tone-400)"
  --custom-date-input-btn-bg-color="var(--primary-color)"
  --custom-date-input-btn-icon-color="white"
/>
```

---

## Props

<TabsContainer>
  <TabBar>
    <Tab>DateInput</Tab>
    <Tab>Calendar</Tab>
  </TabBar>

  <TabPanel>
    <h2>DateInput</h2>

    <!-- See the comment in the Tabs component props for an explanation of these empty divs. -->
    <div></div>

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `label`<br>*(optional)* | `string` | Any string | `""` (an empty string) | The text for the `<label>` element. If this prop is not provided, then no label will be displayed. |
    | `bind:value` | `Date` or `null` (`null` if the input field is empty) | Any date | You can define `let date = new Date();` and today's date will be the default value. See the first example above. | The date that is selected will be bound to the variable that is passed to this prop. |
    | `bind:valid`<br>*(optional)* | `boolean` | `true`, `false` | `false` | This prop indicates whether the text that has been entered into the input field is a valid date and/or is formatted correctly. The variable that is bound to this prop will be set to `true` if the date is valid and `false` otherwise. This can be used to display an error message if the date that was entered is not valid, as shown in the example above.<br><br>Note that if you bind the `value` prop to a variable that equals a valid date, for example `new Date()`, then the date that is initially entered into the `<DateInput />` field will be a valid date. That also means that the date will be valid initially even if you set the variable that is bound to `valid` to equal `false`.<br><br>NOTE: Although this will validate the text that is entered into the `<DateInput />` field, it would probably be preferable to run all your validations through a validation library, like Yup. |
    | `size`<br>*(optional)* | `string` | `xs`, `sm`, `md`, `lg`, `xl` | `md` | This prop will set more or less padding for the input field to give the appearance of a larger or smaller input field. The text size and button icon size will also increase or decrease based on this `size` prop.<br><br>You can change the default size in the `fpui-theme.ts` file. |
    | `showCalendar`<br>*(optional)* | `boolean` | `true`, `false` | `false` | This prop will allow you to either show or hide the calendar. If you are using the `<DateInput />` component, then clicking the button will toggle the calendar to be shown or hidden. |
    | `min`<br>*(optional)* | `Date` | any Date with `year`, `month`, and `day` arguments | 01 Jan, 10 years before the current year. | This prop defines the earliest date that a user can select. Keep in mind that January is represented with a `0`. |
    | `max`<br>*(optional)* | `Date` | any Date with `year`, `month`, and `day` arguments | 31 Dec, 10 years after the current year. | This prop defines the latest date that a user can select. Keep in mind that January is represented with a `0`. |
    | `closeOnSelection`<br>*(optional)* | `boolean` | `true`, `false` | `true` | This prop allows you to close the calendar when a date is selected or leave it open. |
    | `locale`<br>*(optional)* | | | | See the docs for [date-picker-svelte](https://date-picker-svelte.kasper.space/docs).<br><br>*NOTE: The `weekStartsOn` property represents the day that the week starts on. `0` = Sunday. The default value in this component is `0`.* |
    | `placeholder`<br>*(optional)* | `string` | Any string | `YYYY-MM-DD` | This prop will act as the placeholder when the date value is null (i.e. when the input field is empty). |
    | `dateInputIcon`<br>*(optional)* | `string` | Any icon name from the Iconify library. | The default value can be set in your `/src/theme.ts` file. | Read [Configure JavaScript variables](/get-started#configure-js-vars) for instructions on how to set the default value. |
    | `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the `<DateInput>` component. |
  </TabPanel>

  <TabPanel>
    <h2>Calendar</h2>

    <!-- See the comment in the Tabs component props for an explanation of these empty divs. -->
    <div></div>

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `label`<br>*(optional)* | See the `label` prop above. |
    | `bind:value` | See the `bind:value` prop above. |
    | `min`<br>*(optional)* | See the `min` prop above. |
    | `max`<br>*(optional)* | See the `max` prop above. |
    | `locale`<br>*(optional)* | See the `locale` prop above. |
  </TabPanel>
</TabsContainer>


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
