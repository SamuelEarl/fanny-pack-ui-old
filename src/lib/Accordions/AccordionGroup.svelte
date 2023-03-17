<script context="module">
  export let ACCORDION_KEY = Symbol();
</script>

<script lang="ts">
  import { setContext } from "svelte";
  import { paddingSizes, fontSizes, marginBottomSizes } from "../styles";

  export let border = true;
  export let borderPadding = "sm";
  export let accordionPadding = "sm" 
  export let fontSize = "md";
  export let SpaceBetweenAccordions = "xs";  

  const borderPaddingStyle = paddingSizes[borderPadding];
  const accordionPaddingStyle = paddingSizes[accordionPadding];
  const fontSizeStyle = fontSizes[fontSize];
  const marginBottom = marginBottomSizes[SpaceBetweenAccordions];

  setContext(ACCORDION_KEY, {
    "accordionPaddingStyle": accordionPaddingStyle,
    "fontSizeStyle": fontSizeStyle,
    "marginBottom": marginBottom,
  });
</script>

<div
  class={`${border ? 'fpui-accordion-group' : ''}`} 
  style={`${borderPaddingStyle}`}
>
  <slot></slot>
</div>

<style>
  .fpui-accordion-group {
    border: 1px solid var(--border-color-default);
    border-radius: var(--border-radius);
  }
</style>
