<script lang="ts">
  import Logo from "/static/fanny-pack.svg";
</script>


<div id="home">
  <div id="img-container">
    <img src={Logo} alt="Fanny Pack Logo" />
  </div>
</div>

---

# Fanny Pack Component Library (fpcl)
Themable component library for SvelteKit designed for responsiveness and with accessibility in mind (following the guidelines from W3.org's <a href="https://www.w3.org/TR/html-aria/#docconformance" class="underline primary">ARIA in HTML</a> page).

This is not a UI kit or UI framework because we do not provide layout elements. Instead, we let you layout your pages the way you want and then you can throw whatever components you need into your pages.


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
