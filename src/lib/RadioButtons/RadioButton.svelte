<label class="container">
  <!-- Then use `bind:group` here too and bind to the `group` prop that is passed into this component. -->
  <input type="radio" bind:group={group} value={value}> {value}
  <span class="checkmark"></span>
</label>


<script>
  export let group;
  export let value;
</script>


<style lang="scss">
  @import "src/assets/styles/_variables.scss";

  // Radio Button Styles:
  // https://www.w3schools.com/howto/howto_css_custom_checkbox.asp
  // --------------------------------------------------------------

  // Customize the label (the container).
  .container {
    display: inline-block;
    position: relative;
    padding-left: 35px;
    // margin-bottom: 12px;
    cursor: pointer;
    font-size: 1rem;
    // -webkit-user-select: none;
    // -moz-user-select: none;
    // -ms-user-select: none;
    user-select: none;
    
    // On mouse-over, add a grey background color.
    &:hover input ~ .checkmark {
      background-color: $geyser-gray;
    }
  
    // Hide the browser's default radio button.
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      // When the radio button is selected, add a colored background.
      &:checked ~ .checkmark {
        border-color: $kemper-blue;
        background-color: $kemper-blue;
        box-shadow: 0 0 0 1px $kemper-blue;
      }

      // Show the checkmark when checked.
      &:checked ~ .checkmark:after {
        display: block;
      }
    }

    // Create a custom radio button.
    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 25px;
      border: 1px solid darken($geyser-gray, 10%);
      box-shadow: 1px 1px 1px darken($geyser-gray, 10%);
      border-radius: 50%;
      background-color: white;

      // Create the checkmark/indicator.
      &:after {
        // Hide the checkmark/indicator when not checked.
        content: "";
        position: absolute;
        display: none;

        // Style the checkmark/indicator.
        top: 5px;
        left: 5px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: white;
      }
    }
  }
</style>
