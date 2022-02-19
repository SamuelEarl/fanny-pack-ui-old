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
    padding: var(--input-padding);
    border: none;
    border-bottom: 2px solid var(--gray-light);
    /* border-radius: var(--global-radius) var(--global-radius) 0 0; */
    background-color: var(--input-background-color);
  }

  input.full-width {
    width: 100%;
  }
  input.auto-width {
    width: auto;
  }

  input:disabled {
    color: var(--disabled-text-color);
    background-color: var(--disabled-background-color);
    cursor: default;
  }

  .label-wrapper {
    margin: var(--label-margin);
  }
  label {
    font-size: var(--label-font-size);
    color: var(--global-text-color);
  }
</style>
