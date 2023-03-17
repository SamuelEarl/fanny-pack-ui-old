<script lang="ts">
  import { theme } from "/src/lib/fpui-theme";

  export let checked;
  export let label;
  export let disabled = false;
</script>


<label
  class="fpui-checkbox-label-wrapper" 
  class:disabled
  style={`margin-bottom: ${theme.checkboxMarginBottom}`}
>
  <input
    type="checkbox"
    class="fpui-checkbox-input"
    bind:checked={checked}
    {disabled}
    on:change
    on:input
  > {label}
  <span 
    class="fpui-checkbox-checkmark" 
    style={`top: ${theme.checkboxVerticalAlignment}`}
  ></span>
</label><br>


<style>
  @import "checkbox.css";
</style>
