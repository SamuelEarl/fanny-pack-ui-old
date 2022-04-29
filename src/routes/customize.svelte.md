<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { browser } from "$app/env";
  import { Button, Input, Select, ToastContent } from "/src/lib";

  let themes = [];
  
  let value = {
    main: {
      darkBlue: "#000000",
    },
    neutral: {
      black: "#000000",
      veryDarkNeutral: "#000000",
      darkNeutral: "#000000",
      mediumNeutral: "#000000",
      lightNeutral: "#000000",
      veryLightNeutral: "#000000",
      white: "#000000",
    },
  };

  let selectedTheme = { text: "", value };
  $: {
    if (selectedTheme.text) {
      setSelectedTheme(selectedTheme.text);
    }
  }

  // $: This comment preserves the syntax highlighting.
  
  let newThemeName = "";
  let content = [];


  onMount(() => {
    if (!localStorage.getItem("themes")) {
      // The `initThemes` array was going to contain objects like this: { name: "default", css: "" }, but the <Select> component takes object arrays with `text` and `value` properties. So it is easier to just use "theme" objects with `text` and `value` properties.
      let initThemes = [{ text: "default", value }];
      localStorage.setItem("themes", JSON.stringify(initThemes));
    }

    // Set the `themes` array.
    themes = JSON.parse(localStorage.getItem("themes"));

    // Set the `selectedTheme` object.
    selectedTheme = themes[0];
  });

  function createNewTheme() {
    if (!newThemeName) {
      ToastContent.set({ type: "warning", msg: "Please enter a theme name" });
      return;
    }
    let newTheme = { text: newThemeName, value };
    // Push the new theme to the `themes` array.
    themes.push(newTheme);
    // Update the `themes` array in localStorage.
    localStorage.setItem("themes", JSON.stringify(themes));
    // Set the `selectedTheme` to the one that was just created.
    setSelectedTheme(newTheme.text);
    // Clear the theme name field.
    newThemeName = "";
  }

  function setSelectedTheme(themeName) {
    selectedTheme = themes.find(obj => obj.text === themeName);
  }

  function saveTheme() {
    // Update the "themes" array in localStorage.
    localStorage.setItem("themes", JSON.stringify(themes));
    // Set themes to the updated "themes" array from localStorage.
    themes = JSON.parse(localStorage.getItem("themes"));
  }

  function deleteTheme() {
    let newThemesArray = themes.filter(obj => obj.text !== selectedTheme.text);
    console.log("newThemesArray", newThemesArray);
    // Update the "themes" array in localStorage.
    localStorage.setItem("themes", JSON.stringify(newThemesArray));
    // Set themes to the updated "themes" array from localStorage.
    themes = JSON.parse(localStorage.getItem("themes"));
    if (themes.length > 0) {
      // Set the `selectedTheme` to the first one in the "themes" array.
      selectedTheme = themes[0];
    }
    else {
      // Remove the "themes" array so an brand new "themes" array will be created when this page is reloaded.
      localStorage.removeItem("themes");
      // Reload this page so a new "themes" array will be created.
      location.reload();
    }
  }

  /**
   * https://stackoverflow.com/a/47201559/9453009
   */
  function hexToRgb(hex: string, alpha: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      let rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      console.log("rgba:", rgba);
      return rgba;
    }

    let rgb = `rgb(${r}, ${g}, ${b})`;
    console.log("rgb:", rgb);
    return rgb;
  }

  function downloadTheme() {
    // As I loop through the `value` object in the `selectedTheme`, convert hex values to RGB.
    // hexToRgb("#fbafff");
    console.log("downloadTheme");

    // Convert `selectedTheme.value` to a formatted string.
// TODO: Use one `theme.css` as the single source of truth. I might be able to pull the content from that `theme.css` file and manipulate it here.    
    let content = [
`:root {
  /* Main Colors: The following colors were taken from https://www.w3schools.com/w3css/w3css_color_metro.asp. */
  --light-green: #99b433;
  --green: #00a300;
}

/* Button */
:root {
  --fpui-btn-primary-text-color: white;
  --fpui-btn-secondary-text-color: white;
  --fpui-btn-tertiary-text-color: var(--fpui-primary-color);
}`
    ];

    // let content = [
    //   ":root {",
    //   "  /* Main Colors: The following colors were taken from https://www.w3schools.com/w3css/w3css_color_metro.asp. */",
    //   "  --light-green: #99b433;",
    //   "  --green: #00a300;",
    //   "}",
    // ];

    const a = document.createElement("a"); // Create "a" element
    const blob = new Blob(content, {type: "text/css"}) // Create a blob (file-like object)
    const url = URL.createObjectURL(blob); // Create an object URL from blob
    a.setAttribute("href", url); // Set "a" element link
    a.setAttribute("download", selectedTheme.text); // Set download filename
    a.click(); // Start downloading
  }
