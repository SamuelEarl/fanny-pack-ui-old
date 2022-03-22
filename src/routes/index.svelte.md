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

Fanny Pack Component Library is a collection of random junk that you can throw into your SvelteKit apps and theme to your heart's content.
 
These components do not follow a specific organization's design system (e.g. Material Design, Fluent Design), so you can create apps with these components and customize them to fit your unique style needs. However, these components have been designed with a "flat" theme in mind, which means that there is no appearance of depth in the components (e.g. through the use of box shadows). Instead of using the concept of depth, these components are "highlighted" when a user hovers over them or when a component receives focus.

You can use your own fonts and these components will inherit those fonts. You can read the tutorial on [how to install your own fonts](/get-started#install-fonts) in your app.

These components are also designed for responsiveness and with accessibility in mind (following the guidelines from W3.org's [ARIA in HTML](https://www.w3.org/TR/html-aria/#docconformance) page).

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
