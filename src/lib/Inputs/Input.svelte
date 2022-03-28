<script lang="ts">
  import { createId } from "../fpui-utils";
  import { Label } from "../Labels";

  export let type = "text";
  export let value = "";
  export let label = "";
  export let size = "md";
  export let placeholder = "";
  export let disabled = false;

  let componentId = createId();
</script>


<Label {label} forVal={`fpui-input-${componentId}`} />
{#if type === "text"}
  <input
    type="text"
    bind:value={value}
    id={`fpui-input-${componentId}`}
    class="{`${size}`}"
    placeholder={placeholder}
    disabled={disabled}
    on:change
    on:input
  />
{:else if type === "email"}
  <input
    type="email"
    bind:value={value}
    id={`fpui-input-${componentId}`}
    class="{`${size}`}"
    placeholder={placeholder}
    disabled={disabled}
    on:change
    on:input
  />
{/if}


<style>
  input {
    width: 100%;
    outline: none;
    border: 1px solid;
    border-color: var(--fpui-input-border-color, #c7c7c7);
    border-radius: var(--fpui-border-radius, 3px);
    background-color: var(--fpui-input-bg-color);
    color: var(--fpui-input-text-color);

    &.sm {
      padding: var(--fpui-input-padding-sm, 5px);
      font-size: var(--fpui-font-size-sm, 12px);
    }
    &.md {
      padding: var(--fpui-input-padding-md, 10px);
      font-size: var(--fpui-font-size-md, 16px);
    }
    &.lg {
      padding: var(--fpui-input-padding-lg, 15px);
      font-size: var(--fpui-font-size-lg, 20px);
    }

    &::placeholder {
      color: var(--fpui-input-placeholder-text-color);
    }

    &:hover, &:focus {
      box-shadow: 0 0 0 1px var(--fpui-input-border-color, gray);
    }

    &:disabled {
      border-color: var(--fpui-disabled-bg-color);
      box-shadow: none;
      color: var(--fpui-disabled-text-color);
      background-color: var(--fpui-disabled-bg-color);
      cursor: default;
    }
  }
</style>
