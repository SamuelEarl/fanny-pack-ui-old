<script lang="ts">
  import { setContext } from "svelte";
  import { GRID_KEY } from "./grid-utils";

  export let rowMarginsV = 0;
  export let rowMarginsH = 0;
  export let equalColWidths = false;
  export let colPaddingV = 0;
  export let colPaddingH = 0;
  export let contain = false;

  setContext(GRID_KEY, {
    "rowMarginsV": rowMarginsV,
    "rowMarginsH": rowMarginsH,
    "equalColWidths": equalColWidths,
    "colPaddingV": colPaddingV,
    "colPaddingH": colPaddingH,
  });
</script>

<div 
  class="fpui-grid"
  class:fpui-contain={contain}
>
  <slot />
</div>

<style>
  .fpui-contain {
    max-width: var(--fpui-grid-max-content-width, 1140px);
    margin-left: auto;
    margin-right: auto;
  }
</style>
