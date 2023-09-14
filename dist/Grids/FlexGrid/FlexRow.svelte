<script>import { getContext } from "svelte";
import { FLEX_GRID_KEY } from "./flex-grid-utils";
let { colGutter, rowGutter, rowMarginsY, rowMarginsX } = getContext(FLEX_GRID_KEY);
</script>

<!-- <div
  class="fp-flex-row"
  style={`margin: ${rowMarginsY}px ${rowMarginsX}px`}
> -->
<div
  class="fp-flex-row"
  style={`margin: -${rowGutter}px 0`}
>
  <slot />
</div>

<style>
  .fp-flex-row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
  }</style>
