<script lang="ts">
  import { getContext } from "svelte";
  import { GRID_KEY } from "./grid-utils";

  // Number of columns for each breakpoint.
  export let xs = 0;
  export let sm = 0;
  export let md = 0;
  export let lg = 0;
  export let xl = 0;
  export let xxl = 0;

  let {
    equalColWidths,
    colPaddingY,
    colPaddingX, 
  } = getContext(GRID_KEY);

  const breakpointNames = ["xs", "sm", "md", "lg", "xl", "xxl"];

  // Create the set of classes that the column <div> element will have.
  $: columnClasses = [xs, sm, md, lg, xl, xxl]
    .map((numberOfColumns, i) => {
      let breakpoint = breakpointNames[i];

      if (numberOfColumns) {
        return `fpui-${breakpoint}-${numberOfColumns}`;
      }
    })
    .filter(Boolean)
    .join(" ");
</script>

<div 
  class={`fpui-col ${columnClasses}`}
  class:fpui-equal-col-widths={equalColWidths}
  style={`padding: ${colPaddingY}px ${colPaddingX}px`}
>
  <slot />
</div>

<style>
  .fpui-equal-col-widths {
    flex: 1;
  }

  .fpui-col {

    @media (--xs-up) {
      &.fpui-xs-1 {
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fpui-xs-2 {
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fpui-xs-3 {
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fpui-xs-4 {
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fpui-xs-5 {
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fpui-xs-6 {
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fpui-xs-7 {
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fpui-xs-8 {
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fpui-xs-9 {
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fpui-xs-10 {
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fpui-xs-11 {
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fpui-xs-12 {
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }

    @media (--sm-up) {
      &.fpui-sm-1 {
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fpui-sm-2 {
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fpui-sm-3 {
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fpui-sm-4 {
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fpui-sm-5 {
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fpui-sm-6 {
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fpui-sm-7 {
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fpui-sm-8 {
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fpui-sm-9 {
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fpui-sm-10 {
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fpui-sm-11 {
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fpui-sm-12 {
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }

    @media (--md-up) {
      &.fpui-md-1 {
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fpui-md-2 {
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fpui-md-3 {
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fpui-md-4 {
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fpui-md-5 {
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fpui-md-6 {
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fpui-md-7 {
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fpui-md-8 {
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fpui-md-9 {
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fpui-md-10 {
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fpui-md-11 {
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fpui-md-12 {
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }

    @media (--lg-up) {
      &.fpui-lg-1 {
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fpui-lg-2 {
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fpui-lg-3 {
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fpui-lg-4 {
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fpui-lg-5 {
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fpui-lg-6 {
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fpui-lg-7 {
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fpui-lg-8 {
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fpui-lg-9 {
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fpui-lg-10 {
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fpui-lg-11 {
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fpui-lg-12 {
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }

    @media (--xl-up) {
      &.fpui-xl-1 {
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fpui-xl-2 {
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fpui-xl-3 {
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fpui-xl-4 {
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fpui-xl-5 {
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fpui-xl-6 {
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fpui-xl-7 {
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fpui-xl-8 {
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fpui-xl-9 {
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fpui-xl-10 {
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fpui-xl-11 {
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fpui-xl-12 {
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }

    @media (--xxl-up) {
      &.fpui-xxl-1 {
        max-width: 8.33333%;
        flex: 0 0 8.33333%;
      }

      &.fpui-xxl-2 {
        max-width: 16.66666%;
        flex: 0 0 16.66666%;
      }

      &.fpui-xxl-3 {
        max-width: 24.99999%;
        flex: 0 0 24.99999%;
      }

      &.fpui-xxl-4 {
        max-width: 33.33333%;
        flex: 0 0 33.33333%;
      }

      &.fpui-xxl-5 {
        max-width: 41.66666%;
        flex: 0 0 41.66666%;
      }

      &.fpui-xxl-6 {
        max-width: 49.99999%;
        flex: 0 0 49.99999%;
      }

      &.fpui-xxl-7 {
        max-width: 58.33333%;
        flex: 0 0 58.33333%;
      }

      &.fpui-xxl-8 {
        max-width: 66.66666%;
        flex: 0 0 66.66666%;
      }

      &.fpui-xxl-9 {
        max-width: 74.99999%;
        flex: 0 0 74.99999%;
      }

      &.fpui-xxl-10 {
        max-width: 83.33333%;
        flex: 0 0 83.33333%;
      }

      &.fpui-xxl-11 {
        max-width: 91.66666%;
        flex: 0 0 91.66666%;
      }

      &.fpui-xxl-12 {
        max-width: 99.99999%;
        flex: 0 0 99.99999%;
      }
    }
  }
</style>
