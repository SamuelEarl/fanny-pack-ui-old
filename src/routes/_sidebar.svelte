<nav>
  <div id="title-wrapper">
    Fanny Pack UI
  </div>
  <div class="nav-links">
    <a href="/" class:active={currentPath === "/"}>
      <Icon icon="carbon:home" /> &nbsp; Overview
    </a>
    <a href="/get-started" class:active={currentPath === "/get-started"}>
      <Icon icon="carbon:play" /> &nbsp; Get Started
    </a>
  </div>
  <div class="section-heading">Components</div>
  <div class="nav-links">
    <a href="/components/button" class:active={currentPath === "/components/button"}>
      <Icon icon="carbon:button-centered" /> &nbsp; Button
    </a>
    <a href="/components/checkbox" class:active={currentPath === "/components/checkbox"}>
      <Icon icon="carbon:checkbox-checked" /> &nbsp; Checkbox
    </a>
    <a href="/components/checkbox-group" class:active={currentPath === "/components/checkbox-group"}>
      <Icon icon="carbon:list-checked" /> &nbsp; Checkbox Group
    </a>
    <a href="/components/date-picker" class:active={currentPath === "/components/date-picker"}>
      <Icon icon="carbon:calendar" /> &nbsp; Date Picker
    </a>
    <a href="/components/input-currency" class:active={currentPath === "/components/input-currency"}>
      <Icon icon="carbon:currency-dollar" /> &nbsp; Input (currency)
    </a>
    <a href="/components/input" class:active={currentPath === "/components/input"}>
      <Icon icon="radix-icons:input" /> &nbsp; Input (text, email)
    </a>
    <a href="/components/modal" class:active={currentPath === "/components/modal"}>
      <Icon icon="carbon:popup" /> &nbsp; Modal (popup window)
    </a>
    <a href="/components/radio-button" class:active={currentPath === "/components/radio-button"}>
      <Icon icon="carbon:radio-button-checked" /> &nbsp; Radio Button
    </a>
    <a href="/components/select-multi" class:active={currentPath === "/components/select-multi"}>
      <Icon icon="carbon:list-boxes" /> &nbsp; Select (multi)
    </a>
    <a href="/components/select-single" class:active={currentPath === "/components/select-single"}>
      <Icon icon="carbon:account" /> &nbsp; Select (single)
    </a>
    <a href="/components/tabs" class:active={currentPath === "/components/tabs"}>
      <Icon icon="ic:outline-tab" /> &nbsp; Tabs (tabbed content)
    </a>
    <a href="/components/toast" class:active={currentPath === "/components/toast"}>
      <Icon icon="carbon:information-square" /> &nbsp; Toast (notification pane)
    </a>
    <a href="/components/tooltip" class:active={currentPath === "/components/tooltip"}>
      <Icon icon="carbon:chat" /> &nbsp; Tooltip
    </a>
  </div>
  <div class="section-heading">Data Viz</div>
  <div class="nav-links">
    <a href="/data-viz/bar-chart" class:active={currentPath === "/data-viz/bar-chart"}>
      <Icon icon="bi:bar-chart" rotate="90deg" /> &nbsp; Bar Chart
    </a>
    <a href="/data-viz/bubble-chart" class:active={currentPath === "/data-viz/bubble-chart"}>
      <Icon icon="carbon:chart-bubble" /> &nbsp; Bubble Chart
    </a>
    <a href="/data-viz/column-chart" class:active={currentPath === "/data-viz/column-chart"}>
      <Icon icon="bi:bar-chart" /> &nbsp; Column Chart
    </a>
    <a href="/data-viz/histogram" class:active={currentPath === "/data-viz/histogram"}>
      <Icon icon="fluent:data-histogram-24-regular" /> &nbsp; Histogram
    </a>
    <a href="/data-viz/line-chart" class:active={currentPath === "/data-viz/line-chart"}>
      <Icon icon="mdi:chart-line-variant" /> &nbsp; Line Chart
    </a>
    <a href="/data-viz/scatterplot" class:active={currentPath === "/data-viz/scatterplot"}>
      <Icon icon="carbon:chart-scatter" /> &nbsp; Scatterplot
    </a>
  </div>
</nav>


<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";

  $: currentPath = $page.url.pathname;
</script>


<style>
  nav {
    min-height: 100%;
    padding-bottom: 50px;
    background-color: var(--secondary-color);
    color: var(--tertiaryary-color);

    & #title-wrapper {
      font-family: var(--cursive-font-stack);
      padding: 15px;
      border-bottom: 1px solid var(--black);
      margin-bottom: 15px;
      font-size: 1.5rem;
      line-height: 1.5;
      text-align: center;
    }

    & .section-heading {
      padding: 10px;
      padding-left: 15px;
      font-size: 1.1rem;
      font-weight: bold;
    }

    & .nav-links {
      display: flex;
      flex-direction: column;

      & a {
        display: flex;
        padding: 10px;
        padding-left: 30px;
        border-bottom: none;
        color: var(--tertiaryary-color);

        &:hover {
          background-color: var(--primary-color);
        }

        &.active {
          background-color: var(--primary-color);
        }
      }
    }
  }
</style>
