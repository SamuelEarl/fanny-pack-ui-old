<svelte:head>
	<title>Kit Fox Component Library (kitfox) | Components built with and for SvelteKit</title>
</svelte:head>

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
</style>
