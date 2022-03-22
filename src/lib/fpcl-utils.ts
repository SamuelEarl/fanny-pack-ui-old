/**
 * This function returns an ID that will be used in the <label> `for` attributes and the `id` attributes of form elements like <input> and <select>.
 */
export function createId() {
  return `${Math.random().toString(36)}`;
}


// ==========================
// <Select/>, <MultiSelect/>
// ==========================
/**
 * This function will set the height of the select menu to be less-than or equal to the available space on the screen.
 */
export async function calculateMenuHeight(id, showSelectMenu, tick, window, document) {
  // Only calculate the height of the menu if it is showing in the DOM.
  // For <MultiSelect/> components, a user can remove elements from the `selectedOptions` array while the menu is not showing by clicking the `x` on the `.selected-values-container` buttons. So in that case I do not want to run this function unnecessarily.
  if (showSelectMenu) {
    // Wait for the menu element to exist in the DOM before getting the `fpcl-select-menu-${id}` element by ID.
    // This will also wait for the buttons to update in the DOM (inside the `.selected-values-container` element) before running this function.
    await tick();

    // Get window height: https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
    let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // Get the selectBtn element.
    let selectBtn = document.getElementById(`fpcl-select-btn-${id}`).getBoundingClientRect();
    // Get the y-position of the top of the selectBtn element.
    let selectBtnTop = selectBtn.top;
    // Get the y-position of the bottom of the selectBtn element.
    let selectBtnBottom = selectBtn.bottom;
    // Calculate the amount of space below the bottom of selectBtn.
    let spaceBelowBtn = windowHeight - selectBtnBottom;
    // The amount of space above the selectBtn equals the y-position of the top of the selectBtn.
    let spaceAboveBtn = selectBtnTop;
    // Get the menu element.
    let menuElement = document.getElementById(`fpcl-select-menu-${id}`);

    // If the space between the bottom of the select button and the bottom of the widow is less than 200px and if there is more space between the top of the select button and the top of the window, then position the menuElement above the selectBtn.
    if (spaceBelowBtn < 200 && spaceAboveBtn > spaceBelowBtn) {      
      // Set the max-height property. See the comment about this in the `else` block below.
      menuElement.style.maxHeight = spaceAboveBtn + "px";
      // The menuElement already has a property of `position: absolute` set in the CSS. The following line will set the `bottom` property (i.e. the bottom edge) of the menuElement to be even with the top of the dropDownBtn.
      menuElement.style.bottom = selectBtn.height + "px";
    }
    else {
      // Set the max-height of the menuElement to be the remaining space between the top of the select button (selectBtnTop) and the bottom of the window (windowHeight).
      // The `maxHeight` property will ensure that the menu element will not be taller than the list of options that it contains (i.e. the height of the menu element will fit the height of its content rather than extend below the list of options).
      menuElement.style.maxHeight = spaceBelowBtn + "px";
      // The menuElement already has a property of `position: absolute` set in the CSS. The following line will set the `bottom` property (i.e. the bottom edge) of the menuElement back to its default value of "auto" when the menuElement gets displayed below the selectBtn.
      menuElement.style.bottom = "auto";
    }
  }
}
