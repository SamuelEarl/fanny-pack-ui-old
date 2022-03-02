<nav>
  <div id="home-link-wrapper">
    <a href="/" class:active={currentPath === "/"}>Fanny Pack Home</a>
  </div>
  <div class="title">Components</div>
  <div id="component-links">
    <a href="/buttons" class:active={currentPath === "/buttons"}>Buttons</a>
    <a href="/select" class:active={currentPath === "/select"}>Select</a>
  </div>
</nav>


<script lang="ts">
  import { page } from "$app/stores";

  $: currentPath = $page.url.pathname;
</script>


<style>
  nav {
    height: 100%;
    padding-top: 20px;
    background-color: var(--primary);
    color: var(--tertiary);

    & #home-link-wrapper {
      display: flex;
      
      & a {
        width: 100%;
        padding: 10px;
        padding-left: 15px;
        font-size: 1.1rem;
        font-weight: bold;

        &:hover {
          background-color: var(--secondary);
        }

        &.active {
          background-color: var(--secondary);
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

        &:hover {
          background-color: var(--secondary);
        }

        &.active {
          background-color: var(--secondary);
        }
      }
    }
  }
</style>
