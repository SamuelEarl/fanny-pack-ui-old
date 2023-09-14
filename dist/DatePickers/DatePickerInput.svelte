<!-- 
  I converted this component to a SvelteKit component:
  https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/

  This content is licensed according to the W3C Software License at
  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
-->

<!-- 
  TODOs:
  * I need to clean up the CSS and make sure that it uses accessible principles. See notes about high contrast styles (which is the last bullet point) on this page: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/#accessibilityfeatures.
      * I need to change the styles for the other components to also use accessible principles.
  * I need to test the accessibility on the input field and the button. This component focuses on the accessibility of the calendar, but it doesn't talk about the input field or button accessbility. So I need to make sure those have been designed with accessibility in mind too.
-->

<script>import { onMount } from "svelte";
import Icon from "@iconify/svelte";
import Calendar from "./DatePickerCalendar.svelte";
import { getDateObjFromISO, isValidDate } from "./utils";
import { Label } from "../Labels";
import { createId } from "../fp-utils";
export let label = "";
export let value = "";
export let isValid = false;
export let paddingV = "var(--date-picker-input-default-padding-v)";
export let paddingH = "var(--date-picker-input-default-padding-h)";
export let fontSize = "var(--date-picker-input-default-font-size)";
export let placeholder = "YYYY-MM-DD";
export let btnIcon = "mdi:calendar";
export let btnIconSize = 0;
export let disabled = false;
let componentId = createId();
let focused = false;
let showDialog = false;
$: dateObjFromVal = getDateObjFromISO(value);
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
    "Saturday"
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
    "December"
];
onMount(() => {
    if (!btnIconSize) {
        setBtnIconSize();
    }
});
function setBtnIconSize() {
    let dateInputField = document.getElementById(`fp-date-picker-${componentId}`);
    let style = window.getComputedStyle(dateInputField, null).getPropertyValue("font-size");
    btnIconSize = parseFloat(style);
}
</script>

<div class="datepicker">
  <div class="input-btn-group-wrapper">
    <!-- <label for="id-textbox-1">Date</label> -->
    <Label {label} forVal={`fp-date-picker-${componentId}`} />

    <div class="input-btn-group" class:focused class:disabled>
      <input
        type="text" 
        {placeholder}
        id={`fp-date-picker-${componentId}`}
        style={`font-size:${fontSize}; padding:${paddingV} ${paddingH};`}
        aria-describedby="id-description-1"
        bind:value
        {disabled}
        on:focus={() => focused = true}
        on:blur={() => focused = false}
      >
      <span id="id-description-1" class="desc screen-reader-only">date format: YYYY-MM-DD</span>
      <button
        type="button" 
        class="date-btn"
        style={`padding:${paddingV} calc(${paddingV} + 3px);`}
        aria-label={`Change Date, ${dayLabels[dateObjFromVal.getDay()]} ${monthLabels[dateObjFromVal.getMonth()]} ${dateObjFromVal.getDate()}, ${dateObjFromVal.getFullYear()}`}
        {disabled}
        on:click={() => showDialog = !showDialog}
        on:keyup={() => showDialog = !showDialog}
      >
        <Icon icon={btnIcon} width={btnIconSize} />
      </button>
    </div>
  </div>

  {#if showDialog}
    <Calendar
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
  }

  .datepicker .input-btn-group-wrapper {
      margin-bottom: 1px;
    }

  .datepicker .input-btn-group-wrapper .input-btn-group {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        border: var(--border-width-default) var(--border-style-default) var(--border-color-default);
        border: var(--border-width-default) var(--border-style-default) var(--custom-date-picker-border-color, var(--border-color-default));
        border-radius: var(--border-radius);
        /* This `overflow: hidden` style will ensure that the background color of the input and button elements goes all the way out to the border no matter how high or low the border radius value is. */
        overflow: hidden;
      }

  .datepicker .input-btn-group-wrapper .input-btn-group:hover, .datepicker .input-btn-group-wrapper .input-btn-group.focused {
          -webkit-box-shadow: 0 0 0 2px var(--border-color-default);
                  box-shadow: 0 0 0 2px var(--border-color-default);
          -webkit-box-shadow: 0 0 0 2px var(--custom-date-picker-border-color, var(--border-color-default));
                  box-shadow: 0 0 0 2px var(--custom-date-picker-border-color, var(--border-color-default));
        }

  .datepicker .input-btn-group-wrapper .input-btn-group.disabled {
          pointer-events: none;
        }

  .datepicker .input-btn-group-wrapper .input-btn-group input {
          -webkit-box-flex: 1;
              -ms-flex: 1;
                  flex: 1;
          width: 100%;
          margin: 0;
          border: none;
          outline: none;
          background-color: var(--bg-color-element-default);
          background-color: var(--custom-date-picker-bg-color, var(--bg-color-element-default));
          color: inherit;
          color: var(--custom-date-picker-text-color, inherit);
        }

  .datepicker .input-btn-group-wrapper .input-btn-group input::-webkit-input-placeholder {
            color: var(--placeholder-color-default);
            color: var(--custom-date-picker-placeholder-text-color, var(--placeholder-color-default));
          }

  .datepicker .input-btn-group-wrapper .input-btn-group input::-moz-placeholder {
            color: var(--placeholder-color-default);
            color: var(--custom-date-picker-placeholder-text-color, var(--placeholder-color-default));
          }

  .datepicker .input-btn-group-wrapper .input-btn-group input:-ms-input-placeholder {
            color: var(--placeholder-color-default);
            color: var(--custom-date-picker-placeholder-text-color, var(--placeholder-color-default));
          }

  .datepicker .input-btn-group-wrapper .input-btn-group input::-ms-input-placeholder {
            color: var(--placeholder-color-default);
            color: var(--custom-date-picker-placeholder-text-color, var(--placeholder-color-default));
          }

  .datepicker .input-btn-group-wrapper .input-btn-group input::placeholder {
            color: var(--placeholder-color-default);
            color: var(--custom-date-picker-placeholder-text-color, var(--placeholder-color-default));
          }

  .datepicker .input-btn-group-wrapper .input-btn-group input:focus {
            outline: none;
          }

  .datepicker .input-btn-group-wrapper .input-btn-group input:disabled {
            background-color: var(--bg-color-element-disabled);
            color: var(--text-color-disabled);
            pointer-events: none;
          }

  .datepicker .input-btn-group-wrapper .input-btn-group .date-btn {
          border-left: var(--border-width-default) var(--border-style-default) var(--border-color-default);
          border-left: var(--border-width-default) var(--border-style-default) var(--custom-date-picker-btn-separator-color, var(--border-color-default));
          background-color: var(--neutral-3);
          background-color: var(--custom-date-picker-btn-bg-color, var(--neutral-3));
          color: inherit;
          color: var(--custom-date-picker-btn-icon-color, inherit);
        }

  .datepicker .input-btn-group-wrapper .input-btn-group .date-btn:focus {
            outline: none;
          }

  .datepicker .input-btn-group-wrapper .input-btn-group .date-btn:disabled {
            border-color: var(--text-color-disabled);
            background-color: var(--bg-color-element-disabled);
            color: var(--text-color-disabled);
            pointer-events: none;
          }</style>
