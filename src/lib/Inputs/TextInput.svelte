<script lang="ts">
  import { createId } from "../fpcl-utils";
  import { Label } from "../Labels";

  export let value = "";
  export let label = "";
  export let size = "md";
  export let placeholder = "";
  export let disabled = false;

  let componentId = createId();
</script>


<Label {label} forVal={`fpcl-input-${componentId}`} />
<input
  type="text"
  bind:value={value}
  id={`fpcl-input-${componentId}`}
  class="{`${size}`}"
  placeholder={placeholder}
  disabled={disabled}
  on:change
  on:input
/>


<style>
  input {
    width: 100%;
    outline: none;
    border: 1px solid;
    border-color: var(--fpcl-input-border-color, #c7c7c7);
    border-radius: var(--fpcl-border-radius, 3px);
    background-color: var(--fpcl-input-bg-color);
    color: var(--fpcl-input-text-color);

    &.sm {
      padding: 5px;
      font-size: var(--fpcl-font-size-sm, 12px);
    }
    &.md {
      padding: 10px;
      font-size: var(--fpcl-font-size-md, 16px);
    }
    &.lg {
      padding: 15px;
      font-size: var(--fpcl-font-size-lg, 20px);
    }

    &::placeholder {
      color: var(--fpcl-input-placeholder-text-color);
    }

    &:hover, &:focus {
      box-shadow: 0 0 0 1px var(--fpcl-input-border-color, gray);
    }

    &:disabled {
      border-color: var(--fpcl-disabled-bg-color);
      box-shadow: none;
      color: var(--fpcl-disabled-text-color);
      background-color: var(--fpcl-disabled-bg-color);
      cursor: default;
    }
  }
</style>
