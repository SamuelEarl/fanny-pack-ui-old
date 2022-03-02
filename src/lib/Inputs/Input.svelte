{#if label}
  <div class="label-wrapper">
    <label for={label}>{label}</label>
  </div>
{/if}
<input
  type={type}
  id={label}
  class="{`${width}-width`}"
  placeholder={placeholder}
  disabled={disabled}
  on:input
  on:change
/>


<script lang="ts">
  export let type = "text";
  export let width = "full";
  export let label = "";
  export let placeholder = "Enter text here";
  export let disabled = false;
</script>


<style>
  input {
    outline: none;
    padding: var(--fpcl-input-padding);
    border: none;
    border-bottom: 2px solid var(--fpcl-light-gray);
    border-radius: var(--fpcl-global-radius);
    background-color: var(--fpcl-input-background-color);
  }

  input.full-width {
    width: 100%;
  }
  input.auto-width {
    width: auto;
  }

  input:disabled {
    color: var(--fpcl-disabled-text-color);
    background-color: var(--fpcl-disabled-background-color);
    cursor: default;
  }

  .label-wrapper {
    margin: var(--fpcl-label-margin);
  }
  label {
    font-size: var(--fpcl-label-font-size);
    color: var(--fpcl-global-text-color);
  }
</style>
