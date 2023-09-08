<!-- 
  This content is licensed according to the W3C Software License at
  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
-->

<script lang="ts">
  import { fly } from "svelte/transition";
  import Icon from "@iconify/svelte";

  export let btnIcon = "mdi:calendar";
  export let btnIconSize = "24";

  let showDialog = false;

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

    isSameDay(day1, day2) {
      return (
        day1.getFullYear() == day2.getFullYear() &&
        day1.getMonth() == day2.getMonth() &&
        day1.getDate() == day2.getDate()
      );
    }

    isNotSameMonth(day1, day2) {
      return (
        day1.getFullYear() != day2.getFullYear() ||
        day1.getMonth() != day2.getMonth()
      );
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

    updateDate(domNode, disable, day, selected) {
      let d = day.getDate().toString();
      if (day.getDate() <= 9) {
        d = '0' + d;
      }

      let m = day.getMonth() + 1;
      if (day.getMonth() < 9) {
        m = '0' + m;
      }

      domNode.tabIndex = -1;
      domNode.removeAttribute('aria-selected');
      domNode.setAttribute('data-date', day.getFullYear() + '-' + m + '-' + d);

      if (disable) {
        domNode.classList.add('disabled');
        domNode.textContent = '';
      } else {
        domNode.classList.remove('disabled');
        domNode.textContent = day.getDate();
        if (selected) {
          domNode.setAttribute('aria-selected', 'true');
          domNode.tabIndex = 0;
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

    setFocusDay(flag) {
      if (typeof flag !== 'boolean') {
        flag = true;
      }

      for (let i = 0; i < this.days.length; i++) {
        const dayNode = this.days[i];
        const day = this.getDayFromDataDateAttribute(dayNode);

        dayNode.tabIndex = -1;
        if (this.isSameDay(day, this.focusDay)) {
          dayNode.tabIndex = 0;
          if (flag) {
            dayNode.focus();
          }
        }
      }
    }

    open() {
      this.dialogNode.style.display = 'block';
      this.dialogNode.style.zIndex = 2;

      this.getDateFromTextbox();
      this.updateGrid();
      this.lastDate = this.focusDay.getDate();
    }

    isOpen() {
      return window.getComputedStyle(this.dialogNode).display !== 'none';
    }

    close(flag) {
      if (typeof flag !== 'boolean') {
        // Default is to move focus to combobox
        flag = true;
      }

      this.setMessage('');
      this.dialogNode.style.display = 'none';

      if (flag) {
        this.buttonNode.focus();
      }
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

      // If lastDat is not initialized set to current date
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

    getDateFromTextbox() {
      const parts = this.textboxNode.value.split('/');
      const month = parseInt(parts[0]);
      const day = parseInt(parts[1]);
      let year = parseInt(parts[2]);

      if (
        parts.length === 3 &&
        Number.isInteger(month) &&
        Number.isInteger(day) &&
        Number.isInteger(year)
      ) {
        if (year < 100) {
          year = 2000 + year;
        }
        this.focusDay = new Date(year, month - 1, day);
        this.selectedDay = new Date(this.focusDay);
      } else {
        // If not a valid date (MM/DD/YY) initialize with todays date
        this.focusDay = new Date();
        this.selectedDay = new Date(0, 0, 1);
      }
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

    handleButtonClick(event) {
      if (this.isOpen()) {
        this.close();
      } else {
        this.open();
        this.setFocusDay();
      }

      event.stopPropagation();
      event.preventDefault();
    }

    handleBackgroundMouseUp(event) {
      if (
        !this.buttonNode.contains(event.target) &&
        !this.dialogNode.contains(event.target)
      ) {
        if (this.isOpen()) {
          this.close(false);
          event.stopPropagation();
          event.preventDefault();
        }
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

<div class="datepicker">
  <div class="date">
    <label for="id-textbox-1">Date</label>

    <div class="input-btn-group">
      <input type="text" placeholder="YYYY-MM-DD" id="id-textbox-1" aria-describedby="id-description-1">
      <span id="id-description-1" class="desc screen-reader-only">date format: YYYY-MM-DD</span>
      <button
        type="button" 
        class="date-btn" 
        aria-label="Choose Date"
        on:click={() => showDialog = !showDialog}
        on:keydown={() => showDialog = !showDialog}
      >
        <Icon icon={btnIcon} width={btnIconSize} />
      </button>
    </div>
  </div>

  {#if showDialog}
    <div id="id-datepicker-1" class="datepicker-dialog" role="dialog" aria-modal="true" aria-label="Choose Date" transition:fly>
      <div class="header">
        <button type="button" class="prev-year" aria-label="previous year">
          <Icon icon="vaadin:angle-double-left" width="24" />
        </button>

        <button type="button" class="prev-month" aria-label="previous month">
          <Icon icon="vaadin:angle-left" width="24" />
        </button>

        <span id="id-grid-label" class="month-year-heading" aria-live="polite">February 2020</span>

        <button type="button" class="next-month" aria-label="next month">
          <Icon icon="vaadin:angle-right" width="24" />
        </button>

        <button type="button" class="next-year" aria-label="next year">
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
        </table>
      </div>

      <div class="dialog-ok-cancel-group">
        <button class="dialog-button" value="cancel">Cancel</button>
        <button class="dialog-button" value="ok">OK</button>
      </div>
      <div class="dialog-message" aria-live="polite"></div>
    </div>
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
        border-right: 0;
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
        background-color: var(--custom-date-input-btn-bg-color, var(--border-color-default));
        border-radius: 0 var(--border-radius) var(--border-radius) 0;

        &:focus {
          outline: none;
          background-color: var(--white);
        }
      }
    }
  }

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

    & .calendar {
      width: 320px;
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
        border-radius: var(--border-radius);

        &:focus {
          padding: 4px;
          border: 2px solid black;
        }

        &:hover {
          padding: 5px;
          border: 1px solid black;
        }
      }
    }
  }

  .datepicker-dialog table.calendar {
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 1em;
    border: none;
    border-collapse: separate;
  }

  .datepicker-dialog table.calendar th,
  .datepicker-dialog table.calendar td {
    text-align: center;
    background: var(--white);
    color: var(--text-color-default);
    border: none;
  }

  .datepicker-dialog table.calendar tr {
    border: 1px solid var(--text-color-default);
  }

  .datepicker-dialog table.calendar td {
    padding: 3px;
    margin: 0;
    line-height: inherit;
    height: 40px;
    width: 40px;
    border-radius: var(--border-radius);
    font-size: 15px;
    background: var(--neutral-200);
  }

  .datepicker-dialog table.calendar td.disabled {
    padding: 2px;
    border: none;
    height: 41px;
    width: 41px;
  }

  .datepicker-dialog table.calendar td:focus,
  .datepicker-dialog table.calendar td:hover {
    padding: 0;
    background-color: var(--neutral-200);
    color: var(--text-color-default);
  }

  .datepicker-dialog table.calendar td:focus {
    padding: 1px;
    border: 2px solid rgb(100 100 100);
    outline: 0;
  }

  .datepicker-dialog table.calendar td:not(.disabled):hover {
    padding: 2px;
    border: 1px solid rgb(100 100 100);
  }

  .datepicker-dialog table.calendar td[aria-selected] {
    padding: 1px;
    border: 2px dotted rgb(100 100 100);
  }

  .datepicker-dialog table.calendar td[aria-selected]:focus {
    padding: 1px;
    border: 2px solid rgb(100 100 100);
  }

  .datepicker-dialog table.calendar td[tabindex="0"] {
    background-color: var(--secondary-color);
    color: var(--white);
  }

  .datepicker-dialog .dialog-message {
    padding-top: 0.25em;
    padding-left: 1em;
    height: 1.75em;
    background: var(--secondary-color);
    color: var(--white);
  }
</style>
