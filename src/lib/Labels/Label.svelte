<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Tooltip } from "../Tooltips";
  import { theme } from "/src/fpcl-theme";

  export let label;
  export let forVal;
  export let labelAlign = "left";
  export let tooltipIcon = theme.labelTooltipIcon;
  export let tooltipText = "";
</script>


{#if label && forVal}
  <div class={`fpcl-label-container ${labelAlign}`}>
    <label for={forVal} class="fpcl-label">{label}</label>
    {#if tooltipText}
      <Tooltip tip={tooltipText}>
        <Icon icon={tooltipIcon} />
      </Tooltip>
    {/if}
  </div>
{/if}


<style>
  .fpcl-label-container {
    margin-bottom: var(--fpcl-label-margin-bottom);

    &.left {
      text-align: left;
    }
    &.right {
      text-align: right;
    }

    & .fpcl-label {
      font-size: var(--fpcl-label-font-size);
      color: var(--fpcl-label-text-color);
    }
  }
</style>
