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

<style lang="scss">
  @import "src/assets/styles/_variables.scss";

  // The PopupModal (background)
  #popup-modal {
    position: fixed; // Stay in place
    z-index: 100; // Sit on top
    left: 0;
    top: 0;
    width: 100%; // Full width
    height: 100%; // Full height
    overflow: auto; // Enable scroll if needed
    background-color: rgb(0,0,0); // Fallback color
    background-color: rgba(0,0,0,0.4); // Black w/ opacity
  }

  // PopupModal Content/Box
  #popup-modal-content {    
    position: relative;
    background-color: white;
    margin: 50px auto; // 50px from the top.
    padding: 0;
    border-radius: $radius;
    width: 75%; // Could be more or less, depending on screen size
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    animation-name: animatetop;
    animation-duration: 0.4s;

    // PopupModal Header
    #popup-modal-header {
      padding: 2px 20px;
      border-radius: $radius $radius 0 0;
      background-color: $kemper-red;
      color: white;

      // The Close Button
      #close {
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

    // PopupModal Body
    #popup-modal-body {
      padding: 20px;
    }
  }

  // Add Animation
  @keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
  }
</style>
