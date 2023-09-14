<script>import { getContext } from "svelte";
import { FLEX_GRID_KEY } from "./flex-grid-utils";
export let xs = 0;
export let sm = 0;
export let md = 0;
export let lg = 0;
export let xl = 0;
export let xxl = 0;
let { colGutter, rowGutter, equalColWidths, colPaddingY, colPaddingX } = getContext(FLEX_GRID_KEY);
const breakpointNames = ["xs", "sm", "md", "lg", "xl", "xxl"];
$: columnClasses = [xs, sm, md, lg, xl, xxl].map((numberOfColumns, i) => {
    let breakpoint = breakpointNames[i];
    if (numberOfColumns) {
        return `fp-${breakpoint}-${numberOfColumns}`;
    }
}).filter(Boolean).join(" ");
</script>

<!-- <div 
  class={`fp-flex-col ${columnClasses}`}
  class:fp-equal-col-widths={equalColWidths}
  style={`padding: ${colPaddingY}px ${colPaddingX}px`}
> -->
<div 
  class={`fp-flex-col ${columnClasses}`}
  class:fp-equal-col-widths={equalColWidths}
  style={`padding: 0 ${colGutter / 2}px; margin: ${rowGutter}px 0;`}
>
  <slot />
</div>

<style>
  .fp-equal-col-widths {
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
  }

  @media (min-width: 0px) {
      .fp-flex-col.fp-xs-1 {
        max-width: 8.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 8.33333%;
                flex: 0 0 8.33333%;
      }

      .fp-flex-col.fp-xs-2 {
        max-width: 16.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 16.66666%;
                flex: 0 0 16.66666%;
      }

      .fp-flex-col.fp-xs-3 {
        max-width: 24.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 24.99999%;
                flex: 0 0 24.99999%;
      }

      .fp-flex-col.fp-xs-4 {
        max-width: 33.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 33.33333%;
                flex: 0 0 33.33333%;
      }

      .fp-flex-col.fp-xs-5 {
        max-width: 41.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 41.66666%;
                flex: 0 0 41.66666%;
      }

      .fp-flex-col.fp-xs-6 {
        max-width: 49.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 49.99999%;
                flex: 0 0 49.99999%;
      }

      .fp-flex-col.fp-xs-7 {
        max-width: 58.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 58.33333%;
                flex: 0 0 58.33333%;
      }

      .fp-flex-col.fp-xs-8 {
        max-width: 66.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 66.66666%;
                flex: 0 0 66.66666%;
      }

      .fp-flex-col.fp-xs-9 {
        max-width: 74.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 74.99999%;
                flex: 0 0 74.99999%;
      }

      .fp-flex-col.fp-xs-10 {
        max-width: 83.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 83.33333%;
                flex: 0 0 83.33333%;
      }

      .fp-flex-col.fp-xs-11 {
        max-width: 91.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 91.66666%;
                flex: 0 0 91.66666%;
      }

      .fp-flex-col.fp-xs-12 {
        max-width: 99.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 99.99999%;
                flex: 0 0 99.99999%;
      }
    }

  @media (min-width: 640px) {
      .fp-flex-col.fp-sm-1 {
        max-width: 8.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 8.33333%;
                flex: 0 0 8.33333%;
      }

      .fp-flex-col.fp-sm-2 {
        max-width: 16.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 16.66666%;
                flex: 0 0 16.66666%;
      }

      .fp-flex-col.fp-sm-3 {
        max-width: 24.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 24.99999%;
                flex: 0 0 24.99999%;
      }

      .fp-flex-col.fp-sm-4 {
        max-width: 33.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 33.33333%;
                flex: 0 0 33.33333%;
      }

      .fp-flex-col.fp-sm-5 {
        max-width: 41.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 41.66666%;
                flex: 0 0 41.66666%;
      }

      .fp-flex-col.fp-sm-6 {
        max-width: 49.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 49.99999%;
                flex: 0 0 49.99999%;
      }

      .fp-flex-col.fp-sm-7 {
        max-width: 58.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 58.33333%;
                flex: 0 0 58.33333%;
      }

      .fp-flex-col.fp-sm-8 {
        max-width: 66.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 66.66666%;
                flex: 0 0 66.66666%;
      }

      .fp-flex-col.fp-sm-9 {
        max-width: 74.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 74.99999%;
                flex: 0 0 74.99999%;
      }

      .fp-flex-col.fp-sm-10 {
        max-width: 83.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 83.33333%;
                flex: 0 0 83.33333%;
      }

      .fp-flex-col.fp-sm-11 {
        max-width: 91.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 91.66666%;
                flex: 0 0 91.66666%;
      }

      .fp-flex-col.fp-sm-12 {
        max-width: 99.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 99.99999%;
                flex: 0 0 99.99999%;
      }
    }

  @media (min-width: 768px) {
      .fp-flex-col.fp-md-1 {
        max-width: 8.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 8.33333%;
                flex: 0 0 8.33333%;
      }

      .fp-flex-col.fp-md-2 {
        max-width: 16.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 16.66666%;
                flex: 0 0 16.66666%;
      }

      .fp-flex-col.fp-md-3 {
        max-width: 24.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 24.99999%;
                flex: 0 0 24.99999%;
      }

      .fp-flex-col.fp-md-4 {
        max-width: 33.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 33.33333%;
                flex: 0 0 33.33333%;
      }

      .fp-flex-col.fp-md-5 {
        max-width: 41.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 41.66666%;
                flex: 0 0 41.66666%;
      }

      .fp-flex-col.fp-md-6 {
        max-width: 49.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 49.99999%;
                flex: 0 0 49.99999%;
      }

      .fp-flex-col.fp-md-7 {
        max-width: 58.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 58.33333%;
                flex: 0 0 58.33333%;
      }

      .fp-flex-col.fp-md-8 {
        max-width: 66.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 66.66666%;
                flex: 0 0 66.66666%;
      }

      .fp-flex-col.fp-md-9 {
        max-width: 74.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 74.99999%;
                flex: 0 0 74.99999%;
      }

      .fp-flex-col.fp-md-10 {
        max-width: 83.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 83.33333%;
                flex: 0 0 83.33333%;
      }

      .fp-flex-col.fp-md-11 {
        max-width: 91.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 91.66666%;
                flex: 0 0 91.66666%;
      }

      .fp-flex-col.fp-md-12 {
        max-width: 99.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 99.99999%;
                flex: 0 0 99.99999%;
      }
    }

  @media (min-width: 1024px) {
      .fp-flex-col.fp-lg-1 {
        max-width: 8.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 8.33333%;
                flex: 0 0 8.33333%;
      }

      .fp-flex-col.fp-lg-2 {
        max-width: 16.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 16.66666%;
                flex: 0 0 16.66666%;
      }

      .fp-flex-col.fp-lg-3 {
        max-width: 24.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 24.99999%;
                flex: 0 0 24.99999%;
      }

      .fp-flex-col.fp-lg-4 {
        max-width: 33.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 33.33333%;
                flex: 0 0 33.33333%;
      }

      .fp-flex-col.fp-lg-5 {
        max-width: 41.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 41.66666%;
                flex: 0 0 41.66666%;
      }

      .fp-flex-col.fp-lg-6 {
        max-width: 49.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 49.99999%;
                flex: 0 0 49.99999%;
      }

      .fp-flex-col.fp-lg-7 {
        max-width: 58.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 58.33333%;
                flex: 0 0 58.33333%;
      }

      .fp-flex-col.fp-lg-8 {
        max-width: 66.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 66.66666%;
                flex: 0 0 66.66666%;
      }

      .fp-flex-col.fp-lg-9 {
        max-width: 74.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 74.99999%;
                flex: 0 0 74.99999%;
      }

      .fp-flex-col.fp-lg-10 {
        max-width: 83.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 83.33333%;
                flex: 0 0 83.33333%;
      }

      .fp-flex-col.fp-lg-11 {
        max-width: 91.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 91.66666%;
                flex: 0 0 91.66666%;
      }

      .fp-flex-col.fp-lg-12 {
        max-width: 99.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 99.99999%;
                flex: 0 0 99.99999%;
      }
    }

  @media (min-width: 1280px) {
      .fp-flex-col.fp-xl-1 {
        max-width: 8.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 8.33333%;
                flex: 0 0 8.33333%;
      }

      .fp-flex-col.fp-xl-2 {
        max-width: 16.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 16.66666%;
                flex: 0 0 16.66666%;
      }

      .fp-flex-col.fp-xl-3 {
        max-width: 24.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 24.99999%;
                flex: 0 0 24.99999%;
      }

      .fp-flex-col.fp-xl-4 {
        max-width: 33.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 33.33333%;
                flex: 0 0 33.33333%;
      }

      .fp-flex-col.fp-xl-5 {
        max-width: 41.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 41.66666%;
                flex: 0 0 41.66666%;
      }

      .fp-flex-col.fp-xl-6 {
        max-width: 49.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 49.99999%;
                flex: 0 0 49.99999%;
      }

      .fp-flex-col.fp-xl-7 {
        max-width: 58.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 58.33333%;
                flex: 0 0 58.33333%;
      }

      .fp-flex-col.fp-xl-8 {
        max-width: 66.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 66.66666%;
                flex: 0 0 66.66666%;
      }

      .fp-flex-col.fp-xl-9 {
        max-width: 74.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 74.99999%;
                flex: 0 0 74.99999%;
      }

      .fp-flex-col.fp-xl-10 {
        max-width: 83.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 83.33333%;
                flex: 0 0 83.33333%;
      }

      .fp-flex-col.fp-xl-11 {
        max-width: 91.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 91.66666%;
                flex: 0 0 91.66666%;
      }

      .fp-flex-col.fp-xl-12 {
        max-width: 99.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 99.99999%;
                flex: 0 0 99.99999%;
      }
    }

  @media (min-width: 1536px) {
      .fp-flex-col.fp-xxl-1 {
        max-width: 8.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 8.33333%;
                flex: 0 0 8.33333%;
      }

      .fp-flex-col.fp-xxl-2 {
        max-width: 16.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 16.66666%;
                flex: 0 0 16.66666%;
      }

      .fp-flex-col.fp-xxl-3 {
        max-width: 24.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 24.99999%;
                flex: 0 0 24.99999%;
      }

      .fp-flex-col.fp-xxl-4 {
        max-width: 33.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 33.33333%;
                flex: 0 0 33.33333%;
      }

      .fp-flex-col.fp-xxl-5 {
        max-width: 41.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 41.66666%;
                flex: 0 0 41.66666%;
      }

      .fp-flex-col.fp-xxl-6 {
        max-width: 49.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 49.99999%;
                flex: 0 0 49.99999%;
      }

      .fp-flex-col.fp-xxl-7 {
        max-width: 58.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 58.33333%;
                flex: 0 0 58.33333%;
      }

      .fp-flex-col.fp-xxl-8 {
        max-width: 66.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 66.66666%;
                flex: 0 0 66.66666%;
      }

      .fp-flex-col.fp-xxl-9 {
        max-width: 74.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 74.99999%;
                flex: 0 0 74.99999%;
      }

      .fp-flex-col.fp-xxl-10 {
        max-width: 83.33333%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 83.33333%;
                flex: 0 0 83.33333%;
      }

      .fp-flex-col.fp-xxl-11 {
        max-width: 91.66666%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 91.66666%;
                flex: 0 0 91.66666%;
      }

      .fp-flex-col.fp-xxl-12 {
        max-width: 99.99999%;
        -webkit-box-flex: 0;
            -ms-flex: 0 0 99.99999%;
                flex: 0 0 99.99999%;
      }
    }</style>
