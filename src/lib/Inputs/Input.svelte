<script lang="ts">
  import { createId } from "../fp-utils";
  import { Label } from "../Labels";
  import { paddingSizes, fontSizes } from "../fp-styles";
  import { defaults } from "$/defaults";

  export let type = "text";
  export let value = "";
  export let label = "";
  export let list = "";
  export let padding = defaults.inputPadding;
  export let fontSize = defaults.inputFontSize;
  export let min = null;
  export let max = null;
  export let step = "any";
  export let placeholder = "";
  export let disabled = false;

  let componentId = createId();

  let paddingStyle = paddingSizes[padding];
  if (paddingStyle === undefined) {
    paddingStyle = paddingSizes["sm"];
  }

  let fontSizeStyle = fontSizes[fontSize];
  if (fontSizeStyle === undefined) {
    fontSizeStyle = fontSizes["md"];
  }
</script>


<Label {label} forVal={`fp-input-${componentId}`} />
{#if type === "text"}
  <input
    type="text"
    bind:value={value}
    {list}
    class="fp-input"
    style={`${paddingStyle} ${fontSizeStyle}`}
    {placeholder}
    {disabled}
    {...$$restProps}
    on:change
    on:input
    on:keyup
    on:blur
  />
{:else if type === "number"}
  <input
    type="number"
    bind:value={value}
    {list}
    class="fp-input"
    style={`${paddingStyle} ${fontSizeStyle}`}
    {min}
    {max}
    {step}
    {placeholder}
    {disabled}
    {...$$restProps}
    on:change
    on:input
    on:keyup
    on:blur
  />
{:else if type === "email"}
  <input
    type="email"
    bind:value={value}
    {list}
    class="fp-input"
    style={`${paddingStyle} ${fontSizeStyle}`}
    {placeholder}
    {disabled}
    {...$$restProps}
    on:change
    on:input
    on:keyup
    on:blur
  />
{/if}


<style>
  .fp-input {
    width: 100%;
    outline: none;
    border: var(--border-default);
    border-radius: var(--border-radius);
    background-color: var(--bg-color-element-default);

    &::placeholder {
      color: var(--placeholder-color-default);
    }

    &:hover, &:focus {
      box-shadow: var(--box-shadow-default);
    }

    &:disabled {
      border-color: var(--border-color-disabled);
      box-shadow: none;
      color: var(--text-color-disabled);
      background-color: var(--bg-color-element-disabled);
      cursor: default;
    }
  }
</style>
