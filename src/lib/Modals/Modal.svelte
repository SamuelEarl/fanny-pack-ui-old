<!-- 
  Example Usage:

  <Modal>
    <h3 slot="modalTitle">Edit Image</h3>
    <button slot="modalHeaderCloseBtn" class="btn" on:click={handleCloseImageEditModal} disabled={savingEdits}>&times;</button>
    <div slot="modalBody">
      <div>Modal body text goes here...</div>
    </div>
    <div slot="modalFooterLeft">
      {#if savingEdits}
        <button class="btn md" disabled>
          <Icon icon="bi:gear-wide-connected" class="icon-space-right spin" />
          Saving User Roles...
        </button>
      {:else}
        <button class="btn md primary" on:click={updateUserRoles}>
          <Icon icon="ion:save-sharp" class="icon-space-right" />
          Save User Roles
        </button>
      {/if}
    </div>
  </Modal>

  <script lang="ts">
    /**
     * When the `closeImageEditModal` event gets dispatched it will set `showImageEditModal = false` in the parent component ([chapterId].edit.svelte), which will hide this ImageEditModal component.
     */
    function handleCloseImageEditModal() {
      // If the edits in the modal are being saved, then return early so the user cannot close the modal.
      if (savingEdits) return;

      dispatch("closeImageEditModal");
    }
  </script>

  -------------------------------------------

  NOTE: This note is for documentation purposes in case I want to do something like this with another component.
  
  I could create the header like this:
  
  <header id="modal-header">
    <h3><slot name="modalTitle"></slot></h3>
    <div><button id="close" on:click={() => dispatch("closeModal")}>&times;</button></div>
  </header>

  ...and then when I instantiate the <Modal> component I would simply add an `on:closeModal` listener like this:

  <Modal on:closeModal={handleCloseModal}>

  function handleCloseModal() {
    dispatch("closeModalWindow");
  }

  This would simplify the close button (and its functionality) in the <Modal> component, but I wouldn't be able to disable the close button when edits are being saved. That is why I am passing a close button to the <Modal> components through the `modalHeaderCloseBtn` slot.
-->

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Button } from "../Buttons";

  export let title;
  export let disabled;

  const dispatch = createEventDispatcher();
</script>


<div id="modal">
  <div id="close-btn-container">
    <Button
      id="close"
      btnIcon="la:times"
      size="lg"
      --custom-btn-padding="10px 0"
      --custom-btn-background-color="transparent" 
      --custom-btn-border-width="0"
      --custom-btn-font-size="35px"
      --custom-btn-box-shadow="none"
      --custom-btn-disabled-bg-color="transparent"
      --custom-btn-disabled-text-color="white"
      {disabled}
      on:click={() => dispatch("closeModal")}
    ></Button>
  </div>
  <div id="modal-content">
    {#if title}
      <header id="modal-header">{title}</header>      
    {/if}
    <div id="modal-body">
      <slot name="modalBody"></slot>
    </div>
    {#if $$slots.modalFooterLeft || $$slots.modalFooterRight}
      <footer id="modal-footer">
        <div id="modal-footer-left">
          <slot name="modalFooterLeft"></slot>
        </div>
        <div id="modal-footer-right">
          <slot name="modalFooterRight"></slot>
        </div>
      </footer>
    {/if}
  </div>
</div>


<style>
  /* Add Animation */
  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0
    }
    to {
      top: 0;
      opacity: 1
    }
  }

  /* The Modal (background) */
  #modal {
    position: fixed; /* Stay in place */
    z-index: 100; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

    & #close-btn-container {
      position: relative;
      width: var(--custom-modal-width, 50%);
      margin: auto;
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      animation-name: animatetop;
      animation-duration: 0.4s;
    }

    /* Modal Content/Box */
    & #modal-content {    
      position: relative;
      width: var(--custom-modal-width, 50%); /* Could be more or less, depending on screen size */
      padding: 0;
      margin: auto;
      border-radius: var(--border-radius);
      background-color: white;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
      animation-name: animatetop;
      animation-duration: 0.4s;

      /* Modal Header */
      & #modal-header {
        padding: 20px;
        border-bottom: 1px solid var(--fpui-modal-header-footer-border-color, #c7c7c7);
        border-radius: var(--border-radius, 3px) var(--border-radius, 3px) 0 0;
        background-color: var(--fpui-modal-header-footer-bg-color, #e5e5e5);
        color: var(--fpui-modal-header-footer-text-color, #343434);
        font-size: 1.25rem;
        font-weight: bold;
      }

      /* Modal Body */
      & #modal-body {
        padding: var(--custom-modal-body-padding, 20px);
      }

      /* Modal Footer */
      & #modal-footer {
        display: flex;
        justify-content: space-between;
        padding: 10px 20px;
        border-top: 1px solid var(--fpui-modal-header-footer-border-color, #c7c7c7);
        border-radius: 0 0 var(--border-radius, 3px) var(--border-radius, 3px);
        background-color: var(--fpui-modal-header-footer-bg-color, #e5e5e5);

        & #modal-footer-left, & #modal-footer-right {

          & :global(div) { /* This :global(div) modalFooterLeft and modalFooterRight slots */
            display: flex;

            & :global(button) {
              margin-right: 10px;
            }

            & :global(button:last-child) {
              margin-right: 0;
            }
          }
        }

        & #modal-footer-left {

          & :global(div) {
            justify-content: flex-start;
          }
        }

        & #modal-footer-right {

          & :global(div) {
            justify-content: flex-end;
          }
        }
      }
    }
  }
</style>
