<script lang="ts">
  import Icon from "@iconify/svelte";
  import { theme } from "/src/theme";

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


<button
  type="button"
  class="{`fpcl-btn ${btnColor} ${size} ${width}-width`}"
  class:inverted={inverted}
  disabled={disabled}
  on:click
>
  {#if btnIcon && btnIconDisabled}
    {#if disabled}
      {#if btnIconDisabledShouldSpin}
        <!-- You can't dynamically bind classes to a component, so the <Icon /> component has to be repeated a few times. -->
        <span class="{`btn-icon-${btnIconSide}`}">
          <Icon icon="{btnIconDisabled}" class="fpcl-spin" />
        </span>
      {:else}
        <span class="{`btn-icon-${btnIconSide}`}">
          <Icon icon="{btnIconDisabled}" />
        </span>
      {/if}
    {:else}
      <span class="{`btn-icon-${btnIconSide}`}">
        <Icon icon="{btnIcon}" />
      </span>
    {/if}
  {/if}
  {#if $$slots.btnTextDisabled && disabled}
    <slot name="btnTextDisabled">Disabled Button Text</slot>
  {:else}
    <slot name="btnText">Button Text</slot>
  {/if}
</button>


<style>
  .fpcl-btn {
    outline: none;
    border: none;
    border-radius: var(--fpcl-btn-border-radius);
    cursor: pointer;
    display: inline-block;
    line-height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fpcl-btn .btn-icon-left {
    order: 0;
    margin-right: var(--fpcl-btn-icon-margin);
  }
  .fpcl-btn .btn-icon-right {
    order: 1;
    margin-left: var(--fpcl-btn-icon-margin);
  }

  .primary {
    border: 2px solid var(--fpcl-primary);
    background-color: var(--fpcl-primary);
    color: var(--fpcl-btn-primary-text-color);
    
    &:hover {
      box-shadow: var(--fpcl-btn-primary-box-shadow, 0 0 0 1px black);
    }

    &.inverted {
      color: var(--fpcl-primary);
    }
  }

  .secondary {
    border: 2px solid var(--fpcl-secondary);
    background-color: var(--fpcl-secondary);
    color: var(--fpcl-btn-secondary-text-color);

    &:hover {
      box-shadow: var(--fpcl-btn-secondary-box-shadow, 0 0 0 1px black);
    }

    &.inverted {
      color: var(--fpcl-secondary);
    }
  }

  .tertiary {
    border: 2px solid var(--fpcl-tertiary);
    background-color: var(--fpcl-tertiary);
    color: var(--fpcl-btn-tertiary-text-color);

    &:hover {
      box-shadow: var(--fpcl-btn-tertiary-box-shadow, 0 0 0 1px black);
    }

    &.inverted {
      color: var(--fpcl-tertiary);
    }
  }

  .inverted {
    background-color: transparent;
  }

  .sm {
    padding: var(--fpcl-btn-padding-v-sm) var(--fpcl-btn-padding-h-sm);
    font-size: var(--fpcl-font-size-sm, 12px);
  }
  .md {
    padding: var(--fpcl-btn-padding-v-md) var(--fpcl-btn-padding-h-md);
    font-size: var(--fpcl-font-size-base, 16px);
  }
  .lg {
    padding: var(--fpcl-btn-padding-v-lg) var(--fpcl-btn-padding-h-lg);
    font-size: var(--fpcl-font-size-lg, 20px);
  }

  .auto-width {
    width: auto;
  }
  .full-width {
    width: 100%;
  }

  .fpcl-btn:disabled {
    border-color: var(--fpcl-disabled-bg-color);
    color: var(--fpcl-disabled-text-color);
    background-color: var(--fpcl-disabled-bg-color);
    box-shadow: none;
    cursor: default;
  }
</style>
