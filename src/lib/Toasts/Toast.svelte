<script lang="ts">
  import { toastContent } from "./toast-store";

  export let duration = 7000;

  $: clearToastAfterDuration($toastContent);
  let timeout;

  /**
   * Clear any previous timeouts otherwise you could get inconsistent timers.
   * https://stackoverflow.com/a/1472717/9453009
   */
  function clearToastAfterDuration(unusedParam) {
    // Clear any previous timeouts.
    clearTimeout(timeout);
    // // Set a new timeout.
    // timeout = setTimeout(() => toastContent.set(null), duration);

    // If the user calls `ToastContent.set()` and does not set a custom duration for the toast, then use the default duration that is passed into this component.
    if ($toastContent && !$toastContent.duration) {
      // If the default duration is `Infinity`, then return without clearing the toast. The user will have to close the toast by clicking the "x".
      if (duration === Infinity) {
        return;
      }
      // If the default duration is a number other than Infinity, then clear the toast after the duration has lapsed.
      else {
        // Set a new timeout.
        timeout = setTimeout(() => toastContent.set(null), duration);
      }
    }
    // If the user calls `ToastContent.set()` and sets the duration for the toast to `Infinity`, then return withoug clearing the toast. The user will have to close the toast by clicking the "x".
    else if ($toastContent && $toastContent.duration === Infinity) {
      return;
    }
    // If the user calls `ToastContent.set()` and sets a custom duration for the toast, then use that custom duration before clearing the toast.
    else if ($toastContent) {
      // Set a new timeout.
      timeout = setTimeout(() => toastContent.set(null), $toastContent.duration);
    }
  }
</script>


{#if $toastContent}
  <div id="toast" class={`${$toastContent.type}`}>
    <div class="msg">
      {$toastContent.msg}
    </div>
    <div class="close" on:click={() => {
      clearTimeout(timeout);
      toastContent.set(null);
    }}>&times;</div>
  </div>
{/if}


<style>
  #toast {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    display: flex;
    font-size: var(--fpui-toast-font-size, 1.15rem);
    font-weight: var(--fpui-toast-font-weight, normal);

    &.info {
      background-color: var(--fpui-toast-info-bg-color, #2d89ef); /* blue */
      color: var(--fpui-toast-info-text-color, white);
    }

    &.success {
      background-color: var(--fpui-toast-success-bg-color, #00a300); /* green */
      color: var(--fpui-toast-success-text-color, white);
    }
    
    &.warning {
      background-color: var(--fpui-toast-warning-bg-color, #ffc40d); /* yellow */
      color: var(--fpui-toast-warning-text-color, black);
    }

    &.error {
      background-color: var(--fpui-toast-error-bg-color, #ee1111); /* red */
      color: var(--fpui-toast-error-text-color, white);
    }

    & .msg {
      flex: 1;
      padding: 20px;
    }

    & .close {
      width: 50px;
      font-size: 2rem;
      font-weight: normal;
      display: flex;
      justify-content: center;
      padding-top: 10px;
      cursor: pointer;

      &:hover {
        font-weight: bold;
      }
    }
  }
</style>
