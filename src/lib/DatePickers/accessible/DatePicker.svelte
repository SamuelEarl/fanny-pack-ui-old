<!-- 
  I converted this component to a SvelteKit component:
  https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/

  This content is licensed according to the W3C Software License at
  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
-->

<!-- 
  TODOs: 
  * I want to add the following props to this component, which are already in my old DatePicker component:
      * label
      * padding
      * fontSize
      * placeholder
      * disabled
  * I need to clean up the CSS and make sure that it used accessible principles. See notes about high contrast styles (which is the last bullet point) on this page: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/#accessibilityfeatures.
  * I need to update the docs for this new accessible component.
-->

<script lang="ts">
  import Icon from "@iconify/svelte";
  import Dialog from "./Dialog.svelte";
  import { getDateObjFromISO, isValidDate } from "./utils";

  export let value = "";
  /** Checks whether the ISO date string is valid */
  export let isValid = false;
  export let btnIcon = "mdi:calendar";
  export let btnIconSize = "24";

  let showDialog = false;

  $: dateObjFromVal = getDateObjFromISO(value);

  // This will update the `isValid` prop when the value changes.
  $: {
    isValid = isValidDate(value);
  }

  const dayLabels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthLabels = [
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
    "December",
  ];
</script>

<div class="datepicker">
  <div class="date">
    <label for="id-textbox-1">Date</label>

    <div class="input-btn-group">
      <input
        type="text" 
        placeholder="YYYY-MM-DD" 
        id="id-textbox-1" 
        aria-describedby="id-description-1"
        bind:value
      >
      <span id="id-description-1" class="desc screen-reader-only">date format: YYYY-MM-DD</span>
      <button
        type="button" 
        class="date-btn" 
        aria-label={`Change Date, ${dayLabels[dateObjFromVal.getDay()]} ${monthLabels[dateObjFromVal.getMonth()]} ${dateObjFromVal.getDate()}, ${dateObjFromVal.getFullYear()}`}
        on:click={() => showDialog = !showDialog}
        on:keyup={() => showDialog = !showDialog}
      >
        <Icon icon={btnIcon} width={btnIconSize} />
      </button>
    </div>
  </div>

  {#if showDialog}
    <Dialog
      {value} 
      on:change={(event) => {
        value = event.detail;
      }}
      on:hideDialog={() => showDialog = false} 
    />
  {/if}
</div>

<style>
  .screen-reader-only {
    position: absolute;
    top: -2000em;
    left: -3000em;
  }

  .datepicker {
    margin-top: 1em;
    position: relative;

    & .input-btn-group {
      display: flex;
      align-items: center;

      & input {
        padding: 5px;
        margin: 0;
        background-color: var(--white);
        color: var(--text-color-default);
        border: var(--border-default);
        border-radius: var(--border-radius) 0 0 var(--border-radius);

        &:focus {
          outline: 2px solid var(--border-color-default);
          border-radius: var(--border-radius);
          /* outline-offset: 1px; */
        }
      }

      & .date-btn {
        padding: 5px;
        border: var(--border-default);
        border-left: 0;
        background-color: var(--custom-date-input-btn-bg-color, var(--border-color-default));
        border-radius: 0 var(--border-radius) var(--border-radius) 0;

        &:focus {
          outline: none;
        }
      }
    }
  }
</style>
