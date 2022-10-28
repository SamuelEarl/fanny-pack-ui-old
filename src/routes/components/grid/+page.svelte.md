<script lang="ts">
  import { Grid, Row, Col } from "/src/lib";
</script>

# Grid (layout)

Why shoud you consider using a grid component instead of applying CSS Flexbox or Grid styles to your pages? You can certainly use CSS Flexbox or Grid styles to layout elements and components on a page and that will work nicely with small projects. However, when you are working on large projects that have multiple developers, standardization becomes very important when you want to keep a consistent look and feel from one page to another and when you are concerned about maintenance.

It can become very difficult to standardize on a consistent way to handle your page layouts using Flexbox or CSS Grid styles. Some developers might prefer using Flexbox, while others might prefer CSS Grid. Some might be old school and prefer using `float` properties. Even if all the develops on your team agree on a single way to layout your pages, each developer will implement the layout a little differently. It can get messy really quickly. Using reusable grid components can help you standardize your page layouts, which can help to keep a consistent theme and improve the maintenance of your site/app.

---

## Example Usage

<Grid
  equalColWidths
  colPaddingV={0}
  colPaddingH={20}
  rowMarginsV={0}
  rowMarginsH={-20}
>
  <Row>
    <Col><div class="cell red">Auto Column</div></Col>
    <Col><div class="cell yellow">Auto Column</div></Col>
    <Col><div class="cell blue">Auto Column</div></Col>
    <Col><div class="cell green">Auto Column<br><br>This column has more text than the other columns</div></Col>
  </Row>
</Grid>

```svelte
<script lang="ts">
  import { Grid, Row, Col } from "@fanny-pack-ui/svelte-kit";
</script>

<Grid
  equalColWidths
  colPaddingV={0}
  colPaddingH={20}
  rowMarginsV={0}
  rowMarginsH={-20}
>
  <Row>
    <Col><div class="cell red">Auto Column</div></Col>
    <Col><div class="cell yellow">Auto Column</div></Col>
    <Col><div class="cell blue">Auto Column</div></Col>
    <Col><div class="cell green">Auto Column<br><br>This column has more text than the other columns</div></Col>
  </Row>
</Grid>

<style>
  .cell {
    height: 100%;
    padding: 10px;
    border: 1px solid var(--docs-neutral-lightest);
    color: var(--docs-neutral-lightest);

    &.red {
      background-color: var(--dark-red);
    }

    &.yellow {
      background-color: var(--yellow);
      color: var(--docs-neutral-darkest);
    }

    &.blue {
      background-color: var(--dark-blue);
    }

    &.green {
      background-color: var(--dark-green);
    }
  }
</style>
```

There are three components: `<Grid>`, `<Row>`, `<Col>`. By default the column widths are not equal, but you can pass the `equalColWidths` prop to the `<Grid>` component to make them be equal widths. You can also set responsive breakpoints for your columns (see below). 

<br>

## Responsive Grid

<Grid
  colPaddingH={10}
  rowMarginsH={-10}
>
  <Row>
    <Col xs={2} md={4} xl={2}><div class="cell red">1</div></Col>
    <Col xs={4} md={2} xl={6}><div class="cell yellow">2</div></Col>
    <Col xs={4} md={4} xl={2}><div class="cell blue">3</div></Col>
    <Col xs={2} md={2} xl={2}><div class="cell green">4</div></Col>
  </Row>
</Grid>

```svelte
<Grid
  colPaddingH={10}
  rowMarginsH={-10}
>
  <Row>
    <Col xs={2} md={4} xl={2}><div class="cell red">1</div></Col>
    <Col xs={4} md={2} xl={6}><div class="cell yellow">2</div></Col>
    <Col xs={4} md={4} xl={2}><div class="cell blue">3</div></Col>
    <Col xs={2} md={2} xl={2}><div class="cell green">4</div></Col>
  </Row>
</Grid>
```

Within a single row, the column values for each breakpoint should add up to 12. For example, all of the `xs` values add up to 12. The same is true for all of the `md` values and the `xl` values.

<br>

### Column Breakpoints

Fanny Pack UI uses 6 breakpoints:

* `xs`: 0px - 639px (Extra small devices - phones, 600px and smaller)
* `sm`: 640px - 767px (Small devices - portrait tablets and large phones, 601px and larger)
* `md`: 768px - 1023px (Medium devices - landscape tablets, 768px and larger)
* `lg`: 1024px - 1279px (Large devices - laptops, 993px and larger)
* `xl`: 1280px - 1535px (Extra large devices - large laptops and desktops, 1200px and larger)
* `xxl`: 1536px and larger

Just like with any other responsive design system, larger breakpoints will inherit the column values that you set on smaller breakpoints. So, for example, if you only set column values for the `xs` breakpoint, the `xxl` breakpoint will inherit those same column values.

6 breakpoints might seem like a lot to work with, but you don't have to set column values for each breakpoint. One idea you can use is to specify column values for only the `xs`, `md`, and `xl` breakpoints and then allow the other breakpoints to inherit the column values from the breakpoints that are smaller than them (e.g. `sm` will inherit from `xs`, `lg` will inherit from `md`, `xxl` will inherit from `xl`).

Note that the value ranges for each breakpoint can be changed in the `fpui-media-queries.css` file.

---

For reference, here are the viewport sizes of some common devices:

