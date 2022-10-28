<script lang="ts">
  import { Grid, Row, Col } from "/src/lib";
</script>

# Grid (layout)

Why shoud I consider using a grid component instead of applying CSS Flexbox or Grid styles to my pages? You can certainly use CSS Flexbox or Grid styles to layout elements and components on a page and that will work nicely with small projects. However, when you are working on large projects that have multiple developers, standardization becomes very important when you want to maintain a consistent look and feel from one page to another and when you are concerned about maintenance. If you use Flexbox or CSS Grid, it can become very difficult to standardize on how to layout pages that have might have a 1-column layout vs a multiple-column layout. Some developers might prefer using Flexbox, while others might prefer CSS Grid. Some might be old school and prefer floats. With each of those layout options, each developer will implement the layout a little differently. It can get messy really quickly. Using grid components to standardize on your page layouts can be very helpful to both maintain a consistent theme and improve the maintenance of your site/app.

---

## Example Usage

<div class="grid-container">
  <Grid
    rowMarginsV={10}
    rowMarginsH={0}
    colPaddingV={10}
    colPaddingH={20}
  >
    <Row>
      <Col><div class="cell cell-1">Auto Column</div></Col>
      <Col><div class="cell cell-2">Auto Column</div></Col>
      <Col><div class="cell cell-3">Auto Column</div></Col>
      <Col><div class="cell cell-4">Auto Column</div></Col>
    </Row>
    <Row>
      <Col xs={1} md={4} xxl={8}><div class="cell cell-1">xs=1 md=4 xxl=4</div></Col>
      <Col xs={1} md={2} xxl={2}><div class="cell cell-2">xs=1 md=2 xxl=2</div></Col>
      <Col xs={1} md={1} xxl={1}><div class="cell cell-3">xs=1 md=1 xxl=1</div></Col>
      <Col xs={1} md={1} xxl={1}><div class="cell cell-4">A really long cell text block<br><br>xs=1 md=1 xxl=1</div></Col>
    </Row>
  </Grid>
</div>

<br>

<div class="grid-container">
  <Grid
    rowMarginsV={50}
    rowMarginsH={0}
    colPaddingV={0}
    colPaddingH={20}
  >
    <Row>
      <Col xs={1} md={4} xxl={8}><div class="cell cell-1">xs=1 md=4 xxl=4</div></Col>
      <Col xs={1} md={2} xxl={2}><div class="cell cell-2">xs=1 md=2 xxl=2</div></Col>
      <Col xs={1} md={1} xxl={1}><div class="cell cell-3">xs=1 md=1 xxl=1</div></Col>
      <Col xs={1} md={1} xxl={1}><div class="cell cell-4">A really long cell text block<br><br>xs=1 md=1 xxl=1</div></Col>
    </Row>
  </Grid>
</div>


## 12-column layout
This grid uses a 12-column layout. This allows developers to implement evenly-spaced 1-, 2-, 3-, 4-, 6-, and 12-column layouts.

## Column Breakpoints

`xs`, `sm`, `md`, `lg`, `xl`, `xxl`


## Props

The `<Grid>` component references the `--fpui-grid-max-content-width` CSS variable. So if you pass the `contain` prop to a `<Grid>` component, then all the content within that `<Grid>` will not spread any wider across the screen than the value that you have placed in `--fpui-grid-max-content-width`.

<style>
  .grid-container {
    border: 1px solid var(--docs-neutral-darkest);

    & .cell {
      height: 100%;
      padding: 10px;
      border: 1px solid var(--docs-neutral-darkest);
      color: var(--docs-neutral-lightest);

      &.cell-1 {
        background-color: red;
      }

      &.cell-2 {
        background-color: yellow;
        color: var(--docs-neutral-darkest);
      }

      &.cell-3 {
        background-color: blue;
      }

      &.cell-4 {
        background-color: green;
      }
    }
  }
</style>
