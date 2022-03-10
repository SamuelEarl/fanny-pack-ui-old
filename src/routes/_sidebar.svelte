<nav>
  <div id="title-wrapper">
    Fanny Pack<br>Component Library
  </div>
  <div class="nav-links">
    <a href="/" class:active={currentPath === "/"}>
      <Icon icon="mdi:home-outline" /> &nbsp; Overview
    </a>
    <a href="/get-started" class:active={currentPath === "/get-started"}>
      <Icon icon="codicon:debug-start" /> &nbsp; Get Started
    </a>
  </div>
  <div class="section-heading">Components</div>
  <div class="nav-links">
    <a href="/components/button" class:active={currentPath === "/button"}>
      <Icon icon="ic:outline-rectangle" /> &nbsp; Button
    </a>
    <a href="/components/date-picker" class:active={currentPath === "/date-picker"}>
      <Icon icon="mdi:calendar" /> &nbsp; Date Picker
    </a>
    <a href="/components/input-text" class:active={currentPath === "/input-text"}>
      <Icon icon="iconoir:input-field" /> &nbsp; Input (text)
    </a>
    <a href="/components/select-multi" class:active={currentPath === "/select-multi"}>
      <Icon icon="icon-park-outline:list-checkbox" /> &nbsp; Select (multi)
    </a>
    <a href="/components/select-single" class:active={currentPath === "/select-single"}>
      <Icon icon="mdi:form-select" /> &nbsp; Select (single)
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
