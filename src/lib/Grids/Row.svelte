<script lang="ts">
  import { getContext } from "svelte";
  import { GRID_KEY } from "./grid-utils";

  let {
    rowMarginsY,
    rowMarginsX,
  } = getContext(GRID_KEY);
</script>

<div
  class="fpui-row"
  style={`margin: ${rowMarginsY}px ${rowMarginsX}px`}
>
  <slot />
</div>

<style>
  .fpui-row {
    display: flex;
    flex-wrap: wrap;
  }
</style>
