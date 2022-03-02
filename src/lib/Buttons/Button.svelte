<button
  type="button"
  class="{`fpcl-btn ${bgColor} ${size} ${width}-width`}"
  class:inverse={inverse}
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


<script lang="ts">
  import Icon from "@iconify/svelte";
  import { theme } from "/src/theme";

  export let bgColor = "primary";
  export let inverse = false;
  export let size = "md";
  export let width = "auto";
  export let disabled = false;
  export let btnIcon = theme.btnIcon;
  export let btnIconDisabled = theme.btnIconDisabled;
  export let btnIconSide = "left";
  export let btnIconDisabledShouldSpin = true; // A spinning button icon can be used to provide user feedback for loading states (e.g. saving data, loading page content).
</script>


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
    box-shadow: var(--fpcl-btn-box-shadow);

    &:hover {
      box-shadow: var(--fpcl-btn-hover-box-shadow);;
    }
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
    background-color: var(--fpcl-primary);
    color: var(--fpcl-btn-primary-text-color);
    border: var(--fpcl-btn-primary-border);

    &.inverse {
      background-color: var(--fpcl-btn-primary-text-color);
      color: var(--fpcl-primary);
      /* box-shadow: 0px 0px 0px 2px var(--fpcl-primary) inset; */
    }
  }

  .secondary {
    background-color: var(--fpcl-secondary);
    color: var(--fpcl-btn-secondary-text-color);
    border: var(--fpcl-btn-secondary-border);

    &.inverse {
      background-color: var(--fpcl-btn-secondary-text-color);
      color: var(--fpcl-secondary);
      /* box-shadow: 0px 0px 0px 2px var(--fpcl-secondary) inset; */
    }
  }

  .tertiary {
    background-color: var(--fpcl-tertiary);
    color: var(--fpcl-btn-tertiary-text-color);
    border: var(--fpcl-btn-tertiary-border);

    &.inverse {
      background-color: var(--fpcl-btn-tertiary-text-color);
      color: var(--fpcl-tertiary);
      /* box-shadow: 0px 0px 0px 2px var(--fpcl-tertiary) inset; */
    }
  }

  .sm {
    font-size: var(--fpcl-sm-font-size);
    padding: var(--fpcl-btn-sm-padding);
  }
  .md {
    font-size: var(--fpcl-base-font-size);
    padding: var(--fpcl-btn-md-padding);
  }
  .lg {
    font-size: var(--fpcl-lg-font-size);
    padding: var(--fpcl-btn-lg-padding);
  }

  .auto-width {
    width: auto;
  }
  .full-width {
    width: 100%;
  }

  .fpcl-btn:disabled {
    color: var(--fpcl-disabled-text-color);
    background-color: var(--fpcl-disabled-background-color);
    box-shadow: none;
    cursor: default;
  }
</style>
