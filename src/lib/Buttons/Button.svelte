<!-- The `on:click` is Svelte's "event forwarding" feature. -->

<button
  type="button"
  class="{`scl-btn ${color} ${size} ${width}-width`}"
  class:outline={outline}
  disabled={disabled}
  on:click
>
  {#if btnIcon || btnIconDisabled}
    {#if disabled}
      {#if spinDisabledIcon}  
        <span>
          <Icon icon="{btnIconDisabled}" class="btn-icon spin"/>
        </span>
      {:else}
        <span>
          <Icon icon="{btnIconDisabled}" class="btn-icon"/>
        </span>
      {/if}
    {:else}
      <span>
        <Icon icon="{btnIcon}" class="btn-icon" />
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
  import { theme } from "/static/theme.js";

  export let color = "primary";
  export let size = "md";
  export let width = "auto";
  export let outline = false;
  export let disabled = false;
  export let btnIcon = theme.btnIcon;
  export let btnIconDisabled = theme.btnIconDisabled;
  export let spinDisabledIcon = true; // A spinning button icon can be used to provide user feedback for loading states (e.g. saving data, loading page content).
</script>


<style>
  .scl-btn {
    font-family: var(--body-font-stack);
    font-weight: var(--btn-font-weight);
    outline: none;
    border: 0;
    border-radius: 3px;
    cursor: pointer;
    display: inline-block;
    line-height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.scl-btn .btn-icon) {
    margin-right: var(--btn-icon-space-right);
  }

  .primary {
    color: white;
    background-color: var(--primary);
  }
  .primary:hover {
    color: white;
    background-color: var(--primary-dark);
  }
  .primary.outline {
    color: var(--primary);
    background-color: white;
    box-shadow: 0px 0px 0px 2px var(--primary) inset;
  }
  .primary.outline:hover {
    color: var(--primary-dark);
    background-color: white;
    box-shadow: 0px 0px 0px 3px var(--primary-dark) inset;
  }

  .secondary {
    color: white;
    background-color: var(--secondary);
  }
  .secondary:hover {
    color: white;
    background-color: var(--secondary-dark);
  }
  .secondary.outline {
    color: var(--secondary);
    background-color: white;
    box-shadow: 0px 0px 0px 2px var(--secondary) inset;
  }
  .secondary.outline:hover {
    color: var(--secondary-dark);
    background-color: white;
    box-shadow: 0px 0px 0px 3px var(--secondary-dark) inset;
  }

  .tertiary {
    color: white;
    background-color: var(--tertiary);
  }
  .tertiary:hover {
    color: white;
    background-color: var(--tertiary-dark);
  }
  .tertiary.outline {
    color: var(--tertiary);
    background-color: white;
    box-shadow: 0px 0px 0px 2px var(--tertiary) inset;
  }
  .tertiary.outline:hover {
    color: var(--tertiary-dark);
    background-color: white;
    box-shadow: 0px 0px 0px 3px var(--tertiary-dark) inset;
  }

  .sm {
    font-size: var(--sm-font-size);
    padding: 10px 16px;
  }
  .md {
    font-size: var(--base-font-size);
    padding: 11px 20px;
  }
  .lg {
    font-size: var(--lg-font-size);
    padding: 12px 24px;
  }

  .auto-width {
    width: auto;
  }
  .full-width {
    width: 100%;
  }

  :disabled {
    color: var(--btn-text-color-disabled);
    background-color: var(--btn-background-color-disabled);
    cursor: default;
  }
  :disabled:hover {
    color: var(--btn-text-color-disabled);
    background-color: var(--btn-background-color-disabled);
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
