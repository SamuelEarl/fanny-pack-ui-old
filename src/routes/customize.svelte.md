<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { browser } from "$app/env";
  import { Button, Input, Select, ToastContent } from "/src/lib";

  let themes = [];
  let selectedTheme = {};
  $: {
    if (selectedTheme.text) {
      setSelectedTheme(selectedTheme.text);
    }
  }

  // $: This comment preserves the syntax highlighting.
  
  let updateThemeName;
  let newThemeName = "";

  // CSS variables
  let cssVars = {
    main: {
      darkBlue: "",
    },
    neutral: {
      black: "",
      veryDarkNeutral: "",
      darkNeutral: "",
      mediumNeutral: "",
      lightNeutral: "",
      veryLightNeutral: "",
      white: "",
    }
  };

  $: console.log("cssVars:", cssVars);

  // $: This comment preserves the syntax highlighting.


  onMount(() => {
    console.log("THEMES:", localStorage.getItem("themes"));
    if (!localStorage.getItem("themes")) {
      // The `initThemes` array was going to contain objects like this: { name: "default", css: "" }, but the <Select> component takes object arrays with `text` and `value` properties. So it is easier to just use "theme" objects with `text` and `value` properties.
      let initThemes = [{ text: "default", value: "" }];
      localStorage.setItem("themes", JSON.stringify(initThemes));
    }

    // Set the `themes` array.
    themes = JSON.parse(localStorage.getItem("themes"));

    // Set the `selectedTheme` object.
    selectedTheme = themes[0];

    // Set the `updateThemeName` to equal the name of the currently seleted theme.
    updateThemeName = selectedTheme.text;
  });

  function createNewTheme() {
    if (!newThemeName) {
      ToastContent.set({ type: "warning", msg: "Please enter a theme name" });
      return;
    }
    let newTheme = { text: newThemeName, value: "" };
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
    // Set the `updateThemeName` variable to match the `selectedTheme`.
    updateThemeName = themeName;
  }

  function updateSelectedThemeName() {
    selectedTheme.text = updateThemeName;
    // Update the "themes" array in localStorage.
    localStorage.setItem("themes", JSON.stringify(themes));
    // Set themes to the updated "themes" array from localStorage.
    themes = JSON.parse(localStorage.getItem("themes"));
  }

  function deleteSelectedTheme() {
    if (themes.length === 1) {
      ToastContent.set({ type: "warning", msg: "You are not allowed to delete the last remaining theme. Edit it instead." });
      return;
    }
    let newThemesArray = themes.filter(obj => obj.text !== selectedTheme.text);
    console.log("newThemesArray", newThemesArray);
    // Update the "themes" array in localStorage.
    localStorage.setItem("themes", JSON.stringify(newThemesArray));
    // Set themes to the updated "themes" array from localStorage.
    themes = JSON.parse(localStorage.getItem("themes"));
    // Set the `selectedTheme` to the first one in the "themes" array.
    selectedTheme = themes[0];
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

<form on:submit|preventDefault={updateSelectedThemeName}>
  <div class="input-container">
    <Input
      type="text"
      bind:value={updateThemeName}
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
  on:click={deleteSelectedTheme}
>
  Delete "{selectedTheme.text}" theme
</Button>

---

## Set your main colors


## Set your neutral colors

black: <input type="color" bind:value={cssVars.neutral.black}>

very dark neutral: <input type="color" bind:value={cssVars.neutral.veryDarkNeutral}>

dark neutral: <input type="color" bind:value={cssVars.neutral.darkNeutral}>

medium neutral: <input type="color" bind:value={cssVars.neutral.mediumNeutral}>

light neutral: <input type="color" bind:value={cssVars.neutral.lightNeutral}>

very light neutral: <input type="color" bind:value={cssVars.neutral.veryLightNeutral}>

white: <input type="color" bind:value={cssVars.neutral.white}>



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
