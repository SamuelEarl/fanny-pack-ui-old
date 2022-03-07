<nav>
  <div id="home-link-wrapper">
    <a href="/" class:active={currentPath === "/"}>
      <Icon icon="mdi:home" />&nbsp;Fanny Pack
    </a>
  </div>
  <div class="title">Components</div>
  <div id="component-links">
    <a href="/button" class:active={currentPath === "/button"}>Button</a>
    <a href="/date-picker" class:active={currentPath === "/date-picker"}>Date Picker</a>
    <a href="/input-text" class:active={currentPath === "/input-text"}>Input (text)</a>
    <a href="/select-multi" class:active={currentPath === "/select-multi"}>Select (multi)</a>
    <a href="/select-single" class:active={currentPath === "/select-single"}>Select (single)</a>
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

    & #home-link-wrapper {
      display: flex;
      
      & a {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 10px;
        padding-left: 15px;
        font-size: 1.1rem;
        font-weight: bold;
        color: var(--fpcl-tertiary);

        &:hover {
          background-color: var(--fpcl-primary);
        }

        &.active {
          background-color: var(--fpcl-primary);
        }
      }
    }

    & .title {
      padding: 10px;
      padding-left: 15px;
      font-size: 1.1rem;
      font-weight: bold;
    }

    & #component-links {
      display: flex;
      flex-direction: column;

      & a {
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