* iPhone 8: 375px wide x 667px high (portrait is `xs` range, landscape is `sm` range)
* iPad (in portrait mode): 768px wide x 1024px high (`md` range)
* iPad Pro (in portrait mode): 1024px wide x 1366px high (`lg` range)
* Macbook Pro 15": 1440px wide x 900px high (`xl` range)

<br>

### 12-column layout
The Fanny Pack `<Grid>` component uses a 12-column layout. A 12-column layout is more versatile than a 16 column layout because it allows developers to implement evenly-spaced 1-, 2-, 3-, 4-, 6-, and 12-column layouts, if necessary.

<br>

## Multiple Rows In A Grid

You can put multiple rows inside a single `<Grid>` component and the `<Col>` components can have different breakpoint values.

<div class="grid-container">
  <Grid
    equalColWidths
    colPaddingH={20}
    rowMarginsV={20}
  >
    <Row>
      <Col><div class="cell red">Auto Column</div></Col>
      <Col><div class="cell yellow">Auto Column</div></Col>
      <Col><div class="cell blue">Auto Column</div></Col>
      <Col><div class="cell green">Auto Column<br><br>This column has more text than the other columns</div></Col>
    </Row>
    <hr>
    <Row>
      <Col xs={2} md={4} xl={2}><div class="cell red">1</div></Col>
      <Col xs={4} md={2} xl={6}><div class="cell yellow">2</div></Col>
      <Col xs={4} md={4} xl={2}><div class="cell blue">3</div></Col>
      <Col xs={2} md={2} xl={2}><div class="cell green">4</div></Col>
    </Row>
  </Grid>
</div>

```svelte
<div class="grid-container">
  <Grid
    equalColWidths
    colPaddingH={20}
    rowMarginsV={20}
  >
    <Row>
      <Col><div class="cell red">Auto Column</div></Col>
      <Col><div class="cell yellow">Auto Column</div></Col>
      <Col><div class="cell blue">Auto Column</div></Col>
      <Col><div class="cell green">Auto Column<br><br>This column has more text than the other columns</div></Col>
    </Row>
    <hr>
    <Row>
      <Col xs={1} md={4} xxl={8}><div class="cell red">1</div></Col>
      <Col xs={1} md={2} xxl={2}><div class="cell yellow">2</div></Col>
      <Col xs={1} md={1} xxl={1}><div class="cell blue">3</div></Col>
      <Col xs={1} md={1} xxl={1}><div class="cell green">4</div></Col>
    </Row>
  </Grid>
</div>

<style>
  .grid-container {
    border: 1px solid gray;
  }

  ...
</style>
```

Notice that you can even put `<hr>` element in between rows to provide some separation if you want.

<br>

## Offset columns

You can move columns up to 11 columns to the right by passing empty `<Col>` components along with breakpoint props that take up the amount of space you want to offset. Then you can simply pass `<Col>` components that have content.

<div class="grid-container">
  <Grid>
    <Row>
      <Col xs={3}></Col>
      <Col xs={3}></Col>
      <Col xs={3}></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
    </Row>
    <Row>
      <Col xs={3}></Col>
      <Col xs={3}></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
    </Row>
    <Row>
      <Col xs={3}></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
    </Row>
    <Row>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
    </Row>
  </Grid>
</div>

```svelte
<div class="grid-container">
  <Grid>
    <Row>
      <Col xs={3}></Col>
      <Col xs={3}></Col>
      <Col xs={3}></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
    </Row>
    <Row>
      <Col xs={3}></Col>
      <Col xs={3}></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
    </Row>
    <Row>
      <Col xs={3}></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
    </Row>
    <Row>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
      <Col xs={3}><div class="cell blue">Column with content</div></Col>
    </Row>
  </Grid>
</div>
```

<br>
<hr>

## Props

### `<Grid>` component props
`rowMarginsV`: Stands for "row margins vertical".

`rowMarginsH`: Stands for "row margins horizontal".

`equalColWidths`: If you do not set any column breakpoint values, then the widths of each column will be auto calculated based on the content in each column. However, if you want the column widths to be equal, then you can pass the `equalColWidths` prop to the `<Grid>` component. NOTE: The column breakpoint values will override the `equalColWidths` prop if both are set for a row.

`colPaddingV`: Stands for "column padding vertical". You probably won't find much use for this property, but it is here in case you need it.

`colPaddingH`: Stands for "column padding horizontal".

`contain`: The `<Grid>` component references the `--fpui-grid-max-content-width` CSS variable. So if you pass the `contain` prop to a `<Grid>` component, then the content within that `<Grid>` will not spread any wider across the screen than the value that you have placed in `--fpui-grid-max-content-width`.

<br>

### `<Col>` component props 

`xs`, `sm`, `md`, `lg`, `xl`, `xxl`: Specify the width of each `<Col>` component for the `xs`, `sm`, `md`, `lg`, `xl`, and/or `xxl` breakpoints. Values can be from `1` to `12`.


<style>
  .grid-container {
    border: 1px solid var(--docs-neutral-medium);
  }

  .cell {
    height: 100%;
    padding: 10px;
    border: 1px solid var(--docs-neutral-lightest);
    color: var(--docs-neutral-lightest);

    &.red {
      background-color: var(--dark-red);
    }

    &.yellow {
      background-color: var(--yellow);
      color: var(--docs-neutral-darkest);
    }

    &.blue {
      background-color: var(--dark-blue);
    }

    &.green {
      background-color: var(--dark-green);
    }
  }
</style>
