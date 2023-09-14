<script>import { createEventDispatcher } from "svelte";
import { getMonthLength, getCalendarDays } from "./date-utils";
import { getInnerLocale } from "./locale";
import { Label } from "../Labels";
import { createId } from "../fp-utils";
export let label = "";
export let popup = false;
const dispatch = createEventDispatcher();
let componentId = createId();
export let value = null;
function setValue(d) {
    if (d.getTime() !== value?.getTime()) {
        value = d;
    }
}
function updateValue(updater) {
    const newValue = updater(new Date(shownDate.getTime()));
    setValue(newValue);
}
const defaultDate = /* @__PURE__ */ new Date();
let shownDate = value ?? defaultDate;
$: if (value)
    shownDate = value;
function updateShownDate(updater) {
    shownDate = updater(new Date(shownDate.getTime()));
    if (value && shownDate.getTime() !== value.getTime()) {
        setValue(shownDate);
    }
}
export let min = new Date(defaultDate.getFullYear() - 10, 0, 1);
export let max = new Date(defaultDate.getFullYear() + 10, 11, 31);
let years = getYears(min, max);
$: years = getYears(min, max);
function getYears(min2, max2) {
    let years2 = [];
    for (let i = min2.getFullYear(); i <= max2.getFullYear(); i++) {
        years2.push(i);
    }
    return years2;
}
$: if (shownDate > max) {
    updateShownDate(() => max);
}
else if (shownDate < min) {
    updateShownDate(() => min);
}
export let locale = {};
$: iLocale = getInnerLocale(locale);
let year = shownDate.getFullYear();
const getYear = (tmpPickerDate) => year = tmpPickerDate.getFullYear();
function setYear(year2) {
    updateShownDate((tmpPickerDate) => {
        tmpPickerDate.setFullYear(year2);
        return tmpPickerDate;
    });
}
$: getYear(shownDate);
$: setYear(year);
let month = shownDate.getMonth();
const getMonth = (tmpPickerDate) => month = tmpPickerDate.getMonth();
function setMonth(month2) {
    let newYear = year;
    let newMonth = month2;
    if (month2 === 12) {
        newMonth = 0;
        newYear++;
    }
    else if (month2 === -1) {
        newMonth = 11;
        newYear--;
    }
    const maxDate = getMonthLength(newYear, newMonth);
    const newDate = Math.min(shownDate.getDate(), maxDate);
    updateShownDate((date) => {
        return new Date(newYear, newMonth, newDate, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    });
}
$: getMonth(shownDate);
$: setMonth(month);
let dayOfMonth = value?.getDate() || null;
$: dayOfMonth = value?.getDate() || null;
$: calendarDays = getCalendarDays(shownDate, iLocale.weekStartsOn);
function setDay(calendarDay) {
    if (dayIsInRange(calendarDay, min, max)) {
        updateValue((value2) => {
            value2.setFullYear(0);
            value2.setMonth(0);
            value2.setDate(1);
            value2.setFullYear(calendarDay.year);
            value2.setMonth(calendarDay.month);
            value2.setDate(calendarDay.number);
            return value2;
        });
    }
}
function selectDay(calendarDay) {
    setDay(calendarDay);
    dispatch("select");
}
function dayIsInRange(calendarDay, min2, max2) {
    const date = new Date(calendarDay.year, calendarDay.month, calendarDay.number);
    const minDate = new Date(min2.getFullYear(), min2.getMonth(), min2.getDate());
    const maxDate = new Date(max2.getFullYear(), max2.getMonth(), max2.getDate());
    return date >= minDate && date <= maxDate;
}
function shiftKeydown(e) {
    if (e.shiftKey && e.key === "ArrowUp") {
        setYear(year - 1);
    }
    else if (e.shiftKey && e.key === "ArrowDown") {
        setYear(year + 1);
    }
    else if (e.shiftKey && e.key === "ArrowLeft") {
        setMonth(month - 1);
    }
    else if (e.shiftKey && e.key === "ArrowRight") {
        setMonth(month + 1);
    }
    else {
        return false;
    }
    e.preventDefault();
    return true;
}
function yearKeydown(e) {
    let shift = e.shiftKey || e.altKey;
    if (shift) {
        shiftKeydown(e);
        return;
    }
    else if (e.key === "ArrowUp") {
        setYear(year - 1);
    }
    else if (e.key === "ArrowDown") {
        setYear(year + 1);
    }
    else if (e.key === "ArrowLeft") {
        setMonth(month - 1);
    }
    else if (e.key === "ArrowRight") {
        setMonth(month + 1);
    }
    else {
        shiftKeydown(e);
        return;
    }
    e.preventDefault();
}
function monthKeydown(e) {
    let shift = e.shiftKey || e.altKey;
    if (shift) {
        shiftKeydown(e);
        return;
    }
    else if (e.key === "ArrowUp") {
        setMonth(month - 1);
    }
    else if (e.key === "ArrowDown") {
        setMonth(month + 1);
    }
    else if (e.key === "ArrowLeft") {
        setMonth(month - 1);
    }
    else if (e.key === "ArrowRight") {
        setMonth(month + 1);
    }
    else {
        shiftKeydown(e);
        return;
    }
    e.preventDefault();
}
function keydown(e) {
    let shift = e.shiftKey || e.altKey;
    if (e.target?.tagName === "SELECT") {
        return;
    }
    if (shift) {
        shiftKeydown(e);
        return;
    }
    else if (e.key === "ArrowUp") {
        updateValue((value2) => {
            value2.setDate(value2.getDate() - 7);
            return value2;
        });
    }
    else if (e.key === "ArrowDown") {
        updateValue((value2) => {
            value2.setDate(value2.getDate() + 7);
            return value2;
        });
    }
    else if (e.key === "ArrowLeft") {
        updateValue((value2) => {
            value2.setDate(value2.getDate() - 1);
            return value2;
        });
    }
    else if (e.key === "ArrowRight") {
        updateValue((value2) => {
            value2.setDate(value2.getDate() + 1);
            return value2;
        });
    }
    else {
        return;
    }
    e.preventDefault();
}
</script>


<Label {label} forVal={`fp-calendar-${componentId}`} />
<div class="calendar-container" class:popup on:focusout tabindex="0" on:keydown={keydown}>
  <div class="top">
    <button class="change-month-btn" tabindex="-1" on:click={() => setMonth(month - 1)}>
      &ltrif;
    </button>
    <div class="select-container month">
      <select bind:value={month} on:keydown={monthKeydown}>
        {#each iLocale.months as monthName, i}
          <option
            disabled={new Date(year, i, getMonthLength(year, i)) < min || new Date(year, i) > max}
            value={i}>{monthName}</option
          >
        {/each}
      </select>
    </div>
    <div class="select-container year">
      <select bind:value={year} on:keydown={yearKeydown}>
        {#each years as v}
          <option value={v}>{v}</option>
        {/each}
      </select>
    </div>
    <button class="change-month-btn" tabindex="-1" on:click={() => setMonth(month + 1)}>
      &rtrif;
    </button>
  </div>
  <div class="weekdays-header">
    {#each Array(7) as _, i}
      {#if i + iLocale.weekStartsOn < 7}
        <div class="weekdays-header-cell">{iLocale.weekdays[iLocale.weekStartsOn + i]}</div>
      {:else}
        <div class="weekdays-header-cell">{iLocale.weekdays[iLocale.weekStartsOn + i - 7]}</div>
      {/if}
    {/each}
  </div>
  {#each Array(6) as _, weekIndex}
    <div class="week">
      {#each calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7) as calendarDay}
        <div
          class="date"
          on:click={() => selectDay(calendarDay)}
          class:disabled={!dayIsInRange(calendarDay, min, max)}
          class:selected={calendarDay.month === month && calendarDay.number === dayOfMonth}
          class:other-month={calendarDay.month !== month}
        >
          <span>{calendarDay.number}</span>
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .calendar-container {
    display: inline-block;
    padding: 5px;
    border: var(--border-default);
    border-radius: var(--border-radius);
    background: var(--white);
    color: inherit;
    -moz-user-select: none;
     -ms-user-select: none;
         user-select: none;
    -webkit-user-select: none;
    cursor: default;
    font-size: 0.75rem;
  }

  .calendar-container:hover {
      -webkit-box-shadow: var(--box-shadow-default);
              box-shadow: var(--box-shadow-default);
    }

  .calendar-container.popup {
      border: 2px solid;
      border-color: var(--border-color-default);
      -webkit-box-shadow: var(--box-shadow-depth);
              box-shadow: var(--box-shadow-depth);
    }

  .calendar-container .top {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      padding-bottom: 0.5rem;
    }

  .calendar-container .top .change-month-btn {
        padding: 2px 7px;
        border: none;
        outline: none;
        background-color: transparent;
        font-size: 1.25rem;
        color: inherit;
        -ms-flex-negative: 0;
            flex-shrink: 0;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        cursor: pointer;
      }

  /* 
        Customize select element styles:
        * https://www.w3schools.com/howto/howto_custom_select.asp
        * https://moderncss.dev/custom-select-styles-with-pure-css/
      */

  .calendar-container .top .select-container {
        position: relative;
        margin: 0 4px;
      }

  .calendar-container .top .select-container select {
          /* A reset of styles, including removing the default dropdown arrow */
          -webkit-appearance: none;
             -moz-appearance: none;
                  appearance: none;
          /* Additional resets for further consistency */
          margin: 0;
          font-family: inherit;
          outline: none;

          /* Add custom styles */
          width: 100%;
          padding: 0.35rem 0.5rem;
          border: var(--border-default);
          border-radius: var(--border-radius);
          font-size: 0.85rem;
          background-color: var(--white);
          color: inherit;
          cursor: pointer;
        }

  .calendar-container .top .select-container select:hover {
            -webkit-box-shadow: var(--box-shadow-default);
                    box-shadow: var(--box-shadow-default);
          }

  .calendar-container .top .select-container.month, .calendar-container .top .select-container.year {
          -webkit-box-flex: 1;
              -ms-flex-positive: 1;
                  flex-grow: 1;
        }

  .weekdays-header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-weight: 600;
    padding-bottom: 3px;
  }

  .weekdays-header .weekdays-header-cell {
      width: 1.875rem;
      text-align: center;
      -webkit-box-flex: 1;
          -ms-flex-positive: 1;
              flex-grow: 1;
    }

  .week {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .week .date {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      width: 2rem;
      height: 1.94rem;
      -webkit-box-flex: 1;
          -ms-flex-positive: 1;
              flex-grow: 1;
      border: 1px solid;
      border-color: transparent;
      border-radius: var(--border-radius);
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
    }

  .week .date:hover {
        border: var(--border-default);
        cursor: pointer;
      }

  .week .date.disabled {
        visibility: hidden;
        cursor: default;
      }

  .week .date.disabled:hover {
          border: none;
          background-color: transparent;
        }

  .week .date.other-month span {
        opacity: 0.4;
      }

  .week .date.selected {
        border: var(--border-default);
        color: inherit;
        background-color: var(--bg-color-element-default);
      }</style>
