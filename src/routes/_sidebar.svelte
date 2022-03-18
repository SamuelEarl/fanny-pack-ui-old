<nav>
  <div id="title-wrapper">
    Fanny Pack<br>Component Library
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
    <a href="/components/input-text" class:active={currentPath === "/components/input-text"}>
      <Icon icon="radix-icons:input" /> &nbsp; Input (text)
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
      <Icon icon="bi:bar-chart" /> &nbsp; Bar Chart
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
    height: 100%;
    background-color: var(--fpcl-secondary);
    color: var(--fpcl-tertiary);

    & #title-wrapper {
      font-family: var(--fpcl-headline-font-stack);
      padding: 15px;
      border-bottom: 1px solid var(--fpcl-black);
      margin-bottom: 15px;
      font-size: 1.2rem;
      line-height: 1.5;
      font-weight: bold;
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
        color: var(--fpcl-tertiary);

        &:hover {
          background-color: var(--fpcl-primary);
        }

        &.active {
          background-color: var(--fpcl-primary);
        }
      }
    }
  }
</style>
