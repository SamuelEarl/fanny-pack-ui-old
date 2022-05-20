<script lang="ts">
  export let group;
  export let value;
  export let disabled = false;
</script>


<label class="fpui-radio-label-wrapper" class:disabled>
  <input
    type="radio" 
    class="fpui-radio-input" 
    bind:group={group} 
    {value} 
    {disabled}
    on:change
    on:input
  > {value}
  <span class="fpui-radio-checkmark"></span>
</label>


<style>
  /* Radio Button Styles: https://www.w3schools.com/howto/howto_css_custom_checkbox.asp */

  /* Customize the label (the container). */
  .fpui-radio-label-wrapper {
    display: inline-block;
    position: relative;
    padding-left: 35px;
    margin-bottom: var(--fpui-radio-margin-bottom, 20px);
    cursor: pointer;
    font-size: 1rem;
    /* -webkit-user-select: none; */
    /* -moz-user-select: none; */
    /* -ms-user-select: none; */
    user-select: none;
    
    /* On mouse-over of an unselected radio button, add a thicker outline to the radio button. */
    &:hover .fpui-radio-input ~ .fpui-radio-checkmark {
      box-shadow: 0 0 0 1px var(--fpui-radio-unchecked-border-color, #c7c7c7);
    }

    /* On mouse-over of a selected radio button, add a thicker outline to the radio button that matches the background color. */
    &:hover .fpui-radio-input:checked ~ .fpui-radio-checkmark {
      box-shadow: 0 0 0 1px var(--fpui-radio-checked-bg-color, gray);
    }
  
    /* Hide the browser's default radio button. */
    & .fpui-radio-input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      /* When the radio button is selected, add a colored background. */
      &:checked ~ .fpui-radio-checkmark {
        border-color: var(--fpui-radio-checked-bg-color, gray);
        background-color: var(--fpui-radio-checked-bg-color, gray);
      }

      /* Show the checkmark when checked. */
      &:checked ~ .fpui-radio-checkmark:after {
        display: block;
      }
    }

    /* Create a custom radio button. */
    & .fpui-radio-checkmark {
      position: absolute;
      top: var(--fpui-radio-vertical-alignment, -2px);
      left: 0;
      height: 25px;
      width: 25px;
      border: 1px solid var(--fpui-radio-unchecked-border-color, #c7c7c7);
      border-radius: 50%;
      background-color: var(--fpui-radio-unchecked-bg-color, white);

      /* Create the checkmark/indicator. */
      &:after {
        /* Hide the checkmark/indicator when not checked. */
        content: "";
        position: absolute;
        display: none;

        /* Style the checkmark/indicator. */
        top: 5px;
        left: 5px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: white;
      }
    }

    /* Disabled radio buttons styles */
    & .fpui-radio-input:disabled ~ .fpui-radio-checkmark {
      border-color: var(--disabled-bg-color, black);
      background-color: var(--disabled-bg-color, black);
      cursor: default;
    }
    /* On mouse-over of an disabled radio button, prevent the thicker outline from appearing around the radio button. */
    &:hover .fpui-radio-input:disabled ~ .fpui-radio-checkmark {
      box-shadow: none;
    }
    /* Set `cursor: default` on the label text of a disabled radio button. */
    &.disabled {
      cursor: default;
    }
  }
</style>
