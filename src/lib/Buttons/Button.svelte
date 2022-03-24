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


<!-- Using flexbox styles on this button component messes up the tooltip component if a user wraps a <Button> in a <Tooltip>. So I can't use flexbox to move the icon around. -->
<!-- <button
  type="button"
  {id}
  class="{`fpcl-btn ${btnColor} ${size} ${width}-width`}"
  class:inverted={inverted}
  disabled={disabled}
  on:click
>
  {#if btnIcon && btnIconDisabled}
    {#if disabled}
      {#if btnIconDisabledShouldSpin}
        You can't dynamically bind classes to a component, so the <Icon /> component has to be repeated a few times.
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
    <slot>Button Text</slot>
  {/if}
</button> -->


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
    border: none;
    border-radius: var(--fpcl-btn-border-radius);
    cursor: pointer;

    & :global(.iconify) {
      margin-bottom: -2px;
    }
  }

  .fpcl-btn .btn-icon-left {

    &.icon-margin-sm {
      margin-right: 5px;
    }
    &.icon-margin-md {
      margin-right: 10px;
    }
    &.icon-margin-lg {
      margin-right: 15px;
    }
  }
  .fpcl-btn .btn-icon-right {

    &.icon-margin-sm {
      margin-left: 5px;
    }
    &.icon-margin-md {
      margin-left: 10px;
    }
    &.icon-margin-lg {
      margin-left: 15px;
    }
  }

  .primary {
    border: 2px solid var(--fpcl-primary);
    background-color: var(--fpcl-primary);
    color: var(--fpcl-btn-primary-text-color);
    
    &:hover {
      box-shadow: 0 0 0 1px var(--fpcl-primary, gray);
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
      box-shadow: 0 0 0 1px var(--fpcl-secondary, gray);
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
      box-shadow: 0 0 0 1px var(--fpcl-tertiary, gray);
    }

    &.inverted {
      color: var(--fpcl-tertiary);
    }
  }

  .inverted {
    background-color: transparent;
  }

  .sm {
    padding: 4px 9px;
    font-size: var(--fpcl-font-size-sm, 12px);
  }
  .md {
    padding: 9px 19px;
    font-size: var(--fpcl-font-size-base, 16px);
  }
  .lg {
    padding: 14px 29px;
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
    box-shadow: none;
    color: var(--fpcl-disabled-text-color);
    background-color: var(--fpcl-disabled-bg-color);
    cursor: default;
  }
</style>
