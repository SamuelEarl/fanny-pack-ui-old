<script context="module">
  export let ACCORDION_KEY = Symbol();
</script>

<script lang="ts">
  import { setContext } from "svelte";
  import { defaults } from "/src/defaults";
  import { paddingSizes, fontSizes, marginBottomSizes } from "../fp-styles";

  export let border = true;

  export let groupPadding = defaults.accordionGroupPadding;
  export let accordionTitlePadding = defaults.accordionTitlePadding;
  export let fontSize = defaults.accordionFontSize;
  export let SpaceBetweenAccordions = defaults.accordionSpaceBetweenAccordions;

  const groupPaddingStyle = paddingSizes[groupPadding];
  const accordionTitlePaddingStyle = `var(--space-${accordionTitlePadding})`;
  const fontSizeStyle = fontSizes[fontSize];
  const marginBottom = marginBottomSizes[SpaceBetweenAccordions];

  setContext(ACCORDION_KEY, {
    "accordionTitlePaddingStyle": accordionTitlePaddingStyle,
    "fontSizeStyle": fontSizeStyle,
    "marginBottom": marginBottom,
  });
</script>

<div
  class={`${border ? 'fp-accordion-group' : ''}`} 
  style={`${groupPaddingStyle}`}
>
  <slot></slot>
</div>

<style>
  .fp-accordion-group {
    border: 1px solid var(--border-color-default);
    border-radius: var(--border-radius);
  }
</style>
