<div class="layout">
  <div class="sidebar">
    <Sidebar />
  </div>
  <main>
    <slot />
  </main>
</div>

<script lang="ts">
  import Sidebar from "./_sidebar.svelte";
</script>

<style>
  @import "/src/assets/styles/main.css";
  
  .layout {
    height: 100vh;
    display: flex;

    & .sidebar {
      width: 20%;
      overflow-y: auto;
    }

    & main {
      flex: 1;
      padding: 0 20px;
      overflow-y: auto;
    }
  }

  :global(table) {
    border-collapse: collapse;
  }
  :global(tbody) {
    font-family: var(--mono-font-stack);
  }
  :global(th), :global(td) {
    padding: 10px 15px;
  }
  :global(th) {
    border: 1px solid var(--gray-light);
    background-color: var(--gray-extra-light);
  }
  :global(td) {
    border: 1px solid var(--gray-light);
  }

  :global(pre) {
    padding: 10px;
    border-radius: var(--radius);
    background-color: var(--gray-light);
  }
  :global(code) {
    padding: 0 3px;
    border-radius: var(--radius);
    background-color: var(--gray-light);
  }

  :global(hr) {
    margin: 30px 0;
    border: none;
    border-top: 1px solid var(--gray-dark);
  }
</style>
