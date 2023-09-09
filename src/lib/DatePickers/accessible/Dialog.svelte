<script lang="ts">
  import { onMount, tick, createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import Icon from "@iconify/svelte";
  import { getDateObjFromISO, getISOFromDateObj } from "./utils";

  export let value = "";

  const dispatch = createEventDispatcher();
  $: dispatch("change", value);

  let focusDay = value;
  let cancelBtn;
  let okBtn;
  let nextYearBtn;

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

  // The dates array will have 6 nested arrays, each representing one week.
  // Each nested week array will 7 objects, each representing a date.
  let dates = [
    [
      { date: "2020-01-26", day: 26, disabled: true },
      { date: "2020-01-27", day: 27, disabled: true },
      { date: "2020-01-28", day: 28, disabled: true },
      { date: "2020-01-29", day: 29, disabled: true },
      { date: "2020-01-30", day: 30, disabled: true },
      { date: "2020-01-31", day: 31, disabled: true },
      { date: "2020-02-01", day: 1, disabled: false },
    ],
    [
      { date: "2020-02-02", day: 2, disabled: false },
      { date: "2020-02-03", day: 3, disabled: false },
      { date: "2020-02-04", day: 4, disabled: false },
      { date: "2020-02-05", day: 5, disabled: false },
      { date: "2020-02-06", day: 6, disabled: false },
      { date: "2020-02-07", day: 7, disabled: false },
      { date: "2020-02-08", day: 8, disabled: false },
    ],
    [
      { date: "2020-02-09", day: 9, disabled: false },
      { date: "2020-02-10", day: 10, disabled: false },
      { date: "2020-02-11", day: 11, disabled: false },
      { date: "2020-02-12", day: 12, disabled: false },
      { date: "2020-02-13", day: 13, disabled: false },
      { date: "2020-02-14", day: 14, disabled: false },
      { date: "2020-02-15", day: 15, disabled: false },
    ],
    [
      { date: "2020-02-16", day: 16, disabled: false },
      { date: "2020-02-17", day: 17, disabled: false },
      { date: "2020-02-18", day: 18, disabled: false },
      { date: "2020-02-19", day: 19, disabled: false },
      { date: "2020-02-20", day: 20, disabled: false },
      { date: "2020-02-21", day: 21, disabled: false },
      { date: "2020-02-22", day: 22, disabled: false },
    ],
    [
      { date: "2020-02-23", day: 23, disabled: false },
      { date: "2020-02-24", day: 24, disabled: false },
      { date: "2020-02-25", day: 25, disabled: false },
      { date: "2020-02-26", day: 26, disabled: false },
      { date: "2020-02-27", day: 27, disabled: false },
      { date: "2020-02-28", day: 28, disabled: false },
      { date: "2020-02-29", day: 29, disabled: false },
    ],
    [
      { date: "2020-03-01", day: 1, disabled: true },
      { date: "2020-03-02", day: 2, disabled: true },
      { date: "2020-03-03", day: 3, disabled: true },
      { date: "2020-03-04", day: 4, disabled: true },
      { date: "2020-03-05", day: 5, disabled: true },
      { date: "2020-03-06", day: 6, disabled: true },
      { date: "2020-03-07", day: 7, disabled: true },
    ],
  ];
  let monthYearHeading = "";
  let dialogMessage = "Cursor keys can navigate dates";

  onMount(() => {
    updateCalendar();
    setFocusDay();
  });

  // This function used to be called `updateGrid()`.
  function updateCalendar() {
    // fd = focus date.
    // const fd = getDateObjFromISO(value);
    const fd = getDateObjFromISO(focusDay);
    console.log("FOCUS DATE:", fd);

    monthYearHeading = `${monthLabels[fd.getMonth()]} ${fd.getFullYear()}`;

    // Create a Date object with the first day of the current month.
    let firstDayOfMonth = new Date(fd.getFullYear(), fd.getMonth(), 1);
    // Get the day of the week as a number. 0 represents Sunday.
    let dayOfWeek = firstDayOfMonth.getDay();

    // Get the date of the Sunday that is before the first day of the month and set `firstDayOfMonth` to that date. If the first day of the month is a Sunday, then `firstDayOfMonth` will remain that date.
    // Get the first day of the month as a number. Subtract the day of the week (which is a number) from the first day of the month. `setDate()` is the opposite of the `getDate()` - it will set, or change, the date of the Date object it is referencing. If the date that is being set is before or after the month in the Date object, then the month in the Date object will also be changed.
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() - dayOfWeek);

    // Create a new Date object that represents the Sunday that is before the first day of the month.
    const d = new Date(firstDayOfMonth);

    // Clear the `dates` array.
    dates.length = 0;

    // This for loop will populate the `dates` array with up to 6 nested arrays (representing the weeks of the month) and each nested array will have 7 calendar date objects (representing the days of the week). 
    // NOTE: If there are no dates in the 6th week of the month, then there will only be 5 nested week arrays.
    for (let i = 0; i < 6; i++) {
      dates.push([]);
      for (let j = 0; j < 7; j++) {
        // If this is the 6th week of the month and the first day of this 6th week is in the following month, then remove the last nested array, which was just inserted and is empty, and break out of the loop so no other dates will be populated.
        if (i === 5 && j === 0 && d.getMonth() !== fd.getMonth()) {
          dates.pop();
          break;
        }
        // Else, push the calendar date objects to the nested week array.
        else {
          dates[i].push({ 
            date: getISOFromDateObj(d),
            day: d.getDate(),
            // If the date is not in the current month, then set `disabled` to true.
            disabled: d.getMonth() !== fd.getMonth(),
          });
          // Update the date to be next day so the entire calendar of dates will be populated.
          d.setDate(d.getDate() + 1);
        }
      }
    }
  }

  async function setFocusDay() {
    await tick();
    const focusedDay = document.querySelector('td[tabindex="0"]');
    console.log("focusedDay:", focusedDay);
    focusedDay.focus();
  }

  function handleDayClick(day) {
    value = day.date;
    dispatch("hideDialog");

    // console.log("which:", event.which);
    // if (!this.isDayDisabled(event.currentTarget) && event.which !== 3) {
    //   this.setTextboxDate(event.currentTarget);
    //   this.close();
    // }

    // event.stopPropagation();
    // event.preventDefault();
  }

  async function handleDayKeyDown(event, day, weekIndex, dayIndex) {
    console.log("handleDayKeyDown:", event.key);
    let flag = false;
    let shouldSetFocusDay = true;

    switch (event.key) {
      case "Esc":
      case "Escape":
        dispatch("hideDialog");
        break;

      case " ":
        focusDay = day.date;
        flag = true;
        break;

      case "Enter":
        value = day.date;
        dispatch("hideDialog");
        flag = true;
        break;

      // TODO: The Tab key is not working.
      case "Tab":
        cancelBtn.focus();
        if (event.shiftKey) {
          nextYearBtn.focus();
        }
        dialogMessage = "";
        flag = true;
        shouldSetFocusDay = false;
        break;

      case "Right":
      case "ArrowRight":
        moveFocusToNextDay(day, weekIndex, dayIndex);
        flag = true;
        break;

      case "Left":
      case "ArrowLeft":
        moveFocusToPreviousDay(day, weekIndex, dayIndex);
        flag = true;
        break;

      case "Down":
      case "ArrowDown":
        moveFocusToNextWeek(day, weekIndex, dayIndex);
        flag = true;
        break;

      case "Up":
      case "ArrowUp":
        moveFocusToPreviousWeek(day, weekIndex, dayIndex);
        flag = true;
        break;

      case "Home":
        moveFocusToFirstDayOfWeek(weekIndex);
        flag = true;
        break;

      case "End":
        moveFocusToLastDayOfWeek(weekIndex);
        flag = true;
        break;

      case "PageUp":
        if (event.shiftKey) {
          moveToPreviousYear(day.date);
        } 
        else {
          moveToPreviousMonth(day.date);
        }
        flag = true;
        break;

      case "PageDown":
        if (event.shiftKey) {
          moveToNextYear(day.date);
        }
        else {
          moveToNextMonth(day.date);
        }
        flag = true;
        break;
    }

    // Put the focus on the newly selected date.
    if (shouldSetFocusDay) {
      setFocusDay();
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  async function moveFocusToNextDay(day, weekIndex, dayIndex) {    
    // If the weekIndex is the last row in the calendar and the next day is the first day of the next month (i.e. the focused day is the last day of the month, but the next day on the calendar is disabled because it is the first day of the next month), then set the `value` to be the first day of the next month and update the calendar to the next month.
    if (weekIndex === dates.length - 1 && dates[weekIndex][dayIndex + 1]?.disabled) {
      focusDay = dates[weekIndex][dayIndex + 1].date;
      updateCalendar();
    }
    // If the weekIndex is the last row in the calendar and the dayIndex is the last day in the week (i.e. the focused day is the last day of the month and it is also the last day on the last row and last column in the calendar), then set the `value` to be the first day of the next month and update the calendar to the next month.
    else if (weekIndex === dates.length - 1 && dayIndex === 6) {
      const d = getDateObjFromISO(day.date);
      // Update the date to be the first day of the next month.
      d.setDate(d.getDate() + 1);
      focusDay = getISOFromDateObj(d);
      updateCalendar();
    }
    // If the dayIndex is the last day in the week, then add 1 to the weekIndex and set the dayIndex to 0.
    else if (dayIndex === 6) {
      focusDay = dates[weekIndex + 1][0].date;
    }
    // Else set the value to the next date.
    else {
      focusDay = dates[weekIndex][dayIndex + 1].date;
    }
  }

  function moveFocusToPreviousDay(day, weekIndex, dayIndex) {    
    // If the weekIndex is the first row in the calendar and the previous day is the last day of the previous month (i.e. the focused day is the first day of the month, but the previous day on the calendar is disabled because it is the last day of the previous month), then set the `value` to be the last day of the previous month and update the calendar to the previous month.
    if (weekIndex === 0 && dates[weekIndex][dayIndex - 1]?.disabled) {
      focusDay = dates[weekIndex][dayIndex - 1].date;
      updateCalendar();
    }
    // If the weekIndex is the first row in the calendar and the dayIndex is the first day in the week (i.e. the focused day is the first day of the month and it is also the first day on the first row and first column in the calendar), then set the `value` to be the last day of the previous month and update the calendar to the previous month.
    else if (weekIndex === 0 && dayIndex === 0) {
      const d = getDateObjFromISO(day.date);
      // Update the date to be the last day of the previous month.
      d.setDate(d.getDate() - 1);
      focusDay = getISOFromDateObj(d);
      updateCalendar();
    }
    // If the dayIndex is the first day in the week, then subtract 1 from the weekIndex and set the dayIndex to 6.
    else if (dayIndex === 0) {
      focusDay = dates[weekIndex - 1][6].date;
    }
    // Else set the value to the previous date.
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
    // If the day that will be highlighted in the next week is disabled because it is in the next month but the date is not displayed in the calendar (i.e. the weekIndex is the second to last nested array in the `dates` array), then set the `value` to be the focused day of the next month and update the calendar to the next month.
    if (weekIndex === dates.length - 2 && dates[weekIndex + 1][dayIndex]?.disabled) {
      focusDay = dates[weekIndex + 1][dayIndex].date;
      updateCalendar();
    }
    // If the day that will be highlighted is one week in the future and does not appear in the calendar (i.e. the focused day's weekIndex is the last row in the calendar), then add 7 days to the date object, set the `value` to be the updated date that is one week in the future, and update the calendar to the next month.
    else if (weekIndex === dates.length - 1) {
      const d = getDateObjFromISO(day.date);
      // Update the date to be the first day of the next month.
      d.setDate(d.getDate() + 7);
      focusDay = getISOFromDateObj(d);
      updateCalendar();
    }
    // Else set the value to the next week's date.
    else {
      focusDay = dates[weekIndex + 1][dayIndex].date;
    }
  }

  function moveFocusToPreviousWeek(day, weekIndex, dayIndex) {
    // If the day that will be highlighted in the previous week is disabled because it is in the previous month but it is displaying in the calendar (i.e. the weekIndex is the second nested array in the `dates` array), then set the `value` to be the focused day of the previous month and update the calendar to the previous month.
    if (weekIndex === 1 && dates[weekIndex - 1][dayIndex]?.disabled) {
      focusDay = dates[weekIndex - 1][dayIndex].date;
      updateCalendar();
    }
    // If the day that will be highlighted is one week in the past and does not appear in the calendar (i.e. the focused day's weekIndex is the first row in the calendar), then subtract 7 days from the date object, set the `value` to be the updated date that is one week in the past, and update the calendar to the previous month.
    else if (weekIndex === 0) {
      const d = getDateObjFromISO(day.date);
      // Update the date to be the first day of the next month.
      d.setDate(d.getDate() - 7);
      focusDay = getISOFromDateObj(d);
      updateCalendar();
    }
    // Else set the value to the next week's date.
    else {
      focusDay = dates[weekIndex - 1][dayIndex].date;
    }
  }

  function moveToPreviousMonth(date: string) {
    // Create a new Date object from the ISO date string.
    const d = getDateObjFromISO(date);
    // Update the date to the previous month.
    focusDay = getISOFromDateObj(new Date(d.getFullYear(), d.getMonth() - 1, d.getDate()));
    updateCalendar();
  }

  function moveToNextMonth(date: string) {
    // Create a new Date object from the ISO date string.
    const d = getDateObjFromISO(date);
    // Update the date to the next month.
    focusDay = getISOFromDateObj(new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()));
    updateCalendar();
  }

  function moveToPreviousYear(date: string) {
    // Create a new Date object from the ISO date string.
    const d = getDateObjFromISO(date);
    // Update the date to the previous year.
    focusDay = getISOFromDateObj(new Date(d.getFullYear() - 1, d.getMonth(), d.getDate()));
    updateCalendar();
  }

  function moveToNextYear(date: string) {
    // Create a new Date object from the ISO date string.
    const d = getDateObjFromISO(date);
    // Update the date to the next year.
    focusDay = getISOFromDateObj(new Date(d.getFullYear() + 1, d.getMonth(), d.getDate()));
    updateCalendar();
  }


  class DatePickerDialog {
    constructor(cdp) {
      this.buttonLabelChoose = 'Choose Date';
      this.buttonLabelChange = 'Change Date';
      this.dayLabels = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      this.monthLabels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      this.messageCursorKeys = 'Cursor keys can navigate dates';
      this.lastMessage = '';

      this.textboxNode = cdp.querySelector('input[type="text"');
      this.buttonNode = cdp.querySelector('.input-btn-group button');
      this.dialogNode = cdp.querySelector('[role="dialog"]');
      this.messageNode = this.dialogNode.querySelector('.dialog-message');

      this.monthYearNode = this.dialogNode.querySelector('.month-year-heading');

      this.prevYearNode = this.dialogNode.querySelector('.prev-year');
      this.prevMonthNode = this.dialogNode.querySelector('.prev-month');
      this.nextMonthNode = this.dialogNode.querySelector('.next-month');
      this.nextYearNode = this.dialogNode.querySelector('.next-year');

      this.okButtonNode = this.dialogNode.querySelector('button[value="ok"]');
      this.cancelButtonNode = this.dialogNode.querySelector(
        'button[value="cancel"]'
      );

      this.tbodyNode = this.dialogNode.querySelector('table.calendar tbody');

      this.lastRowNode = null;

      this.days = [];

      this.focusDay = new Date();
      this.selectedDay = new Date(0, 0, 1);

      this.lastDate = -1;

      this.isMouseDownOnBackground = false;

      this.textboxNode.addEventListener(
        'blur',
        this.setDateForButtonLabel.bind(this)
      );

      this.buttonNode.addEventListener(
        'keydown',
        this.handleButtonKeydown.bind(this)
      );
      this.buttonNode.addEventListener(
        'click',
        this.handleButtonClick.bind(this)
      );

      this.okButtonNode.addEventListener('click', this.handleOkButton.bind(this));
      this.okButtonNode.addEventListener(
        'keydown',
        this.handleOkButton.bind(this)
      );

      this.cancelButtonNode.addEventListener(
        'click',
        this.handleCancelButton.bind(this)
      );
      this.cancelButtonNode.addEventListener(
        'keydown',
        this.handleCancelButton.bind(this)
      );

      this.prevMonthNode.addEventListener(
        'click',
        this.handlePreviousMonthButton.bind(this)
      );
      this.nextMonthNode.addEventListener(
        'click',
        this.handleNextMonthButton.bind(this)
      );
      this.prevYearNode.addEventListener(
        'click',
        this.handlePreviousYearButton.bind(this)
      );
      this.nextYearNode.addEventListener(
        'click',
        this.handleNextYearButton.bind(this)
      );

      this.prevMonthNode.addEventListener(
        'keydown',
        this.handlePreviousMonthButton.bind(this)
      );
      this.nextMonthNode.addEventListener(
        'keydown',
        this.handleNextMonthButton.bind(this)
      );
      this.prevYearNode.addEventListener(
        'keydown',
        this.handlePreviousYearButton.bind(this)
      );
      this.nextYearNode.addEventListener(
        'keydown',
        this.handleNextYearButton.bind(this)
      );

      document.body.addEventListener(
        'pointerup',
        this.handleBackgroundMouseUp.bind(this),
        true
      );

      // Create Grid of Dates
      this.tbodyNode.innerHTML = '';
      for (let i = 0; i < 6; i++) {
        const row = this.tbodyNode.insertRow(i);
        this.lastRowNode = row;
        for (let j = 0; j < 7; j++) {
          const cell = document.createElement('td');

          cell.tabIndex = -1;
          cell.addEventListener('click', this.handleDayClick.bind(this));
          cell.addEventListener('keydown', this.handleDayKeyDown.bind(this));
          cell.addEventListener('focus', this.handleDayFocus.bind(this));

          cell.textContent = '-1';

          row.appendChild(cell);
          this.days.push(cell);
        }
      }

      this.updateGrid();
      this.close(false);
      this.setDateForButtonLabel();
    }

    updateGrid() {
      const fd = this.focusDay;

      this.monthYearNode.textContent =
        this.monthLabels[fd.getMonth()] + ' ' + fd.getFullYear();

      let firstDayOfMonth = new Date(fd.getFullYear(), fd.getMonth(), 1);
      let dayOfWeek = firstDayOfMonth.getDay();

      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - dayOfWeek);

      const d = new Date(firstDayOfMonth);

      for (let i = 0; i < this.days.length; i++) {
        const flag = d.getMonth() != fd.getMonth();
        this.updateDate(
          this.days[i],
          flag,
          d,
          this.isSameDay(d, this.selectedDay)
        );
        d.setDate(d.getDate() + 1);

        // Hide last row if all dates are disabled (e.g. in next month)
        if (i === 35) {
          if (flag) {
            this.lastRowNode.style.visibility = 'hidden';
          } else {
            this.lastRowNode.style.visibility = 'visible';
          }
        }
      }
    }

    moveFocusToDay(day) {
      const d = this.focusDay;

      this.focusDay = day;

      if (
        d.getMonth() != this.focusDay.getMonth() ||
        d.getFullYear() != this.focusDay.getFullYear()
      ) {
        this.updateGrid();
      }
      this.setFocusDay();
    }

    changeMonth(currentDate, numMonths) {
      const getDays = (year, month) => new Date(year, month, 0).getDate();

      const isPrev = numMonths < 0;
      const numYears = Math.trunc(Math.abs(numMonths) / 12);
      numMonths = Math.abs(numMonths) % 12;

      const newYear = isPrev
        ? currentDate.getFullYear() - numYears
        : currentDate.getFullYear() + numYears;

      const newMonth = isPrev
        ? currentDate.getMonth() - numMonths
        : currentDate.getMonth() + numMonths;

      const newDate = new Date(newYear, newMonth, 1);

      const daysInMonth = getDays(newDate.getFullYear(), newDate.getMonth() + 1);

      // If lastDate is not initialized set to current date
      this.lastDate = this.lastDate ? this.lastDate : currentDate.getDate();

      if (this.lastDate > daysInMonth) {
        newDate.setDate(daysInMonth);
      } else {
        newDate.setDate(this.lastDate);
      }

      return newDate;
    }

    moveToNextYear() {
      this.focusDay = this.changeMonth(this.focusDay, 12);
      this.updateGrid();
    }

    moveToPreviousYear() {
      this.focusDay = this.changeMonth(this.focusDay, -12);
      this.updateGrid();
    }

    moveToNextMonth() {
      this.focusDay = this.changeMonth(this.focusDay, 1);
      this.updateGrid();
    }

    moveToPreviousMonth() {
      this.focusDay = this.changeMonth(this.focusDay, -1);
      this.updateGrid();
    }

    moveFocusToNextDay() {
      const d = new Date(this.focusDay);
      d.setDate(d.getDate() + 1);
      this.lastDate = d.getDate();
      this.moveFocusToDay(d);
    }

    moveFocusToNextWeek() {
      const d = new Date(this.focusDay);
      d.setDate(d.getDate() + 7);
      this.lastDate = d.getDate();
      this.moveFocusToDay(d);
    }

    moveFocusToPreviousDay() {
      const d = new Date(this.focusDay);
      d.setDate(d.getDate() - 1);
      this.lastDate = d.getDate();
      this.moveFocusToDay(d);
    }

    moveFocusToPreviousWeek() {
      const d = new Date(this.focusDay);
      d.setDate(d.getDate() - 7);
      this.lastDate = d.getDate();
      this.moveFocusToDay(d);
    }

    moveFocusToFirstDayOfWeek() {
      const d = new Date(this.focusDay);
      d.setDate(d.getDate() - d.getDay());
      this.lastDate = d.getDate();
      this.moveFocusToDay(d);
    }

    moveFocusToLastDayOfWeek() {
      const d = new Date(this.focusDay);
      d.setDate(d.getDate() + (6 - d.getDay()));
      this.lastDate = d.getDate();
      this.moveFocusToDay(d);
    }

    // Day methods

    isDayDisabled(domNode) {
      return domNode.classList.contains('disabled');
    }

    getDayFromDataDateAttribute(domNode) {
      const parts = domNode.getAttribute('data-date').split('-');
      return new Date(parts[0], parseInt(parts[1]) - 1, parts[2]);
    }

    // Textbox methods

    setTextboxDate(domNode) {
      let d = this.focusDay;

      if (domNode) {
        d = this.getDayFromDataDateAttribute(domNode);
        // updated aria-selected
        this.days.forEach((day) =>
          day === domNode
            ? day.setAttribute('aria-selected', 'true')
            : day.removeAttribute('aria-selected')
        );
      }

      this.textboxNode.value =
        d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
      this.setDateForButtonLabel();
    }

    setDateForButtonLabel() {
      const parts = this.textboxNode.value.split('/');

      if (
        parts.length === 3 &&
        Number.isInteger(parseInt(parts[0])) &&
        Number.isInteger(parseInt(parts[1])) &&
        Number.isInteger(parseInt(parts[2]))
      ) {
        const day = new Date(
          parseInt(parts[2]),
          parseInt(parts[0]) - 1,
          parseInt(parts[1])
        );

        let label = this.buttonLabelChange;
        label += ', ' + this.dayLabels[day.getDay()];
        label += ' ' + this.monthLabels[day.getMonth()];
        label += ' ' + day.getDate();
        label += ', ' + day.getFullYear();
        this.buttonNode.setAttribute('aria-label', label);
      } else {
        // If not a valid date, initialize with "Choose Date"
        this.buttonNode.setAttribute('aria-label', this.buttonLabelChoose);
      }
    }

    setMessage(str) {
      function setMessageDelayed() {
        this.messageNode.textContent = str;
      }

      if (str !== this.lastMessage) {
        setTimeout(setMessageDelayed.bind(this), 200);
        this.lastMessage = str;
      }
    }

    // Event handlers

    handleOkButton(event) {
      let flag = false;

      switch (event.type) {
        case 'keydown':
          switch (event.key) {
            case 'Tab':
              if (!event.shiftKey) {
                this.prevYearNode.focus();
                flag = true;
              }
              break;

            case 'Esc':
            case 'Escape':
              this.close();
              flag = true;
              break;

            default:
              break;
          }
          break;

        case 'click':
          this.setTextboxDate();
          this.close();
          flag = true;
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    handleCancelButton(event) {
      let flag = false;

      switch (event.type) {
        case 'keydown':
          switch (event.key) {
            case 'Esc':
            case 'Escape':
              this.close();
              flag = true;
              break;

            default:
              break;
          }
          break;

        case 'click':
          this.close();
          flag = true;
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    handleNextYearButton(event) {
      let flag = false;

      switch (event.type) {
        case 'keydown':
          switch (event.key) {
            case 'Esc':
            case 'Escape':
              this.close();
              flag = true;
              break;

            case 'Enter':
              this.moveToNextYear();
              this.setFocusDay(false);
              flag = true;
              break;
          }

          break;

        case 'click':
          this.moveToNextYear();
          this.setFocusDay(false);
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    handlePreviousYearButton(event) {
      let flag = false;

      switch (event.type) {
        case 'keydown':
          switch (event.key) {
            case 'Enter':
              this.moveToPreviousYear();
              this.setFocusDay(false);
              flag = true;
              break;

            case 'Tab':
              if (event.shiftKey) {
                this.okButtonNode.focus();
                flag = true;
              }
              break;

            case 'Esc':
            case 'Escape':
              this.close();
              flag = true;
              break;

            default:
              break;
          }

          break;

        case 'click':
          this.moveToPreviousYear();
          this.setFocusDay(false);
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    handleNextMonthButton(event) {
      let flag = false;

      switch (event.type) {
        case 'keydown':
          switch (event.key) {
            case 'Esc':
            case 'Escape':
              this.close();
              flag = true;
              break;

            case 'Enter':
              this.moveToNextMonth();
              this.setFocusDay(false);
              flag = true;
              break;
          }

          break;

        case 'click':
          this.moveToNextMonth();
          this.setFocusDay(false);
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    handlePreviousMonthButton(event) {
      let flag = false;

      switch (event.type) {
        case 'keydown':
          switch (event.key) {
            case 'Esc':
            case 'Escape':
              this.close();
              flag = true;
              break;

            case 'Enter':
              this.moveToPreviousMonth();
              this.setFocusDay(false);
              flag = true;
              break;
          }

          break;

        case 'click':
          this.moveToPreviousMonth();
          this.setFocusDay(false);
          flag = true;
          break;

        default:
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    handleDayKeyDown(event) {
      let flag = false;

      switch (event.key) {
        case 'Esc':
        case 'Escape':
          this.close();
          break;

        case ' ':
          this.setTextboxDate(event.currentTarget);
          flag = true;
          break;

        case 'Enter':
          this.setTextboxDate(event.currentTarget);
          this.close();
          flag = true;
          break;

        case 'Tab':
          this.cancelButtonNode.focus();
          if (event.shiftKey) {
            this.nextYearNode.focus();
          }
          this.setMessage('');
          flag = true;
          break;

        case 'Right':
        case 'ArrowRight':
          this.moveFocusToNextDay();
          flag = true;
          break;

        case 'Left':
        case 'ArrowLeft':
          this.moveFocusToPreviousDay();
          flag = true;
          break;

        case 'Down':
        case 'ArrowDown':
          this.moveFocusToNextWeek();
          flag = true;
          break;

        case 'Up':
        case 'ArrowUp':
          this.moveFocusToPreviousWeek();
          flag = true;
          break;

        case 'PageUp':
          if (event.shiftKey) {
            this.moveToPreviousYear();
          } else {
            this.moveToPreviousMonth();
          }
          this.setFocusDay();
          flag = true;
          break;

        case 'PageDown':
          if (event.shiftKey) {
            this.moveToNextYear();
          } else {
            this.moveToNextMonth();
          }
          this.setFocusDay();
          flag = true;
          break;

        case 'Home':
          this.moveFocusToFirstDayOfWeek();
          flag = true;
          break;

        case 'End':
          this.moveFocusToLastDayOfWeek();
          flag = true;
          break;
      }

      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }

    handleDayClick(event) {
      if (!this.isDayDisabled(event.currentTarget) && event.which !== 3) {
        this.setTextboxDate(event.currentTarget);
        this.close();
      }

      event.stopPropagation();
      event.preventDefault();
    }

    handleDayFocus() {
      this.setMessage(this.messageCursorKeys);
    }

    handleButtonKeydown(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        this.open();
        this.setFocusDay();

        event.stopPropagation();
        event.preventDefault();
      }
    }
  }

  // Initialize menu button date picker

  // window.addEventListener('load', function () {
  //   const datePickers = document.querySelectorAll('.datepicker');

  //   datePickers.forEach(function (dp) {
  //     new DatePickerDialog(dp);
  //   });
  // });
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
    >
      <Icon icon="vaadin:angle-double-left" width="24" />
    </button>

    <button
      type="button" 
      class="prev-month" 
      aria-label="previous month"
      on:click={() => moveToPreviousMonth(focusDay)}
    >
      <Icon icon="vaadin:angle-left" width="24" />
    </button>

    <span id="id-grid-label" class="month-year-heading" aria-live="polite">{ monthYearHeading }</span>

    <button
      type="button" 
      class="next-month" 
      aria-label="next month"
      on:click={() => moveToNextMonth(focusDay)}
    >
      <Icon icon="vaadin:angle-right" width="24" />
    </button>

    <button
      type="button" 
      class="next-year" 
      aria-label="next year" 
      bind:this={nextYearBtn}
      on:click={() => moveToNextYear(focusDay)}
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
              <!-- role={focusDay === day.date ? "gridcell" : null} -->
              <!-- I think the <td> elements already have the "gridcell" role, so there doesn't appear to be any need to set role="gridcell". -->
              <td
                tabindex="{focusDay === day.date ? 0 : -1}"
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

      <!--
      <tbody>
        <tr>
          <td class="disabled" tabindex="-1"></td>
          <td class="disabled" tabindex="-1"></td>
          <td class="disabled" tabindex="-1"></td>
          <td class="disabled" tabindex="-1"></td>
          <td class="disabled" tabindex="-1"></td>
          <td class="disabled" tabindex="-1"></td>
          <td tabindex="-1" data-date="2020-02-01">1</td>
        </tr>
        <tr>
          <td tabindex="-1" data-date="2020-02-02">2</td>
          <td tabindex="-1" data-date="2020-02-03">3</td>
          <td tabindex="-1" data-date="2020-02-04">4</td>
          <td tabindex="-1" data-date="2020-02-05">5</td>
          <td tabindex="-1" data-date="2020-02-06">6</td>
          <td tabindex="-1" data-date="2020-02-07">7</td>
          <td tabindex="-1" data-date="2020-02-08">8</td>
        </tr>
        <tr>
          <td tabindex="-1" data-date="2020-02-09">9</td>
          <td tabindex="-1" data-date="2020-02-10">10</td>
          <td tabindex="-1" data-date="2020-02-11">11</td>
          <td tabindex="-1" data-date="2020-02-12">12</td>
          <td tabindex="-1" data-date="2020-02-13">13</td>
          <td tabindex="0" data-date="2020-02-14" role="gridcell" aria-selected="true">14</td>
          <td tabindex="-1" data-date="2020-02-15">15</td>
        </tr>
        <tr>
          <td tabindex="-1" data-date="2020-02-16">16</td>
          <td tabindex="-1" data-date="2020-02-17">17</td>
          <td tabindex="-1" data-date="2020-02-18">18</td>
          <td tabindex="-1" data-date="2020-02-19">19</td>
          <td tabindex="-1" data-date="2020-02-20">20</td>
          <td tabindex="-1" data-date="2020-02-21">21</td>
          <td tabindex="-1" data-date="2020-02-22">22</td>
        </tr>
        <tr>
          <td tabindex="-1" data-date="2020-02-23">23</td>
          <td tabindex="-1" data-date="2020-02-24">24</td>
          <td tabindex="-1" data-date="2020-02-25">25</td>
          <td tabindex="-1" data-date="2020-02-26">26</td>
          <td tabindex="-1" data-date="2020-02-27">27</td>
          <td tabindex="-1" data-date="2020-02-28">28</td>
          <td tabindex="-1" data-date="2020-02-29">29</td>
        </tr>
        <tr>
          <td tabindex="-1" data-date="2020-02-30">30</td>
          <td tabindex="-1" data-date="2020-02-31">31</td>
          <td class="disabled" tabindex="-1"></td>
          <td class="disabled" tabindex="-1"></td>
          <td class="disabled" tabindex="-1"></td>
          <td class="disabled" tabindex="-1"></td>
          <td class="disabled" tabindex="-1"></td>
        </tr>
      </tbody>
      -->
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
        console.log("event.key:", event.key);
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
    width: 320px;
    clear: both;
    border: 3px solid var(--secondary-color);
    margin-top: 0.15em;
    border-radius: var(--border-radius);
    padding: 0;
    background-color: var(--white);
    z-index: 2;
    box-shadow: var(--box-shadow-depth);

    & .header {
      cursor: default;
      background-color: var(--secondary-color);
      padding: 7px;
      font-weight: bold;
      text-transform: uppercase;
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: space-around;

      & .month-year-heading {
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
      }

      & .prev-year, & .prev-month, & .next-month, & .next-year {

        &:hover {
          outline: 1px solid var(--white);
          border-radius: var(--border-radius);
        }
      }
    }

    & table.calendar {
      margin: 0;
      padding: 10px;
      padding-bottom: 0;
      border: none;
      border-collapse: separate;

      & th, & td {
        padding: 0;
        text-align: center;
        background: var(--white);
        color: var(--text-color-default);
        border: none;
      }

      & td {
        background-color: var(--neutral-200);
        padding: 3px;
        border: var(--border-default);
        margin: 0;
        line-height: inherit;
        height: 40px;
        width: 40px;
        border-radius: var(--border-radius);
        font-size: 15px;
        background: var(--neutral-200);
        cursor: pointer;

        &:focus, &:hover {
          background-color: var(--neutral-400);
          border-color: var(--neutral-400);
        }

        &.disabled {
          border-color: transparent;
          pointer-events: none;
        }
      }

      /* Selected date styles */
      & td[aria-selected] {
        border: 2px dotted var(--secondary-color);
      }

      /* Focused date styles */
      & td[tabindex="0"] {
        background-color: var(--secondary-color);
        border-color: var(--secondary-color);
        color: var(--white);
      }
    }

    & .dialog-ok-cancel-group {
      text-align: right;
      margin-top: 1em;
      margin-bottom: 1em;
      margin-right: 1em;

      & .dialog-button {
        padding: 6px;
        margin-left: 1em;
        width: 5em;
        background-color: var(--neutral-200);
        font-size: 0.85em;
        color: var(--text-color-default);
        outline: none;
        border: var(--border-default);
        border-radius: var(--border-radius);

        &:focus {
          padding: 4px;
          border: 2px solid var(--secondary-color);
        }

        &:hover {
          padding: 5px;
          border: 1px solid var(--secondary-color);
        }
      }
    }

    & .dialog-message {
      padding-top: 0.25em;
      padding-left: 1em;
      height: 1.75em;
      background: var(--secondary-color);
      color: var(--white);
    }
  }
</style>
