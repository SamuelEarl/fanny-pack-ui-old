<script>import { setContext } from "svelte";
export let tabStyle = "line";
export let marginBottom = "var(--tabs-default-tab-bar-margin-bottom)";
setContext("tabStyle", tabStyle);
</script>

<div 
  class={`fp-tabs-tab-bar ${tabStyle}`} 
  style={`margin-bottom:${marginBottom};`}>
	<slot></slot>
</div>

<style>
  @media (min-width: 0px) {
    .fp-tabs-tab-bar {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }

      .fp-tabs-tab-bar.fill {
        border: var(--border-default);
        border-radius: var(--border-radius);
        overflow: hidden;
        background-color: var(--bg-color-element-default);
        color: var(--text-color-default);
      }

        .fp-tabs-tab-bar.fill:hover {
          -webkit-box-shadow: 0 0 0 1px var(--border-color-default);
                  box-shadow: 0 0 0 1px var(--border-color-default);;
        }

      .fp-tabs-tab-bar.line {
        border-bottom: var(--border-default);
      }

        .fp-tabs-tab-bar.line:hover {
          -webkit-box-shadow: 0 1px 0 0 var(--border-color-default);
                  box-shadow: 0 1px 0 0 var(--border-color-default);
        }
  }</style>
