<script lang="ts">
  import { getContext } from "svelte";
  import { GRID_KEY } from "./grid-utils";

  let {
    rowMarginsV,
    rowMarginsH,
  } = getContext(GRID_KEY);
</script>

<div
  class="fpui-row"
  style={`margin: ${rowMarginsV}px ${rowMarginsH}px`}
>
  <slot />
</div>

<style>
  .fpui-row {
    display: flex;
    flex-wrap: wrap;
  }
</style>
