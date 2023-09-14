<script>import { onMount, createEventDispatcher } from "svelte";
import { Button } from "../Buttons";
export let title = "";
export let scrollingBody = false;
export let disabled = false;
export let showCloseButton = true;
export let contentBgColor = "var(--white)";
export let headerFooterBorderColor = "var(--neutral-3)";
const dispatch = createEventDispatcher();
onMount(() => {
    if (scrollingBody) {
        let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        let modalContentContainer = document.getElementById("modal-content-container");
        let modalContentContainerHeight = modalContentContainer.getBoundingClientRect().height;
        let modalBody = document.getElementById("modal-body");
        let modalBodyHeight = modalBody.getBoundingClientRect().height;
        let modalTopAndBottomHeights = modalContentContainerHeight - modalBodyHeight;
        modalBody.style.height = windowHeight - modalTopAndBottomHeights + "px";
        modalBody.style.overflow = "auto";
    }
});
let bodyBorderRadius = "";
if (!title) {
    bodyBorderRadius = "border-radius: var(--border-radius) var(--border-radius) 0 0;";
}
if (!$$slots.modalFooterRight && !$$slots.modalFooterRight) {
    bodyBorderRadius = "border-radius: 0 0 var(--border-radius) var(--border-radius);";
}
if (!title && !$$slots.modalFooterRight && !$$slots.modalFooterRight) {
    bodyBorderRadius = "border-radius: var(--border-radius);";
}
</script>

{#if showCloseButton}
  <div id="close-btn-container">
    <Button
      id="close"
      btnIcon="ic:baseline-close"
      bgColor="transparent"
      borderColor="transparent"
      textColor="white"
      padding="10px"
      fontSize="xl"
      {disabled}
      on:click={() => dispatch("closeModal")}
    ></Button>
  </div>
{/if}

<div id="modal">
  <div id="modal-content-container" class="fp-animatetop">
    <div id="modal-content" style={`background-color: ${contentBgColor};`}>
      {#if title}
        <header id="modal-header" style={`border-color: ${headerFooterBorderColor}`}>{title}</header>      
      {/if}
      <!-- If the header and footer are excluded, then set a rounded border-radius on the `modal-body`. -->
      <div id="modal-body" style={`${bodyBorderRadius}`}>
        <slot name="modalBody"></slot>
      </div>
      {#if $$slots.modalFooterLeft || $$slots.modalFooterRight}
        <footer id="modal-footer" style={`border-color: ${headerFooterBorderColor}`}>
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
  @media (min-width: 0px) {
    #close-btn-container {
      position: fixed;
      top: 0px;
      right: 0px;
      z-index: 1000;
      border-radius: var(--border-radius);
      background-color: rgba(0, 0, 0, 0.4);
    }

    /* The Modal (background) */
    #modal {
      position: fixed; /* Stay in place */
      z-index: 100; /* Sit on top */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex; /* This will center the #modal-content-container vertically */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

      #modal #modal-content-container {
        position: relative;
        width: 100%;
        padding: 10px;
        margin: auto;
      }

        #modal #modal-content-container #modal-header {
          padding: 20px;
          border-bottom: var(--border-default);
          border-radius: var(--border-radius) var(--border-radius) 0 0;
          font-size: var(--font-size-xl);
          font-weight: bold;
        }

        #modal #modal-content-container #modal-content {
          width: 100%;
          /* The `border-radius` style will prevent any `modal-content` background styles from spilling outside of the `modal-body`. */
          border-radius: var(--border-radius);
          -webkit-box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
                  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
        }

          #modal #modal-content-container #modal-content #modal-footer {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
                -ms-flex-direction: column;
                    flex-direction: column;
            padding: 10px 20px;
            border-top: var(--border-default);
            border-radius: 0 0 var(--border-radius) var(--border-radius);
          }

              /* The following :global(div) and :global(button) are for elements that are inserted into the `modalFooterLeft` and `modalFooterRight` slots */
              #modal #modal-content-container #modal-content #modal-footer #modal-footer-left :global(div), #modal #modal-content-container #modal-content #modal-footer #modal-footer-right :global(div) {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                    -ms-flex-direction: column;
                        flex-direction: column;
              }

                #modal #modal-content-container #modal-content #modal-footer #modal-footer-left :global(div) :global(button), #modal #modal-content-container #modal-content #modal-footer #modal-footer-right :global(div) :global(button) {
                  margin-bottom: 10px;
                }
  }

  /* @media lg */
  @media (min-width: 1024px) {

      #modal #modal-content-container {
        width: 950px;
      }

          #modal #modal-content-container #modal-content #modal-footer {
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
                -ms-flex-direction: row;
                    flex-direction: row;
            -webkit-box-pack: space-beteen;
                -ms-flex-pack: space-beteen;
                    justify-content: space-beteen;
          }

              /* The following :global(div) and :global(button) are for elements that are inserted into the `modalFooterLeft` and `modalFooterRight` slots */
              #modal #modal-content-container #modal-content #modal-footer #modal-footer-left :global(div), #modal #modal-content-container #modal-content #modal-footer #modal-footer-right :global(div) {
                -webkit-box-orient: horizontal;
                -webkit-box-direction: normal;
                    -ms-flex-direction: row;
                        flex-direction: row;
              }

                #modal #modal-content-container #modal-content #modal-footer #modal-footer-left :global(div) :global(button), #modal #modal-content-container #modal-content #modal-footer #modal-footer-right :global(div) :global(button) {
                  margin: 0;
                  margin-right: 10px;
                }

                #modal #modal-content-container #modal-content #modal-footer #modal-footer-left :global(div) :global(button:last-child), #modal #modal-content-container #modal-content #modal-footer #modal-footer-right :global(div) :global(button:last-child) {
                  margin-right: 0;
                }

            #modal #modal-content-container #modal-content #modal-footer #modal-footer-left {
              /* Push the #modal-footer-right content to the right. */
              -webkit-box-flex: 1;
                  -ms-flex: auto;
                      flex: auto;
            }

              #modal #modal-content-container #modal-content #modal-footer #modal-footer-left :global(div) {
                -webkit-box-pack: start;
                    -ms-flex-pack: start;
                        justify-content: flex-start;
              }

              #modal #modal-content-container #modal-content #modal-footer #modal-footer-right :global(div) {
                -webkit-box-pack: end;
                    -ms-flex-pack: end;
                        justify-content: flex-end;
              }
  }</style>
