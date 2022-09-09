<script lang="ts">
  import { tick, createEventDispatcher } from "svelte";
  import { Label } from "../Labels";
  import { createId, calculateOptionsListHeight } from "../fpui-utils";

  export let label = "";
  export let optionsArray;
  export let arrayType = "string";
  export let displayElementAtIndex = null;
  export let selectedOption;
  export let size = "md";

  const dispatch = createEventDispatcher();
  let componentId = createId();
  let selectMenu;
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
    dispatch("change", option);
  }
</script>


<Label {label} forVal={`fpui-select-btn-${componentId}`} />
<div class="fpui-select">
  <div
    role="combobox"
    id={`fpui-select-btn-${componentId}`}
    class="{`fpui-select-btn ${size}`}"
    tabindex="-1"
    on:click={async () => {
      showSelectMenu = !showSelectMenu;
      // There is no need to run the following code if the menu is hidden, so only run it if the menu is shown.
      if (showSelectMenu)  {
        calculateOptionsListHeight(componentId, showSelectMenu, tick, window);
        // Wait for the menu element to be displayed in the DOM before setting `focus()` on it.
        await tick();
        selectMenu.focus();
      }
    }}
  >
    {#if arrayType === "string" || arrayType === "number" || arrayType === "boolean"}
      <span class="fpui-select-btn-text" title={selectedOption}>{selectedOption}</span>
    {/if} 
    {#if arrayType === "object"}
      <span class="fpui-select-btn-text" title={selectedOption.label}>{selectedOption.label}</span>
    {/if}
    <!-- If the `arrayType` is an array of arrays, then display the element (in the array) at the given index. -->
    {#if arrayType === "array"}
      <span class="fpui-select-btn-text" title={selectedOption[displayElementAtIndex]}>
        {selectedOption[displayElementAtIndex]}
      </span>
    {/if}
    <span class="fpui-select-btn-arrow">›</span>
  </div>
  <!-- For accessibility, the select menu needs to stay in the DOM, but it can be hidden. (This is how normal <select> elements work.) So the select menu should not be conditionally displayed inside of an {#if} block. -->
  <div
    id="{`fpui-select-menu-${componentId}`}"
    class="{`fpui-select-menu ${size}`}"
    class:show={showSelectMenu}
    tabindex="-1"
    bind:this={selectMenu}
    on:blur={(event) => {
      // This is basically saying if the user clicks on the select-btn, then do not hide the selectMenu. If the user clicks the select-btn, then the select-btn's on:click event will hide the selectMenu.
      // In a blur event, the "event.target" is the element that has lost focus. When a "blur" event occurs, how can I find out which element received the focus? Use "event.relatedTarget": https://stackoverflow.com/a/33325953.
      // Keep in mind that the element that is supposed to receive the focus needs to have a tabindex="-1" attribute in order to receive the focus. So in this case, I am trying to see if the user clicked on the `#fpui-select-btn-${componentId}` element, so that element has to have a tabindex="-1" attribute in order to receive focus, which will allow me to see if that element was clicked. (If that element did not have a tabindex="-1" attribute, then it would show that the user clicked on the <body> element.) 
      // **If the user did click on the `#fpui-select-btn-${componentId}` element, then do NOT set `showSelectMenu = false` because the `on:click` event in the `#fpui-select-btn-${componentId}` will set `showSelectMenu = false`. If the user did NOT click on the `#fpui-select-btn-${componentId}` element, then set `showSelectMenu = false`.**
      // If the event and the event.relatedTarget exist, then see if the id of the relatedTarget (i.e. the id of the element that was clicked) does NOT match the `#fpui-select-btn-${componentId}` element. If all those checks return true, then hide the select menu.
      // UPDATE: I have found that sometimes when I click outside of the selecteMenu that event.relatedTarget === null. So for those scenarios I have added a check for `!event.relatedTarget`. So if `event.relatedTarget does not exist, then set `showSelectMenu` to false.
      if (event && (!event.relatedTarget || event.relatedTarget && event.relatedTarget.id !== `fpui-select-btn-${componentId}`)) {
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
          class="{`fpui-select-option ${size}`}"
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
        <!-- The following code references `obj` in all instances of the current object in this each loop except for when the text needs to be displayed to the user. In those cases this code references `obj.label`. -->
        <div
          role="option"
          aria-selected={selectedOption === obj}
          class="{`fpui-select-option ${size}`}"
          class:selected={highlightedOption === obj}
          title={obj.label}
          on:mouseenter={() => highlightedOption = null }
          on:mouseleave={() => highlightedOption = obj }
          on:click={() => setSelectedOption(obj)}
        >
          {obj.label}
        </div>
      {/each}
    {/if}
    {#if arrayType === "array"}
      {#each optionsArray as arr}
        <!-- The following code references `arr` in all instances of the current array in this each loop except for when the text needs to be displayed to the user. In those cases this code references `arr[displayElementAtIndex]`. -->
        <div
          role="option"
          aria-selected={selectedOption === arr}
          class="{`fpui-select-option ${size}`}"
          class:selected={highlightedOption === arr}
          title={arr[displayElementAtIndex]}
          on:mouseenter={() => highlightedOption = null }
          on:mouseleave={() => highlightedOption = arr }
          on:click={() => setSelectedOption(arr)}
        >
          {arr[displayElementAtIndex]}
        </div>
      {/each}
    {/if}
  </div>
</div>


<style>
  .fpui-select {
    position: relative;

    & .fpui-select-btn {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid;
      border-color: var(--custom-select-border-color, var(--fpui-select-border-color, #c7c7c7));
      border-radius: var(--fpui-select-border-radius);
      background-color: var(--custom-select-bg-color, var(--fpui-select-bg-color, white));
      color: var(--custom-select-text-color, var(--fpui-select-text-color, black));
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 0 1px var(--custom-select-border-color, var(--fpui-select-border-color, #c7c7c7));
      }

      /*
        Give some padding around the dropdown arrow icon so it does not get pressed into the right border of the select box.
      */
      &.sm {
        padding: var(--fpui-select-option-selected-padding-sm, 5px);
        font-size: var(--font-size-sm, 12px);
      }
      &.md {
        padding: var(--fpui-select-option-selected-padding-md, 10px);
        font-size: var(--font-size-base, 16px);
      }
      &.lg {
        padding: var(--fpui-select-option-selected-padding-lg, 15px);
        font-size: var(--font-size-lg, 20px);
      }

      & .fpui-select-btn-text {
        /*
          Cut off any text that overflows the space provided for this Select component:
          https://www.w3schools.com/cssref/css3_pr_text-overflow.asp
        */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      & .fpui-select-btn-arrow {
        margin-left: 10px;
        transform: rotate(90deg);
        font-size: 1.5rem;
        line-height: 1rem;
        color: var(--custom-select-text-color, var(--fpui-select-text-color, black));
      }
    }

    & .fpui-select-menu {
      display: none;
      position: absolute;
      width: 100%;
      /* Add top and bottom padding that is equal to half of the --fpui-select-border-radius so the menu options will get pushed down enough so they won't get cut off if a user sets a high --fpui-select-border-radius value. */
      padding: calc(var(--fpui-select-border-radius) / 2) 0;
      border: 2px solid;
      border-color: var(--fpui-select-border-color, #c7c7c7);
      border-radius: var(--fpui-select-border-radius, 3px);
      box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.1);
      overflow-y: auto;
      background-color: var(--fpui-select-bg-color);
      color: var(--fpui-select-text-color);
      z-index: 100;

      &.show {
        display: block;
      }

      & .fpui-select-option {
        /*
          Cut off any text that overflows the space provided for this Select component:
          https://www.w3schools.com/cssref/css3_pr_text-overflow.asp
        */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
          background-color: var(--fpui-select-option-hover-bg-color);
          color: var(--fpui-select-option-hover-text-color);
          cursor: pointer;
        }

        &.selected {
          background-color: var(--fpui-select-option-hover-bg-color);
          color: var(--fpui-select-option-hover-text-color);
        }

        &.sm {
          padding: var(--fpui-select-option-padding-sm, 5px);
          font-size: var(--font-size-sm, 12px);
        }
        &.md {
          padding: var(--fpui-select-option-padding-md, 10px);
          font-size: var(--font-size-base, 16px);
        }
        &.lg {
          padding: var(--fpui-select-option-padding-lg, 15px);
          font-size: var(--font-size-lg, 20px);
        }
      }
    }
  }
</style>
