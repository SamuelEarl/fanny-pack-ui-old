<script lang="ts">
  import Icon from "@iconify/svelte";
  import { theme } from "/src/fpui-theme";

  export let id = "";
  export let type = "button";
  export let btnColor = "primary";
  export let inverted = false;
  export let size = "md";
  export let width = "auto";
  export let disabled = false;
  export let btnIcon = theme.btnIcon;
  export let btnIconDisabled = theme.btnIconDisabled;
  export let btnIconSide = "left";
  export let btnIconDisabledShouldSpin = true; // A spinning button icon can be used to provide user feedback for loading states (e.g. saving data, loading page content).

  let btnTextSlotsExist = Object.keys($$slots).length !== 0;
</script>


<!-- NOTE: Using flexbox styles on this button component messes up the tooltip component if a user wraps a <Button> in a <Tooltip>. So I can't use flexbox to move the icon around. -->

<button
  {type}
  {id}
  class="{`fpui-btn ${btnColor} ${size} ${width}-width`}"
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
        <!-- If no slots (i.e. button text) are passed to this component, then `btnTextSlotsExist` will be false and no icon margin will be set. -->
        <span class={`btn-icon left disabled icon-margin-${btnTextSlotsExist ? size : null}`}>
          <!-- NOTE: You can NOT dynamically bind classes to a component, so the <Icon /> component has to be repeated a few times: Once for the "fpui-spin" class and once without. -->
          <Icon icon={btnIconDisabled} class="fpui-spin" />
        </span>
      <!-- ...or show a non-spinning disabled icon. -->
      {:else}
        <span class={`btn-icon left disabled icon-margin-${btnTextSlotsExist ? size : null}`}>
          <Icon icon={btnIconDisabled} />
        </span>
      {/if}
    <!-- If the button is not disabled, then show the btnIcon. -->
    {:else}
      <span class={`btn-icon left icon-margin-${btnTextSlotsExist ? size : null}`}>
        <Icon icon={btnIcon} />
      </span>
    {/if}
  {/if}

  {#if $$slots.btnTextDisabled && disabled}
    <slot name="btnTextDisabled">Disabled Button Text</slot>
  {:else if $$slots.default}
    <slot>Button Text</slot>
  {/if}
  
  {#if btnIcon && btnIconDisabled && btnIconSide === "right"}
    {#if disabled}
      {#if btnIconDisabledShouldSpin}
        <span class={`btn-icon right disabled icon-margin-${btnTextSlotsExist ? size : null}`}>
          <Icon icon={btnIconDisabled} class="fpui-spin" />
        </span>
      {:else}
        <span class={`btn-icon right disabled icon-margin-${btnTextSlotsExist ? size : null}`}>
          <Icon icon={btnIconDisabled} />
        </span>
      {/if}
    {:else}
      <span class={`btn-icon right icon-margin-${btnTextSlotsExist ? size : null}`}>
        <Icon icon={btnIcon} />
      </span>
    {/if}
  {/if}
</button>


<style>
  .fpui-btn {
    outline: none;
    border-width: var(--custom-btn-border-width, 2px);
    border-style: var(--custom-btn-border-style, solid);
    border-radius: var(--custom-btn-border-radius, var(--fpui-btn-border-radius, 3px));
    cursor: pointer;
    font-weight: var(--custom-btn-font-weight, var(--fpui-btn-font-weight, 400));

    & :global(.iconify) {
      margin-bottom: -2px;
    }

    &.sm {
      padding: var(--custom-btn-padding, calc(var(--fpui-btn-padding-sm, 5px) - 1px) calc((var(--fpui-btn-padding-sm, 5px) * 2) - 1px));
      font-size: var(--custom-btn-font-size, var(--fpui-font-size-sm, 12px));
    }
    &.md {
      padding: var(--custom-btn-padding, calc(var(--fpui-btn-padding-md, 10px) - 1px) calc((var(--fpui-btn-padding-md, 10px) * 2) - 1px));
      font-size: var(--custom-btn-font-size, var(--fpui-font-size-base, 16px));
    }
    &.lg {
      padding: var(--custom-btn-padding, calc(var(--fpui-btn-padding-lg, 10px) - 1px) calc((var(--fpui-btn-padding-lg, 10px) * 2) - 1px));
      font-size: var(--custom-btn-font-size, var(--fpui-font-size-lg, 20px));
    }

    & .btn-icon {
      
      &.left {

        &.icon-margin-sm {
          margin-right: var(--custom-btn-icon-margin, var(--fpui-btn-icon-margin-sm, 5px));
        }
        &.icon-margin-md {
          margin-right: var(--custom-btn-icon-margin, var(--fpui-btn-icon-margin-md, 10px));
        }
        &.icon-margin-lg {
          margin-right: var(--custom-btn-icon-margin, var(--fpui-btn-icon-margin-lg, 15px));
        }
      }

      &.right {

        &.icon-margin-sm {
          margin-left: var(--custom-btn-icon-margin, var(--fpui-btn-icon-margin-sm, 5px));
        }
        &.icon-margin-md {
          margin-left: var(--custom-btn-icon-margin, var(--fpui-btn-icon-margin-md, 10px));
        }
        &.icon-margin-lg {
          margin-left: var(--custom-btn-icon-margin, var(--fpui-btn-icon-margin-lg, 15px));
        }
      }

      & :global(.iconify) {
        transform: rotate(var(--custom-btn-icon-rotate, 0deg));
      }

      &.disabled :global(.iconify) {
        transform: rotate(var(--custom-btn-icon-disabled-rotate, 0deg));
      }
    }
  }

  .primary {
    border-color: var(--custom-btn-border-color, var(--fpui-primary-color, #333));
    background-color: var(--custom-btn-background-color, var(--fpui-primary-color, #333));
    color: var(--custom-btn-text-color, var(--fpui-btn-primary-text-color, white));
    
    &:hover {
      box-shadow: var(--custom-btn-box-shadow, 0 0 0 1px var(--fpui-primary-color, gray));
    }

    &.inverted {
      color: var(--custom-btn-text-color, var(--fpui-primary-color, #333));
    }
  }

  .secondary {
    border-color: var(--custom-btn-border-color, var(--fpui-secondary-color, #333));
    background-color: var(--custom-btn-background-color, var(--fpui-secondary-color, #333));
    color: var(--custom-btn-text-color, var(--fpui-btn-secondary-text-color, white));

    &:hover {
      box-shadow: var(--custom-btn-box-shadow, 0 0 0 1px var(--fpui-secondary-color, gray));
    }

    &.inverted {
      color: var(--custom-btn-text-color, var(--fpui-secondary-color, #333));
    }
  }

  .tertiary {
    border-color: var(--custom-btn-border-color, var(--fpui-tertiary-color, #333));
    background-color: var(--custom-btn-background-color, var(--fpui-tertiary-color, #333));
    color: var(--custom-btn-text-color, var(--fpui-btn-tertiary-text-color, white));

    &:hover {
      box-shadow: var(--custom-btn-box-shadow, 0 0 0 1px var(--fpui-tertiary-color, gray));
    }

    &.inverted {
      color: var(--custom-btn-text-color, var(--fpui-tertiary-color, #333));
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

  .fpui-btn:disabled {
    border-color: var(--custom-btn-disabled-bg-color, var(--fpui-disabled-bg-color, black));
    box-shadow: none;
    color: var(--custom-btn-disabled-text-color, var(--fpui-disabled-text-color, #c7c7c7));
    background-color: var(--custom-btn-disabled-bg-color, var(--fpui-disabled-bg-color, black));
    cursor: default;
  }
</style>
