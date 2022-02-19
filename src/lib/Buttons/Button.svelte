<!-- TODOS:
  * Should I refactor this component to use Svelte's --style-props feature? See https://svelte.dev/docs#style_props and you can reference the Select.svelte component, which already uses the --style-props feature. I like the flexibility with --style-props, but I need to find out if I can pass CSS variables as prop values? If not, then I might not refactor this component to use --style-props.
  * Should I create documentation similar to what I have done at the top of the Select.svelte component with the Example Usage and descriptions of each prop/slot? This will definitely be easier to create and maintain than a data table.
-->

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
          <Icon icon="{btnIconDisabled}" class="spin" />
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
  export let size = "md";
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
    font-family: var(--body-font-stack);
    font-weight: var(--btn-font-weight);
    outline: none;
    border: 0;
    border-radius: var(--btn-radius);
    cursor: pointer;
    display: inline-block;
    line-height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.jacl-btn .btn-icon-left) {
    order: 0;
    margin-right: var(--btn-icon-margin);
  }
  :global(.jacl-btn .btn-icon-right) {
    order: 1;
    margin-left: var(--btn-icon-margin);
  }

  .primary {
    background-color: var(--primary);
    color: var(--btn-text-color-primary);
  }
  .primary:hover {
    background-color: var(--primary-dark);
    color: var(--btn-text-color-primary);
  }
  .primary.inverse {
    background-color: var(--btn-text-color-primary);
    color: var(--primary);
    box-shadow: 0px 0px 0px 2px var(--primary) inset;
  }
  .primary.inverse:hover {
    background-color: var(--btn-text-color-primary);
    color: var(--primary-dark);
    box-shadow: 0px 0px 0px 3px var(--primary-dark) inset;
  }

  .secondary {
    background-color: var(--secondary);
    color: var(--btn-text-color-secondary);
  }
  .secondary:hover {
    background-color: var(--secondary-dark);
    color: var(--btn-text-color-secondary);
  }
  .secondary.inverse {
    background-color: var(--btn-text-color-secondary);
    color: var(--secondary);
    box-shadow: 0px 0px 0px 2px var(--secondary) inset;
  }
  .secondary.inverse:hover {
    background-color: var(--btn-text-color-secondary);
    color: var(--secondary-dark);
    box-shadow: 0px 0px 0px 3px var(--secondary-dark) inset;
  }

  .tertiary {
    background-color: var(--tertiary);
    color: var(--btn-text-color-tertiary);
  }
  .tertiary:hover {
    background-color: var(--tertiary-dark);
    color: var(--btn-text-color-tertiary);
  }
  .tertiary.inverse {
    background-color: var(--btn-text-color-tertiary);
    color: var(--tertiary);
    box-shadow: 0px 0px 0px 2px var(--tertiary) inset;
  }
  .tertiary.inverse:hover {
    background-color: var(--btn-text-color-tertiary);
    color: var(--tertiary-dark);
    box-shadow: 0px 0px 0px 3px var(--tertiary-dark) inset;
  }

  .sm {
    font-size: var(--sm-font-size);
    padding: var(--btn-sm-padding);
  }
  .md {
    font-size: var(--base-font-size);
    padding: var(--btn-md-padding);
  }
  .lg {
    font-size: var(--lg-font-size);
    padding: var(--btn-lg-padding);
  }

  .auto-width {
    width: auto;
  }
  .full-width {
    width: 100%;
  }

  .jacl-btn:disabled {
    color: var(--disabled-text-color);
    background-color: var(--disabled-background-color);
    box-shadow: none;
    cursor: default;
  }

  :global(.spin) {
    animation: spin var(--btn-icon-disabled-spin-speed) infinite linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
