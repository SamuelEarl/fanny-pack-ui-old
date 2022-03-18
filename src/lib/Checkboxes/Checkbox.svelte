<script lang="ts">
  export let checked;
  export let label;
</script>


<label class="fpcl-checkbox-label-wrapper">
  <input
    type="checkbox"
    class="fpcl-checkbox-input"
    bind:checked={checked}
    on:change
    on:input
  > {label}
  <span class="fpcl-checkbox-checkmark"></span>
</label>


<style>
  @import "checkbox.css";
</style>
