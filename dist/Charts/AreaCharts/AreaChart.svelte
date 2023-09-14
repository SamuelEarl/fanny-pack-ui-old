<script>import { setContext, tick, createEventDispatcher, onDestroy } from "svelte";
import { writable } from "svelte/store";
import { scaleTime, scaleLinear, bisectCenter, min, max } from "d3";
import { throttle } from "lodash-es";
import { AREA_CHART_KEY } from "./area-chart-utils";
import { createId } from "../../fp-utils";
export let data = [];
export let xValueId;
export let margin = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
};
export let chartTitleSize = 16;
export let chartTitleText = "";
export let showTooltip = true;
export let formatTooltipXValue = (value) => value;
const dispatch = createEventDispatcher();
let componentId = createId();
let highlightTimerID = null;
let xValuesArray = data.map((datum) => datum[xValueId]);
let yValues = [];
for (let i = 0; i < data.length; i++) {
    for (let prop in data[i]) {
        if (prop !== xValueId) {
            yValues.push(data[i][prop]);
        }
    }
}
;
let yScaleMin = Math.min(...yValues);
yScaleMin = yScaleMin < 0 ? yScaleMin : 0;
let yScaleMax = Math.max(...yValues);
let svgWidth = writable(600);
let svgHeight = writable(300);
let hoveredValueXPos = writable(-1e6);
$: tooltipXPos = $hoveredValueXPos;
let tooltipYPos = 0;
let tooltipBounds = null;
let chartContainerBounds = null;
$: xAccessor = (d) => d[xValueId];
onDestroy(() => {
    clearTimeout(highlightTimerID);
});
function xScaleFunction(svgWidth2) {
    return scaleTime().domain([min(data, xAccessor), max(data, xAccessor)]).range([margin.left + 5, svgWidth2 - margin.right - 5]);
}
$: xScale = xScaleFunction($svgWidth);
function yScaleFunction(svgHeight2) {
    return scaleLinear().domain([yScaleMin, yScaleMax]).range([svgHeight2 - margin.bottom - 5, margin.top + 5]);
}
let dataIndex;
async function handleMouseMove(event) {
    if (event.offsetX === 0 || event.offsetY === 0)
        return;
    let mouseXPos = event.offsetX;
    let mouseYPos = event.offsetY;
    tooltipYPos = mouseYPos;
    dataIndex = bisectCenter(xValuesArray, xScale.invert(mouseXPos));
    if (dataIndex < xValuesArray.length) {
        $hoveredValueXPos = xScale(xValuesArray[dataIndex]);
        dispatch("hoveredData", data[dataIndex]);
    }
    if (showTooltip) {
        await tick();
        if (!tooltipBounds) {
            tooltipBounds = document.getElementById(`chart-tooltip-${componentId}`).getBoundingClientRect();
        }
        if (!chartContainerBounds) {
            chartContainerBounds = event.target.closest(".chart-container").getBoundingClientRect();
        }
        let spaceForTooltipWidth = chartContainerBounds.width - tooltipBounds.width - margin.right - 30;
        if (mouseXPos > spaceForTooltipWidth) {
            tooltipXPos = spaceForTooltipWidth;
        }
        const spaceForTooltipHeight = chartContainerBounds.height - tooltipBounds.height - margin.bottom - 10;
        if (mouseYPos > spaceForTooltipHeight) {
            tooltipYPos = spaceForTooltipHeight;
        }
    }
}
function removeHighlights() {
    highlightTimerID = setTimeout(() => {
        tooltipXPos = -1e6;
        if (showTooltip) {
            $hoveredValueXPos = -1e6;
        }
    }, 250);
}
setContext(AREA_CHART_KEY, {
    "svgWidth": svgWidth,
    "svgHeight": svgHeight,
    "hoveredValueXPos": hoveredValueXPos,
    "data": data,
    "xValueId": xValueId,
    "xValuesArray": xValuesArray,
    "margin": margin,
    "xScaleFunction": xScaleFunction,
    "yScaleFunction": yScaleFunction
});
</script>

<div
  class="chart-container"
  bind:clientWidth={$svgWidth}
  bind:clientHeight={$svgHeight}
  on:mousemove={throttle(handleMouseMove, 200)}
  on:mouseleave={removeHighlights}
>
  {#if showTooltip && $hoveredValueXPos > 0}
    <div class="chart-tooltip" id={`chart-tooltip-${componentId}`} style={`transform: translate(${tooltipXPos + 15}px, ${tooltipYPos}px)`}>
      {#each Object.entries(data[dataIndex]) as [prop, value]}
        {#if prop === xValueId}
          <div>{prop}: {formatTooltipXValue(value)}</div>
        {:else}
          <div>{prop}: {value}</div>
        {/if}
      {/each}
    </div>
  {/if}
  <svg>
    {#if showTooltip}
      <g class="vertical-hover-line" transform="translate(0, 0)">
        <line
          x1={$hoveredValueXPos}
          y1={margin.top}
          x2={$hoveredValueXPos}
          y2={$svgHeight - margin.bottom}
        />
      </g>
    {/if}

    {#if chartTitleText}
      <text
        class="chart-title"
        x={$svgWidth / 2}
        y={0}
        text-anchor="middle"
        dominant-baseline="hanging"
        font-size={chartTitleSize + "px"}
      >
        {chartTitleText}
      </text>
    {/if}

    <slot></slot>
  </svg>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 100%;
  }.chart-container .chart-tooltip {
      position: absolute;
      top: 0px;
      left: 0px;
      padding: 10px;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      background: var(--white);
      color: var(--text-color-default);
      -webkit-box-shadow: 0 0 5px 0 var(--border-color);
              box-shadow: 0 0 5px 0 var(--border-color);
      pointer-events: none;
      -webkit-transition: 200ms linear 0s;
      transition: 200ms linear 0s;
      z-index: 100;
    }.chart-container svg {
      width: 100%;
      height: 100%;
    }.chart-container svg .vertical-hover-line line {
        stroke: var(--neutral-4);
        stroke-dasharray: 4 4;
      }</style>
