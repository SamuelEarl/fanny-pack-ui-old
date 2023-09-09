<!-- 
  This content is licensed according to the W3C Software License at
  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
-->

<script lang="ts">
  import Icon from "@iconify/svelte";
  import Dialog from "./Dialog.svelte";
  import { getDateObjFromISO, getISOFromDateObj } from "./utils";

  export let value = getISOFromDateObj(new Date());
  export let btnIcon = "mdi:calendar";
  export let btnIconSize = "24";

  let showDialog = false;
  $: dateObjFromVal = getDateObjFromISO(value);

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
      <!-- let label = this.buttonLabelChange;
        label += ', ' + this.dayLabels[day.getDay()];
        label += ' ' + this.monthLabels[day.getMonth()];
        label += ' ' + day.getDate();
        label += ', ' + day.getFullYear(); -->
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
