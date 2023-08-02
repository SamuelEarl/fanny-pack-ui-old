<script context="module">
  export let ACCORDION_KEY = Symbol();
</script>

<script lang="ts">
  import { setContext } from "svelte";
  import { env } from "$env/dynamic/public";
  import { paddingSizes, fontSizes, marginBottomSizes } from "../fp-styles";

  export let border = true;

  export let groupPadding = env.PUBLIC_FP_ACCORDION_GROUP_PADDING;
  export let accordionTitlePadding = env.PUBLIC_FP_ACCORDION_TITLE_PADDING;
  export let fontSize = env.PUBLIC_FP_ACCORDION_FONT_SIZE;
  export let SpaceBetweenAccordions = env.PUBLIC_FP_ACCORDION_SPACE_BETWEEN_ACCORDIONS;

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
