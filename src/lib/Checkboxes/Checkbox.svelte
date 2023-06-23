<script lang="ts">
  import { defaults } from "/src/defaults";
  // Importing an external CSS file into the "style" block does not work. When this component gets packaged up and then imported into another app the styles will not be included. So the styles need to be imported into the "script" block.
  import "./checkbox.css";

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
