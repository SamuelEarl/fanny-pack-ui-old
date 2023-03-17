<script context="module">
  export let TABS_KEY = Symbol();
</script>

<script>
	import { setContext, onDestroy } from "svelte";
	import { writable } from "svelte/store";
  import { paddingSizes, fontSizes } from "../styles";

  export let border = true;
  export let borderPadding = "md";
  export let tabPadding = "sm";
  export let panelPadding = "";
  export let tabFontSize = "sm";

	const tabsContainer = [];
	const panels = [];
	const selectedTab = writable(null);
	const selectedPanel = writable(null);

  const borderPaddingStyle = paddingSizes[borderPadding];
  const tabPaddingStyle = paddingSizes[tabPadding];
  const panelPaddingStyle = paddingSizes[panelPadding];
  const tabFontSizeStyle = fontSizes[tabFontSize];

	setContext(TABS_KEY, {
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
		selectedPanel,
    tabPaddingStyle,
    panelPaddingStyle,
    tabFontSizeStyle,
	});
</script>

<!-- If `border` is true, then include the border styles. -->
<div
  style={`${border ? "border: var(--border-default); border-radius: var(--border-radius);" : ""} ${borderPaddingStyle}`}
>
	<slot></slot>
</div>
