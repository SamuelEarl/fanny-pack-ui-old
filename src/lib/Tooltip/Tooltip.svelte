<script lang="ts">
  import { tick } from "svelte";
  import tooltip from "./tooltip";

  // export let content = "";
  export let tip = "";

  let tipElement;

  /**
   * This function will set the tip container width and position so it is visible no matter where the tooltip is located on the screen.
   */
  async function setTipElement() {
    // Get window height: https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
    let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    await tick();
    let tipContainer = tipElement.getBoundingClientRect();
    console.log("tipContainer:", tipContainer);
    // Set marginLeft = half the width of the tip-text container (and make the final number negative).
    tipElement.style.marginLeft = (tipContainer.width / -2) + "px";
    // If the top of tipContainer displays above the top of the screen, then make it display below the tooltip.
    if (tipContainer.top < 0) {
      // Remove the "above" class first to prevent conflicts.
      tipElement.classList.remove("above");
      tipElement.classList.add("below");
    }
    // Else make it display above the tooltip.
    else {
      // Remove the "below" class first to prevent conflicts.
      tipElement.classList.remove("below");
      tipElement.classList.add("above");
    }
  }
</script>


<span use:tooltip={{ content: tip }}>
  <slot />
</span>

<!-- <span class="tooltip" on:mouseenter={setTipElement}>
  <span class="tip-text" bind:this={tipElement}>{tip}</span>
  <slot />
</span> -->


<style>
  /* This will preserve any line breaks in the Tippy content. */
  :global(.tippy-content) {
    white-space: pre-line;
  }

  /* How To Create Tooltips: https://www.w3schools.com/howto/howto_css_tooltip.asp */

  /* Tooltip container */
  .tooltip {
    position: relative;
    display: inline-block;

    /* Tooltip text */
    & .tip-text {
      visibility: hidden;
      max-width: 500px;
      background-color: var(--fpcl-tooltip-bg-color);
      color: var(--fpcl-tooltip-text-color);
      text-align: center;
      padding: 10px;
      border-radius: var(--fpcl-tooltip-border-radius);
      font-size: 0.8rem;
      white-space: pre-line; /* This will preserve any line breaks that are created with `\n`. */
      /* Position the tooltip text */
      position: absolute;
      /* bottom: 125%; */
      left: 50%;
      margin-left: -250px; /* This will get set in the `setTipElement()` function. */
      z-index: 1;
      /* Fade in tooltip */
      opacity: 0;
      transition: opacity 0.3s;

      /* Tooltip arrow */
      &::after {
        content: "";
        position: absolute;
        /* top: 100%; */
        left: 50%;
        margin-left: -5px;
        border: 5px solid;
        /* border-color: var(--fpcl-tooltip-bg-color) transparent transparent transparent; */
      }

      &:global(.above) {
        bottom: 125%;

        &:global(::after) {
          top: 100%;
          border-color: var(--fpcl-tooltip-bg-color) transparent transparent transparent;
        }
      }

      &:global(.below) {
        top: 125%;

        &:global(.below::after) {
          bottom: 0%;
          border-color: var(--fpcl-tooltip-bg-color) transparent transparent transparent;
        }
      }
    }
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tip-text {
    visibility: visible;
    opacity: 1;
  }
</style>
