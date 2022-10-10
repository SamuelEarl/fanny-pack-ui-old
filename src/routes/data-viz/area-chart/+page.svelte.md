<script lang="ts">
  import { AreaChart, Area, XAxis, YAxis } from "/src/lib";

  const data = [
    {
      timestamp: (Math.floor(Date.now() / 1000) * 1000) - 7000,
      // name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      timestamp: (Math.floor(Date.now() / 1000) * 1000) - 6000,
      // name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      timestamp: (Math.floor(Date.now() / 1000) * 1000) - 5000,
      // name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      timestamp: (Math.floor(Date.now() / 1000) * 1000) - 4000,
      // name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      timestamp: (Math.floor(Date.now() / 1000) * 1000) - 3000,
      // name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      timestamp: (Math.floor(Date.now() / 1000) * 1000) - 2000,
      // name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      timestamp: (Math.floor(Date.now() / 1000) * 1000) - 1000,
      // name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  function padWithZeros(num) {
    return String(num).padStart(2, "0");
  }

  // In this chart example each x-axis tick (i.e. each data point's x-value) is a JavaScript Date object.
  // So I am simply calling Date.getHours(), Date.getMinutes(), and Date.getSeconds() on each x-axis tick and returning the formatted time.
  function getTime(tick) {
    let hours = padWithZeros(tick.getHours());
    let minutes = padWithZeros(tick.getMinutes());
    let seconds = padWithZeros(tick.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }
</script>


# Area Chart

---

<div class="chart-space">
  <AreaChart
    {data}
    xValueId="timestamp"
    margin={{
      top: 20,
      right: 70,
      bottom: 55,
      left: 50,
    }}
  >
    <XAxis
      formatTickLabel={getTime}
      tickLabelTranslateX={-12}
      tickLabelTranslateY={35}
      rotateTickLabel={-45}
      showAxisLine={false}
      showTickMarks={false}
    />
    <YAxis
      showAxisLine={false}
      showTickMarks={false}
    />
    <Area yValueId="uv" color="#ee1111" />
    <Area yValueId="pv" color="#ffc40d" />
    <Area yValueId="amt" color="#2d89ef" />
  </AreaChart>
</div>


<style>
  .chart-space {
    width: 100%;
    height: 50%;
  }
</style>
