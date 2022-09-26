<script>
	import { getContext } from "svelte";
	import { TABS_CONTAINER } from "./TabsContainer.svelte";
  import { theme } from "/src/theme";

  export let tabStyle = theme.defaultTabStyle;
	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS_CONTAINER);

	registerTab(tab);
</script>


<div class={`fpui-tabs-tab ${tabStyle}`} class:active="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
	<slot></slot>
</div>


<style>
	.fpui-tabs-tab {
    padding: 10px;
    cursor: pointer;

    &.fill {

      &:hover {
        background-color: var(--fpui-tabs-tab-fill-hover-bg-color, #ccc);
      }
      
      &.active {
        background-color: var(--fpui-tabs-tab-fill-active-bg-color, #ccc);
        color: var(--fpui-tabs-tab-fill-active-text-color, #333);
      }
    }

    &.line {
      margin-bottom: -1px;
      border-bottom: 3px solid transparent;
      color: var(--fpui-tabs-tab-line-text-color, #333);

      &:hover {
        border-color: var(--fpui-tabs-tab-line-hover-border-color, #ccc);
      }

      &.active {
        border-color: var(--fpui-tabs-tab-line-active-border-color, #ccc);
		    color: var(--fpui-tabs-tab-line-active-text-color, #333);
      }
    }
	}
</style>
