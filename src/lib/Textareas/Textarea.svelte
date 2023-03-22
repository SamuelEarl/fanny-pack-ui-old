<script lang="ts">
  import { createId } from "../fp-utils";
  import { Label } from "../Labels";
  import { paddingSizes, fontSizes } from "../fp-styles";
  import { theme } from "/src/theme";

  export let label = "";
  export let id = "";
  export let value = "";
  export let size = "md";
  export let placeholder = "";
  export let disabled = false;
  export let padding = theme.textareaDefaultPadding;
  export let fontSize = theme.textareaDefaultFontSize;

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


<Label {label} forVal={`fp-textarea-${componentId}`} />
<textarea
  bind:value={value}
  {id}
  class={`${size}`}
  style={`${paddingStyle} ${fontSizeStyle}`}
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
    border: var(--border-default);
    border-color: var(--custom-textarea-border-color, var(--border-color-default));
    border-radius: var(--border-radius, 3px);
    background-color: var(--custom-textarea-bg-color, var(--bg-color-element-default));
    color: var(--custom-textarea-text-color, var(--text-color-default));
    outline: none;

    &::placeholder {
      color: var(--custom-textarea-placeholder-text-color, var(--placeholder-color-default));
    }

    &:hover, &:focus {
      box-shadow: 0 0 0 1px var(--custom-textarea-border-color, var(--border-color-default));
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
