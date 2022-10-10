<script>
	import { getContext } from "svelte";
	import { TABS_KEY } from "./TabsContainer.svelte";

	const panel = {};
	const { registerPanel, selectedPanel } = getContext(TABS_KEY);

	registerPanel(panel);
</script>

{#if $selectedPanel === panel}
	<slot></slot>
{/if}
