<label class="container">
  <!-- Then use `bind:group` here too and bind to the `group` prop that is passed into this component. -->
  <input type="checkbox" bind:group={group} value={value}> {label}
  <span class="checkmark"></span>
</label>


<script>
  export let group;
  export let value;
  export let label;
</script>


<style>
  // ---------------------------
  // Custom Checkbox Styles (https://www.w3schools.com/howto/howto_css_custom_checkbox.asp)
  // ---------------------------
  // Customize the label (the container).
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    user-select: none;
    // On mouse-over, add a grey background color.
    &:hover input ~ .checkmark {
      background-color: $geyser-gray;
    }

    // Hide the browser's default checkbox.
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
      // When the checkbox is checked, make the border blue, add a blue background, and remove the box-shadow.
      &:checked ~ .checkmark {
        border-color: $kemper-blue;
        background-color: $kemper-blue;
        box-shadow: none;
        // Show the checkmark when checked.
        &:after {
          display: block;
        }
      }
    }

    // Create a custom checkbox.
    .checkmark {
      position: absolute;
      top: -3px;
      left: 0;
      height: 25px;
      width: 25px;
      border: 1px solid darken($geyser-gray, 10%);
      box-shadow: 1px 1px 1px darken($geyser-gray, 10%);
      background-color: white;
      &:after {
        // Create the checkmark/indicator (hidden when not checked).
        content: "";
        position: absolute;
        display: none;
        // Style the checkmark/indicator.
        left: 7px;
        top: -1px;
        width: 10px;
        height: 20px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
      }
    }
  }
</style>
