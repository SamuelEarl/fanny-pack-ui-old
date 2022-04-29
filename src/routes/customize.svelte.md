<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { browser } from "$app/env";
  import { Button, Input, Select, ToastContent } from "/src/lib";

  let themes = [];
  
  let value = {
    colors: [
      ["--demo-color-name", "#603cba"],
    ],
    neutral: [
      ["--black", "#000000"],
      ["--very-dark-neutral", "#000000"],
      ["--dark-neutral", "#000000"],
      ["--medium-neutral", "#000000"],
      ["--light-neutral", "#000000"],
      ["--very-light-neutral", "#000000"],
      ["--white", "#000000"],
    ],
    globalComponentVariables: [
      ["--primary-color", ""],
      ["--secondary-color", ""],
      ["--tertiary-color", ""],
    ],
    accordionVariables: [

    ],
    buttonVariables: [

    ],
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
      // The `initThemes` array was going to contain objects like this: { name: "custom", css: "" }, but the <Select> component takes object arrays with `text` and `value` properties. So it is easier to just use "theme" objects with `text` and `value` properties.
      let initThemes = [{ text: "custom", value }];
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

  function addColor() {
    // Push a new color array to the `colors` array.
    selectedTheme.value.colors.push(["", "#000000"]);
    selectedTheme = selectedTheme;
  }

  function removeColor(index) {
    selectedTheme.value.colors.splice(index, 1);
    saveTheme();
    selectedTheme = selectedTheme;
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
    // TODOS: 
    // * As I loop through the `value` object in the `selectedTheme`, convert hex values to RGB: hexToRgb("#fbafff");
    // * Convert the second value in each of the `selectedTheme.value.globalComponentVariables` and `selectedTheme.value.individualComponentVariables` array to a CSS variable reference value: `var(--css-variable-name)`
    console.log("downloadTheme");



    // Convert `selectedTheme.value` to a formatted string.
// TODO: Use one `theme.css` as the single source of truth. I might be able to pull the content from that `theme.css` file and manipulate it here.    
//     let content = [
// `:root {
//   /* Main Colors: The following colors were taken from https://www.w3schools.com/w3css/w3css_color_metro.asp. */
//   --light-green: #99b433;
//   --green: #00a300;
// }

// /* Button */
// :root {
//   --fpui-btn-primary-text-color: white;
//   --fpui-btn-secondary-text-color: white;
//   --fpui-btn-tertiary-text-color: var(--fpui-primary-color);
// }`
//     ];

    let content = [
      `:root {\n`,
      `  /* Main Colors: The following colors were taken from https://www.w3schools.com/w3css/w3css_color_metro.asp. */\n`,
      `  --light-green: #99b433;\n`,
      `  --green: #00a300;\n`,
      `}`,
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

Customize your theme and download the files to insert into your project. The download button is at the bottom of the page.

<!-- <button on:click={() => hexToRgb("#fbafff", 0.5)}>Test Hex to RGB</button> -->

---

## Themes

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
  label="Select an existing theme to edit"
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

<!-- <Button 
  btnIcon="bx:save"
  width="full"
  on:click={saveTheme}
>
  Save theme
</Button> -->

## Color palette
Add as many color variables as you want (including your main color palette and neutral colors). Each color variable name needs to follow the [CSS variable naming convention](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#basic_usage) - i.e. the name needs to begin with double hyphens (`--`) and each word is separated by a hyphen.

<table>
  <thead>
    <tr>
      <th>Color variable name</th>
      <th>Color value</th>
      <th style="text-align:center">Remove color</th>
    </tr>
  </thead>
  <tbody>
    {#each selectedTheme.value.colors as color, index}
      <tr>
        <td><Input size="sm" bind:value={color[0]} on:blur={saveTheme} /></td>
        <td><input type="color" bind:value={color[1]} on:change={saveTheme}></td>
        <td style="text-align:center">
          <Button
            btnIcon="mdi:minus-circle"
            size="lg"
            --custom-btn-padding="0px 5px"
            --custom-btn-border-color="transparent"
            --custom-btn-background-color="transparent"
            --custom-btn-text-color="var(--dark-purple)"
            on:click={() => removeColor(index)}
          ></Button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<br>

<Button btnIcon="mdi:plus-circle-outline" on:click={addColor}>
  Add color
</Button>

<br><br>


TODOS: 
* Instead of requiring users to create neutral colors that are used in the components (for things like border colors, background colors in the DropZone, etc) I want to let users create the color palette they want and then let them specify those colors in the global and individual component styles. I will also set default values for the component styles to give users an idea of what they might want to use for the components. Maybe I will create a "Fanny Pack UI" theme that will use the color palette and other variables that I use for this app (and users won't be able to delete this theme from their list of themes).
    * START HERE: I need to create this "wizard" with my "Fanny Pack UI" theme as an optional theme. Once that one is finished, then I can work on the "custom" theme. That should speed up this process.
* Since I am creating this "wizard" to create a theme file, I can probably remove --fpui-* CSS variables in the fpui-theme.css file and just reference the same variables from the theme.css file. For example, The theme.css file has a --primary-color variable and the fpui-theme.css file has a --fpui-primary-color variable. So I would replace all references to --fpui-primary-color with --primary-color. If I do this, then I need to make sure to update those variables throughout the components so they reference the non --fpui-* variable and instead reference the one from the theme.css file.

### Neutral colors
Include color values for the following 7 neutral colors (these are used throughout the components):

`--black` : <input type="color" bind:value={selectedTheme.value.neutral.black}>

`--very-dark-neutral` : <input type="color" bind:value={selectedTheme.value.neutral.veryDarkNeutral}>

`--dark-neutral` : <input type="color" bind:value={selectedTheme.value.neutral.darkNeutral}>

`--medium-neutral` : <input type="color" bind:value={selectedTheme.value.neutral.mediumNeutral}>

`--light-neutral` : <input type="color" bind:value={selectedTheme.value.neutral.lightNeutral}>

`--very-light-neutral` : <input type="color" bind:value={selectedTheme.value.neutral.veryLightNeutral}>

`--white` : <input type="color" bind:value={selectedTheme.value.neutral.white}>

## Global component styles
These styles are used throughout the components. Updating these variables will handle most of your theme customizations.

Each component style that can be customized has a fallback value. So, for example, if you do not provide a color for the background of the primary buttons, then the components will still display in your UI, but the colors might not match your theme. So you can either set all the values for all the component variables right now or you can edit them later as needed when you implement a new component in your app.

<table>
  <thead>
    <tr>
      <th>Variable name</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    {#each selectedTheme.value.globalComponentVariables as gcvar}
      <tr>
        <td>{gcvar[0]}</td>
        <td><Select optionsArray={selectedTheme.value.colors} arrayType="array" displayElementAtIndex={0} size="sm" bind:selectedOption={gcvar[1]}/></td>
      </tr>
    {/each}
  </tbody>
</table>

TODO: Reference the variables from the above sections (colors, padding, borders, etc) in drop-down menus for each of these variables.

---

## Individual component styles
You can customize individual components by changing the following values.

### Accordions

### Buttons

---

<!-- <Button 
  btnIcon="bx:save"
  width="full"
  on:click={saveTheme}
>
  Save theme
</Button> -->

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
