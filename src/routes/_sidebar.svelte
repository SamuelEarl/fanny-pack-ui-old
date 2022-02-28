<nav>
  <div id="home-link-wrapper">
    <a href="/">Fanny Pack Home</a>
  </div>
  <br>

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
      width: 100%;
      display: flex;
      
      & a {
        width: 100%;
      }
    }

    & .title {
      padding: 15px 10px;
      border-top: 1px solid var(--secondary);
      border-bottom: 1px solid var(--secondary);
    }

    & #component-links {
      display: flex;
      flex-direction: column;
    }

    & a {
      padding: 10px 25px;

      &:hover {
        background-color: var(--secondary);
      }

      &.active {
        background-color: var(--secondary);
      }
    }
  }
</style>
