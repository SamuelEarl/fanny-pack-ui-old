<script lang="ts">
  import { slide } from "svelte/transition";

  export let id = "";
  export let title;
  export let showAccordionPanel = false;
  export let size = "md";
</script>


<div
  {id}
  class={`fpui-accordion-btn ${size}`}
  class:active={showAccordionPanel}
  on:click={() => showAccordionPanel = !showAccordionPanel}
>
  {title}
</div>

{#if showAccordionPanel}
  <div class={`fpui-accordion-panel ${size}`} transition:slide|local>
    <slot></slot>
  </div>
{/if}


<style>
  .fpui-accordion-btn {
    margin-bottom: 5px;
    border: 1px solid var(--fpui-accordion-border-color);
    border-radius: var(--border-radius);
    background-color: var(--fpui-accordion-btn-bg-color);
    color: var(--fpui-accordion-btn-text-color);
    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }

    &:after {
      content: "+"; /* Unicode character for "plus" sign (+) */
      font-weight: bold;
      color: inherit;
      float: right;
      margin-left: 5px;
    }

    &.active:after {
      content: "−"; /* Unicode character for "minus" sign (-) */
    }

    &:hover {
      box-shadow: 0 0 0 1px var(--fpui-accordion-border-color, gray);
    }

    &.sm {
      padding: var(--fpui-accordion-padding-sm, 5px);
      font-size: var(--font-size-sm, 12px);
    }
    &.md {
      padding: var(--fpui-accordion-padding-md, 10px);
      font-size: var(--font-size-md, 16px);
    }
    &.lg {
      padding: var(--fpui-accordion-padding-lg, 15px);
      font-size: var(--font-size-lg, 20px);
    }
  }

  .fpui-accordion-panel {
    margin-bottom: 5px;

    &.sm {
      padding: var(--fpui-accordion-padding-sm, 5px);
      font-size: var(--font-size-sm, 12px);
    }
    &.md {
      padding: var(--fpui-accordion-padding-md, 10px);
      font-size: var(--font-size-md, 16px);
    }
    &.lg {
      padding: var(--fpui-accordion-padding-lg, 15px);
      font-size: var(--font-size-lg, 20px);
    }
  }
</style>
