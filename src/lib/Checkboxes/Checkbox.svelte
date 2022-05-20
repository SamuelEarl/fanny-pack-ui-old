<script lang="ts">
  export let checked;
  export let label;
  export let disabled = false;
</script>


<label class="fpui-checkbox-label-wrapper" class:disabled>
  <input
    type="checkbox"
    class="fpui-checkbox-input"
    bind:checked={checked}
    {disabled}
    on:change
    on:input
  > {label}
  <span class="fpui-checkbox-checkmark"></span>
</label>


<style>
  @import "checkbox.css";
</style>
