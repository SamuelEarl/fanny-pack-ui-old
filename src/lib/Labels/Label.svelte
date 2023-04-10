<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Tooltip } from "../Tooltips";
  import { defaults } from "/src/defaults";

  export let label;
  export let forVal;
  export let labelAlign = "left";
  export let tooltipIcon = defaults.labelTooltipIcon;
  export let tooltipText = "";
</script>


{#if label && forVal}
  <div
    class={`fp-label-container ${labelAlign}`}
    style={`margin-bottom: ${defaults.labelMarginBottom}`}
  >
    <label 
      for={forVal}
      style={`font-size: ${defaults.labelFontSize}`}
    >
      {label}
    </label>
    {#if tooltipText}
      <Tooltip tooltipText={tooltipText}>
        <Icon icon={tooltipIcon} />
      </Tooltip>
    {/if}
  </div>
{/if}


<style>
  .fp-label-container {

    &.left {
      text-align: left;
    }
    &.right {
      text-align: right;
    }
  }
</style>
