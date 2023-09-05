Date Picker

* Create an accessible date picker. Look at these examples: 
    * https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/
    * https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-datepicker/
* I want to use the same return value that an `<input type="date" />` element uses, which is `YYYY-MM-DD`. That way I can also sort database results by the date.
    * Can you create a new Date object and pass the `YYYY-MM-DD` date string to it? Yes, you can. See https://www.w3schools.com/js/js_date_formats.asp. The `YYYY-MM-DD` format is the ISO format. Keep in mind that the actual day that is returned from the `new Date(YYYY-MM-DD)` constructor will vary depending on the timezone. So passing an ISO date to the `new Date()` constructor can get confusing.