<script lang="ts">
  import { setContext } from "svelte";
  import { defaults } from "src/defaults";
  import { marginBottomSizes } from "../fp-styles";

  export let tabStyle = defaults.tabsTabStyle;
  export let marginBottom = defaults.tabsTabBarMarginBottom;

  const marginBottomStyle = marginBottomSizes[marginBottom];

  setContext("tabStyle", tabStyle);
</script>

<div 
  class={`fp-tabs-tab-bar ${tabStyle}`} 
  style={`${marginBottomStyle}`}>
	<slot></slot>
</div>

<style>
  @media (--xs-up) {
    .fp-tabs-tab-bar {
      display: flex;

      &.fill {
        border: var(--border-default);
        border-radius: var(--border-radius);
        overflow: hidden;
        background-color: var(--bg-color-element-default);
        color: var(--text-color-default);

        &:hover {
          box-shadow: var(--box-shadow-default);
        }
      }

      &.line {
        border-bottom: var(--border-default);

        &:hover {
          box-shadow: 0 1px 0 0 var(--border-color-default);
        }
      }
    }
  }
</style>
