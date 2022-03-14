<script lang="ts">
  import { tick } from "svelte";
  import Label from "../Labels/Label.svelte";
  import { createId, calculateMenuHeight } from "../utils";

  export let label;
  export let optionsArray;
  export let arrayType = "string";
  export let selectedOption;
  export let size = "md";

  let componentId = createId();
  let showSelectMenu = false;
  let highlightedOption = selectedOption;
  
  // TODO: I need to verify that the follow 2 paragraphs are accurate with the refactors that I have made to this component.
  // The default value of this <Select> component is an empty string. However, if the user sets the `defaultValue` prop to a value other than the empty string, then the `selectedOption` needs to be set as that `defaultValue` so the `defaultValue` will be displayed in the UI.
  // Also, if a user has previously selected an option and saved it to the database, then that selected option will be passed into this component as the `selectedOption` prop and that `selectedOption` prop will set the value that is displayed in the UI. So, if the `selectedOption` has already been set by the user (which means that it will get passed into this component), then do not set the `selectedOption` prop/variable to the `defaultValue`.
  // if (!selectedOption) {
  //   selectedOption = defaultValue;
  // }

  function setSelectedOption(option) {
    selectedOption = option;
    highlightedOption = selectedOption;
    showSelectMenu = false;
  }
</script>


