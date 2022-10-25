<script lang="ts">
  import { AreaChart, Area, XAxis, YAxis } from "/src/lib";

  function subtractSec(sec) {
    const date = new Date();
    // Setting the milliseconds to zero will ensure that the x-axis
    // labels line up exactly with the plots on the chart.
    date.setMilliseconds(0);
    // Subtract the given seconds from the Date object and set the
    // date object to have the new seconds.
    date.setSeconds(date.getSeconds() - sec);
    return date;
  }

  const simpleData = [
    {
      timestamp: subtractSec(7),
      pv: 2400,
    },
    {
      timestamp: subtractSec(6),
      pv: 1398,
    },
    {
      timestamp: subtractSec(5),
      pv: 9800,
    },
    {
      timestamp: subtractSec(4),
      pv: 3908,
    },
    {
      timestamp: subtractSec(3),
      pv: 4800,
    },
    {
      timestamp: subtractSec(2),
      pv: 3800,
    },
    {
      timestamp: subtractSec(1),
      pv: 4300,
    },
  ];

  const complexData = [
    {
      timestamp: subtractSec(7),
      // name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      timestamp: subtractSec(6),
      // name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      timestamp: subtractSec(5),
      // name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      timestamp: subtractSec(4),
      // name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      timestamp: subtractSec(3),
      // name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      timestamp: subtractSec(2),
      // name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      timestamp: subtractSec(1),
      // name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  /**
   * This will return the value padded with leading zeros,
   * when necessary, so each value has 2 digits.
   */
  function padWithZeros(num) {
    return String(num).padStart(2, "0");
  }

  /**
   * In this chart example each x-axis tick (i.e. each data point's x-value)
   * is a JavaScript Date object. So I am simply calling Date.getHours(), 
   * Date.getMinutes(), and Date.getSeconds() on each x-axis tick and 
   * returning the formatted time.
   */
  function getTime(tick) {
    let hours = padWithZeros(tick.getHours());
    let minutes = padWithZeros(tick.getMinutes());
    let seconds = padWithZeros(tick.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }
</script>


# Area Chart

---

## Example Usage

<div class="chart-space">
  <AreaChart
    data={simpleData}
    xValueId="timestamp"
    margin={{
      top: 50,
      bottom: 75,
      left: 70,
      right: 5,
    }}
    chartTitleText="Chart Title"
    chartTitleSize=30
    formatTooltipXValue={getTime}
  >
    <XAxis
      formatTickLabel={getTime}
      tickLabelTranslateX={-15}
      tickLabelTranslateY={35}
      rotateTickLabel={-45}
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="X-Axis Label"
      axisLabelSize={20}
    />
    <YAxis
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="Y-Axis Label"
      axisLabelSize={20}
    />
    <Area
      yValueId="pv"
      color={"var(--primary-color)"}
    />
  </AreaChart>
</div>

<br>

```svelte
<script>
  import { AreaChart, Area, XAxis, YAxis } from "@fanny-pack-ui/svelte-kit";

  function subtractSec(sec) {
    const date = new Date();
    // Setting the milliseconds to zero will ensure that the x-axis
    // labels line up exactly with the plots on the chart.
    date.setMilliseconds(0);
    // Subtract the given seconds from the Date object and set the
    // date object to have the new seconds.
    date.setSeconds(date.getSeconds() - sec);
    return date;
  }

  const simpleData = [
    { timestamp: subtractSec(7), pv: 2400 },
    { timestamp: subtractSec(6), pv: 1398 },
    { timestamp: subtractSec(5), pv: 9800 },
    { timestamp: subtractSec(4), pv: 3908 },
    { timestamp: subtractSec(3), pv: 4800 },
    { timestamp: subtractSec(2), pv: 3800 },
    { timestamp: subtractSec(1), pv: 4300 },
  ];

  /**
   * This will return the value padded with leading zeros,
   * when necessary, so each value has 2 digits.
   */
  function padWithZeros(num) {
    return String(num).padStart(2, "0");
  }

  /**
   * In this chart example each x-axis tick (i.e. each data point's x-value)
   * is a JavaScript Date object. So I am simply calling Date.getHours(), 
   * Date.getMinutes(), and Date.getSeconds() on each x-axis tick and 
   * returning the formatted time.
   */
  function getTime(tick) {
    let hours = padWithZeros(tick.getHours());
    let minutes = padWithZeros(tick.getMinutes());
    let seconds = padWithZeros(tick.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }
</script>

<div class="chart-space">
  <AreaChart
    data={simpleData}
    xValueId="timestamp"
    margin={{
      top: 50,
      bottom: 75,
      left: 70,
      right: 5,
    }}
    chartTitleText="Chart Title"
    chartTitleSize=30
    formatTooltipXValue={getTime}
  >
    <XAxis
      formatTickLabel={getTime}
      tickLabelTranslateX={-15}
      tickLabelTranslateY={35}
      rotateTickLabel={-45}
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="X-Axis Label"
      axisLabelSize={20}
    />
    <YAxis
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="Y-Axis Label"
      axisLabelSize={20}
    />
    <Area
      yValueId="pv"
      color={"var(--primary-color)"}
    />
  </AreaChart>
</div>

<style>
  .chart-space {
    width: 100%;
    height: 400px;
  }
</style>

```

## Props

### For the `<AreaChart>` component
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |


### For the `<Area>` component
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |


### For the `<XAxis>` component
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |


### For the `<YAxis>` component
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |

<br>
<hr>
<br>

<div class="chart-space">
  <AreaChart
    data={complexData}
    xValueId="timestamp"
    margin={{
      top: 50,
      bottom: 75,
      left: 70,
      right: 5,
    }}
    chartTitleText="Chart Title"
    chartTitleSize=50
    formatTooltipXValue={getTime}
  >
    <XAxis
      formatTickLabel={getTime}
      tickLabelTranslateX={-12}
      tickLabelTranslateY={35}
      rotateTickLabel={-45}
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="X-Axis Label"
      axisLabelSize={25}
    />
    <YAxis
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="Y-Axis Label"
      axisLabelSize={25}
    />
    <Area yValueId="uv" color="var(--dark-red)" />
    <Area yValueId="pv" color="var(--yellow)" />
    <Area yValueId="amt" color="var(--dark-blue)" />
  </AreaChart>
</div>

---




<style>
  .chart-space {
    width: 100%;
    height: 400px;
  }
</style>
