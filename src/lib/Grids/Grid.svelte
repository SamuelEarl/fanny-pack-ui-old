<script lang="ts">
  import { setContext } from "svelte";
  import { GRID_KEY } from "./grid-utils";

  export let rowMarginsY = 0;
  export let rowMarginsX = 0;
  export let equalColWidths = false;
  export let colPaddingY = 0;
  export let colPaddingX = 0;
  export let contain = false;

  setContext(GRID_KEY, {
    "rowMarginsY": rowMarginsY,
    "rowMarginsX": rowMarginsX,
    "equalColWidths": equalColWidths,
    "colPaddingY": colPaddingY,
    "colPaddingX": colPaddingX,
  });
</script>

<div 
  class="fp-grid"
  class:container={contain}
>
  <slot />
</div>
