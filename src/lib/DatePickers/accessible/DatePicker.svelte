<!-- 
  I converted this component to a SvelteKit component:
  https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/

  This content is licensed according to the W3C Software License at
  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
-->

<!-- 
  TODOs: 
  * I want to add the following props to this component, which are already in my old DatePicker component:
      * placeholder
      * disabled
  * I need to add the "Custom Styles" options. I should probably also include custom style options for a few styles in the calendar dialog so users can change the dialog border and the selected date, focused date, and hovered date styles.
  * I need to clean up the CSS and make sure that it uses accessible principles. See notes about high contrast styles (which is the last bullet point) on this page: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/#accessibilityfeatures.
  * I need to update the docs for this new accessible component.
  * I need to test the accessibility on the input field and the button to make sure they work they way I want them to.
-->

<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import Dialog from "./Dialog.svelte";
  import { getDateObjFromISO, isValidDate } from "./utils";
  import { Label } from "../../Labels";
  import { createId } from "../../fp-utils";

  export let label = "";
  export let value = "";
  /** Checks whether the ISO date string is valid */
  export let isValid = false;
  export let btnIcon = "mdi:calendar";
  export let btnIconSize:number = 0;
  export let paddingV = "var(--date-picker-default-padding-v)";
  export let paddingH = "var(--date-picker-default-padding-h)";
  export let fontSize = "var(--date-picker-default-font-size)";

  let componentId = createId();
  let focused = false;
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

  onMount(() => {
    // If the user does not pass a value for the `btnIconSize` prop, then set the value for `btnIconSize` by calling `setBtnIconSize()`.
    if (!btnIconSize) {
      setBtnIconSize();
    }
  });

  /**
   * Get the input field's font-size, even if that size is set in a stylesheet:
   * https://stackoverflow.com/a/15195345/9453009
   */
  function setBtnIconSize() {
    let dateInputField = document.getElementById(`fp-date-picker-${componentId}`);
    let style = window.getComputedStyle(dateInputField, null).getPropertyValue("font-size");
    btnIconSize = parseFloat(style);
  }
</script>

<div class="datepicker">
  <div class="date">
    <!-- <label for="id-textbox-1">Date</label> -->
    <Label {label} forVal={`fp-date-picker-${componentId}`} />

    <div class="input-btn-group" class:focused>
      <input
        type="text" 
        placeholder="YYYY-MM-DD" 
        id={`fp-date-picker-${componentId}`}
        style={`font-size:${fontSize}; padding:${paddingV} ${paddingH};`}
        aria-describedby="id-description-1"
        bind:value
        on:focus={() => focused = true}
        on:blur={() => focused = false}
      >
      <span id="id-description-1" class="desc screen-reader-only">date format: YYYY-MM-DD</span>
      <button
        type="button" 
        class="date-btn"
        style={`padding:${paddingV} calc(${paddingV} + 3px);`}
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

      &.focused {
        outline: 2px solid var(--border-color-default);
        border-radius: var(--border-radius);
      }

      & input {
        width: 100%;
        margin: 0;
        background-color: var(--white);
        color: var(--text-color-default);
        border: var(--border-default);
        border-radius: var(--border-radius) 0 0 var(--border-radius);

        &:focus {
          outline: none;
        }
      }

      & .date-btn {
        border: var(--border-default);
        border-left: 0;
        border-radius: 0 var(--border-radius) var(--border-radius) 0;
        background-color: var(--custom-date-input-btn-bg-color, var(--border-color-default));

        &:focus {
          outline: none;
        }
      }
    }
  }
</style>
