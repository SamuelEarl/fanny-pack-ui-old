<script lang="ts">
  // import Prism from "prismjs";
  // // Svelte code highlighting: https://github.com/pngwn/prism-svelte
  // import "prism-svelte";
  import { Button, Select, Tooltip, Grid, Row, Col } from "/src/lib";

  let creatingAccount = false;
  let savingData = false;
  const colorOptions = [
    "var(--primary-color)",
    "var(--secondary-color)",
    "var(--tertiary-color)",
    "var(--white)",
    "var(--black)",
    "var(--transparent)"
  ];
  const sizeOptions = ["xs","sm","md","lg","xl"];
  let selectedBgColor = "var(--primary-color)";
  let selectedBorderColor = "var(--primary-color)";
  let selectedTextColor = "var(--white)";
  let selectedBtnPadding = "md";
  let selectedBtnFontSize = "md";
  let selectedBtnWidth = "auto";
  let showInteractiveButtons = true;

  function handleCreateAccount() {
    creatingAccount = true;
    setTimeout(() => creatingAccount = false, 3000);
  }

  function handleSaveData() {
    savingData = true;
    setTimeout(() => savingData = false, 3000);
  }

  function handleRefreshInteractiveBtns() {
    showInteractiveButtons = false;
    setTimeout(() => {
      showInteractiveButtons = true;
    }, 0);
  }
</script>


# Button

---

## Example Usage

<Button
  id="some-id"
  type="button"
  bgColor="var(--primary-color)"
  borderColor="var(--primary-color)"
  textColor="var(--white)"
  padding="md"
  fontSize="md"
  width="auto"
  disabled={creatingAccount}
  btnIcon="bi:person-plus-fill"
  btnIconDisabled="icomoon-free:spinner2"
  btnIconDisabledShouldSpin={true}
  btnIconSide="right"
  on:click={handleCreateAccount}
  rotateBtnIcon="45deg"
>
  Create Account
  <span slot="btnTextDisabled">Creating Account...</span>
</Button>

<br>

```
<script>
  import { Button } from "@fanny-pack-ui/svelte-kit";

  let creatingAccount = false;

  function handleCreateAccount() {
    creatingAccount = true;
    setTimeout(() => creatingAccount = false, 3000);
  }
</script>

<Button
  id="some-id"
  type="button"
  bgColor="var(--primary-color)"
  borderColor="var(--primary-color)"
  textColor="var(--white)"
  padding="md"
  fontSize="md"
  width="auto"
  disabled={creatingAccount}
  btnIcon="bi:person-plus-fill"
  btnIconDisabled="icomoon-free:spinner2"
  btnIconDisabledShouldSpin={true}
  btnIconSide="left"
  on:click={handleCreateAccount}
  rotateBtnIcon="45deg"
>
  Create Account
  <span slot="btnTextDisabled">Creating Account...</span>
</Button>
```

---

## Interactive Example

