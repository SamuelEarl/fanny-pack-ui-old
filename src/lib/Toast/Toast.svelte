{#if $toastMsg}
  <div id="toast">{$toastMsg}</div>
{/if}

<script>
  import { toastMsg } from "$/stores/user-feedback.js";
</script>

<style lang="scss">
  @import "src/assets/styles/_variables.scss";

  @media #{$xs-up} {
    #toast {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      padding: 15px;
      background-color: $kemper-red;
      color: white;
      z-index: 100;
    }
  }
</style>
