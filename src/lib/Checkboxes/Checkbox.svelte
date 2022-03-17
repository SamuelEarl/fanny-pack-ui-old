<script lang="ts">
  import { createId } from "../utils";

  export let checked;
  export let label;

  let componentId = createId();
</script>


<label for={`fpcl-checkbox-${componentId}`} class="container">
  <input type="checkbox" id={`fpcl-checkbox-${componentId}`} bind:checked={checked} on:change> {label}
  <span class="checkmark"></span>
</label>


<style>
  @import "checkbox.css";
</style>
