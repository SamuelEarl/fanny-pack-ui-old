<script lang="ts">
  import Icon from "@iconify/svelte";
  import { theme } from "/src/theme";
  import { 
    bgColors, 
    borderColors,
    textColors,
    textColorsForColoredBgs, 
    fontSizes, 
  } from "../fp-styles";

  export let type = "button";
  export let btnColor = "primary";
  // The user can change the textColor for transparent buttons.
  export let textColor = "";
  export let hollow = false;
  export let size = "md";
  export let width = "auto";
  export let disabled = false;
  export let btnIcon = theme.btnIcon;
  export let btnIconDisabled = theme.btnIconDisabled;
  export let btnIconSide = theme.btnIconSide;
  export let btnIconDisabledShouldSpin = true; // A spinning button icon can be used to provide user feedback for loading states (e.g. saving data, loading page content).
  export let rotateBtnIcon = "0deg";
  export let rotateBtnIconDisabled = "0deg";

  let bgColor = "";
  let borderColor = "";

  // If no button text slots are passed to this component, then `btnTextSlotsExist` will be `false`.
  let btnTextSlotsExist = Object.keys($$slots).length !== 0;

  /**
   * Set the background, border, and text colors.
   */
  function getColorStyles() {
    bgColor = bgColors[btnColor];
    borderColor = borderColors[btnColor];
    // Only set the textColor if the btnColor is NOT "transparent".
    // If this `if` statement was not here, then when the btnColor is set to "transparent" the textColor could not be set because `textColorsForColoredBgs[btnColor]` would return undefined. So when the execution gets to the `if (btnColor === "transparent")` conditional statement, `textColor` would be undefined and the textColor would always be set to `--text-color-default` from the `else` clause.
    if (btnColor !== "transparent") {
      textColor = textColorsForColoredBgs[btnColor];
    }

    // Set the textColor value for "transparent" buttons.
    // NOTE: Since no `disabled` values are set for "transparent" buttons, they will inherit the colors of the regular element states.
    if (btnColor === "transparent") {
      if (textColor) {
        textColor = textColors[textColor];
      }
      else {
        textColor = textColors["default"];
      }
    }

    // If `hollow` is `true`, then turn the background color transparent and turn the textColor to the btnColor.
    if (hollow) {
      bgColor = bgColors["transparent"];
      textColor = textColors[btnColor];
    }

    return `${bgColor} ${borderColor} ${textColor}`;
  }
  const colorStyles = getColorStyles();

  function getSizeStyles() {
    let btnPadding;
    // If no button text slots are passed to this component, then `btnTextSlotsExist` will be false and this will be treated as an icon button, which has equal padding on all 4 sides.
    if (!btnTextSlotsExist) {
      btnPadding = {
        xs: "padding: 2px;",
        sm: "padding: 4px;",
        md: "padding: 6px;",
        lg: "padding: 8px;",
        xl: "padding: 10px;",
      }
    }
    else {
      btnPadding = {
        xs: "padding: 2px 4px;",
        sm: "padding: 4px 8px;",
        md: "padding: 6px 12px;",
        lg: "padding: 8px 16px;",
        xl: "padding: 10px 20px;",
      }
    }
    return `${btnPadding[size]} ${fontSizes[size]}`;
  }
  const sizeStyles = getSizeStyles();

  function getBtnIconStyles() {
    let iconStyles = "";
    // Icon Buttons do not have any text. So if no button text slots are passed to this component, then `btnTextSlotsExist` will be false and no `order` or `margin` styles will be set on the icon.
    if (btnTextSlotsExist) {
      if (btnIconSide === "left") {
        let rightMargins = {
          xs: "margin-right: 7px;",
          sm: "margin-right: 9px;",
          md: "margin-right: 11px;",
          lg: "margin-right: 13px;",
          xl: "margin-right: 15px;",
        }
        iconStyles = `order: -9999; ${rightMargins[size]}`;
      }
      if (btnIconSide === "right") {
        let leftMargins = {
          xs: "margin-left: 7px;",
          sm: "margin-left: 9px;",
          md: "margin-left: 11px;",
          lg: "margin-left: 13px;",
          xl: "margin-left: 15px;",
        }
        iconStyles = `order: 9999; ${leftMargins[size]}`;
      }
    }
    return iconStyles;
  }
  const btnIconStyles = getBtnIconStyles();
</script>

<button
  {type}
  class={`fp-btn ${btnColor === "transparent" ? "" : "non-transparent"}`}
  style={`${colorStyles} ${sizeStyles} ${width === "full" ? "width: 100%" : ""}`}
  {disabled}
  {...$$restProps}
  on:click
>
  <!-- Button Text -->
  {#if $$slots.btnTextDisabled && disabled}
    <slot name="btnTextDisabled">Disabled Button Text</slot>
  {:else if $$slots.default}
    <slot>Button Text</slot>
  {/if}

  <!-- Button Icon -->
  <!-- If the btnIcon and the btnIconDisabled both exist, then display the icon. If either the btnIcon or btnIconDisabled is an empty string, then no icons will be displayed with the button. See the docs for details. -->
  {#if btnIcon && btnIconDisabled}
    <!-- If the button is disabled, then... -->
    {#if disabled}
      <!-- NOTE: You can NOT dynamically bind classes to a component instance, so the <Icon /> component has to be repeated a couple of times - once for the "fp-spin" class and once without. -->
      {#if btnIconDisabledShouldSpin}
        <!-- ...show a spinning disabled icon. -->
        <Icon icon={btnIconDisabled} style={`${btnIconStyles}`} class="fp-spin" />
      {:else}
        <!-- ...or show a non-spinning disabled icon. -->
        <Icon icon={btnIconDisabled} style={`${btnIconStyles} transform:rotate(${rotateBtnIconDisabled});`} />
      {/if}
    <!-- If the button is not disabled, then show the btnIcon. -->
    {:else}
      <Icon icon={btnIcon} style={`${btnIconStyles} transform:rotate(${rotateBtnIcon});`} />
    {/if}
  {/if}
</button>

<style>
  @media (--xs-up) {
    .fp-btn {
      border-width: 2px;
      font-weight: bold;
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;

      &.primary:hover {
        box-shadow: 0 0 0 1px var(--primary-color);
      }

      &.secondary:hover {
        box-shadow: 0 0 0 1px var(--secondary-color);        
      }

      &.tertiary:hover {
        box-shadow: 0 0 0 1px var(--tertiary-color);        
      }

      &:disabled {
        box-shadow: none !important;
        pointer-events: none !important;
      }

      &.non-transparent:disabled {
        background-color: var(--bg-color-element-disabled) !important;
        border-color: var(--border-color-disabled) !important;
        color: var(--text-color-disabled) !important;
      }
    }
  }
</style>
