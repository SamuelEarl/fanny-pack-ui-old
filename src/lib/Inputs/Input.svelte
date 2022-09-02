<script lang="ts">
  import { createId } from "../fpui-utils";
  import { Label } from "../Labels";

  export let id = "";
  export let type = "text";
  export let value = "";
  export let label = "";
  export let size = "md";
  export let min = null;
  export let max = null;
  export let step = "any";
  export let placeholder = "";
  export let disabled = false;

  let componentId = createId();
</script>


<Label {label} forVal={`fpui-input-${componentId}`} />
{#if type === "text"}
  <input
    type="text"
    bind:value={value}
    {id}
    class="{`${size}`}"
    {placeholder}
    {disabled}
    on:change
    on:input
    on:keyup
    on:blur
  />
{:else if type === "number"}
  <input
    type="number"
    bind:value={value}
    {id}
    class="{`${size}`}"
    {min}
    {max}
    {step}
    {placeholder}
    {disabled}
    on:change
    on:input
    on:keyup
    on:blur
  />
{:else if type === "email"}
  <input
    type="email"
    bind:value={value}
    {id}
    class="{`${size}`}"
    {placeholder}
    {disabled}
    on:change
    on:input
    on:keyup
    on:blur
  />
{/if}


<style>
  input {
    width: 100%;
    outline: none;
    border: 1px solid;
    border-color: var(--custom-input-border-color, var(--fpui-input-border-color, #c7c7c7));
    border-radius: var(--border-radius, 3px);
    background-color: var(--custom-input-bg-color, var(--fpui-input-bg-color, white));
    color: var(--custom-input-text-color, var(--fpui-input-text-color, black));

    &.sm {
      padding: var(--fpui-input-padding-sm, 5px);
      font-size: var(--font-size-sm, 12px);
    }
    &.md {
      padding: var(--fpui-input-padding-md, 10px);
      font-size: var(--font-size-md, 16px);
    }
    &.lg {
      padding: var(--fpui-input-padding-lg, 15px);
      font-size: var(--font-size-lg, 20px);
    }

    &::placeholder {
      color: var(--custom-input-placeholder-text-color, var(--fpui-input-placeholder-text-color, gray));
    }

    &:hover, &:focus {
      box-shadow: 0 0 0 1px var(--fpui-input-border-color, gray);
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
