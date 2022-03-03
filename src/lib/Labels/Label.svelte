<script lang="ts">
  export let label;
  export let forId;
</script>


{#if label && forId}
  <div class="fpcl-label-container">
    <label for={forId} class="fpcl-label">{label}</label>
  </div>
{/if}


<style>
  .fpcl-label-container {
    margin-bottom: var(--fpcl-label-margin-bottom);

    & .fpcl-label {
      font-size: var(--fpcl-label-font-size);
      color: var(--fpcl-label-text-color);
    }
  }
</style>
