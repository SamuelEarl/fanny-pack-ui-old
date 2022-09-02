<script lang="ts">
  import { createId } from "../fpui-utils";
  import { Label } from "../Labels";

  export let label = "";
  export let id = "";
  export let value = "";
  export let size = "md";
  export let placeholder = "";
  export let disabled = false;

  let componentId = createId();
</script>


<Label {label} forVal={`fpui-textarea-${componentId}`} />
<textarea
  bind:value={value}
  {id}
  class="{`${size}`}"
  on:input
  on:keyup
  on:blur
  {placeholder}
  {disabled}
></textarea>


<style>
  textarea {
    width: 100%;
    font-size: 0.75rem;
    border-color: var(--custom-textarea-border-color, var(--fpui-textarea-border-color, gray));
    border-radius: var(--border-radius, 3px);
    background-color: var(--custom-textarea-bg-color, var(--fpui-textarea-bg-color, white));
    color: var(--custom-textarea-text-color, var(--fpui-textarea-text-color, black));
    outline: none;

    &.sm {
      padding: var(--fpui-textarea-padding-sm, 5px);
      font-size: var(--font-size-sm, 12px);
    }
    &.md {
      padding: var(--fpui-textarea-padding-md, 10px);
      font-size: var(--font-size-md, 16px);
    }
    &.lg {
      padding: var(--fpui-textarea-padding-lg, 15px);
      font-size: var(--font-size-lg, 20px);
    }

    &::placeholder {
      color: var(--custom-textarea-placeholder-text-color, var(--fpui-textarea-placeholder-text-color, lightgray));
    }

    &:hover, &:focus {
      box-shadow: 0 0 0 1px var(--custom-textarea-border-color, var(--fpui-textarea-border-color, gray));
    }

    &:disabled {
      border-color: var(--disabled-bg-color);
      box-shadow: none;
      color: var(--disabled-text-color);
      background-color: var(--disabled-bg-color);
      cursor: default;
    }
  }
</style>
