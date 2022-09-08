<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let title;
  export let activeTab = false;

  const dispatch = createEventDispatcher();
</script>

<div class="fpui-tabs-tab" class:active={activeTab} on:click={() => dispatch("setActiveTab", title)}>{title}</div>

<style>
  .fpui-tabs-tab {
    padding: 10px 15px 15px 15px;
    cursor: pointer;

    &.active {
      border-radius: var(--border-radius) var(--border-radius) 0 0;
      background-color: var(--white);
      color: var(--secondary-color);
    }
  }
</style>
