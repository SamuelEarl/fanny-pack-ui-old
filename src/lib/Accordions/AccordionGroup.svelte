<script lang="ts">
  export let padding = "md";
</script>


<div class={`fpui-accordion-group ${padding}`}>
  <slot></slot>
</div>


<style>
  .fpui-accordion-group {
    border: 1px solid var(--fpui-accordion-btn-bg-color);
    border-radius: var(--border-radius);

    &.sm {
      padding: 5px;
    }
    &.md {
      padding: 10px;
    }
    &.lg {
      padding: 15px;
    }
  }
</style>
