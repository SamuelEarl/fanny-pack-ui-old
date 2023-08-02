<script lang="ts">
  import Icon from "@iconify/svelte";
  import { env } from "$env/dynamic/public";
  import { fontSizes } from "../fp-styles";

  // console.log("ENV (Button):", env);
  // console.log("PROCESS.ENV (Button):", process.env);

  export let type = "button";
  export let bgColor = env.PUBLIC_FP_BTN_BG_COLOR;
  export let borderColor = env.PUBLIC_FP_BTN_BORDER_COLOR;
  export let textColor = env.PUBLIC_FP_BTN_TEXT_COLOR;
  export let padding = env.PUBLIC_FP_BTN_PADDING;
  export let fontSize = env.PUBLIC_FP_BTN_FONT_SIZE;
  // export let hollow = false;
  export let width = "auto";
  export let disabled = false;
  export let formIsInvalid = false;
  export let btnIcon = env.PUBLIC_FP_BTN_ICON;
  export let btnIconDisabled = env.PUBLIC_FP_BTN_ICON_DISABLED;
  export let btnIconSide = env.PUBLIC_FP_BTN_ICON_SIDE;
  export let btnIconDisabledShouldSpin = true; // A spinning button icon can be used to provide user feedback for loading states (e.g. saving data, loading page content).
  export let rotateBtnIcon = "0deg";
  export let rotateBtnIconDisabled = "0deg";

  // Set the background, border, and text colors.
  const btnColors = `background-color: ${bgColor}; border-color: ${borderColor}; color: ${textColor};`;

  // If no button text slots are passed to this component, then `btnTextSlotsExist` will be `false`.
  let btnTextSlotsExist = Object.keys($$slots).length !== 0;

  function getPaddingStyle() {
    // If the user passes a size variable (e.g. "xs") to the `padding` prop, then return the corresponding padding style.
    // NOTE: Button components have a 2px border and other form elements have a 1px border. The following Button padding sizes are 1px smaller than the other padding sizes in the `theme.css` file to compensate for the 2px border that Button components have.
    if (["xs","sm","md","lg","xl"].includes(padding)) {
      const btnPadding = {
        xs: "padding: 0px 3px;",
        sm: "padding: 4px 8px;",
        md: "padding: 9px 18px;",
        lg: "padding: 14px 28px;",
        xl: "padding: 19px 38px;",
      };
      return `${btnPadding[padding]}`;
    }
    // Otherwise return a padding style with the custom value that the user passed to the `padding` prop.
    else {
      return `padding: ${padding};`;
    }
  }
  const paddingStyle = getPaddingStyle();

  /**
   * NOTE: These `btnIconStyles` will only be applied to <Button> 
   * components that have both a `btnIcon` and `btnIconDisabled` prop.
   * They will NOT be applied to icons that are passed in a slot.
   */
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
        iconStyles = `order: -9999; ${rightMargins[fontSize]}`;
      }
      if (btnIconSide === "right") {
        let leftMargins = {
          xs: "margin-left: 7px;",
          sm: "margin-left: 9px;",
          md: "margin-left: 11px;",
          lg: "margin-left: 13px;",
          xl: "margin-left: 15px;",
        }
        iconStyles = `order: 9999; ${leftMargins[fontSize]}`;
      }
    }
    return iconStyles;
  }
  const btnIconStyles = getBtnIconStyles();

  function addBoxShadow(event) {
    event.target.style.boxShadow = `0 0 0 1px ${borderColor}`;
  }

  function removeBoxShadow(event) {
    event.target.style.boxShadow = "none";
  }
</script>

<!-- If the button is a "submit" button in a form and if the `formIsInvalid` then disable the button, but do NOT show the disabled icon or text. Just prevent the user from submitting the form. -->
<button
  {type}
  class={`fp-btn ${type === "submit" && formIsInvalid ? "form-is-invalid" : ""} ${borderColor === "var(--transparent)" ? "transparent-border" : "non-transparent-border"}`}
  style={`${btnColors} ${paddingStyle} ${fontSizes[fontSize]} ${width === "full" ? "width: 100%" : ""}`}
  {disabled}
  {...$$restProps}
  on:click
  on:mouseenter={addBoxShadow}
  on:mouseleave={removeBoxShadow}
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
    <!-- If the button is a "submit" button in a form and if the `formIsInvalid` then disable the button, but do NOT show the disabled icon or text. Just prevent the user from submitting the form. -->
    {#if type === "submit" && formIsInvalid}
      <Icon icon={btnIcon} style={`${btnIconStyles} transform:rotate(${rotateBtnIcon});`} />
    <!-- If the button is disabled, then... -->
    {:else if disabled}
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
      border-style: solid;
      font-weight: bold;
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: center;

      &:disabled {
        box-shadow: none !important;
        pointer-events: none !important;
      }

      &.non-transparent-border:disabled {
        background-color: var(--bg-color-element-disabled) !important;
        border-color: var(--border-color-disabled) !important;
        color: var(--text-color-disabled) !important;
      }

      &.form-is-invalid {
        box-shadow: none !important;
        pointer-events: none !important;
        background-color: var(--bg-color-element-disabled) !important;
        border-color: var(--border-color-disabled) !important;
        color: var(--text-color-disabled) !important;
      }
    }
  }
</style>
