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
    <a href="/button" class:active={currentPath === "/button"}>
      <Icon icon="ic:outline-rectangle" /> &nbsp; Button
    </a>
    <a href="/date-picker" class:active={currentPath === "/date-picker"}>
      <Icon icon="mdi:calendar" /> &nbsp; Date Picker
    </a>
    <a href="/input-text" class:active={currentPath === "/input-text"}>
      <Icon icon="iconoir:input-field" /> &nbsp; Input (text)
    </a>
    <a href="/select-multi" class:active={currentPath === "/select-multi"}>
      <Icon icon="icon-park-outline:list-checkbox" /> &nbsp; Select (multi)
    </a>
    <a href="/select-single" class:active={currentPath === "/select-single"}>
      <Icon icon="mdi:form-select" /> &nbsp; Select (single)
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
    padding-top: 20px;
    background-color: var(--fpcl-secondary);
    color: var(--fpcl-tertiary);

    & #title-wrapper {
      padding: 15px;
      padding-top: 0;
      font-size: 1.2rem;
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
