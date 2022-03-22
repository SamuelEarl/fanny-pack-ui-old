<script lang="ts">
  import tooltip from "./tooltip";

  export let tip = "";
</script>

<span class="tooltip-wrapper" use:tooltip={{ content: tip }}>
  <slot />
</span>


<style>
  .tooltip-wrapper {
    display: inline-block;
  }

  /* Theme the Tippy elements: https://atomiks.github.io/tippyjs/v6/themes/#tippy-elements */
  :global(.tippy-content) {
    padding: 10px;
    border-radius: var(--fpcl-tooltip-border-radius);
    background-color: var(--fpcl-tooltip-bg-color);
    color: var(--fpcl-tooltip-text-color);
    /* This will preserve any line breaks in the Tippy content. */
    white-space: pre-line;
  }
</style>
