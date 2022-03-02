<div id="home">
  <div id="img-container">
    <img src={Logo} alt="Fanny Pack Logo" />

    **Components built with and for SvelteKit**
  </div>

  ## View Docs
  A live docs website on GitHub pages...

  In a local dev environment, run `npm run dev` and visit `http://localhost:3000`.

</div>


<script lang="ts">
  import Logo from "/static/fanny-pack.svg";
</script>


<style>
  #home {
    
    & #img-container {
      text-align: center;

      & img {
        width: 512px;
      }
    }
  }
</style>
