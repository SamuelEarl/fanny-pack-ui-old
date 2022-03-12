<script lang="ts">
  import { createId } from "../utils";
  import Label from "../Labels/Label.svelte";

  export let value = "";
  export let label = "";
  export let width = "full";
  export let placeholder = "";
  export let disabled = false;

  let componentId = createId();
</script>


<Label {label} forId={`fpcl-input-${componentId}`} />
<input
  type="text"
  bind:value={value}
  id={`fpcl-input-${componentId}`}
  class="{`${width}-width`}"
  placeholder={placeholder}
  disabled={disabled}
  on:input
  on:change
/>


<style>
  input {
    outline: none;
    padding: var(--fpcl-input-padding);
    border: var(--fpcl-input-border);
    border-radius: var(--fpcl-global-radius);
    background-color: var(--fpcl-input-bg-color);

    &.full-width {
      width: 100%;
    }
    &.auto-width {
      width: auto;
    }

    &::placeholder {
      color: var(--fpcl-input-placeholder-text-color);
    }

    &:hover, &:focus {
      box-shadow: var(--fpcl-input-box-shadow);
    }

    &:disabled {
      color: var(--fpcl-disabled-text-color);
      background-color: var(--fpcl-disabled-bg-color);
      cursor: default;
    }
  }
</style>
