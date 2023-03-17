<script>
	import { getContext } from "svelte";
	import { TABS_KEY } from "./TabsContainer.svelte";

	const tab = {};
	const {
    registerTab, 
    selectTab, 
    selectedTab, 
    tabPaddingStyle, 
    tabFontSizeStyle 
  } = getContext(TABS_KEY);
  let tabStyle = getContext("tabStyle");

	registerTab(tab);
</script>

<div
  class={`fpui-tabs-tab ${tabStyle}`}
  class:active="{$selectedTab === tab}"
  style={`${tabPaddingStyle} ${tabFontSizeStyle}`}
  on:click="{() => selectTab(tab)}"
  on:keyup="{() => selectTab(tab)}"
>
	<slot></slot>
</div>

<style>
  @media (--xs-up) {
    .fpui-tabs-tab {
      cursor: pointer;

      &.fill {

        &:hover {
          background-color: var(--border-color-default);
        }
        
        &.active {
          background-color: var(--border-color-default);
        }
      }

      &.line {
        margin-bottom: -1px;
        border-bottom: 3px solid transparent;

        &:hover {
          border-color: var(--border-color-default);
        }

        &.active {
          border-color: var(--text-color-default);
        }
      }
    }
  }
</style>
