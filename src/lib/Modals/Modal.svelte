<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { Button } from "../Buttons";

  export let title = "";
  export let scrollingBody = false;
  export let disabled;

  const dispatch = createEventDispatcher();

  onMount(() => {
    // If scrollingBody = true, then set a static height for the #modal-body and set its overflow property to "auto" so a scrollbar will appear.
    if (scrollingBody) {
      // Get window height: https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
      let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      // Get the #modal-content-container and its height.
      let modalContentContainer = document.getElementById("modal-content-container");
      let modalContentContainerHeight = modalContentContainer.getBoundingClientRect().height;
      // Get the #modal-body and its height.
      let modalBody = document.getElementById("modal-body");
      let modalBodyHeight = modalBody.getBoundingClientRect().height;
      // Calculate the height of everything in the #modal-content-container except for the #modal-body.
      let modalTopAndBottomHeights = modalContentContainerHeight - modalBodyHeight;
      // Set the #modal-body height to equal the remaining window space after the modalTopAndBottomHeights have been removed from the remaining window space calculation.
      modalBody.style.height = (windowHeight - modalTopAndBottomHeights) + "px";
      // Now that a static height has been set for the #modal-body, set its overflow property to "auto" so a scrollbar will appear.
      modalBody.style.overflow = "auto";
    }
  });
</script>


<div id="modal">
  <div id="modal-content-container">
    <div id="close-btn-container">
      <Button
        id="close"
        btnIcon="la:times"
        size="lg"
        --custom-btn-padding="0"
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

  @media (--xs-up) {

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

      & #modal-content-container {
        position: relative;
        width: 100%;
        padding: 10px;
        padding-top: 0;
        margin: auto;
        animation-name: animatetop;
        animation-duration: 0.5s;
      
        & #close-btn-container {
          width: 100%;
          display: flex;
          justify-content: flex-end;
        }

        /* Modal Content/Box */
        & #modal-content {
          width: 100%;
          /* If the header and footer are excluded and the user provides a --custom-modal-body-border-radius value, then the modal-content's border-radius will match that custom value. This will prevent any of the modal-content's background styles from spilling outside of the modal-body. */
          border-radius: var(--custom-modal-body-border-radius, var(--border-radius, 3px));
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

          /* Modal Header */
          & #modal-header {
            padding: var(--custom-modal-header-padding, 20px);
            border-bottom: 1px solid var(--fpui-modal-header-footer-border-color, #c7c7c7);
            border-radius: var(--border-radius, 3px) var(--border-radius, 3px) 0 0;
            background-color: var(--fpui-modal-header-footer-bg-color, white);
            color: var(--fpui-modal-header-footer-text-color, #343434);
            font-size: 1.25rem;
            font-weight: bold;
          }

          /* Modal Body */
          & #modal-body {
            padding: var(--custom-modal-body-padding, 20px);
            border-radius: var(--custom-modal-body-border-radius, 0px);
            background-color: var(--custom-modal-body-bg-color, var(--fpui-modal-body-bg-color, white));
          }

          /* Modal Footer */
          & #modal-footer {
            display: flex;
            flex-direction: column;
            padding: var(--custom-modal-footer-padding, 10px 20px);
            border-top: 1px solid var(--fpui-modal-header-footer-border-color, #c7c7c7);
            border-radius: 0 0 var(--border-radius, 3px) var(--border-radius, 3px);
            background-color: var(--fpui-modal-header-footer-bg-color, white);

            & #modal-footer-left, & #modal-footer-right {

              & :global(div) { /* This :global(div) modalFooterLeft and modalFooterRight slots */
                display: flex;
                flex-direction: column;

                & :global(button) {
                  margin-bottom: 10px;
                }
              }
            }
          }
        }
      }
    }
  }

  @media (--lg-up) {

    #modal {

      & #modal-content-container {
        width: var(--custom-modal-width-lg-up, 950px);
        /* Remove the left and right padding on large screens. */
        padding-left: 0;
        padding-right: 0;

        & #modal-content {

          /* Modal Footer */
          & #modal-footer {
            flex-direction: row;
            justify-content: space-between;

            & #modal-footer-left, & #modal-footer-right {

              & :global(div) { /* This :global(div) modalFooterLeft and modalFooterRight slots */
                flex-direction: row;

                & :global(button) {
                  margin: 0;
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
    }
  }
</style>
