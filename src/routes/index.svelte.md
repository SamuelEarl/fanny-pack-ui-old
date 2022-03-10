<script lang="ts">
  import Logo from "/static/fanny-pack.svg";
</script>


<div id="home">
  <div id="img-container">
    <img src={Logo} alt="Fanny Pack Logo" />
  </div>
</div>

---

*IMPORTANT: These components are not ready for production yet.*

---

# Fanny Pack Component Library
Fanny Pack Component Library is a collection of random junk that you can throw into your SvelteKit apps and theme to your heart's content.
 
These components do not follow a specific organization's design system (e.g. Material Design, Fluent Design), so you can create apps with these components and customize them to fit your unique style needs. 

These components are also designed for responsiveness and with accessibility in mind (following the guidelines from W3.org's <a href="https://www.w3.org/TR/html-aria/#docconformance" class="underline primary">ARIA in HTML</a> page).

This is not a UI kit or UI framework because we do not provide layout elements. Instead, we let you lay your pages out the way you want using regular CSS (instead of using a set of CSS utility classes that we have created and that you would need to learn) and then you can throw whatever components you need into your pages.


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