</script>


# Customize

***This page is a work in progress.***

Customize your theme and download the files to insert into your project.

<!-- <button on:click={() => hexToRgb("#fbafff", 0.5)}>Test Hex to RGB</button> -->

---

<form on:submit|preventDefault={createNewTheme}>
  <div class="input-container">
    <Input
      type="text"
      bind:value={newThemeName}
      label="Create a new theme"
      placeholder="Theme name"
    />
  </div>

  <Button
    type="submit"
    btnIcon="mdi:plus-circle-outline"
    width="full"
  >
    Create new theme
  </Button>
</form>

<br>

<Select 
  label="Select a theme to edit"
  optionsArray={themes}
  arrayType="object"
  bind:selectedOption={selectedTheme}
/>

<br>

<form on:submit|preventDefault={saveTheme}>
  <div class="input-container">
    <Input
      type="text"
      bind:value={selectedTheme.text}
      label="Edit theme name"
      placeholder="Theme name"
    />
  </div>

  <Button
    type="submit"
    btnIcon="mdi:checkbox-marked-circle-plus-outline"
    width="full"
  >
    Update theme name
  </Button>
</form>

<br><br>

<Button
  type="submit"
  btnIcon="mdi:delete-forever-outline"
  width="full"
  on:click={deleteTheme}
>
  Delete "{selectedTheme.text}" theme
</Button>

---

<Button 
  btnIcon="bx:save"
  width="full"
  on:click={saveTheme}
>
  Save theme
</Button>

## Color palette
TODO: Allow users to add as many colors as they want with an "Add color" button.

And include color values for the following 7 neutral colors (these are used throughout the components):

black: <input type="color" bind:value={selectedTheme.value.neutral.black}>

very dark neutral: <input type="color" bind:value={selectedTheme.value.neutral.veryDarkNeutral}>

dark neutral: <input type="color" bind:value={selectedTheme.value.neutral.darkNeutral}>

medium neutral: <input type="color" bind:value={selectedTheme.value.neutral.mediumNeutral}>

light neutral: <input type="color" bind:value={selectedTheme.value.neutral.lightNeutral}>

very light neutral: <input type="color" bind:value={selectedTheme.value.neutral.veryLightNeutral}>

white: <input type="color" bind:value={selectedTheme.value.neutral.white}>

## Global component styles
These styles are used throughout the components. Updating these variables will handle most of your theme customizations.

TODO: Reference the variables from the above sections (colors, padding, borders, etc) in drop-down menus for each of these variables.

---

## Individual component styles
You can customize individual components by changing the following values.

### Accordions

### Buttons

---

<Button 
  btnIcon="bx:save"
  width="full"
  on:click={saveTheme}
>
  Save theme
</Button>

<br><br>

<Button 
  btnIcon="mi:document-download"
  width="full"
  on:click={downloadTheme}
>
  Download theme
</Button>

<style>
  form {
    display: flex;
    align-items: flex-end;

    & .input-container {
      width: 600px;
      margin-right: 10px;
    }
  }
</style>
