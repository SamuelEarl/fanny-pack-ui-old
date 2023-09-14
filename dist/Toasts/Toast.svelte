<script>import { toastContent } from "./toast-store";
export let duration = 7e3;
export let fontSize = "1.15rem";
$: clearToastAfterDuration($toastContent);
let timeout;
function clearToastAfterDuration(unusedParam) {
    clearTimeout(timeout);
    if ($toastContent && !$toastContent.duration) {
        if (duration === Infinity) {
            return;
        }
        else {
            timeout = setTimeout(() => toastContent.set(null), duration);
        }
    }
    else if ($toastContent && $toastContent.duration === Infinity) {
        return;
    }
    else if ($toastContent) {
        timeout = setTimeout(() => toastContent.set(null), $toastContent.duration);
    }
}
</script>


{#if $toastContent}
  <div 
    id="toast" 
    class={`${$toastContent.type}`}
    style={`font-size: ${fontSize};`}
  >
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }#toast.info {
      background-color: var(--info-color);  
      color: var(--text-color-for-info-bg);
    }#toast.success {
      background-color: var(--success-color);
      color: var(--text-color-for-success-bg);
    }#toast.warning {
      background-color: var(--warning-color);
      color: var(--text-color-for-warning-bg);
    }#toast.error {
      background-color: var(--error-color);
      color: var(--text-color-for-error-bg);
    }#toast .msg {
      -webkit-box-flex: 1;
          -ms-flex: 1;
              flex: 1;
      padding: 20px;
    }#toast .close {
      width: 50px;
      font-size: 2rem;
      font-weight: normal;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      padding-top: 10px;
      cursor: pointer;
    }#toast .close:hover {
        font-weight: bold;
      }</style>
