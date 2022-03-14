<script lang="ts">
  import { createId } from "../utils";
  import Label from "../Labels/Label.svelte";

  export let value = "";
  export let label = "";
  export let size = "md";
  export let placeholder = "";
  export let disabled = false;

  let componentId = createId();
</script>


<Label {label} forId={`fpcl-input-${componentId}`} />
<input
  type="text"
  bind:value={value}
  id={`fpcl-input-${componentId}`}
  class="{`${size}`}"
  placeholder={placeholder}
  disabled={disabled}
  on:input
  on:change
/>


<style>
  input {
    width: 100%;
    outline: none;
    border-width: var(--fpcl-input-border-width, 1px);
    border-style: var(--fpcl-input-border-style, solid);
    border-color: var(--fpcl-input-border-color, #c7c7c7);
    border-radius: var(--fpcl-border-radius);
    background-color: var(--fpcl-input-bg-color);

    &.sm {
      padding: var(--fpcl-input-padding-sm);
    }
    &.md {
      padding: var(--fpcl-input-padding-md);
    }
    &.lg {
      padding: var(--fpcl-input-padding-lg);
    }

    &::placeholder {
      color: var(--fpcl-input-placeholder-text-color);
    }

    &:hover, &:focus {
      box-shadow: var(--fpcl-input-box-shadow, 0 0 0 1px black);
    }

    &:disabled {
      color: var(--fpcl-disabled-text-color);
      background-color: var(--fpcl-disabled-bg-color);
      cursor: default;
    }
  }
</style>
