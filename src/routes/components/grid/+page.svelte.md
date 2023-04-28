<script lang="ts">
  import { Grid, Row, Col, TabsContainer, TabBar, Tab, TabPanel } from "/src/lib";
</script>


# FlexGrid (layout)

This is a CSS Grid-based layout grid (as opposed to a Flexbox-based layout grid).

---

## Example Usage

<Grid
  colPaddingY={0}
  colPaddingX={20}
  rowMarginsY={0}
  rowMarginsX={-15}
  equalColWidths
  contain
>
  <Row>
    <Col><div class="cell red">Auto Column</div></Col>
    <Col><div class="cell yellow">Auto Column</div></Col>
    <Col><div class="cell blue">Auto Column</div></Col>
    <Col><div class="cell green">Auto Column<br><br>This column has more text than the other columns</div></Col>
  </Row>
</Grid>