<Label {label} forId={`fpcl-select-btn-${componentId}`} />
<div class="fpcl-select">
  <div
    role="combobox"
    id={`fpcl-select-btn-${componentId}`}
    class="{`fpcl-select-btn ${size}`}"
    tabindex="-1"
    on:click={async () => {
      showSelectMenu = !showSelectMenu;
      // There is no need to run the following code if the menu is hidden, so only run it if the menu is shown.
      if (showSelectMenu)  {
        calculateMenuHeight(componentId, showSelectMenu, tick, window, document);
        let menu = document.getElementById(`fpcl-select-menu-${componentId}`);
        // Wait for the menu element to be displayed in the DOM before setting `focus()` on it.
        await tick();
        menu.focus();
      }
    }}
  >
    {#if arrayType === "string" || arrayType === "number" || arrayType === "boolean"}
      <span class="fpcl-select-btn-text" title={selectedOption}>{selectedOption}</span>
    {/if} 
    {#if arrayType === "object"}
      <span class="fpcl-select-btn-text" title={selectedOption.text}>{selectedOption.text}</span>
    {/if}
    <span class="fpcl-select-btn-arrow">›</span>
  </div>
  <!-- For accessibility, the select menu needs to stay in the DOM, but it can be hidden. (This is how normal <select> elements work.) So the select menu should not be conditionally displayed inside of an {#if} block. -->
  <div
    id="{`fpcl-select-menu-${componentId}`}"
    class="{`fpcl-select-menu ${size}`}"
    class:show={showSelectMenu}
    tabindex="-1"
    on:blur={(event) => {
      // In a blur event, the "event.target" is the element that has lost focus. When a "blur" event occurs, how can I find out which element received the focus? Use "event.relatedTarget": https://stackoverflow.com/a/33325953.
      // Keep in mind that the element that is supposed to receive the focus needs to have a tabindex="-1" attribute in order to receive the focus. So in this case, I am trying to see if the user clicked on the `.fpcl-select-btn` element, so that element has to have a tabindex="-1" attribute in order to receive focus, which will allow me to see if that element was clicked. (If that element did not have a tabindex="-1" attribute, then it would show that the user clicked on the <body> element.) If the user did click on the `.fpcl-select-btn` element, then do NOT set `showSelectMenu = false` because the `on:click` event in the `.fpcl-select-btn` will set `showSelectMenu = false`. If the user did NOT click on the `.fpcl-select-btn` element, then set `showSelectMenu = false`.
      // If the event and the event.relatedTarget exist, then continue to check if the event.relatedTarget does NOT match the `.fpcl-select-btn` element. If all those checks return true, then hide the select menu.
      if (event && event.relatedTarget && !event.relatedTarget.matches(`.fpcl-select-btn`)) {
        showSelectMenu = false;
      }
      // If the user moused over the select menu options but didn't select an option before clicking outside of the menu, then reset the option that should be highlighted (when the user clicks the select box again) to the option that was previously selected.
      highlightedOption = selectedOption;
    }}
  >
    {#if arrayType === "string" || arrayType === "number" || arrayType === "boolean"}
      {#each optionsArray as item}
        <div
          role="option"
          aria-selected={selectedOption === item}
          class="{`fpcl-select-option ${size}`}"
          class:selected={highlightedOption === item}
          title={item}
          on:mouseenter={() => {
            // Without this function the option that was already selected will be highlighted AND the option that is being hovered over will also be highlighted. This function will remove the highlighting from the previously selected option so only the option that is currently being hovered over will be highlighted.
            highlightedOption = null;
          }}
          on:mouseleave={() => {
            // When a user hovers outside of the select menu, this function will set the last menu option that was hovered over to be the option that is highlighted.
            highlightedOption = item;
          }}
          on:click={() => setSelectedOption(item)}
        >
          {item}
        </div>
      {/each}
    {/if}
    {#if arrayType === "object"}
      {#each optionsArray as obj}
        <!-- The following code references `obj` in all instances of the current object in this each loop except for when the text needs to be displayed to the user. In those cases this code references `obj.text`. -->
        <div
          role="option"
          aria-selected={selectedOption === obj}
          class="{`fpcl-select-option ${size}`}"
          class:selected={highlightedOption === obj}
          title={obj.text}
          on:mouseenter={() => highlightedOption = null }
          on:mouseleave={() => highlightedOption = obj }
          on:click={() => setSelectedOption(obj)}
        >
          {obj.text}
        </div>
      {/each}
    {/if}
  </div>
</div>


<style>
  .fpcl-select {
    position: relative;

    & .fpcl-select-btn {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-width: var(--fpcl-select-border-width, 1px);
      border-style: var(--fpcl-select-border-style, solid);
      border-color: var(--fpcl-select-border-color, #c7c7c7);
      border-radius: var(--fpcl-select-border-radius);
      background-color: var(--fpcl-select-bg-color);
      color: var(--fpcl-select-text-color);
      cursor: pointer;

      &:hover {
        box-shadow: var(--fpcl-select-box-shadow, 0 0 0 1px black);
      }

      /*
        Give some padding around the dropdown arrow icon so it does not get pressed into the right border of the select box.
      */
      &.sm {
        padding: var(--fpcl-select-padding-sm);
      }
      &.md {
        padding: var(--fpcl-select-padding-md);
      }
      &.lg {
        padding: var(--fpcl-select-padding-lg);
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
      /* Add top and bottom padding that is equal to half of the --fpcl-select-border-radius so the menu options will get pushed down enough so they won't get cut off if a user sets a high --fpcl-select-border-radius value. */
      padding: calc(var(--fpcl-select-border-radius) / 2) 0;
      border-width: var(--fpcl-select-border-width, 1px);
      border-style: var(--fpcl-select-border-style, solid);
      border-color: var(--fpcl-select-border-color, #c7c7c7);
      border-radius: var(--fpcl-select-border-radius, 3px);
      overflow-y: auto;
      background-color: var(--fpcl-select-bg-color);
      color: var(--fpcl-select-text-color);
      z-index: 100;

      &:focus {
        box-shadow: var(--fpcl-select-box-shadow, 0 0 0 1px black);
      }

      &.show {
        display: block;
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
          background-color: var(--fpcl-select-option-hover-bg-color);
          color: var(--fpcl-select-option-hover-text-color);
          cursor: pointer;
        }

        &.selected {
          background-color: var(--fpcl-select-option-hover-bg-color);
          color: var(--fpcl-select-option-hover-text-color);
        }

        /* 
          Add top and bottom padding that is equal to the size of the select box that the user set (e.g. var(--fpcl-select-padding-lg)).
        */
        &.sm {
          padding: var(--fpcl-select-padding-sm);
        }
        &.md {
          padding: var(--fpcl-select-padding-md);
        }
        &.lg {
          padding: var(--fpcl-select-padding-lg);
        }
      }
    }
  }
</style>
