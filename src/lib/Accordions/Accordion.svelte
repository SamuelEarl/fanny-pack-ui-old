<script lang="ts">
  import { getContext } from "svelte";
  import { slide } from "svelte/transition";
  import { ACCORDION_KEY } from "./AccordionGroup.svelte";

  export let id = "";
  export let title;
  export let open = false;

  const { 
    accordionPaddingStyle,
    fontSizeStyle,
    marginBottom 
  } = getContext(ACCORDION_KEY);
</script>

<!-- Accordion Wrapper -->
<div class={`fpui-accordion-wrapper`} style={`${marginBottom}`}>
  <!-- Accordion Button -->
  <div
    {id}
    class="fpui-accordion-btn"
    class:active={open}
    style={`${accordionPaddingStyle} ${fontSizeStyle}`}
    on:click={() => open = !open}
    on:keyup={() => open = !open}
  >
    {title}
  </div>

  <!-- Accordion Panel -->
  {#if open}
    <div 
      class="fpui-accordion-panel"
      style={`${accordionPaddingStyle} ${fontSizeStyle}`} 
      transition:slide|local
    >
      <slot></slot>
    </div>
  {/if}
</div>


<style>
  .fpui-accordion-wrapper {

    & .fpui-accordion-btn {
      border: var(--border-default);
      border-radius: var(--border-radius);
      background-color: var(--bg-color-default);
      color: var(--text-color-default);
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
        box-shadow: var(--box-shadow-default);
      }
    }
  }
</style>
