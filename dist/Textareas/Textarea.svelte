<script>import { createId } from "../fp-utils";
import { Label } from "../Labels";
export let label = "";
export let id = "";
export let value = "";
export let placeholder = "";
export let disabled = false;
export let padding = "var(--textarea-default-padding)";
export let fontSize = "var(--textarea-default-font-size)";
let componentId = createId();
</script>


<Label {label} forVal={`fp-textarea-${componentId}`} />
<textarea
  bind:value={value}
  {id}
  style={`padding:${padding}; font-size:${fontSize};`}
  on:input
  on:keyup
  on:blur
  {placeholder}
  {disabled}
  {...$$restProps}
></textarea>


<style>
  textarea {
    width: 100%;
    border: var(--border-default);
    border-color: var(--border-color-default);
    border-color: var(--custom-textarea-border-color, var(--border-color-default));
    border-radius: 3px;
    border-radius: var(--border-radius, 3px);
    background-color: var(--bg-color-element-default);
    background-color: var(--custom-textarea-bg-color, var(--bg-color-element-default));
    color: var(--text-color-default);
    color: var(--custom-textarea-text-color, var(--text-color-default));
    outline: none;
  }textarea::-webkit-input-placeholder {
      color: var(--placeholder-color-default);
      color: var(--custom-textarea-placeholder-text-color, var(--placeholder-color-default));
    }textarea::-moz-placeholder {
      color: var(--placeholder-color-default);
      color: var(--custom-textarea-placeholder-text-color, var(--placeholder-color-default));
    }textarea:-ms-input-placeholder {
      color: var(--placeholder-color-default);
      color: var(--custom-textarea-placeholder-text-color, var(--placeholder-color-default));
    }textarea::-ms-input-placeholder {
      color: var(--placeholder-color-default);
      color: var(--custom-textarea-placeholder-text-color, var(--placeholder-color-default));
    }textarea::placeholder {
      color: var(--placeholder-color-default);
      color: var(--custom-textarea-placeholder-text-color, var(--placeholder-color-default));
    }textarea:hover, textarea:focus {
      -webkit-box-shadow: 0 0 0 2px var(--border-color-default);
              box-shadow: 0 0 0 2px var(--border-color-default);
      -webkit-box-shadow: 0 0 0 2px var(--custom-textarea-border-color, var(--border-color-default));
              box-shadow: 0 0 0 2px var(--custom-textarea-border-color, var(--border-color-default));
    }textarea:disabled {
      border-color: var(--border-color-disabled);
      -webkit-box-shadow: none;
              box-shadow: none;
      color: var(--text-color-disabled);
      background-color: var(--bg-color-element-disabled);
      cursor: default;
    }</style>
