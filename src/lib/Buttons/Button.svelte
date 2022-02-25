<!-- The `on:click` is Svelte's "event forwarding" feature. -->

<button
  type="button"
  class="{`jacl-btn ${bgColor} ${size} ${width}-width`}"
  class:inverse={inverse}
  disabled={disabled}
  on:click
>
  {#if btnIcon && btnIconDisabled}
    {#if disabled}
      {#if btnIconDisabledShouldSpin}
        <!-- You can't dynamically bind classes to a component, so the <Icon /> component has to be repeated a few times. -->
        <span class="{`btn-icon-${btnIconSide}`}" >
          <Icon icon="{btnIconDisabled}" class="jacl-spin" />
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
  .jacl-btn {
    font-family: var(--jacl-body-font-stack);
    font-weight: var(--jacl-btn-font-weight);
    outline: none;
    border: 0;
    border-radius: var(--jacl-btn-radius);
    cursor: pointer;
    display: inline-block;
    line-height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .jacl-btn .btn-icon-left {
    order: 0;
    margin-right: var(--jacl-btn-icon-margin);
  }
  .jacl-btn .btn-icon-right {
    order: 1;
    margin-left: var(--jacl-btn-icon-margin);
  }

  .primary {
    background-color: var(--jacl-primary);
    color: var(--jacl-btn-text-color-primary);
  }
  .primary:hover {
    background-color: var(--jacl-primary-dark);
    color: var(--jacl-btn-text-color-primary);
  }
  .primary.inverse {
    background-color: var(--jacl-btn-text-color-primary);
    color: var(--jacl-primary);
    box-shadow: 0px 0px 0px 2px var(--jacl-primary) inset;
  }
  .primary.inverse:hover {
    background-color: var(--jacl-btn-text-color-primary);
    color: var(--jacl-primary-dark);
    box-shadow: 0px 0px 0px 3px var(--jacl-primary-dark) inset;
  }

  .secondary {
    background-color: var(--jacl-secondary);
    color: var(--jacl-btn-text-color-secondary);
  }
  .secondary:hover {
    background-color: var(--jacl-secondary-dark);
    color: var(--jacl-btn-text-color-secondary);
  }
  .secondary.inverse {
    background-color: var(--jacl-btn-text-color-secondary);
    color: var(--jacl-secondary);
    box-shadow: 0px 0px 0px 2px var(--jacl-secondary) inset;
  }
  .secondary.inverse:hover {
    background-color: var(--jacl-btn-text-color-secondary);
    color: var(--jacl-secondary-dark);
    box-shadow: 0px 0px 0px 3px var(--jacl-secondary-dark) inset;
  }

  .tertiary {
    background-color: var(--jacl-tertiary);
    color: var(--jacl-btn-text-color-tertiary);
  }
  .tertiary:hover {
    background-color: var(--jacl-tertiary-dark);
    color: var(--jacl-btn-text-color-tertiary);
  }
  .tertiary.inverse {
    background-color: var(--jacl-btn-text-color-tertiary);
    color: var(--jacl-tertiary);
    box-shadow: 0px 0px 0px 2px var(--jacl-tertiary) inset;
  }
  .tertiary.inverse:hover {
    background-color: var(--jacl-btn-text-color-tertiary);
    color: var(--jacl-tertiary-dark);
    box-shadow: 0px 0px 0px 3px var(--jacl-tertiary-dark) inset;
  }

  .small {
    font-size: var(--jacl-small-font-size);
    padding: var(--jacl-btn-small-padding);
  }
  .medium {
    font-size: var(--jacl-base-font-size);
    padding: var(--jacl-btn-medium-padding);
  }
  .large {
    font-size: var(--jacl-large-font-size);
    padding: var(--jacl-btn-large-padding);
  }

  .auto-width {
    width: auto;
  }
  .full-width {
    width: 100%;
  }

  .jacl-btn:disabled {
    color: var(--jacl-disabled-text-color);
    background-color: var(--jacl-disabled-background-color);
    box-shadow: none;
    cursor: default;
  }
</style>
