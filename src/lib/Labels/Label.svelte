<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Tooltip } from "../Tooltips";
  import { theme } from "/src/fpui-theme";

  export let label;
  export let forVal;
  export let labelAlign = "left";
  export let tooltipIcon = theme.labelTooltipIcon;
  export let tooltipText = "";
</script>


{#if label && forVal}
  <div class={`fpui-label-container ${labelAlign}`}>
    <label for={forVal} class="fpui-label">{label}</label>
    {#if tooltipText}
      <Tooltip tooltipText={tooltipText}>
        <Icon icon={tooltipIcon} />
      </Tooltip>
    {/if}
  </div>
{/if}


<style>
  .fpui-label-container {
    margin-bottom: var(--fpui-label-margin-bottom);

    &.left {
      text-align: left;
    }
    &.right {
      text-align: right;
    }

    & .fpui-label {
      font-size: var(--fpui-label-font-size);
      color: var(--fpui-label-text-color);
    }
  }
</style>
