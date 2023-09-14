<script>import "./checkbox.css";
export let id;
export let checked;
export let label;
export let disabled = false;
export let marginBottom = "var(--checkbox-default-margin-bottom)";
export let verticalAlignment = "var(--checkbox-default-vertical-alignment)";
</script>


<label
  for={id}
  class="fp-checkbox-label-wrapper" 
  class:disabled
  style={`margin-bottom: ${marginBottom};`}
>
  <input
    type="checkbox"
    {id}
    class="fp-checkbox-input"
    bind:checked={checked}
    {disabled}
    on:change
    on:input
  > {label}
  <span 
    class="fp-checkbox-checkmark" 
    style={`top: ${verticalAlignment};`}
  ></span>
</label><br>
