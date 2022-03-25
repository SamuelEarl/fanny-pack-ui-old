<script lang="ts">
  import Icon from "@iconify/svelte";
  import { theme } from "/src/fpcl-theme";

  export let id = "";
  export let btnColor = "primary";
  export let inverted = false;
  export let size = "md";
  export let width = "auto";
  export let disabled = false;
  export let btnIcon = theme.btnIcon;
  export let btnIconDisabled = theme.btnIconDisabled;
  export let btnIconSide = "left";
  export let btnIconDisabledShouldSpin = true; // A spinning button icon can be used to provide user feedback for loading states (e.g. saving data, loading page content).
</script>


<!-- NOTE: Using flexbox styles on this button component messes up the tooltip component if a user wraps a <Button> in a <Tooltip>. So I can't use flexbox to move the icon around. -->

<button
  type="button"
  {id}
  class="{`fpcl-btn ${btnColor} ${size} ${width}-width`}"
  class:inverted={inverted}
  disabled={disabled}
  on:click
>
  <!-- If the btnIcon exists, and the btnIconDisabled exists, and the btnIcon should be on the left side, then display an icon on the left. If either the btnIcon or btnIconDisabled is an empty string, then no icons will be displayed with the button. See the docs for details. -->
  {#if btnIcon && btnIconDisabled && btnIconSide === "left"}
    <!-- If the button is disabled, then... -->
    {#if disabled}
      <!-- ...show a spinning disabled icon. -->
      {#if btnIconDisabledShouldSpin}
        <!-- NOTE: You can't dynamically bind classes to a component, so the <Icon /> component has to be repeated a few times: Once for the "fpcl-spin" class and once without. -->
        <span class={`btn-icon-left icon-margin-${size}`}>
          <Icon icon="{btnIconDisabled}" class="fpcl-spin" />
        </span>
      <!-- ...or show a non-spinning disabled icon. -->
      {:else}
        <span class={`btn-icon-left icon-margin-${size}`}>
          <Icon icon="{btnIconDisabled}" />
        </span>
      {/if}
    <!-- If the button is not disabled, then show the btnIcon. -->
    {:else}
      <span class={`btn-icon-left icon-margin-${size}`}>
        <Icon icon="{btnIcon}" />
      </span>
    {/if}
  {/if}

  {#if $$slots.btnTextDisabled && disabled}
    <slot name="btnTextDisabled">Disabled Button Text</slot>
  {:else}
    <slot>Button Text</slot>
  {/if}
  
  {#if btnIcon && btnIconDisabled && btnIconSide === "right"}
    {#if disabled}
      {#if btnIconDisabledShouldSpin}
        <span class={`btn-icon-right icon-margin-${size}`}>
          <Icon icon="{btnIconDisabled}" class="fpcl-spin" />
        </span>
      {:else}
        <span class={`btn-icon-right icon-margin-${size}`}>
          <Icon icon="{btnIconDisabled}" />
        </span>
      {/if}
    {:else}
      <span class={`btn-icon-right icon-margin-${size}`}>
        <Icon icon="{btnIcon}" />
      </span>
    {/if}
  {/if}
</button>


<style>
  .fpcl-btn {
    outline: none;
    border-width: var(--border-width, 2px);
    border-style: var(--border-style, solid);
    border-radius: var(--fpcl-btn-border-radius);
    cursor: pointer;
    font-weight: var(--font-weight, var(--fpcl-btn-font-weight, 400));

    & :global(.iconify) {
      margin-bottom: -2px;
    }

    &.sm {
      padding: var(--padding, calc(var(--fpcl-btn-padding-sm, 5px) - 1px) calc((var(--fpcl-btn-padding-sm, 5px) * 2) - 1px));
      font-size: var(--font-size, var(--fpcl-font-size-sm, 12px));
    }
    &.md {
      padding: var(--padding, calc(var(--fpcl-btn-padding-md, 10px) - 1px) calc((var(--fpcl-btn-padding-md, 10px) * 2) - 1px));
      font-size: var(--font-size, var(--fpcl-font-size-base, 16px));
    }
    &.lg {
      padding: var(--padding, calc(var(--fpcl-btn-padding-lg, 10px) - 1px) calc((var(--fpcl-btn-padding-lg, 10px) * 2) - 1px));
      font-size: var(--font-size, var(--fpcl-font-size-lg, 20px));
    }

    & .btn-icon-left {

      &.icon-margin-sm {
        margin-right: var(--icon-space, 5px);
      }
      &.icon-margin-md {
        margin-right: var(--icon-space, 10px);
      }
      &.icon-margin-lg {
        margin-right: var(--icon-space, 15px);
      }
    }
    & .btn-icon-right {

      &.icon-margin-sm {
        margin-left: var(--icon-space, 5px);
      }
      &.icon-margin-md {
        margin-left: var(--icon-space, 10px);
      }
      &.icon-margin-lg {
        margin-left: var(--icon-space, 15px);
      }
    }
  }

  .primary {
    border-color: var(--border-color, var(--fpcl-primary, #333));
    background-color: var(--background-color, var(--fpcl-primary, #333));
    color: var(--color, var(--fpcl-btn-primary-text-color, white));
    
    &:hover {
      box-shadow: var(--box-shadow, 0 0 0 1px var(--fpcl-primary, gray));
    }

    &.inverted {
      color: var(--color, var(--fpcl-primary, #333));
    }
  }

  .secondary {
    border-color: var(--border-color, var(--fpcl-secondary, #333));
    background-color: var(--background-color, var(--fpcl-secondary, #333));
    color: var(--color, var(--fpcl-btn-secondary-text-color, white));

    &:hover {
      box-shadow: var(--box-shadow, 0 0 0 1px var(--fpcl-secondary, gray));
    }

    &.inverted {
      color: var(--color, var(--fpcl-secondary, #333));
    }
  }

  .tertiary {
    border-color: var(--border-color, var(--fpcl-tertiary, #333));
    background-color: var(--background-color, var(--fpcl-tertiary, #333));
    color: var(--color, var(--fpcl-btn-tertiary-text-color, white));

    &:hover {
      box-shadow: var(--box-shadow, 0 0 0 1px var(--fpcl-tertiary, gray));
    }

    &.inverted {
      color: var(--color, var(--fpcl-tertiary, #333));
    }
  }

  .inverted {
    background-color: transparent;
  }

  .auto-width {
    width: auto;
  }
  .full-width {
    width: 100%;
  }

  .fpcl-btn:disabled {
    border-color: var(--fpcl-disabled-bg-color, black);
    box-shadow: none;
    color: var(--fpcl-disabled-text-color, lightgray);
    background-color: var(--fpcl-disabled-bg-color, black);
    cursor: default;
  }
</style>
