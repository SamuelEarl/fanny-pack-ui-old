<script lang="ts">
  import { createId } from "../utils";

  export let arrayType = "string";
  export let checkboxGroupValues;
  export let group;

  let componentId = createId();
</script>


{#if arrayType === "string" || arrayType === "number"}
  {#each checkboxGroupValues as item}
    <!--
      IMPORTANT NOTE: 
      `bind:group` does not work with nested components: https://github.com/sveltejs/svelte/issues/2308
      So I have just copied and pasted the code from the Checkbox.svelte component into this component.
    -->
    <!-- In Svelte you would use the `bind:group` property if you want to include all the values from a group of checkboxes into a single array of values that would then get sent to the backend for processing. So if the <Checkbox> component is used as part of a group of checkboxes, then use `bind:group` to bind to the `group` prop that is passed into this component. Otherwise, if this is a single checkbox (i.e. not part of a group of checkboxes), then do not use the `bind:group` property. -->
    <!-- <Checkbox bind:group={group} value={item} label={item} on:change /> -->
    <label class="container">
      <input type="checkbox" bind:group={group} value={item} on:change> {item}
      <span class="checkmark"></span>
    </label>
  {/each}
{/if}

{#if arrayType === "objects"}
  {#each checkboxGroupValues as obj}
    <!-- <Checkbox bind:group={group} value={obj.value} label={obj.label} /> -->
    <label class="container">
      <input type="checkbox" bind:group={group} value={obj.value} on:change> {obj.label}
      <span class="checkmark"></span>
    </label>
  {/each}
{/if}


<style>
  /*
  ---------------------------
  Custom Checkbox Styles (https://www.w3schools.com/howto/howto_css_custom_checkbox.asp)
  ---------------------------
  */
  /* Customize the label (the container). */
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: var(--fpcl-checkbox-margin-bottom, 20px);
    cursor: pointer;
    user-select: none;
    /* On mouse-over, add a box-shadow to the checkbox. */
    &:hover input ~ .checkmark {
      box-shadow: var(--fpcl-checkbox-box-shadow, 0 0 0 1px gray);
    }

    /* Hide the browser's default checkbox. */
    & input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      /* When the checkbox is checked, make the border blue, add a blue background, and remove the box-shadow. */
      &:checked ~ .checkmark {
        border-color: var(--fpcl-checkbox-checked-bg-color, #c7c7c7);
        background-color: var(--fpcl-checkbox-checked-bg-color, #c7c7c7);
        box-shadow: none;
        /* Show the checkmark when checked. */
        &:after {
          display: block;
        }
      }
    }

    /* Create a custom checkbox. */
    & .checkmark {
      position: absolute;
      top: -3px;
      left: 0;
      height: 25px;
      width: 25px;
      border-width: var(--fpcl-checkbox-border-width, 1px);
      border-style: var(--fpcl-checkbox-border-style, solid);
      border-color: var(--fpcl-checkbox-border-color, #c7c7c7);
      background-color: var(--fpcl-checkbox-bg-color, white);

      &:after {
        /* Create the checkmark/indicator (hidden when not checked). */
        content: "";
        position: absolute;
        display: none;
        /* Style the checkmark/indicator. */
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
