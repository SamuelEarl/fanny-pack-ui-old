/**
 * This function is used with the <Select/> and <MultiSelect/> components.
 * It will set the height of the select menu to be less-than or equal to the available space on the screen.
 */
export async function calculateMenuHeight(id, showSelectMenu, tick, window, document) {
  // Only calculate the height of the menu if it is showing in the DOM.
  // For <MultiSelect/> components, a user can remove elements from the `selectedOptions` array while the menu is not showing by clicking the `x` on the `.selected-values-container` buttons. So in that case I do not want to run this function unnecessarily.
  if (showSelectMenu) {
    // // Wait for the menu element to exist in the DOM before getting the `fpcl-select-menu-${id}` element by ID.
    // // This will also wait for the buttons to update in the DOM (inside the `.selected-values-container` element) before running this function.
    // await tick();

    // Get window height: https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
    let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // Get the selectBtn element.
    let selectBtn = document.getElementById(`fpcl-select-btn-${id}`).getBoundingClientRect();
    // Get the y-position of the top of the selectBtn element.
    let selectBtnTop = selectBtn.top;
    // Get the y-position of the bottom of the selectBtn element.
    let selectBtnBottom = selectBtn.bottom;
    // Calculate the amount of space below the top of selectBtn.
    let spaceBelowBtn = windowHeight - selectBtnTop;
    // The amount of space above the selectBtn equals the y-position of the bottom of the selectBtn.
    let spaceAboveBtn = selectBtnBottom;
    // Get the menu element.
    let menuElement = document.getElementById(`fpcl-select-menu-${id}`);

    // If the space below the top of the select button and the bottom of the widow is less than 200px and if there is more space between the bottom of the select button and the top of the window, then position the menuElement above the selectBtn.
    if (spaceBelowBtn < 200 && spaceAboveBtn > spaceBelowBtn) {
      // Remove the .display-below class, if it exists, otherwise it will cause conflicts.
      menuElement.classList.remove("display-below");
      // Set the max-height property. See the comment about this in the `else` block below.
      menuElement.style.maxHeight = spaceAboveBtn + "px";
      // The menuElement already has a property of `position: absolute` set in the CSS. The following line will set the `bottom` property (i.e. the bottom edge) of the menuElement to be even with the bottom of the selectBtn.
      menuElement.style.bottom = "0px";
    }
    else {
      // Add .display-below class.
      menuElement.classList.add("display-below");
      // Set the max-height of the menuElement to be the remaining space between the top of the select button (selectBtnTop) and the bottom of the window (windowHeight).
      // The `maxHeight` property will ensure that the menu element will not be taller than the list of options that it contains (i.e. the height of the menu element will fit the height of its content rather than extend below the list of options).
      menuElement.style.maxHeight = spaceBelowBtn + "px";
      // The menuElement already has a property of `position: absolute` set in the CSS. The following line will set the `bottom` property (i.e. the bottom edge) of the menuElement back to its default value of "auto" when the menuElement gets displayed below the selectBtn.
      menuElement.style.bottom = "auto";
    }
  }
}


/**
 * This function for adding a "clickoutside" event is taken from this REPL post:
 * https://svelte.dev/repl/0ace7a508bd843b798ae599940a91783?version=3.16.7
 * 
 * NOTE: Could I use a negative tabindex (e.g. tabindex="-1") on the .multi-select-drop-down element and call `focus()` on the .multi-select-drop-down element when a user clicks on the .multi-select-btn and then use `on:blur={() => showSelectMenu = false}` on the .multi-select-drop-down element? Would that fix the issue that occurs where this MultiSelect component does not close right away when the user clicks on a select element? Note that the custom select box that is created here https://www.w3schools.com/howto/howto_custom_select.asp is also created by creating <div> elements and using a "click outside" event. That select box also has the same issue when you open it and then click on the regular select box next to it.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex.
 */
export function clickOutsideSelectMenu(node) {
  // When a click event is triggered, this `handleClick` function will be executed.
  let handleClick = event => {
    // When a click event is triggered, then the following if statement will look to see if...
    // (1) ...the `<div class="multi-select-drop-down">` node exists in the DOM.
    // (2) ...the node does not contain the element that was clicked on.
    // (3) ...the `event.preventDefault()` method was not used to cancel the event.
    // If all those checkout, then fire the custom "clickoutside" event. When the "clickoutside" event is fired, then `showSelectMenu` will be set to `false`.
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent("clickoutside", node)
      )
    }
  }

  // Add the "click" event to the document when the .multi-select-drop-down element is added to the DOM.
  document.addEventListener("click", handleClick, true);
  
  return {
    destroy() {
      // Remove the "click" event from the document when the .multi-select-drop-down element is removed from the DOM.
      document.removeEventListener("click", handleClick, true);
    }
  }
}
