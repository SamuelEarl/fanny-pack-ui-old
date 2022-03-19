<div id="popup-modal">
  <div id="popup-modal-content">
    <div id="popup-modal-header">
      <span id="close" on:click={() => dispatch("closePopupModal")}>&times;</span>
      <h3><slot name="popup-modal-header"></slot></h3>
    </div>
    <div id="popup-modal-body">
      <slot name="popup-modal-body"></slot>
    </div>
  </div>
</div>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  /* The PopupModal (background) */
  #popup-modal {
    /* Stay in place */
    position: fixed;
    /* Sit on top */
    z-index: 100;
    left: 0;
    top: 0;
    /* Full width */
    width: 100%;
    /* Full height */
    height: 100%;
    /* Enable scroll if needed */
    overflow: auto;
    /* Fallback color */
    background-color: rgb(0,0,0);
    /* Black w/ opacity */
    background-color: rgba(0,0,0,0.4);
  }

  /* PopupModal Content/Box */
  #popup-modal-content {    
    position: relative;
    background-color: white;
    /* 50px from the top. */
    margin: 50px auto;
    padding: 0;
    border-radius: var(--fpcl-border-radius);
    /* Could be more or less, depending on screen size */
    width: 75%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    animation-name: animatetop;
    animation-duration: 0.4s;

    /* PopupModal Header */
    & #popup-modal-header {
      padding: 2px 20px;
      border-radius: var(--fpcl-border-radius) var(--fpcl-border-radius) 0 0;
      background-color: var(--fpcl-primary);
      color: white;

      /* The Close Button */
      & #close {
        float: right;
        font-size: 30px;
        font-weight: bold;
        color: white;

        &:hover {
          color: black;
          cursor: pointer;
        }
      }
    }

    /* PopupModal Body */
    & #popup-modal-body {
      padding: 20px;
    }
  }

  /* Add Animation */
  @keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
  }
</style>
