<script lang="ts">
  import Logo from "/src/assets/images/fanny-pack.svg";

  // Get app version from package.json using Vite: https://stackoverflow.com/questions/67194082/how-can-i-display-the-current-app-version-from-package-json-to-the-user-using-vi.
  let version = __APP_VERSION__;
</script>


<div id="home">
  <div id="img-container">
    <img src={Logo} alt="Fanny Pack Logo" />
  </div>
</div>

---

*IMPORTANT: These components are not ready for production yet.*

---

Version: {version}

---

Fanny Pack UI is a collection of random junk that you can throw into your SvelteKit apps and theme to your heart's content.
 
These components do not follow a specific organization's design system (e.g. Material Design, Fluent Design), so you can create apps with these components and customize them to fit your unique style needs. However, these components have been designed with a "flat" theme in mind, which means that in most cases there is no appearance of depth in the components (e.g. through the use of box shadows). Instead of using the concept of depth, these components are "highlighted" when a user hovers over them or when a component receives focus. 

*NOTE: There are a few exceptions to the "no depth" styling. For example, if there is a dropdown menu in a component (e.g. select boxes, date pickers), then there is a slight box shadow around the dropdown menu to give it the appearance of laying above the page rather than blending in with the page.*

You can use your own fonts and these components will inherit those fonts. You can read the tutorial on [how to install your own fonts](/get-started#install-fonts) in your app.

These components are also designed for responsiveness and with accessibility in mind (following the guidelines from W3.org's [ARIA in HTML](https://www.w3.org/TR/html-aria/#docconformance) page).

This is not a UI kit or UI framework because we do not provide layout elements. Instead, we let you lay your pages out the way you want using regular CSS (instead of using a set of CSS utility classes that we have created and that you would need to learn) and then you can throw whatever components you need into your pages.

If you want to customize these components even more than what is available to you, then please feel free to copy the code and customize it however you want. The code is intentially simple, easy to understand, heavily commented/documented, and not very DRY (don't repeat yourself) to allow users to copy only the components they want (instead of the entire package) and easily customize the code without very many dependencies on other components. There are some cases where the code is DRY, but it's not too DRY.


<style>
  #home {
    
    & #img-container {
      margin-top: 40px;
      text-align: center;

      & img {
        width: 512px;
      }
    }
  }
</style>
