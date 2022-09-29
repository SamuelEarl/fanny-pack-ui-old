<script lang="ts">
  import { setContext } from "svelte";
  import { theme } from "/src/theme";

  export let tabStyle = theme.defaultTabStyle;

  setContext("tabStyle", tabStyle);
</script>

<div class={`fpui-tabs-tab-bar ${tabStyle}`}>
	<slot></slot>
</div>


<style>
	.fpui-tabs-tab-bar {
    display: flex;

    &.fill {
      border: 1px solid var(--fpui-tabs-tab-bar-fill-border-color, gray);
      border-radius: var(--border-radius, 3px);
      overflow: hidden;
      background-color: var(--fpui-tabs-tab-bar-fill-bg-color, lightgray);
      color: var(--fpui-tabs-tab-bar-fill-text-color, black);
    }

    &.line {
      border-bottom: 1px solid var(--fpui-tabs-tab-bar-line-border-color, gray);
    }
	}
</style>
