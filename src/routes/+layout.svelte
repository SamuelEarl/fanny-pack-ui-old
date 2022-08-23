<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { Toast } from "/src/lib";
  import Sidebar from "/src/components/Sidebar.svelte";

  /**
   * Reset the page scroll position to the top on navigation.
   * The following GitHub issue explains that using `height:100vh` along with `overflow:auto` creates a scenario in the CSS that prevents the page from setting the page scroll position to the top when a user navigates to a new page: https://github.com/sveltejs/kit/issues/2733
   * One of the comments in that issue mentioned using the `afterNavigate` (https://kit.svelte.dev/docs/modules#$app-navigation-afternavigate) hook to reset the scroll position. Since the layout that I am using requires the scroll position in the <main> element to be reset, then I am referencing the <main> element in the `afterNavigate` hook and setting its scroll position to 0.
   */
  afterNavigate(({to}) => {
    // If the user clicks a bookmark link, then the `to` object will include a hash. But if a user clicks a regular page link, then there won't be a hash. So if a user navigates to a new page by clicking on a page link (not a bookmark link), then make sure the page is scrolled to the top.
    if (!to.hash) {
      document.getElementById("main").scrollTop = 0;
    }
  });
</script>


<svelte:head>
	<title>Fanny Pack UI Components | Components built with and for SvelteKit</title>
</svelte:head>

<Toast duration={7000} />

<div id="layout">
  <div id="sidebar">
    <Sidebar />
  </div>
  <main id="main">
    <slot />
  </main>
</div>


<style>
  @import "/src/assets/styles/main.css";
  
  #layout {
    height: 100vh;
    display: flex;

    & #sidebar {
      width: 20%;
      overflow-y: auto;
    }

    & #main {
      flex: 1;
      padding: 0 20px 100px 20px;
      overflow-y: auto;
    }
  }
</style>
