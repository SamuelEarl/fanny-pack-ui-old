<!-- The `on:click` is Svelte's "event forwarding" feature. -->

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
  import { theme } from "$/theme";

  export let bgColor = "primary";
  export let size = "medium";
  export let width = "auto";
  export let inverse = false;
  export let disabled = false;
  export let btnIcon = theme.btnIcon;
  export let btnIconDisabled = theme.btnIconDisabled;
  export let btnIconSide = "left";
  export let btnIconDisabledShouldSpin = true; // A spinning button icon can be used to provide user feedback for loading states (e.g. saving data, loading page content).
</script>


<style>
  .fpcl-btn {
    font-family: var(--fpcl-body-font-stack);
    font-weight: var(--fpcl-btn-font-weight);
    outline: none;
    border: 0;
    border-radius: var(--fpcl-btn-radius);
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
    background-color: var(--fpcl-primary);
    color: var(--fpcl-btn-text-color-primary);
  }
  .primary:hover {
    background-color: var(--fpcl-primary-dark);
    color: var(--fpcl-btn-text-color-primary);
  }
  .primary.inverse {
    background-color: var(--fpcl-btn-text-color-primary);
    color: var(--fpcl-primary);
    box-shadow: 0px 0px 0px 2px var(--fpcl-primary) inset;
  }
  .primary.inverse:hover {
    background-color: var(--fpcl-btn-text-color-primary);
    color: var(--fpcl-primary-dark);
    box-shadow: 0px 0px 0px 3px var(--fpcl-primary-dark) inset;
  }

  .secondary {
    background-color: var(--fpcl-secondary);
    color: var(--fpcl-btn-text-color-secondary);
  }
  .secondary:hover {
    background-color: var(--fpcl-secondary-dark);
    color: var(--fpcl-btn-text-color-secondary);
  }
  .secondary.inverse {
    background-color: var(--fpcl-btn-text-color-secondary);
    color: var(--fpcl-secondary);
    box-shadow: 0px 0px 0px 2px var(--fpcl-secondary) inset;
  }
  .secondary.inverse:hover {
    background-color: var(--fpcl-btn-text-color-secondary);
    color: var(--fpcl-secondary-dark);
    box-shadow: 0px 0px 0px 3px var(--fpcl-secondary-dark) inset;
  }

  .tertiary {
    background-color: var(--fpcl-tertiary);
    color: var(--fpcl-btn-text-color-tertiary);
  }
  .tertiary:hover {
    background-color: var(--fpcl-tertiary-dark);
    color: var(--fpcl-btn-text-color-tertiary);
  }
  .tertiary.inverse {
    background-color: var(--fpcl-btn-text-color-tertiary);
    color: var(--fpcl-tertiary);
    box-shadow: 0px 0px 0px 2px var(--fpcl-tertiary) inset;
  }
  .tertiary.inverse:hover {
    background-color: var(--fpcl-btn-text-color-tertiary);
    color: var(--fpcl-tertiary-dark);
    box-shadow: 0px 0px 0px 3px var(--fpcl-tertiary-dark) inset;
  }

  .small {
    font-size: var(--fpcl-small-font-size);
    padding: var(--fpcl-btn-small-padding);
  }
  .medium {
    font-size: var(--fpcl-base-font-size);
    padding: var(--fpcl-btn-medium-padding);
  }
  .large {
    font-size: var(--fpcl-large-font-size);
    padding: var(--fpcl-btn-large-padding);
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
