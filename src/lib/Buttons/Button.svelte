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
        <span class="{`btn-icon-${btnIconSide}`}" >
          <Icon icon="{btnIconDisabled}" class="fpcl-spin" />
        </span>
      {:else}
        <span class="{`btn-icon-${btnIconSide}`}" >
          <Icon icon="{btnIconDisabled}" />
        </span>
      {/if}
    {:else}
      <span class="{`btn-icon-${btnIconSide}`}" >
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
    color: var(--fpcl-btn-regular-primary-text-color);
    
    &:hover {
      box-shadow: var(--fpcl-btn-primary-hover-box-shadow, 0 0 0 1px var(--fpcl-primary));
    }

    &.inverted {
      color: var(--fpcl-primary);
    }
  }

  .secondary {
    border: 2px solid var(--fpcl-secondary);
    background-color: var(--fpcl-secondary);
    color: var(--fpcl-btn-regular-secondary-text-color);

    &:hover {
      box-shadow: var(--fpcl-btn-secondary-hover-box-shadow, 0 0 0 1px var(--fpcl-secondary));
    }

    &.inverted {
      color: var(--fpcl-secondary);
    }
  }

  .tertiary {
    border: 2px solid var(--fpcl-tertiary);
    background-color: var(--fpcl-tertiary);
    color: var(--fpcl-btn-regular-tertiary-text-color);

    &:hover {
      box-shadow: var(--fpcl-btn-tertiary-hover-box-shadow, 0 0 0 1px var(--fpcl-tertiary));
    }

    &.inverted {
      color: var(--fpcl-tertiary);
    }
  }

  .inverted {
    background-color: transparent;
  }

  .sm {
    font-size: var(--fpcl-sm-font-size);
    padding: var(--fpcl-btn-sm-padding-v) var(--fpcl-btn-sm-padding-h);
  }
  .md {
    font-size: var(--fpcl-base-font-size);
    padding: var(--fpcl-btn-md-padding-v) var(--fpcl-btn-md-padding-h);
  }
  .lg {
    font-size: var(--fpcl-lg-font-size);
    padding: var(--fpcl-btn-lg-padding-v) var(--fpcl-btn-lg-padding-h);
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
