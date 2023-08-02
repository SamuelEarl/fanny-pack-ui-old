<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Tooltip } from "../Tooltips";
  import { env } from "$env/dynamic/public";

  export let label;
  export let forVal;
  export let id = "";
  export let labelAlign = "left";
  export let tooltipIcon = env.PUBLIC_FP_LABEL_TOOLTIP_ICON;
  export let tooltipText = "";
</script>


{#if label && forVal}
  <div
    class={`fp-label-container ${labelAlign}`}
    style={`margin-bottom: ${env.PUBLIC_FP_LABEL_MARGIN_BOTTOM}`}
  >
    <label 
      for={forVal}
      {id}
      style={`font-size: ${env.PUBLIC_FP_LABEL_FONT_SIZE}`}
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
