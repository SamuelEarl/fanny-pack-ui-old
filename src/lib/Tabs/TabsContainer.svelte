<script context="module">
  export let TABS_CONTAINER = {};
</script>


<script>
	import { setContext, onDestroy } from "svelte";
	import { writable } from "svelte/store";

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


<div class="tabs-container">
	<slot></slot>
</div>
