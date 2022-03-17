<script lang="ts">
  export let label;
  export let forVal;
</script>


{#if label && forVal}
  <div class="fpcl-label-container">
    <label for={forVal} class="fpcl-label">{label}</label>
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
