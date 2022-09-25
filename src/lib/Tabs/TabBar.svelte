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
      border: 1px solid var(--fpui-tabs-border-color);
      border-radius: var(--border-radius);
      overflow: hidden;
      background-color: var(--fpui-tabs-tab-bar-fill-bg-color);
      color: var(--fpui-tabs-tab-bar-fill-text-color);

      /* &:hover {
        box-shadow: 0 0 0 1px var(--fpui-tabs-border-color, gray);
      } */
    }

    &.line {
      border-bottom: 1px solid var(--fpui-tabs-tab-bar-line-border-color, gray);
    }
	}
</style>
