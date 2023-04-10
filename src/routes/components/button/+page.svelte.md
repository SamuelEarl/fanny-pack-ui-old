<script lang="ts">
  // import Prism from "prismjs";
  // // Svelte code highlighting: https://github.com/pngwn/prism-svelte
  // import "prism-svelte";
  import { Button, Select, Tooltip } from "/src/lib";

  let creatingAccount = false;
  let savingData = false;
  let selectedBtnColor = "primary";
  let isHollow = false;
  let btnSize = "md";
  let btnWidth = "auto";
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
  btnColor="primary"
  textColor="primary"
  hollow={false}
  size="md"
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
  btnColor="primary"
  hollow={false}
  size="md"
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
        btnColor={selectedBtnColor}
        hollow={isHollow}
        size={btnSize}
        width={btnWidth}
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
        btnColor={selectedBtnColor}
        hollow={isHollow}
        size={btnSize}
        width={btnWidth}
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

<Select
  label="Button color"
  options={["primary", "secondary", "tertiary"]}
  bind:value={selectedBtnColor}
  on:change={handleRefreshInteractiveBtns}
/>

<br>

<Select
  label="Hollow"
  options={[false,true]}
  bind:value={isHollow}
  on:change={handleRefreshInteractiveBtns}
/>

<br>

<Select
  label="Size"
  options={["xs", "sm","md","lg", "xl"]}
  bind:value={btnSize}
  on:change={handleRefreshInteractiveBtns}
/>

<br>

<Select
  label="Width"
  options={["auto","full"]}
  bind:value={btnWidth}
  on:change={handleRefreshInteractiveBtns}
/>

---

## Icon Buttons
You can create buttons that have only icons (i.e. no text). Do not pass any slots in between the opening `<Button>` and closing `</Button>` tags and provide the `btnIcon` and/or `btnIconDisabled` props.

<Button
  btnIcon="ion:save-sharp" 
  size="lg" 
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
  size="lg" 
  disabled={savingData}
  title="Save File"
  on:click={handleSaveData}
></Button>
```

---

## Custom Button Styles

There are situations where you might want to tweak (or even completely overhaul) the look of a button. For example, you might need uniquely styled buttons when creating a login page that has buttons for different authentication providers or maybe you want to make some minor modifications to the styles of buttons in your header or footer.

**The buttons in this UI library are not intended to be infinitely customizable. If you need to create a custom button that is outside of the customizability of these buttons, then it is recommneded to create your own custom button.**

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `type` | `string` | `button`, `submit`, `reset` | `button` | Specify the type of button. |
| `btnColor` | `string` | `primary`, `secondary`, `tertiary`, `transparent` | `primary` | This prop is for the button's main color. For regular buttons, this is the background color. For `hollow` buttons this is the border and text color.<br><br>If you pass `"transparent"` to this prop, then the background and border colors will also be transparent. You can also change the text color of a `"transparent"` button. See the `textColor` prop for color options. |
| `textColor` (optional) | `string` | `default`, `primary`, `secondary`, `tertiary`, `white`, `black` | `default` (which is the `--text-color-default` color in the `theme.css` file) | This prop will only be applied if you pass `"transparent"` to the `btnColor` prop. |
| `hollow` | `boolean` | `true`, `false` | `false` | Hollow buttons have a transparent background and their text and border colors are either the `primary`, `secondary`, or `tertiary` colors. |
| `size` | `string` | `xs`, `sm`, `md`, `lg`, `xl` | `md` | Alter the padding and font size of the button. |
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
"text-color-for-bg-primary"
"text-color-for-bg-secondary"
"text-color-for-bg-tertiary"
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
