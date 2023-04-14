// This file contains default settings for the component props.

// TODO: Add default settings for each of the necessary components props.

// You can edit any of the variables in this file. For icon variables (i.e. variables that contain the word "Icon"), the values should come from the Iconify website (https://icon-sets.iconify.design/). When you search for an icon and then select it, you will see a field to the right of your selected icon that is labeled "Selected icon". Copy the value from that field and replace the value in this file with the one that you copied.
// NOTE: After selecting your icon on the Iconify site, if you scroll down you will see a code example like this:
// <span class="iconify" data-icon="mdi:account"></span>
// The "Selected icon" field should also match the `data-icon` attribute of that code example.
// Replace the `btnIcon` value with an empty string to have no default icon.
// Replace the `btnIconDisabled` value with an empty string to have no default disabled icon.
export const defaults = {
  // ACCORDIONS
  accordionGroupPadding: "md",
  accordionTitlePadding: "md",
  accordionFontSize: "md",
  accordionSpaceBetweenAccordions: "sm",
  // BUTTONS
  btnIcon: "", // "mdi:check-circle"
  btnIconSide: "right",
  btnIconDisabled: "icomoon-free:spinner2",
  btnPadding: "md",
  btnFontSize: "md",
  // CHECKBOXES
  checkboxMarginBottom: "20px",
  // The `checkboxVerticalAlignment` variable will set the checkbox higher or lower in relation to the label text. The font family and font size that you set in your app will affect where the checkboxes are aligned in relation to the label text of the checkboxes, so this variable might come in handy.
  checkboxVerticalAlignment: "-3px",
  // DATE PICKER
  dateInputPadding: "md",
  dateInputFontSize: "md",
  dateInputIcon: "mdi:calendar",
  // DROPZONE
  dropZoneSelectFilesBtnIcon: "lucide:mouse-pointer-2",
  dropZoneDragAndDropIcon: "pixelarticons:drag-and-drop",
  dropZoneUploadFilesBtnIcon: "mdi:cloud-upload",
  // INPUTS (currency, text, number, email)
  inputPadding: "md",
  inputFontSize: "md",
  // LABELS
  labelFontSize: "0.8rem",
  labelMarginBottom: "5px",
  labelTooltipIcon: "entypo:info-with-circle",
  // RADIO BUTTONS
  radioMarginBottom: "20px",
  // The `radioVerticalAlignment` variable will set the radio button higher or lower in relation to the label text. The font family and font size that you set in your app will affect where the radio buttons are aligned in relation to the label text of the radio buttons, so this variable might come in handy.
  radioVerticalAlignment: "-1px",
  // SELECT BOXES
  selectPadding: "md",
  selectFontSize: "md",
  // TABS
  tabsTabStyle: "fill", // Possible values: "line", "fill"
  tabsContainerBorder: true,
  tabsContainerPadding: "lg",
  tabsTabBarMarginBottom: "md",
  tabsTabPadding: "md",
  tabsTabFontSize: "md",
  tabsPanelPadding: "",
  // TEXTAREA
  textareaPadding: "md",
  textareaFontSize: "md",
};
