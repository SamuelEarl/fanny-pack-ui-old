<script lang="ts">
  let activeTab;
</script>

<div class="fpui-tabs-tab-bar">
  <slot prop={activeTab}></slot>
</div>

<style>
  .fpui-tabs-tab-bar {
    display: flex;
    border: 10px solid var(--secondary-color);
    border-bottom: none;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    background-color: var(--secondary-color);
    color: var(--white);
  }
</style>
