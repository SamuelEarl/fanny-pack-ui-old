<script lang="ts">
  import { theme } from "/src/theme";

  export let tabStyle = theme.defaultTabStyle;
</script>

<div class={`fpui-tabs-tab-bar ${tabStyle}`}>
	<slot></slot>
</div>


<style>
	.fpui-tabs-tab-bar {
    display: flex;

    &.fill {
      padding: 0 15px;
      border-radius: var(--fpui-tabs-tab-bar-fill-border-radius);
      background-color: var(--fpui-tabs-tab-bar-fill-bg-color);
      color: var(--fpui-tabs-tab-bar-fill-text-color);
    }

    &.line {
      border-bottom: 1px solid var(--fpui-tabs-tab-bar-line-border-color, gray);
    }
	}
</style>
