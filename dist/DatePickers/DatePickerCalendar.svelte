<script>import { onMount, tick, createEventDispatcher } from "svelte";
import { fly } from "svelte/transition";
import Icon from "@iconify/svelte";
import { getDateObjFromISO, getISOFromDateObj, isValidDate } from "./utils";
export let value = "";
const dispatch = createEventDispatcher();
$: dispatch("change", value);
let focusDay = value;
$: {
    if (value === "" || !isValidDate(focusDay)) {
        focusDay = getISOFromDateObj(/* @__PURE__ */ new Date());
    }
}
let cancelBtn;
let okBtn;
let nextYearBtn;
let monthYearHeading = "";
let dialogMessage = "Cursor keys can navigate dates";
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
let dates = [];
onMount(() => {
    updateCalendar();
    setFocusDay();
});
function updateCalendar() {
    const fd = getDateObjFromISO(focusDay);
    monthYearHeading = `${monthLabels[fd.getMonth()]} ${fd.getFullYear()}`;
    let firstDayOfMonth = new Date(fd.getFullYear(), fd.getMonth(), 1);
    let dayOfWeek = firstDayOfMonth.getDay();
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() - dayOfWeek);
    const d = new Date(firstDayOfMonth);
    dates.length = 0;
    for (let i = 0; i < 6; i++) {
        dates.push([]);
        for (let j = 0; j < 7; j++) {
            if (i === 5 && j === 0 && d.getMonth() !== fd.getMonth()) {
                dates.pop();
                break;
            }
            else {
                dates[i].push({
                    date: getISOFromDateObj(d),
                    day: d.getDate(),
                    // If the date is not in the current month, then set `disabled` to true.
                    disabled: d.getMonth() !== fd.getMonth()
                });
                d.setDate(d.getDate() + 1);
            }
        }
    }
}
async function setFocusDay() {
    await tick();
    const focusedDay = document.querySelector('td[tabindex="0"]');
    focusedDay.focus();
}
function handleDayClick(day) {
    value = day.date;
    dispatch("hideDialog");
}
async function handleDayKeyDown(event, day, weekIndex, dayIndex) {
    let preventDefaultEvents = false;
    let shouldSetFocusDay = true;
    switch (event.key) {
        case "Esc":
        case "Escape":
            dispatch("hideDialog");
            break;
        case " ":
            focusDay = day.date;
            preventDefaultEvents = true;
            break;
        case "Enter":
            value = day.date;
            dispatch("hideDialog");
            preventDefaultEvents = true;
            break;
        case "Tab":
            cancelBtn.focus();
            if (event.shiftKey) {
                nextYearBtn.focus();
            }
            dialogMessage = "";
            preventDefaultEvents = true;
            shouldSetFocusDay = false;
            break;
        case "Right":
        case "ArrowRight":
            moveFocusToNextDay(day, weekIndex, dayIndex);
            preventDefaultEvents = true;
            break;
        case "Left":
        case "ArrowLeft":
            moveFocusToPreviousDay(day, weekIndex, dayIndex);
            preventDefaultEvents = true;
            break;
        case "Down":
        case "ArrowDown":
            moveFocusToNextWeek(day, weekIndex, dayIndex);
            preventDefaultEvents = true;
            break;
        case "Up":
        case "ArrowUp":
            moveFocusToPreviousWeek(day, weekIndex, dayIndex);
            preventDefaultEvents = true;
            break;
        case "Home":
            moveFocusToFirstDayOfWeek(weekIndex);
            preventDefaultEvents = true;
            break;
        case "End":
            moveFocusToLastDayOfWeek(weekIndex);
            preventDefaultEvents = true;
            break;
        case "PageUp":
            if (event.shiftKey) {
                moveToPreviousYear(day.date);
            }
            else {
                moveToPreviousMonth(day.date);
            }
            preventDefaultEvents = true;
            break;
        case "PageDown":
            if (event.shiftKey) {
                moveToNextYear(day.date);
            }
            else {
                moveToNextMonth(day.date);
            }
            preventDefaultEvents = true;
            break;
    }
    if (shouldSetFocusDay) {
        setFocusDay();
    }
    if (preventDefaultEvents) {
        event.stopPropagation();
        event.preventDefault();
    }
}
async function moveFocusToNextDay(day, weekIndex, dayIndex) {
    if (weekIndex === dates.length - 1 && dates[weekIndex][dayIndex + 1]?.disabled) {
        focusDay = dates[weekIndex][dayIndex + 1].date;
        updateCalendar();
    }
    else if (weekIndex === dates.length - 1 && dayIndex === 6) {
        const d = getDateObjFromISO(day.date);
        d.setDate(d.getDate() + 1);
        focusDay = getISOFromDateObj(d);
        updateCalendar();
    }
    else if (dayIndex === 6) {
        focusDay = dates[weekIndex + 1][0].date;
    }
    else {
        focusDay = dates[weekIndex][dayIndex + 1].date;
    }
}
function moveFocusToPreviousDay(day, weekIndex, dayIndex) {
    if (weekIndex === 0 && dates[weekIndex][dayIndex - 1]?.disabled) {
        focusDay = dates[weekIndex][dayIndex - 1].date;
        updateCalendar();
    }
    else if (weekIndex === 0 && dayIndex === 0) {
        const d = getDateObjFromISO(day.date);
        d.setDate(d.getDate() - 1);
        focusDay = getISOFromDateObj(d);
        updateCalendar();
    }
    else if (dayIndex === 0) {
        focusDay = dates[weekIndex - 1][6].date;
    }
    else {
        focusDay = dates[weekIndex][dayIndex - 1].date;
    }
}
function moveFocusToFirstDayOfWeek(weekIndex) {
    focusDay = dates[weekIndex][0].date;
}
function moveFocusToLastDayOfWeek(weekIndex) {
    focusDay = dates[weekIndex][6].date;
}
function moveFocusToNextWeek(day, weekIndex, dayIndex) {
    if (weekIndex === dates.length - 2 && dates[weekIndex + 1][dayIndex]?.disabled) {
        focusDay = dates[weekIndex + 1][dayIndex].date;
        updateCalendar();
    }
    else if (weekIndex === dates.length - 1) {
        const d = getDateObjFromISO(day.date);
        d.setDate(d.getDate() + 7);
        focusDay = getISOFromDateObj(d);
        updateCalendar();
    }
    else {
        focusDay = dates[weekIndex + 1][dayIndex].date;
    }
}
function moveFocusToPreviousWeek(day, weekIndex, dayIndex) {
    if (weekIndex === 1 && dates[weekIndex - 1][dayIndex]?.disabled) {
        focusDay = dates[weekIndex - 1][dayIndex].date;
        updateCalendar();
    }
    else if (weekIndex === 0) {
        const d = getDateObjFromISO(day.date);
        d.setDate(d.getDate() - 7);
        focusDay = getISOFromDateObj(d);
        updateCalendar();
    }
    else {
        focusDay = dates[weekIndex - 1][dayIndex].date;
    }
}
function moveToPreviousMonth(date) {
    const d = getDateObjFromISO(date);
    focusDay = getISOFromDateObj(new Date(d.getFullYear(), d.getMonth() - 1, d.getDate()));
    updateCalendar();
}
function moveToNextMonth(date) {
    const d = getDateObjFromISO(date);
    focusDay = getISOFromDateObj(new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()));
    updateCalendar();
}
function moveToPreviousYear(date) {
    const d = getDateObjFromISO(date);
    focusDay = getISOFromDateObj(new Date(d.getFullYear() - 1, d.getMonth(), d.getDate()));
    updateCalendar();
}
function moveToNextYear(date) {
    const d = getDateObjFromISO(date);
    focusDay = getISOFromDateObj(new Date(d.getFullYear() + 1, d.getMonth(), d.getDate()));
    updateCalendar();
}
</script>

