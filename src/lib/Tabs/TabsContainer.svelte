<script context="module">
  export let TABS_CONTAINER = {};
</script>


<script>
	import { setContext, onDestroy } from "svelte";
	import { writable } from "svelte/store";

  export let border = false;
  export let padding = "md";

	const tabsContainer = [];
	const panels = [];
	const selectedTab = writable(null);
	const selectedPanel = writable(null);

	setContext(TABS_CONTAINER, {
		registerTab: tab => {
			tabsContainer.push(tab);
			selectedTab.update(current => current || tab);
			
			onDestroy(() => {
				const i = tabsContainer.indexOf(tab);
				tabsContainer.splice(i, 1);
				selectedTab.update(current => current === tab ? (tabsContainer[i] || tabsContainer[tabsContainer.length - 1]) : current);
			});
		},

		registerPanel: panel => {
			panels.push(panel);
			selectedPanel.update(current => current || panel);
			
			onDestroy(() => {
				const i = panels.indexOf(panel);
				panels.splice(i, 1);
				selectedPanel.update(current => current === panel ? (panels[i] || panels[panels.length - 1]) : current);
			});
		},

		selectTab: tab => {
			const i = tabsContainer.indexOf(tab);
			selectedTab.set(tab);
			selectedPanel.set(panels[i]);
		},

		selectedTab,
		selectedPanel
	});
</script>


<!-- If `border` is true, then add the padding value that is passed as a prop. -->
<div class={`fpui-tabs-container ${border ? padding : ""}`} class:border>
	<slot></slot>
</div>


<style>
  .fpui-tabs-container {

    &.border {
      border: 1px solid var(--border-color);
      border-radius: var(--fpui-tabs-border-radius);
    }

    &.sm {
      padding: var(--padding-sm, 5px);
    }
    &.md {
      padding: var(--padding-sm, 10px);
    }
    &.lg {
      padding: var(--padding-sm, 15px);
    }
  }
</style>
