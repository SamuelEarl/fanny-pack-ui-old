<!-- The `on:change` attribute is called "event forwarding" in Svelte. This will pass all change events to the <Select> components and then you can do whatever you need to when the change event happens. -->

{#if label}
  <div class="fpcl-select-label-container">
    <label for={`fpcl-select-btn-${id}`} class="fpcl-select-label">{label}</label>
  </div>
{/if}
<div class="fpcl-select">
  <div role="combobox" id={`fpcl-select-btn-${id}`} class="{`fpcl-select-btn ${size}`}" on:click={() => {
    showSelectMenu = !showSelectMenu;
    calculateMenuHeight(id, showSelectMenu, tick, window, document);
  }}>
    <span class="fpcl-select-btn-text" title={selectedOption}>{selectedOption}</span>
    <span class="fpcl-select-btn-arrow">›</span>
  </div>
  <!-- For accessibility, the select menu needs to stay in the DOM, but it can be hidden. (This is how normal <select> elements work.) So the select menu should not be conditionally displayed inside of an {#if} block. -->
  <div id="{`fpcl-select-menu-${id}`}" class="{`fpcl-select-menu ${size}`}" class:show={showSelectMenu} use:clickOutsideSelectMenu on:clickoutside={() => showSelectMenu = false}>
    {#if arrayType === "string" || arrayType === "number"}
      {#each optionsArray as item}
        <div role="option" aria-selected={selectedOption === item} class="{`fpcl-select-option ${size}`}" title={item} on:click={() => setSelectedOption(item)}>{item}</div>
      {/each}
    {/if}
    {#if arrayType === "object"}
      {#each optionsArray as obj}
        <div role="option" aria-selected={selectedOption === obj.item} class="{`fpcl-select-option ${size}`}" title={obj.item} on:click={() => setSelectedOption(obj.item)}>{obj.item}</div>
      {/each}
    {/if}
  </div>
</div>


<script lang="ts">
  import { tick } from "svelte";
  import { calculateMenuHeight, clickOutsideSelectMenu } from "../utils";

  export let label;
  export let optionsArray;
  export let arrayType = "string";
  export let selectedOption;
  export let size = "medium";

  // Set an id value for the <label> and role="combobox" elements.
  let id = `ccs-${Math.random().toString(36)}`;
  let showSelectMenu = false;

  // When working with plain HTML <select> elements, you set the default value with the `selected` attribute. In Svelte you set the default value by setting the `selectedOption` variable (in `<select bind:value={selectedOption}>`) to equal the value from the `optionsArray` that you want to be the default value.
  
  // TODO: I need to verify that the follow 2 paragraphs are accurate with the refactors that I have made to this component.
  // The default value of this <Select> component is an empty string. However, if the user sets the `defaultValue` prop to a value other than the empty string, then the `selectedOption` needs to be set as that `defaultValue` so the `defaultValue` will be displayed in the UI.
  // Also, if a user has previously selected an option and saved it to the database, then that selected option will be passed into this component as the `selectedOption` prop and that `selectedOption` prop will set the value that is displayed in the UI. So, if the `selectedOption` has already been set by the user (which means that it will get passed into this component), then do not set the `selectedOption` prop/variable to the `defaultValue`.
  // if (!selectedOption) {
  //   selectedOption = defaultValue;
  // }

  function setSelectedOption(option) {
    selectedOption = option;
    showSelectMenu = false;
  }
</script>


<style>
  .fpcl-select-label-container {
    margin-bottom: 5px;

    & .fpcl-select-label {
      font-size: 0.85rem;
      color: var(--gray140);
    }
  }

  .fpcl-select {
    position: relative;

    & .fpcl-select-btn {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: var(--fpcl-select-border);
      border-radius: var(--fpcl-select-radius);
      background-color: var(--fpcl-select-background-color);
      color: var(--fpcl-select-text-color);
      cursor: pointer;

      /*
        Give some padding around the dropdown arrow icon so it does not get pressed into the right border of the select box.
      */
      &.small {
        padding: var(--fpcl-select-small-padding);
      }
      &.medium {
        padding: var(--fpcl-select-medium-padding);
      }
      &.large {
        padding: var(--fpcl-select-large-padding);
      }

      & .fpcl-select-btn-text {
        line-height: 1rem;
        /*
          Cut off any text that overflows the space provided for this Select component:
          https://www.w3schools.com/cssref/css3_pr_text-overflow.asp
        */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      & .fpcl-select-btn-arrow {
        margin-left: 10px;
        transform: rotate(90deg);
        font-size: 1.5rem;
        line-height: 1rem;
      }
    }

    & .fpcl-select-menu {
      display: none;
      position: absolute;
      width: 100%;
      /* Add top and bottom padding that is equal to half of the --fpcl-select-radius so the menu options will get pushed down enough so they won't get cut off if a user sets a high --fpcl-select-radius value. */
      padding: calc(var(--fpcl-select-radius) / 2) 0;
      border: var(--fpcl-select-border);
      border-radius: var(--fpcl-select-radius);
      overflow-y: auto;
      background-color: var(--fpcl-select-background-color);
      color: var(--fpcl-select-text-color);
      z-index: 100;

      &.show {
        display: block;
      }

      &.display-below {
        /* This "top: 0px;" rule will cause the dropdown menu to display over the top of the select button. This will simplify this element and give a bit more space for the dropdown menu. Also, if a border-radius is applied, then it will make it much easier to simply cover up the select button with the dropdown menu and the dropdown menu can have the same border-radius. */
        top: 0px;
      }

      & .fpcl-select-option {
        /*
          Cut off any text that overflows the space provided for this Select component:
          https://www.w3schools.com/cssref/css3_pr_text-overflow.asp
        */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
          background-color: var(--fpcl-select-option-hover-background-color);
          color: var(--fpcl-select-option-hover-text-color);
          cursor: pointer;
        }

        /* 
          Add top and bottom padding that is equal to the size of the select box that the user set (e.g. var(--fpcl-select-large-padding)).
        */
        &.small {
          padding: var(--fpcl-select-small-padding);
        }
        &.medium {
          padding: var(--fpcl-select-medium-padding);
        }
        &.large {
          padding: var(--fpcl-select-large-padding);
        }
      }
    }
  }
</style>