<div
  id="id-datepicker-1" 
  class="datepicker-dialog" 
  role="dialog" 
  aria-modal="true" 
  aria-label="Choose Date" 
  transition:fly
>
  <div class="header">
    <button 
      type="button" 
      class="prev-year" 
      aria-label="previous year"
      on:click={() => moveToPreviousYear(focusDay)}
      on:keydown={(event) => {
        if (event.key === "Esc" || event.key === "Escape") {
          dispatch("hideDialog");
        }
      }}
    >
      <Icon icon="vaadin:angle-double-left" width="24" />
    </button>

    <button
      type="button" 
      class="prev-month" 
      aria-label="previous month"
      on:click={() => moveToPreviousMonth(focusDay)}
      on:keydown={(event) => {
        if (event.key === "Esc" || event.key === "Escape") {
          dispatch("hideDialog");
        }
      }}
    >
      <Icon icon="vaadin:angle-left" width="24" />
    </button>

    <span id="id-grid-label" class="month-year-heading" aria-live="polite">{ monthYearHeading }</span>

    <button
      type="button" 
      class="next-month" 
      aria-label="next month"
      on:click={() => moveToNextMonth(focusDay)}
      on:keydown={(event) => {
        if (event.key === "Esc" || event.key === "Escape") {
          dispatch("hideDialog");
        }
      }}
    >
      <Icon icon="vaadin:angle-right" width="24" />
    </button>

    <button
      type="button" 
      class="next-year" 
      aria-label="next year" 
      bind:this={nextYearBtn}
      on:click={() => moveToNextYear(focusDay)}
      on:keydown={(event) => {
        if (event.key === "Esc" || event.key === "Escape") {
          dispatch("hideDialog");
        }
      }}
    >
      <Icon icon="vaadin:angle-double-right" width="24" />
    </button>
  </div>

  <div class="table-wrapper">
    <table class="calendar" role="grid" aria-labelledby="id-grid-label">
      <thead>
        <tr>
          <th scope="col" abbr="Sunday">Su</th>
          <th scope="col" abbr="Monday">Mo</th>
          <th scope="col" abbr="Tuesday">Tu</th>
          <th scope="col" abbr="Wednesday">We</th>
          <th scope="col" abbr="Thursday">Th</th>
          <th scope="col" abbr="Friday">Fr</th>
          <th scope="col" abbr="Saturday">Sa</th>
        </tr>
      </thead>

      <tbody>
        {#each dates as week, weekIndex}
          <tr>
            {#each week as day, dayIndex}
              <td
                tabindex={focusDay === day.date ? 0 : -1}
                aria-selected={value === day.date ? true : null}
                data-date={day.date}
                class:disabled={day.disabled}
                on:click={() => handleDayClick(day)}
                on:keydown={(event) => handleDayKeyDown(event, day, weekIndex, dayIndex)}
                on:focus={() => dialogMessage = "Cursor keys can navigate dates"}
              >
                {#if !day.disabled}
                  {day.day}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="dialog-ok-cancel-group">
    <button
      class="dialog-button" 
      value="cancel" 
      bind:this={cancelBtn}
      on:click={() => dispatch("hideDialog")}
      on:keydown={(event) => {
        if (event.key === "Shift") {
          event.preventDefault();
        }
        else if (event.key === "Tab")   {
          okBtn.focus();
          event.preventDefault();
          if (event.shiftKey) {
            setFocusDay();
          }
        }
        else {
          dispatch("hideDialog");
        }
      }}
    >
      Cancel
    </button>
    <button 
      class="dialog-button" 
      value="ok"
      bind:this={okBtn}
      on:click={() => {
        value = focusDay;
        dispatch("hideDialog");
      }}
      on:keydown={(event) => {
        if (event.key === "Shift") {
          event.preventDefault();
        }
        else if (event.key === "Tab") {
          if (event.shiftKey) {
            cancelBtn.focus();
            event.preventDefault();
          }
        }
        else {
          value = focusDay;
          dispatch("hideDialog");
        }
      }}
    >
      OK
    </button>
  </div>
  <div class="dialog-message" aria-live="polite">{ dialogMessage }</div>
</div>

<style>
  .datepicker-dialog {
    position: absolute;
    right: 0;
    width: 320px;
    clear: both;
    border: 3px solid var(--date-picker-calendar-border-color);
    margin-top: 0.15em;
    border-radius: var(--border-radius);
    padding: 0;
    background-color: var(--white);
    z-index: 2;
    -webkit-box-shadow: var(--box-shadow-depth);
            box-shadow: var(--box-shadow-depth);
  }.datepicker-dialog .header {
      cursor: default;
      background-color: var(--date-picker-calendar-border-color);
      padding: 7px;
      font-weight: bold;
      text-transform: uppercase;
      color: var(--white);
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      -ms-flex-pack: distribute;
          justify-content: space-around;
    }.datepicker-dialog .header .month-year-heading {
        margin: 0;
        padding: 0;
        display: inline-block;
        font-size: 1em;
        color: var(--white);
        text-transform: none;
        font-weight: bold;
        border: none;

        display: inline-block;
        width: 12em;
        text-align: center;
      }.datepicker-dialog .header .prev-year:hover, .datepicker-dialog .header .prev-month:hover, .datepicker-dialog .header .next-month:hover, .datepicker-dialog .header .next-year:hover {
          outline: 1px solid var(--white);
          border-radius: var(--border-radius);
        }.datepicker-dialog table.calendar {
      margin: 0;
      padding: 10px;
      padding-bottom: 0;
      border: none;
      border-collapse: separate;
    }.datepicker-dialog table.calendar th, .datepicker-dialog table.calendar td {
        padding: 0;
        text-align: center;
        background: var(--white);
        color: var(--text-color-default);
        border: none;
      }.datepicker-dialog table.calendar td {
        background-color: var(--bg-color-element-default);
        padding: 3px;
        border: var(--border-default);
        margin: 0;
        line-height: inherit;
        height: 40px;
        width: 40px;
        border-radius: var(--border-radius);
        font-size: 15px;
        cursor: pointer;
      }.datepicker-dialog table.calendar td:hover {
          border-color: var(--date-picker-calendar-selected-date-bg-color);
        }.datepicker-dialog table.calendar td.disabled {
          border-color: transparent;
          pointer-events: none;
        }/* Selected date styles */.datepicker-dialog table.calendar td[aria-selected] {
        border: 2px dotted var(--date-picker-calendar-selected-date-bg-color);
      }/* Focused date styles */.datepicker-dialog table.calendar td[tabindex="0"] {
        outline: none;
        background-color: var(--date-picker-calendar-selected-date-bg-color);
        border-color: var(--date-picker-calendar-selected-date-bg-color);
        color: var(--date-picker-calendar-selected-date-text-color);
      }.datepicker-dialog .dialog-ok-cancel-group {
      text-align: right;
      margin-top: 1em;
      margin-bottom: 1em;
      margin-right: 1em;
    }.datepicker-dialog .dialog-ok-cancel-group .dialog-button {
        padding: 6px;
        margin-left: 1em;
        width: 5em;
        background-color: var(--bg-color-element-default);
        font-size: 0.85em;
        color: var(--text-color-default);
        outline: none;
        border: var(--border-default);
        border-radius: var(--border-radius);
      }.datepicker-dialog .dialog-ok-cancel-group .dialog-button:focus {
          padding: 5px;
          border: 2px solid var(--secondary-color);
        }.datepicker-dialog .dialog-ok-cancel-group .dialog-button:hover {
          border-color: var(--secondary-color);
        }.datepicker-dialog .dialog-message {
      padding-top: 0.25em;
      padding-left: 1em;
      height: 1.75em;
      background: var(--date-picker-calendar-border-color);
      color: var(--white);
    }</style>
