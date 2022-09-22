<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { browser } from "$app/environment";
  // import Colorpicker from "@budibase/colorpicker";
  import { Button, Checkbox, Input, Select, ToastContent } from "/src/lib";
  import themeFile from "/src/lib/fpui-theme.css";

  let themes = [];

  let theme = {
    fpNonNeutralColors: [],
    fpNeutralColors: [],
    grayscaleNeutralColors: [],
    customNonNeutralColors: [],
    customNeutralColors: [],
    mainColors: [],
    sizes: [],
  };

  let activeTab = "fpNonNeutralColors";
  let content = [];
  let units = ["px", "%", "rem", "em"];
  // The `referenceVariables` object is used to populate the select boxes in the "Main color variables" section.
  let referenceVariables = {
    fpNonNeutralColors: [],
    fpNeutralColors: [],
    grayscaleNeutralColors: [],
    customNonNeutralColors: [],
    customNeutralColors: [],
    includedVariables: [],
  };
  let includedColorSets = {
    fpNonNeutralColors: false,
    fpNeutralColors: false,
    grayscaleNeutralColors: false,
    customNonNeutralColors: false,
    customNeutralColors: false,
  };

  onMount(() => {
    parseThemeFile();
  });

  /**
   * This function will take the name of a block of CSS variables (as defined in the `fpui-theme.css` file),
   * find that block in the `themeFile`, and return all the variables that are defined in that block.
   */
  function findMatchingVariableBlock(blockName) {
    try {
      // Find the text between "/* Block Name */" (e.g. /* FP Non-Neutral Colors */) and the closing `}`.
      // See https://stackoverflow.com/a/40782646
      let regex = new RegExp(`(?<=\/\\* ${blockName} \\*\/\\s+).*?(?=\\s+})`, "gs");
      let matchingVariableBlock = themeFile.match(regex)[0];
      // console.log("Matching Variable Block:", matchingVariableBlock);
      return matchingVariableBlock;
    }
    catch(err) {
      console.error("findMatchingVariableBlock Error:", err);
    }
  }

  /**
   * This function will:
   * (1) match the CSS variable name within the matchingVariableBlock, 
   * (2) remove the colon from the end of the CSS variable name, 
   * (3) populate the theme object by pushing an object of the form 
   * `{ label: varName, value: "" }` to each `theme[themePropertyName]` array, and
   * (4) populate the `referenceVariables` object.
   */
  function matchCssVariableName(matchingVariableBlock, themePropertyName, namePrefix, nameSuffix) {
    try {
      // Match strings that begin with a specific prefix and end with specific suffix: https://stackoverflow.com/a/20169897
      let nameRegex = new RegExp(namePrefix + "[A-Za-z0-9\-\]*" + nameSuffix, "gi");
      // String.matchAll(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll#regexp.exec_and_matchall.
      let matchingNamesIterator = matchingVariableBlock.matchAll(nameRegex);
      // console.log("matchingNamesIterator:", matchingNamesIterator);
      for (const matchingVarName of matchingNamesIterator) {
        // console.log("matchingVarName:", matchingVarName[0]);
        // Remove the colon (:) from the end of each CSS variable `name` and push the variable object into the array that matches the theme property name that is passed into this function.
        let varNameWithoutColon = matchingVarName[0].slice(0, -1);
        theme[themePropertyName].push({ label: varNameWithoutColon, value: "" });
        // Populate the arrays in the `referenceVariables` object with reference variables that have the form `var(--variable-name)`.
        if (themePropertyName === "fpNonNeutralColors") {
          referenceVariables.fpNonNeutralColors.push(`var(${varNameWithoutColon})`);
        }
        if (themePropertyName === "fpNeutralColors") {
          referenceVariables.fpNeutralColors.push(`var(${varNameWithoutColon})`);
        } 
        if (themePropertyName === "grayscaleNeutralColors") {
          referenceVariables.grayscaleNeutralColors.push(`var(${varNameWithoutColon})`);
        }
        if (themePropertyName === "customNonNeutralColors") {
          referenceVariables.customNonNeutralColors.push(`var(${varNameWithoutColon})`);
        }
        if (themePropertyName === "customNeutralColors") {
          referenceVariables.customNeutralColors.push(`var(${varNameWithoutColon})`);
        }
      }
      // console.log("referenceVariables:", referenceVariables);
    }
    catch(err) {
      console.error("matchCssVariableValue Error:", err);
    }
  }

  /**
   * This function will:
   * (1) match the CSS variable value within the matchingVariableBlock,
   * (2) remove the semicolon from the end of the CSS variable name, 
   * (3) replace the empty color value in the theme object with the matching color value.
   */
  function matchCssVariableValue(matchingVariableBlock, themePropertyName) {
    try {
      // `valueRegex` will match any of the following types of strings:
      // * HEXa values - strings that begin with "#" and end with ";"
      // * RGBa values - strings that begin with "rgba?\(" and end with "\);" - The "a" in rgba is optional and numbers, periods, commas, and spaces (\s) can be anywhere between the prefix "rgba?\(" and the suffix "\);" of the regex.
      // * var() values - strings that begin with "var\(" and end with "\);"
      // * CSS length/size values (e.g. 10px, 20%).
      let valueRegex = /#[A-Fa-f0-9]*;|rgba?\([0-9.,\s]*\);|var\([A-Za-z0-9\-]*\);|[0-9a-z\%]*;/gi;
      // let valueRegex = /#[A-Fa-f0-9]*;/gi;
      // let valueRegex = /var\([A-Za-z0-9\-]*\);/gi;
      let matchingValuesIterator = matchingVariableBlock.matchAll(valueRegex);
      // console.log("matchingValuesIterator:", matchingValuesIterator);
      let matchingValuesIndex = 0;
      for (const matchingVarValue of matchingValuesIterator) {
        // console.log("matchingVarValue:", matchingVarValue[0]);
        // Remove the semicolon (;) from the end of each `value`.
        let varValueWithoutSemicolon = matchingVarValue[0].slice(0, -1);
        // Replace the empty color value in the theme object with the matching color value.
        theme[themePropertyName][matchingValuesIndex].value = varValueWithoutSemicolon;
        matchingValuesIndex++;
      }
    }
    catch(err) {
      console.error("matchCssVariableValue Error:", err);
    }
  }

  /**
   * This function will parse the `fpui-theme.css` file and create a `theme` object based on the CSS variables in that file.
   * This will allow me to work with a single source of truth (the `fpui-theme.css` file) for the theme. 
   * This way, when I add new components or change something in the theme I only need to make changes in the `fpui-theme.css`
   * file and both the components and this "Customize Theme" page will be updated.
   */
  function parseThemeFile() {
    try {
      // console.log("CSS Theme File:", themeFile);

      let regexPrefix = "--";
      let regexSuffix = ":";

      let blockName = "FP Non-Neutral Colors";
      let themePropertyName = "fpNonNeutralColors";
      let matchingVariableBlock = findMatchingVariableBlock(blockName);
      matchCssVariableName(matchingVariableBlock, themePropertyName, regexPrefix, regexSuffix);
      matchCssVariableValue(matchingVariableBlock, themePropertyName);

      blockName = "FP Neutral Colors";
      themePropertyName = "fpNeutralColors";
      matchingVariableBlock = findMatchingVariableBlock(blockName);
      matchCssVariableName(matchingVariableBlock, themePropertyName, regexPrefix, regexSuffix);
      matchCssVariableValue(matchingVariableBlock, themePropertyName);

      blockName = "Grayscale Neutral Colors";
      themePropertyName = "grayscaleNeutralColors";
      matchingVariableBlock = findMatchingVariableBlock(blockName);
      matchCssVariableName(matchingVariableBlock, themePropertyName, regexPrefix, regexSuffix);
      matchCssVariableValue(matchingVariableBlock, themePropertyName);

      blockName = "Main Colors";
      themePropertyName = "mainColors";
      matchingVariableBlock = findMatchingVariableBlock(blockName);
      matchCssVariableName(matchingVariableBlock, themePropertyName, regexPrefix, regexSuffix);
      matchCssVariableValue(matchingVariableBlock, themePropertyName);

      blockName = "Size Variables";
      themePropertyName = "sizes";
      matchingVariableBlock = findMatchingVariableBlock(blockName);
      matchCssVariableName(matchingVariableBlock, themePropertyName, regexPrefix, regexSuffix);
      matchCssVariableValue(matchingVariableBlock, themePropertyName);

      console.log("THEME OBJECT:", theme);
    }
    catch(err) {
      console.error("parseThemeFile Error:", err);
    }
  }

  function addColor(colorSet) {
    try {
      // Push a new color array to the `colors` array.
      theme[colorSet].push({ label: "--variable-name", value: "#000000" });
      theme = theme;
    }
    catch(err) {
      console.log("addColor", err);
    }
  }

  function removeColor(colorSet, index) {
    try {
      theme[colorSet].splice(index, 1);
      theme = theme;
    }
    catch(err) {
      console.log("removeColor", err);
    }
  }

  /**
   * Update the values of the CSS variables when the user changes them in the UI.
   * See https://www.w3schools.com/css/css3_variables_javascript.asp
   */
  function updateCssVariable(variableType, variableName, variableValue) {
    console.log("CSS Variable:", variableName, "New Value:", variableValue);
    // Get the root element
    let root = document.querySelector(":root");
    // Set the value of the CSS variable to the selected value.
    root.style.setProperty(variableName, variableValue);
    // if (variableType === "color") {
    //   root.style.setProperty(variableName, variableValue);
    // }
    // if (variableType === "size") {
    //   root.style.setProperty(variableName, variableValue);
    // }
  }

  function includeColorSet() {
    referenceVariables.includedVariables.length = 0;
    for (const colorSet in includedColorSets) {
      console.log("colorSet:", colorSet, includedColorSets[colorSet]);
      if (includedColorSets[colorSet]) {
        referenceVariables.includedVariables.push(...referenceVariables[colorSet]);
      }
    }
    referenceVariables.includedVariables = referenceVariables.includedVariables;
    console.log("referenceVariables:", referenceVariables);
  }

  // NOTE: Neither the hexToRgb nor the rgbToHex functions are being used, but I am keeping them around in case I do need to use them later.

  /**
   * The <input type="color"> elements can only read hex values as input. So I need to convert rgb values to hex and then pass the result to the bound <input type="color"> elements.
   * See https://stackoverflow.com/a/13070198 and https://stackoverflow.com/a/5624139
   */
  function componentToHex(c) {
    let hex = parseInt(c).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  function rgbToHex(rgbVal) {
    let stringOfNumbers = rgbVal.split("(")[1].split(")")[0];
    let arrayOfNumbers = stringOfNumbers.split(",");
    console.log("arrayOfNumbers:", arrayOfNumbers);

    console.log("componentToHex:", componentToHex(arrayOfNumbers[0]), componentToHex(arrayOfNumbers[1]), componentToHex(arrayOfNumbers[2]));
    return "#" + componentToHex(arrayOfNumbers[0]) + componentToHex(arrayOfNumbers[1]) + componentToHex(arrayOfNumbers[2]);
  }

  // NOTE: Neither the hexToRgb nor the rgbToHex functions are being used, but I am keeping them around in case I do need to use them later.

  /**
   * When a user enters a color value through a default color picker element, the color value is return as a hex value.
   * But I want to define color values in RGBA format in order to preserve alpha values for things like fill colors in a line/area chart. 
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
    // TODOS (for the download theme function):
    // * Create an "Additional Custom Variables Block" for "any other variables that you frequently use throughout your app" at the top of the file. Define some starter font stacks underneath a "Typography" section in this block.
    // * Make sure to include the utility classes at the bottom of the generated `theme.css` file.
    // * UPDATE: I don't need to convert hex to RGBa or vice versa because the color picker that I am using supports HEXa values. As I loop through the `value` object in the `theme`, convert hex values to RGB: hexToRgb("#fbafff"); This will preserve alpha values for things like fill colors in a line/area chart.
    // * Convert the second value in each of the `theme.mainColors` and `theme.individualComponentVariables` array to a CSS variable reference value: `var(--css-variable-name)`
    console.log("downloadTheme");



    // Convert the values in the `theme` object to a formatted string.
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
    a.setAttribute("download", "theme.css"); // Set download filename
    a.click(); // Start downloading
  }
</script>


# Customize Theme

***This page is a work in progress.***

---

Customize your theme below then download a `theme.css` file that you can insert into your project. (The download button is at the bottom of this page.)

FYI: The Fanny Pack UI color palette borrows colors from the <a href="https://www.w3schools.com/w3css/w3css_color_metro.asp" target="_blank">Metro UI</a> color palette. The neutral colors in the Fanny Pack UI color palette are shades and tints of <a href="https://www.colorhexa.com/50404d" target="_blank">purple taupe</a>).

---

TODOS: 
* Read the fpui-theme.css file to populate the variables and their values initially, but then bind all the user-defined options (i.e. the `<Select>` and `<Input>` components) to the `theme` object so I can create a downloadable theme.css file.
* Instead of requiring users to create neutral colors that are used in the components (for things like border colors, background colors in the DropZone, etc) I want to let users create the color palette they want and then let them specify those colors in the global and individual component styles. I will also set default values for the component styles to give users an idea of what they might want to use for the components. Maybe I will create a "Fanny Pack UI" theme that will use the color palette and other variables that I use for this app (and users won't be able to delete this theme from their list of themes).
    * START HERE: I need to create this "wizard" with my "Fanny Pack UI" theme as an optional theme. Once that one is finished, then I can work on the "custom" theme. That should speed up this process.
* Since I am creating this "wizard" to create a theme file, I can probably remove `--fpui-` CSS variables in the theme.css file and just reference the same variables from the theme.css file. For example, The theme.css file has a `--fpui-primary-color` variable and the theme.css file has a `--primary-color` variable. So I would replace all references to `--fpui-primary-color` with `--primary-color`. If I do this, then I need to make sure to update those variables throughout the components so they reference the non `--fpui-` variable and instead reference the one from the theme.css file.

---

## Color palette
Add as many color variables as you want. Each color variable name needs to follow the [CSS variable naming convention](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#basic_usage) - i.e. the name needs to begin with double hyphens (`--`) and each word is separated by a hyphen.

In the "Main color variables" section (below) you will use your color palette to define your main component colors, including the neutral colors that are used throughout the components. The Fanny Pack UI color palette uses seven neutral colors (black, white, and five shades and tints of <a href="https://www.colorhexa.com/50404d" target="_blank">purple taupe</a>), so you will need to have seven neutral colors in your color palette. That might seem like a lot of neutral colors, but it is actually pretty easy to come up with that many. You can either use some neutral colors from the "FP Neutral Colors" or the "Grayscale Neutral Colors" tabs below or you can create your own set of neutral colors. Here is one idea to create your own set of neutral colors:

1. Go to <a href="https://www.colorhexa.com/" target="_blank">ColorHexa</a>.
2. Take your primary color, enter it into the search bar, and press Enter.
3. Once you are on the page for your primary color, scroll down until you find the heading "Tones of [your primary color]". 
4. Find a tone that has a good amount of gray in it - maybe one of the first two or three tones on the left side of the spectrum. Click on that tone.
5. Once you are on the new page for that tone, scroll down to the heading "Shades and Tints of [the tone you selected]".
6. Select a shade or tint to use as your "medium" neutral color - maybe the 3rd, 4th, or 5th color from the left in the tint spectrum.
7. Once you have selected your "medium" neutral color you can pick two neutral colors that are darker than your "medium" neutral color and two that are lighter than your "medium" neutral color. You might want to pick colors that are about three or four shades/tints away from each other to give enough contrast between each neutral color, but you decide what looks best for your color palette.
8. That will give you five neutral colors and if you use black (`#000000`) and white (`#ffffff`) as your darkest and lightest neutral colors, respectively, (or shades/tints that are close to black and white) then you will have the seven neutral colors you need.

<br>

IDEAS:
* Users could use any of the colors from the following tabs in their theme or remove one or all of these sets of colors and start from scratch with their own color palette.
* How should I demo to the user how their color palette will look? I could import the Button component and show the three versions (i.e. primary, secondary, tertiary) along with their `inverted` variants to show what the user's. I could also import the Date Picker component because that one includes both an input element along with a button (to demo borders, hover states, etc).

<div class="tab-bar">
  <div class="tab" class:active={activeTab === "fpNonNeutralColors"} on:click={() => activeTab = "fpNonNeutralColors"}>FP Non-Neutral Colors</div>
  <div class="tab" class:active={activeTab === "fpNeutralColors"} on:click={() => activeTab = "fpNeutralColors"}>FP Neutral Colors</div>
  <div class="tab" class:active={activeTab === "grayscaleNeutralColors"} on:click={() => activeTab = "grayscaleNeutralColors"}>Grayscale Neutral Colors</div>
  <div class="tab" class:active={activeTab === "customNonNeutralColors"} on:click={() => activeTab = "customNonNeutralColors"}>Custom Non-Neutral Colors</div>
  <div class="tab" class:active={activeTab === "customNeutralColors"} on:click={() => activeTab = "customNeutralColors"}>Custom Neutral Colors</div>
</div>

<div class="color-sets">
  {#if activeTab === "fpNonNeutralColors"}
    <div id="non-neutral-colors">
      <table>
        <thead>
          <tr>
            <th>Color variable name</th>
            <th>Color value</th>
            <th style="text-align:center">Remove color</th>
          </tr>
        </thead>
        <tbody>
          {#each theme.fpNonNeutralColors as color, index}
            <tr>
              <td><Input size="sm" bind:value={color.label} /></td>
      <!-- TODO: The <Colorpicker /> component is giving me deployment errors. If I want to use it, then I will probably have to rewrite it with current SvelteKit configs. -->
              <!-- <td><Colorpicker width="88px" height="28px" bind:value={color.value} /></td> -->
              <td><input type="color" bind:value={color.value} /></td>
              <td style="text-align:center">
                <Button
                  btnIcon="mdi:minus-circle"
                  size="lg"
                  --custom-btn-padding="0px 5px"
                  --custom-btn-border-color="transparent"
                  --custom-btn-box-shadow="none"
                  --custom-btn-background-color="transparent"
                  --custom-btn-text-color="var(--dark-purple)"
                  on:click={() => removeColor("fpNonNeutralColors", index)}
                ></Button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <br>
      <Button btnIcon="mdi:plus-circle-outline" on:click={() => addColor("fpNonNeutralColors")}>
        Add color
      </Button>
    </div>
  {:else if activeTab === "fpNeutralColors"}
    <div id="fp-neutral-colors">
      <table>
        <thead>
          <tr>
            <th>Color variable name</th>
            <th>Color value</th>
            <th style="text-align:center">Remove color</th>
          </tr>
        </thead>
        <tbody>
          {#each theme.fpNeutralColors as color, index}
            <tr>
              <td><Input size="sm" bind:value={color.label} /></td>
      <!-- TODO: The <Colorpicker /> component is giving me deployment errors. If I want to use it, then I will probably have to rewrite it with current SvelteKit configs. -->
              <!-- <td><Colorpicker width="88px" height="28px" bind:value={color.value} /></td> -->
              <td><input type="color" bind:value={color.value} /></td>
              <td style="text-align:center">
                <Button
                  btnIcon="mdi:minus-circle"
                  size="lg"
                  --custom-btn-padding="0px 5px"
                  --custom-btn-border-color="transparent"
                  --custom-btn-box-shadow="none"
                  --custom-btn-background-color="transparent"
                  --custom-btn-text-color="var(--dark-purple)"
                  on:click={() => removeColor("fpNeutralColors", index)}
                ></Button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <br>
      <Button btnIcon="mdi:plus-circle-outline" on:click={() => addColor("fpNeutralColors")}>
        Add color
      </Button>
    </div>
  {:else if activeTab === "grayscaleNeutralColors"}
    <div id="grayscale-neutral-colors">
      <table>
        <thead>
          <tr>
            <th>Color variable name</th>
            <th>Color value</th>
            <th style="text-align:center">Remove color</th>
          </tr>
        </thead>
        <tbody>
          {#each theme.grayscaleNeutralColors as color, index}
            <tr>
              <td><Input size="sm" bind:value={color.label} /></td>
      <!-- TODO: The <Colorpicker /> component is giving me deployment errors. If I want to use it, then I will probably have to rewrite it with current SvelteKit configs. -->
              <!-- <td><Colorpicker width="88px" height="28px" bind:value={color.value} /></td> -->
              <td><input type="color" bind:value={color.value} /></td>
              <td style="text-align:center">
                <Button
                  btnIcon="mdi:minus-circle"
                  size="lg"
                  --custom-btn-padding="0px 5px"
                  --custom-btn-border-color="transparent"
                  --custom-btn-box-shadow="none"
                  --custom-btn-background-color="transparent"
                  --custom-btn-text-color="var(--dark-purple)"
                  on:click={() => removeColor("grayscaleNeutralColors", index)}
                ></Button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <br>
      <Button btnIcon="mdi:plus-circle-outline" on:click={() => addColor("grayscaleNeutralColors")}>
        Add color
      </Button>
    </div>
  {:else if activeTab === "customNonNeutralColors"}
    <p>Create your own custom set of non-neutral colors.</p>
    <div id="your-neutral-colors">
      <table>
        <thead>
          <tr>
            <th>Color variable name</th>
            <th>Color value</th>
            <th style="text-align:center">Remove color</th>
          </tr>
        </thead>
        <tbody>
          {#each theme.customNonNeutralColors as color, index}
            <tr>
              <td><Input size="sm" bind:value={color.label} /></td>
      <!-- TODO: The <Colorpicker /> component is giving me deployment errors. If I want to use it, then I will probably have to rewrite it with current SvelteKit configs. -->
              <!-- <td><Colorpicker width="88px" height="28px" bind:value={color.value} /></td> -->
              <td><input type="color" bind:value={color.value} /></td>
              <td style="text-align:center">
                <Button
                  btnIcon="mdi:minus-circle"
                  size="lg"
                  --custom-btn-padding="0px 5px"
                  --custom-btn-border-color="transparent"
                  --custom-btn-box-shadow="none"
                  --custom-btn-background-color="transparent"
                  --custom-btn-text-color="var(--dark-purple)"
                  on:click={() => removeColor("customNonNeutralColors", index)}
                ></Button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <br>
      <Button btnIcon="mdi:plus-circle-outline" on:click={() => addColor("customNonNeutralColors")}>
        Add color
      </Button>
    </div>
  {:else if activeTab === "customNeutralColors"}
    <p>Create your own custom set of neutral colors.</p>
    <div id="your-neutral-colors">
      <table>
        <thead>
          <tr>
            <th>Color variable name</th>
            <th>Color value</th>
            <th style="text-align:center">Remove color</th>
          </tr>
        </thead>
        <tbody>
          {#each theme.customNeutralColors as color, index}
            <tr>
              <td><Input size="sm" bind:value={color.label} /></td>
      <!-- TODO: The <Colorpicker /> component is giving me deployment errors. If I want to use it, then I will probably have to rewrite it with current SvelteKit configs. -->
              <!-- <td><Colorpicker width="88px" height="28px" bind:value={color.value} /></td> -->
              <td><input type="color" bind:value={color.value} /></td>
              <td style="text-align:center">
                <Button
                  btnIcon="mdi:minus-circle"
                  size="lg"
                  --custom-btn-padding="0px 5px"
                  --custom-btn-border-color="transparent"
                  --custom-btn-box-shadow="none"
                  --custom-btn-background-color="transparent"
                  --custom-btn-text-color="var(--dark-purple)"
                  on:click={() => removeColor("customNeutralColors", index)}
                ></Button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <br>
      <Button btnIcon="mdi:plus-circle-outline" on:click={() => addColor("customNeutralColors")}>
        Add color
      </Button>
    </div>
  {/if}
</div>

<br><br>

## Main color variables
**TODOS:** 
* These values are being read from the fpui-theme.css file, but they probably need to be read from the theme object because the theme object will get updated by the user. The fpui-theme.css file does not get updated by the user.
* Do I want to call `updateCssVariable` when a user sets the Main Colors or changes the size variables? Maybe. This might be an easy way for users to see the effects of their theme on the components throughout the documentation. 
    * I THINK THIS MIGHT BE DONE NOW, BUT I NEED TO DOUBLE-CHECK IT: I should probably change the CSS variables that the layouts and pages are referencing so things like the navigation do not get changed when a user changes their Main Colors. But I could still change the `--fpui-*` color variables throughout the docs so users could still see how their components look with their color palette. All I need to do is change the main color references, e.g. `var(--primary-color)`, to `var(--docs-primary-color)`.

These styles are used throughout the Fanny Pack UI components. Updating these variables will handle almost all of your theme customizations. If you want to customize individual components, then you can change the values for any of the individual components in the `theme.css` file that you download at the bottom of this page.

NOTE: Each component style that can be customized has a fallback value. So, for example, if you do not provide a color for the background of the primary buttons, then the components will still display in your UI, but the colors might not match your theme. So you can either set all the values for all these main color variables right now or you can edit them later as needed when you implement a new component in your app and see what it looks like in your app.

---

Select the color sets that you want to include in your theme file. Then set the main colors that you want to use in your theme.

*NOTE: After you select your color sets you will see that the main colors below are initially set to the Fanny Pack main colors. That is intentional to provide an example.*

<br>

<Checkbox
  bind:checked={includedColorSets.fpNonNeutralColors}
  label="FP Non-Neutral Colors"
  on:change={includeColorSet}
/>

<Checkbox
  bind:checked={includedColorSets.fpNeutralColors}
  label="FP Neutral Colors"
  on:change={includeColorSet}
/>

<Checkbox
  bind:checked={includedColorSets.grayscaleNeutralColors}
  label="Grayscale Neutral Colors"
  on:change={includeColorSet}
/>

<Checkbox
  bind:checked={includedColorSets.customNonNeutralColors}
  label="Custom Non-Neutral Colors"
  on:change={includeColorSet}
/>

<Checkbox
  bind:checked={includedColorSets.customNeutralColors}
  label="Custom Neutral Colors"
  on:change={includeColorSet}
/>

<br>

<table>
  <thead>
    <tr>
      <th>Variable name</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    {#each theme.mainColors as mainColor, index (mainColor.label)}
      <tr>
        <td>{mainColor.label}</td>
        <td>
          {#if referenceVariables.includedVariables.length > 0}
            <Select
              options={referenceVariables.includedVariables}
              size="sm"
              bind:value={mainColor.value}
              on:change={(event) => updateCssVariable("color", mainColor.label, event.detail)}
            />
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<br>

## Size variables
The size variables are used to set values for things like padding (for buttons and other elements), the roundness or squareness of borders (i.e. `border-radius`), font sizes, etc. You are welcome to keep the default sizes for each of the following variables or change them however you want.

<br>

<table>
  <thead>
    <tr>
      <th>Size variable name</th>
      <th>Size value</th>
      <!-- <th>Unit</th> -->
    </tr>
  </thead>
  <tbody>
    {#each theme.sizes as size, index}
      <tr>
        <td>{size.label}</td>
        <td>
          <Input
            id={`size-input-${index}`}
            type="text"
            size="sm"
            bind:value={size.value}
            on:keyup={(event) => {
              if (event && (event.key === "Enter" || event.key === "Escape")) {
                document.getElementById(`size-input-${index}`).blur();
              }
            }}
            on:blur={() => updateCssVariable("size", size.label, event.target.value)}
          />
        </td>
        <!-- If there is a unit specified for the size variable, then show a <Select> component with the unit options. -->
        <!-- {#if size.unit}
          <td>
            <Select
              options={units}
              bind:value={size.unit}
              size="sm"
              on:change={(event) => updateCssVariable("size", size.label, size.value, event.detail)}
            />
          </td>
        {/if} -->
      </tr>
    {/each}
  </tbody>
</table>

<br><br>

<Button
  type="button"
  btnColor="secondary"
  btnIcon="mi:document-download"
  width="full"
  on:click={downloadTheme}
>
  Download theme
</Button>


<style>
  .tab-bar {
    display: flex;
    border: 10px solid var(--docs-secondary-color);
    border-bottom: none;
    border-radius: var(--docs-border-radius) var(--docs-border-radius) 0 0;
    background-color: var(--docs-secondary-color);
    color: var(--white);

    & .tab {
      padding: 10px 15px 15px 15px;
      cursor: pointer;

      &.active {
        border-radius: var(--docs-border-radius) var(--docs-border-radius) 0 0;
        background-color: var(--white);
        color: var(--docs-secondary-color);
      }
    }
  }

  .color-sets {
    margin: 20px 0;
  }

  form {
    display: flex;
    align-items: flex-end;

    & .input-container {
      width: 600px;
      margin-right: 10px;
    }
  }
</style>
