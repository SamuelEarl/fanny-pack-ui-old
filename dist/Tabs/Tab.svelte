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
  class={`fp-tabs-tab ${tabStyle}`}
  class:active="{$selectedTab === tab}"
  style={`${tabPaddingStyle} ${tabFontSizeStyle}`}
  {...$$restProps}
  on:click="{() => selectTab(tab)}"
  on:keyup="{() => selectTab(tab)}"
>
	<slot></slot>
</div>

<style>
  @media (min-width: 0px) {
    .fp-tabs-tab {
      cursor: pointer;
    }

        .fp-tabs-tab.fill:hover {
          background-color: var(--border-color-default);
        }
        
        .fp-tabs-tab.fill.active {
          background-color: var(--border-color-default);
        }

      .fp-tabs-tab.line {
        margin-bottom: -1px;
        border-bottom: 4px solid transparent;
      }

        .fp-tabs-tab.line:hover {
          border-color: var(--border-color-default);
        }

        .fp-tabs-tab.line.active {
          border-color: var(--text-color-default);
        }
  }</style>
