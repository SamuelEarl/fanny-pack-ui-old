<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Tooltip } from "../Tooltips";
  import { theme } from "/src/theme";

  export let label;
  export let forVal;
  export let labelAlign = "left";
  export let tooltipIcon = theme.labelTooltipIcon;
  export let tooltipText = "";
</script>


{#if label && forVal}
  <div
    class={`fpui-label-container ${labelAlign}`}
    style={`margin-bottom: ${theme.labelMarginBottom}`}
  >
    <label 
      for={forVal}
      style={`font-size: ${theme.labelFontSize}`}
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
  .fpui-label-container {

    &.left {
      text-align: left;
    }
    &.right {
      text-align: right;
    }
  }
</style>
