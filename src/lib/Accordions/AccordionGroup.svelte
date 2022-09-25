<script lang="ts">
  export let padding = "md";
</script>


<div class={`fpui-accordion-group ${padding}`}>
  <slot></slot>
</div>


<style>
  .fpui-accordion-group {
    border: 1px solid var(--fpui-accordion-border-color);
    border-radius: var(--border-radius);

    &.sm {
      padding: var(--padding-sm, 5px);
    }
    &.md {
      padding: var(--padding-sm, 10px);
    }
    &.lg {
      padding: var(--padding-sm, 15px);
    }
  }
</style>
