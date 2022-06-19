<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { browser } from "$app/env";
  import { Button, Input, Select, ToastContent } from "/src/lib";

  let themes = [];

  let fannyPackUiTheme = {
    colors: [
      // Main Colors
      ["--dark-purple", "#603cba"],
      ["--green", "#00a300"],
      ["--blue", "#2d89ef"],
      ["--yellow", "#ffc40d"],
      ["--red", "#ee1111"],
      // Neutral Colors
      ["--black", "#000000"],
      ["--very-dark-gray", "#343434"],
      ["--dark-gray", "#797979"],
      ["--gray", "#a0a0a0"],
      ["--light-gray", "#c7c7c7"],
      ["--very-light-gray", "#e5e5e5"],
      ["--white", "#ffffff"],
    ],
    sizes: [
      ["--padding-sm", "5", "px"],
      ["--padding-md", "10", "px"],
      ["--padding-lg", "15", "px"],
      ["--border-radius", "3", "px"],
      ["--font-size-sm", "12", "px"],
      ["--font-size-base", "16", "px"],
      ["--font-size-lg", "20", "px"],
      ["--font-weight-light", "100", ""],
      ["--font-weight-normal", "400", ""],
      ["--font-weight-bold", "700", ""],
    ],
    globalComponentColors: [
      ["--primary-color", ["--dark-purple", "#603cba"]],
      ["--secondary-color", ["--very-dark-gray", "#343434"]],
      ["--tertiary-color", ["--white", "#ffffff"]],
      ["--info-color", ["--blue", "#2d89ef"]],
      ["--success-color", ["--green", "#00a300"]],
      ["--warning-color", ["--yellow", "#ffc40d"]],
      ["--error-color", ["--red", "#ee1111"]],
      ["--border-color", ["--light-gray", "#c7c7c7"]],
      ["--text-color", ["--very-dark-gray", "#343434"]],
      ["--disabled-text-color", ["--light-gray", "#c7c7c7"]],
      ["--disabled-bg-color", ["--black", "#000000"]],
    ],
    individualComponentVariables: {
      // accordion: [],
      buttons: {
        colors: [
          ["--fpui-btn-primary-text-color", ["--white", "#ffffff"]],
          ["--fpui-btn-secondary-text-color", ["--white", "#ffffff"]],
          ["--fpui-btn-tertiary-text-color", ["--dark-purple", "#603cba"]],
        ],
        sizes: [
          // The arrays that have a nested array should display select boxes that are populated with the global colors or sizes.
          ["--fpui-btn-padding-sm", ["--padding-sm", "5px"]],
          ["--fpui-btn-padding-md", ["--padding-md", "10px"]],
          ["--fpui-btn-padding-lg", ["--padding-lg", "15px"]],
          ["--fpui-btn-border-radius", ["--border-radius", "3px"]],
          ["--fpui-btn-font-weight", ["--font-weight-normal", "400"]],
          // The arrays that have 3 strings should show an input field and a dropdown box with units (e.g. "px", "rem", "em", etc).
          ["--fpui-btn-icon-margin-sm", "3", "px"],
          ["--fpui-btn-icon-margin-md", "6", "px"],
          ["--fpui-btn-icon-margin-lg", "9", "px"],
          // This one should only display a select box with an "s" after it. The user should not be able to change the unit.
          ["--fpui-btn-icon-disabled-spin-speed", "1.5", "s"],
        ],
      },
    },
  };
  
  // let customTheme = {
  //   colors: [
  //     ["--demo-color-name", "#603cba"],
  //   ],
  //   globalComponentColors,
  //   individualComponentVariables,    
  // };

  let selectedTheme = { text: "", value: fannyPackUiTheme };
  $: {
    if (selectedTheme.text) {
      setSelectedTheme(selectedTheme.text);
    }
  }

  // $: This comment preserves the syntax highlighting.
  
  let newThemeName = "";
  let content = [];
  let units = ["px", "%", "rem", "em"];

  onMount(() => {
    if (!localStorage.getItem("themes")) {
      // The `initThemes` array was going to contain objects like this: { name: "custom", css: "" }, but the <Select> component takes object arrays with `text` and `value` properties. So it is easier to just use "theme" objects with `text` and `value` properties.
      let initThemes = [{ text: "Fanny Pack UI", value: fannyPackUiTheme }];
      // let initThemes = [{ text: "custom", value: customTheme }];
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

  function resetTheme() {
    if (browser) {
      let confirmation = confirm(`Are you sure you want to reset the "${selectedTheme.text}" theme to the Fanny Pack UI theme defaults?`);
      if (confirmation) {
        alert("TODO: Reset theme back to defaults.");
      }
    }
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
   * Update the values of the CSS variables when the user changes them in the UI.
   * See https://www.w3schools.com/css/css3_variables_javascript.asp
   */
  function updateCssVariable(variableType, variableName, value, unit) {
    console.log("CSS Variable:", variableName, "New Value:", value);
    // Get the root element
    let root = document.querySelector(":root");
    // Set the value of the CSS variable to the selected value.
    if (variableType === "color") {
      root.style.setProperty(variableName, `var(${value})`);
    }
    if (variableType === "size") {
      root.style.setProperty(variableName, value + unit);
    }
    saveTheme();
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
    // * As I loop through the `value` object in the `selectedTheme`, convert hex values to RGB: hexToRgb("#fbafff"); This will preserve alpha values for things like fill colors in a line/area chart. 
    // * Convert the second value in each of the `selectedTheme.value.globalComponentColors` and `selectedTheme.value.individualComponentVariables` array to a CSS variable reference value: `var(--css-variable-name)`
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
//   --fpui-btn-tertiary-text-color: var(--primary-color);
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
TODOS: 
* Instead of requiring users to create neutral colors that are used in the components (for things like border colors, background colors in the DropZone, etc) I want to let users create the color palette they want and then let them specify those colors in the global and individual component styles. I will also set default values for the component styles to give users an idea of what they might want to use for the components. Maybe I will create a "Fanny Pack UI" theme that will use the color palette and other variables that I use for this app (and users won't be able to delete this theme from their list of themes).
    * START HERE: I need to create this "wizard" with my "Fanny Pack UI" theme as an optional theme. Once that one is finished, then I can work on the "custom" theme. That should speed up this process.
* Since I am creating this "wizard" to create a theme file, I can probably remove --fpui- CSS variables in the theme.css file and just reference the same variables from the theme.css file. For example, The theme.css file has a --primary-color variable and the theme.css file has a --primary-color variable. So I would replace all references to --primary-color with --primary-color. If I do this, then I need to make sure to update those variables throughout the components so they reference the non --fpui- variable and instead reference the one from the theme.css file.


Customize your theme and download the files to insert into your project. The download button is at the bottom of the page.

<!-- <button on:click={() => hexToRgb("#fbafff", 0.5)}>Test Hex to RGB</button> -->

---

## Manage themes
Create your own themes or use the default "Fanny Pack UI" theme. Each theme is saved in your browser storage so you can access and edit them later.

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
    btnColor="secondary"
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
    btnColor="secondary"
    btnIcon="mdi:checkbox-marked-circle-plus-outline"
    width="full"
  >
    Update theme name
  </Button>
</form>

<br><br>

<Button
  type="button"
  btnColor="secondary"
  btnIcon="fluent:arrow-reset-24-filled"
  width="full"
  on:click={resetTheme}
>
  Reset "{selectedTheme.text}" theme to Fanny Pack UI theme defaults
</Button>

<br><br>

<Button
  type="button"
  btnColor="secondary"
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
            --custom-btn-box-shadow="none"
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


## Global component color variables
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
    {#each selectedTheme.value.globalComponentColors as globalColor}
      <tr>
        <td>{globalColor[0]}</td>
        <td><Select optionsArray={selectedTheme.value.colors} arrayType="array" displayElementAtIndex={0} size="sm" bind:selectedOption={globalColor[1]} on:change={(event) => updateCssVariable("color", globalColor[0], event.detail[0])} /></td>
      </tr>
    {/each}
  </tbody>
</table>

TODO: Reference the variables from the above sections (colors, padding, borders, etc) in drop-down menus for each of these variables.

---

## Global component size variables

<table>
  <thead>
    <tr>
      <th>Size variable name</th>
      <th>Size value</th>
      <th>Unit</th>
    </tr>
  </thead>
  <tbody>
    {#each selectedTheme.value.sizes as size}
      <tr>
        <td>{size[0]}</td>
        <td><Input type="number" size="sm" bind:value={size[1]} on:change={(event) => updateCssVariable("size",size[0], event.target.value, size[2])} /></td>
        <!-- If there is a unit specified for the size variable, then show a <Select> component with the unit options. -->
        {#if size[2]}
          <td><Select optionsArray={units} arrayType="string" bind:selectedOption={size[2]} size="sm" on:change={(event) => updateCssVariable("size", size[0], size[1], event.detail)} /></td>
        {/if}
      </tr>
    {/each}
  </tbody>
</table>


---

## Individual component variables
You can customize individual components by changing the following values.

### Accordions

### Buttons
<Button btnColor="primary">
  Primary Button
</Button>

<Button btnColor="secondary">
  Secondary Button
</Button>

<Button btnColor="tertiary">
  Tertiary Button
</Button>

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

  /* Button */
  :root {
    --fpui-btn-primary-text-color: white;
    --fpui-btn-secondary-text-color: white;
    --fpui-btn-tertiary-text-color: var(--primary-color);
    /* The --fpui-btn-padding variables will make the button larger or smaller. */
    --fpui-btn-padding-sm: var(--padding-sm);
    --fpui-btn-padding-md: var(--padding-md);
    --fpui-btn-padding-lg: var(--padding-lg);
    /* The --fpui-btn-icon-margin variables provide the space between the button text and the button icon. */
    --fpui-btn-icon-margin-sm: 3px;
    --fpui-btn-icon-margin-md: 7px;
    --fpui-btn-icon-margin-lg: 12px;
    --fpui-btn-font-weight: var(--font-weight-normal);
    /* --fpui-btn-icon-spin-speed: The speed at which icons for disabled buttons will spin when a button has a loading/disabled state. */
    --fpui-btn-icon-disabled-spin-speed: 1.5s;
    --fpui-btn-border-radius: var(--border-radius);
  }
</style>
