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

If you want to customize these components even more than what is available to you, then please feel free to copy the code and customize it however you want. The code is intentially simple, easy to understand, heavily commented/documented, and not very DRY (don't repeat yourself) to allow users to copy only the components they want (instead of the entire package) and easily customize the code without very many dependencies on other components. There are some cases where the code is DRY, but it's not too DRY.

Fanny Pack UI takes advantage of both scalable CSS utility classes and reusable components. The components in Fanny Pack UI are built on top of Tailwind CSS since Tailwind has already done all the heavy lifting of creating utility classes to cover most, if not all, styling needs. Also, there are some styling situations, such as layouts with grid styles, where it might make more sense to use simple utility classes instead of components. So using Tailwind to define your grid layouts, for example, might be a better choice than using a grid component for your layouts. To learn more about scalable and maintainable CSS, read the following section.

<br>

# The Importance of Scalable & Maintainable CSS

What does it mean to have scalable CSS? 

CSS coding standards help to maintain consistent theming throughout an app and they make future code maintenance easier. **Scalable CSS means that the CSS styles are defined and organized in such a way that you can maintain coding standards, even when the CSS is used in large projects or with multiple team members.** One common way to implement CSS coding standards is through utility classes.

One of the biggest challenges of using CSS is when you are using it in a large project or with multiple team members. If the CSS styles are not defined and used in a scalable way, then you will likely have a maintenance nightmare on your hands. Let me provide an example to illustrate.

Imagine working on a large project that has been around for years and it has a lot of legacy code (along with a lot of global CSS). Your boss asks you to update a page along with some styles for that page. Since the CSS is global, if you change some of the existing styles, then you might accidentally change styles on another, unrelated page. That's a big problem. So you have to create new styles and namespace the ids and classes for those styles so you avoid accidentally changing the styles on another page. Namespacing styles will work because it allows you to isolate the styles for that page, but that is a one of many non-scalable approaches to CSS.

Component-based frameworks, like SvelteKit, will namespace styles for you, which helps to implement scalable CSS. But it's not foolproof. You can still create non-scalable CSS easily. Here are just a few issues that you might run into with non-scalable CSS approaches, even when using component-based frameworks:

* What if your company wants to do a redesign? How will all the pages that have isolated styles get redesigned without styling each page individually? 
* How can you ensure that other developers on your team are styling their pages following your company's design system? Unless developers are carefully referencing your company's design guide they could easily stray from the design system. And how many developers do you think carefully reference a company's design guide, especially when they are under pressure to get a feature out?
* How do you onboard new developers if you don't have a standard way to style your pages? How would they get trained to handle CSS styles? You could have a mess of CSS styles on each page that don't follow any standard practices.

To understand the value of CSS coding standards through the use of utility classes, consider the following example from [codyhouse.co](https://codyhouse.co/blog/post/css-grid-layout-vs-framework-grid) about different ways to handle grid layouts:

<br>

<div class="example">
  <h2>Starting a project using only CSS Grid</h2>

  Let's imagine we're starting a project where, at some point, we need to create a grid.

  ```css
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  ```

  As we move forward with the project, chances are we need to create more grids:

  ```css
  .gallery, .form-grid, .list {
    display: grid;
  }

  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 48rem) {
    .gallery {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .form-grid {
    grid-template-columns: minmax(100px, 250px) 1fr 1fr;
    grid-gap: 20px;
  }

  .list {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
  ```

  So far, so good! If our project was mostly done, why bother even thinking about importing a grid system? CSS Grid easily gets the job done.

  <h2>The project grows in complexity</h2>

  Imagine we need to apply the same grid to two components. What are we supposed to do?

  **Option 1)** Use the same class.

  ```html
  <div class="form-grid">
    <!-- ... -->
  </div>

  <div class="form-grid">
    <!-- ... -->
  </div>

  <style>
    .form-grid {
      display: grid;
      grid-template-columns: minmax(100px, 250px) 1fr 1fr;
      grid-gap: 20px;
    }
  </style>
  ```

  This approach could go wrong for many reasons. First, a picky developer who loves semantics would dye inside a little [if a `.form-grid` was used on an element that is not a `<form>`]. Most importantly, we would create an invisible connection between two components: changing the CSS of the first one would affect the second one. You're creating a trap for your future self.

  **Option 2)** Create a new grid.

  ```html
  <div class="form-grid">
    <!-- ... -->
  </div>

  <div class="portfolio-gallery">
    <!-- ... -->
  </div>

  <style>
    .form-grid, .portfolio-gallery {
      display: grid;
      grid-template-columns: minmax(100px, 250px) 1fr 1fr;
      grid-gap: 20px;
    }
  </style>
  ```

  Creating a new grid for the new component and grouping the classes would be the safest approach. Besides, it won't affect the CSS size.

  Now imagine we get to the point where our project needs multiple (similar) grids. Should we keep creating a new grid for each component?

  ```css
  .gallery, .form-grid, .portfolio-gallery, .contact-gallery, .list {
    display: grid;
  }

  .gallery, .form-grid, .portfolio-gallery {
    gap: 20px;
  }

  .form-grid, .portfolio-gallery {
    grid-template-columns: repeat(3, 1fr);
  }

  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 48rem) {
    .gallery {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .contact-gallery {
    gap: 16px;
    grid-template-columns: repeat(4, 1fr);
  }

  .list {
    gap: 40px;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
  ```

  Here are the weakest points of the above approach:

  <ol>
    <li>Even though the grid classes are in the same SCSS file (highly unusual - typically, they'll end up in different SCSS/component files), and the number of grids is relatively small, dealing with the grid system is already getting more complicated.</li>
    <li>Each grid requires a different class name, and naming too many things can be frustrating.</li>
    <li>Because the classes are intertwined, modifying, or creating new grids requires a high concentration level. The risk of breaking things is high.</li>
  </ol>

  Sooner or later, we end up doing the only thing that makes sense: **we create abstractions** [with utility classes].

  ```css
  .grid { display: grid; }
  .grid-col-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-col-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-col-4 { grid-template-columns: repeat(4, 1fr); }
  .grid-auto { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .gap-sm { gap: 16px; }
  .gap-md { gap: 20px; }
  .gap-lg { gap: 40px; }
  ```

  Our grid utility classes are born out of necessity!

  Here are the main advantages of abstracting grid utility classes:

  <ol>
    <li>All the grid utility classes are in the same SCSS file and are easy to read.</li>
    <li>You can quickly expand the system if required by the project.</li>
    <li>No more naming things.</li>
    <li>If you use the same grid system across multiple projects, you won't need to inspect the CSS at all.</li>
    <li>Dealing with simpler CSS means reducing the risk of breaking things.</li>
  </ol>
</div>

<br>

When we need to style an element, a component, or a page we will sometimes (or often) style those things in isolation, which often leads to a lot of duplicated styles and brittle CSS code. However, **a scalable CSS approach will define styles in one location and then reference those styles wherever they are needed** (i.e. scalable CSS uses utility classes). CSS utility classes keeps our styles DRY, scalable, and more maintainable. *(By the way, this is similar to how we use the concept of "a single source of truth" in component libraries where we have a single component definition and then we import and configure that component wherever we need it.)*

So for example, instead of implementing all the style rules for a button element and copying and pasting those styles each time you implement a button (which is very error prone and not scalable at all), you simply reference the utility classes for a button element. If you do that, then you will be able to maintain a consistent theme througout your app and reduce the maintenance burden. Also, if you need to change any styles, you only need to change them in one location&mdash;where they are defined.

Tailwind and Fanny Pack UI will handle most of your CSS needs, but no framework can possibly cover everything. If you run into any unique styling situtations that either Tailwind or Fanny Pack UI don't cover, then you can simply use plain CSS styles to cover those situations.

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

  .example {
    font-style: italic;
  }
</style>
