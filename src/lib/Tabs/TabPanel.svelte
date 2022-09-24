<script>
	import { getContext } from "svelte";
	import { TABS_CONTAINER } from "./TabsContainer.svelte";

	const panel = {};
	const { registerPanel, selectedPanel } = getContext(TABS_CONTAINER);

	registerPanel(panel);
</script>

{#if $selectedPanel === panel}
	<slot></slot>
{/if}