<div class="interactive-example">
  <div class="light-bg">
    {#if showInteractiveButtons}
      <Button
        bgColor={selectedBgColor}
        borderColor={selectedBorderColor}
        textColor={selectedTextColor}
        padding={selectedBtnPadding}
        fontSize={selectedBtnFontSize}
        width={selectedBtnWidth}
        disabled={creatingAccount}
        btnIcon="bi:person-plus-fill"
        btnIconDisabled="bi:gear-wide-connected"
        btnIconDisabledShouldSpin={true}
        btnIconSide="right"
        on:click={handleCreateAccount}
      >
        Create Account
        <span slot="btnTextDisabled">Creating Account...</span>
      </Button>
    {/if}
  </div>

  <div class="dark-bg">
    {#if showInteractiveButtons}
      <Button
        bgColor={selectedBgColor}
        borderColor={selectedBorderColor}
        textColor={selectedTextColor}
        padding={selectedBtnPadding}
        fontSize={selectedBtnFontSize}
        width={selectedBtnWidth}
        disabled={creatingAccount}
        btnIcon="bi:person-plus-fill"
        btnIconDisabled="bi:gear-wide-connected"
        btnIconDisabledShouldSpin={true}
        btnIconSide="right"
        on:click={handleCreateAccount}
      >
        Create Account
        <span slot="btnTextDisabled">Creating Account...</span>
      </Button>
    {/if}
  </div>
</div>

<br>

<Grid
  colPaddingX={10}
  colPaddingY={10}
  rowMarginsX={-10}
  equalColWidths
>
  <Row>
    <Col>
      <Select
        label="Background Color"
        options={colorOptions}
        bind:value={selectedBgColor}
        on:change={handleRefreshInteractiveBtns}
      />
    </Col>
    <Col>
      <Select
        label="Font Size"
        options={sizeOptions}
        bind:value={selectedBtnFontSize}
        on:change={handleRefreshInteractiveBtns}
      />
    </Col>
  </Row>
  <Row>
    <Col>
      <Select
        label="Border Color"
        options={colorOptions}
        bind:value={selectedBorderColor}
        on:change={handleRefreshInteractiveBtns}
      />
    </Col>
    <Col>
      <Select
        label="Padding"
        options={sizeOptions}
        bind:value={selectedBtnPadding}
        on:change={handleRefreshInteractiveBtns}
      />
    </Col>
  </Row>
  <Row>
    <Col>
      <Select
        label="Text Color"
        options={colorOptions}
        bind:value={selectedTextColor}
        on:change={handleRefreshInteractiveBtns}
      />
    </Col>
    <Col>
      <Select
        label="Width"
        options={["auto","full"]}
        bind:value={selectedBtnWidth}
        on:change={handleRefreshInteractiveBtns}
      />
    </Col>
  </Row>
</Grid>

---

## Icon Buttons
You can create buttons that have only icons (i.e. no text). Do not pass any slots in between the opening `<Button>` and closing `</Button>` tags and provide the `btnIcon` and/or `btnIconDisabled` props.

<Button
  btnIcon="ion:save-sharp" 
  padding="lg"
  fontSize="lg"
  disabled={savingData}
  title="Save File"
  on:click={handleSaveData}
></Button>

<br>

```
<script>
  let savingData = false;

  function handleSaveData() {
    savingData = true;
    setTimeout(() => savingData = false, 3000);
  }
</script>

<Button
  btnIcon="ion:save-sharp" 
  padding="lg"
  fontSize="lg"
  disabled={savingData}
  title="Save File"
  on:click={handleSaveData}
></Button>
```

---

## Custom Button Styles

There are situations where you might want to tweak (or even completely overhaul) the look of a button. For example, you might need uniquely styled buttons when creating a login page that has buttons for different authentication providers or maybe you want to make some minor modifications to the styles of buttons in your header or footer.

You can customize these buttons almost infinitely by passing different values to the `bgColor`, `borderColor`, `textColor`, `padding`, and `fontSize` props. You can also change or remove the button icons.

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `type` | `string` | `button`, `submit`, `reset` | `button` | Specify the type of button. |
| `bgColor` | `string` | Any CSS variable color from your `theme.css` file. | `var(--primary-color)` | This prop is for the button's `background-color`. The default value can be set in the `/src/defaults.ts` file. |
| `borderColor` | `string` | Any CSS variable color from your `theme.css` file. | `var(--primary-color)` | This prop is for the button's `border-color`. The default value can be set in the `/src/defaults.ts` file. |
| `textColor` | `string` | Any CSS variable color from your `theme.css` file. | `var(--white)` | This prop is for the button's `color`. The default value can be set in the `/src/defaults.ts` file. |
| `padding` | `string` | `xs`, `sm`, `md`, `lg`, `xl` | `md` | Alter the padding of the button. The default value can be set in the `/src/defaults.ts` file. |
| `fontSize` | `string` | `xs`, `sm`, `md`, `lg`, `xl` | `md` | Alter the font size of the button. The default value can be set in the `/src/defaults.ts` file. |
| `width` | `string` | `auto`, `full` | `auto` | `auto` will be wide enough to fit the contents of the button. `full` will fill the width of the button's parent element. |
| `disabled` | `boolean` | `true`, `false` | `false` | This will disable the button and display the `btnTextDisabled` text and the `btnIconDisabled` (if it has been set). |
| `btnIcon` | `string` | Any icon name from the Iconify library. | The default value can be set in the `/src/defaults.ts` file. | See the heading [Configure JavaScript variables](/get-started#configure-default-component-settings) on the Get Started page for instructions on how to set the default value. <br><br> You can pass an empty string to remove the button icon. If either the `btnIcon` or `btnIconDisabled` is set to an empty string, then no button icons or disabled button icons will be displayed with the button. This is intentional by design because it could look strange if you have a button icon during a regular state and then no icon during a disabled state and vice versa. If you don't want icons on your buttons, but would like to change the button text when a button is disabled, then refer to the `btnTextDisabled` slot below. |
| `btnIconDisabled` | `string` | See `btnIcon`. | See `btnIcon`. | See `btnIcon`. |
| `btnIconDisabledShouldSpin` | `boolean` | `true`, `false` | `true` | A value of `true` will cause the icon on a disabled button to spin which would provide user feedback for loading states (e.g. saving data, loading page content). A value of `false` will prevent the icon on a disabled button from spinning. |
| `btnIconSide` | `string` | `left`, `right` | `left` | This sets the icon to either the left or right side of the button. |
| `rotateBtnIcon` (optional) | `string` | Any number with `deg` appended to the end. | `"0deg"` (i.e. no rotation) | You can pass a rotate value to this prop and the icon will be rotated according to the value you pass. For example, `"45deg"` will rotate the icon 45 degrees. |
| `rotateBtnIconDisabled` (optional) <td colspan=5>Refer to the `rotateBtnIcon` prop above. |

<br><br>

## Slots
| Slot name | Default value | Description |
| --------- | ------------- | ----------- |
| Default slot (optional) | `Button Text` | The text that will be displayed in the button. |
| `btnTextDisabled` (optional) | `Disabled Button Text` | This is the text that will appear when the button is in a disabled state. If the `btnTextDisabled` slot is not provided, then the text that is passed through the default slot will be used if/when the button is disabled. |

<br><br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:click` | This component forwards the `click` event, so you can call an event handler when a user clicks this `<Button>` component. |

<br><br>

## Style Notes
Depending on the colors that you use as your `primary`, `secondary`, and `tertiary` colors, you might need to change the values for the button text colors in your `theme.css` file. These are the class names that you need to look at:

```
"text-color-for-primary-bg"
"text-color-for-secondary-bg"
"text-color-for-tertiary-bg"
```

<style>
  .interactive-example {
    display: flex;

    & div {
      flex: 1;
      min-height: 150px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding: 20px;
    }

    & .light-bg {
      background-color: var(--neutral-200);
      border-radius: var(--border-radius) 0 0 var(--border-radius);
    }

    & .dark-bg {
      background-color: var(--neutral-900);
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
    }
  }
</style>
