<script lang="ts">
  import { theme } from "/src/theme";

  export let checked;
  export let label;
  export let disabled = false;
</script>


<label
  class="fp-checkbox-label-wrapper" 
  class:disabled
  style={`margin-bottom: ${theme.checkboxMarginBottom}`}
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
    style={`top: ${theme.checkboxVerticalAlignment}`}
  ></span>
</label><br>


<style>
  @import "checkbox.css";
</style>
