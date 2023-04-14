<script lang="ts">
  import { defaults } from "src/defaults";

  export let checked;
  export let label;
  export let disabled = false;
</script>


<label
  class="fp-checkbox-label-wrapper" 
  class:disabled
  style={`margin-bottom: ${defaults.checkboxMarginBottom}`}
>
  <input
    type="checkbox"
    class="fp-checkbox-input"
    bind:checked={checked}
    {disabled}
    on:change
    on:input
  > {label}
  <span 
    class="fp-checkbox-checkmark" 
    style={`top: ${defaults.checkboxVerticalAlignment}`}
  ></span>
</label><br>


<style>
  @import "checkbox.css";
</style>
