<!-- The `on:click` is Svelte's "event forwarding" feature. -->

<button
  type="button"
  class="{`kitfox-btn ${bgColor} ${size} ${width}-width`}"
  class:inverse={inverse}
  disabled={disabled}
  on:click
>
  {#if btnIcon && btnIconDisabled}
    {#if disabled}
      {#if btnIconDisabledShouldSpin}
        <!-- You can't dynamically bind classes to a component, so the <Icon /> component has to be repeated a few times. -->
        <span class="{`btn-icon-${btnIconSide}`}" >
          <Icon icon="{btnIconDisabled}" class="kitfox-spin" />
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
  .kitfox-btn {
    font-family: var(--kitfox-body-font-stack);
    font-weight: var(--kitfox-btn-font-weight);
    outline: none;
    border: 0;
    border-radius: var(--kitfox-btn-radius);
    cursor: pointer;
    display: inline-block;
    line-height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .kitfox-btn .btn-icon-left {
    order: 0;
    margin-right: var(--kitfox-btn-icon-margin);
  }
  .kitfox-btn .btn-icon-right {
    order: 1;
    margin-left: var(--kitfox-btn-icon-margin);
  }

  .primary {
    background-color: var(--kitfox-primary);
    color: var(--kitfox-btn-text-color-primary);
  }
  .primary:hover {
    background-color: var(--kitfox-primary-dark);
    color: var(--kitfox-btn-text-color-primary);
  }
  .primary.inverse {
    background-color: var(--kitfox-btn-text-color-primary);
    color: var(--kitfox-primary);
    box-shadow: 0px 0px 0px 2px var(--kitfox-primary) inset;
  }
  .primary.inverse:hover {
    background-color: var(--kitfox-btn-text-color-primary);
    color: var(--kitfox-primary-dark);
    box-shadow: 0px 0px 0px 3px var(--kitfox-primary-dark) inset;
  }

  .secondary {
    background-color: var(--kitfox-secondary);
    color: var(--kitfox-btn-text-color-secondary);
  }
  .secondary:hover {
    background-color: var(--kitfox-secondary-dark);
    color: var(--kitfox-btn-text-color-secondary);
  }
  .secondary.inverse {
    background-color: var(--kitfox-btn-text-color-secondary);
    color: var(--kitfox-secondary);
    box-shadow: 0px 0px 0px 2px var(--kitfox-secondary) inset;
  }
  .secondary.inverse:hover {
    background-color: var(--kitfox-btn-text-color-secondary);
    color: var(--kitfox-secondary-dark);
    box-shadow: 0px 0px 0px 3px var(--kitfox-secondary-dark) inset;
  }

  .tertiary {
    background-color: var(--kitfox-tertiary);
    color: var(--kitfox-btn-text-color-tertiary);
  }
  .tertiary:hover {
    background-color: var(--kitfox-tertiary-dark);
    color: var(--kitfox-btn-text-color-tertiary);
  }
  .tertiary.inverse {
    background-color: var(--kitfox-btn-text-color-tertiary);
    color: var(--kitfox-tertiary);
    box-shadow: 0px 0px 0px 2px var(--kitfox-tertiary) inset;
  }
  .tertiary.inverse:hover {
    background-color: var(--kitfox-btn-text-color-tertiary);
    color: var(--kitfox-tertiary-dark);
    box-shadow: 0px 0px 0px 3px var(--kitfox-tertiary-dark) inset;
  }

  .small {
    font-size: var(--kitfox-small-font-size);
    padding: var(--kitfox-btn-small-padding);
  }
  .medium {
    font-size: var(--kitfox-base-font-size);
    padding: var(--kitfox-btn-medium-padding);
  }
  .large {
    font-size: var(--kitfox-large-font-size);
    padding: var(--kitfox-btn-large-padding);
  }

  .auto-width {
    width: auto;
  }
  .full-width {
    width: 100%;
  }

  .kitfox-btn:disabled {
    color: var(--kitfox-disabled-text-color);
    background-color: var(--kitfox-disabled-background-color);
    box-shadow: none;
    cursor: default;
  }
</style>
