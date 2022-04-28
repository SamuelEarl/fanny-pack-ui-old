<script lang="ts">
  import { Button, Select } from "/src/lib";

  let creatingAccount = false;
  let savingData = false;
  let btnColors = ["primary", "secondary", "tertiary"];
  let selectedBtnColor = "primary";
  let isInverted = false;
  let btnSize = "md";
  let btnWidth = "auto";

  function handleCreateAccount() {
    creatingAccount = true;
    setTimeout(() => creatingAccount = false, 3000);
  }

  function handleSaveData() {
    savingData = true;
    setTimeout(() => savingData = false, 3000);
  }
</script>


# Button

---

## Example Usage

<Button
  id="some-id"
  type="button"
  btnColor="primary"
  inverted={false}
  size="md"
  width="auto"
  disabled={creatingAccount}
  btnIcon="bi:person-plus-fill"
  btnIconDisabled="icomoon-free:spinner2"
  btnIconDisabledShouldSpin={true}
  btnIconSide="right"
  on:click={handleCreateAccount}
>
  Create Account
  <span slot="btnTextDisabled">Creating Account...</span>
</Button>

```svelte
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
  inverted={false}
  size="md"
  width="auto"
  disabled={creatingAccount}
  btnIcon="bi:person-plus-fill"
  btnIconDisabled="icomoon-free:spinner2"
  btnIconDisabledShouldSpin={true}
  btnIconSide="right"
  on:click={handleCreateAccount}
>
  Create Account
  <span slot="btnTextDisabled">Creating Account...</span>
</Button>
```

---

## Interactive Example

<div class="interactive">
  <div class="light-bg">
    <Button
      btnColor={selectedBtnColor}
      inverted={isInverted}
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
  </div>

  <div class="dark-bg">
    <Button
      btnColor={selectedBtnColor}
      inverted={isInverted}
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
  </div>
</div>

<br>

<Select
  label="Button color (primary = purple; secondary = dark gray; tertiary = white)"
  optionsArray={btnColors}
  arrayType="string"
  bind:selectedOption={selectedBtnColor}
/>

<br>

<Select
  label="Inverted"
  optionsArray={[false,true]}
  arrayType="boolean"
  bind:selectedOption={isInverted}
/>

<br>

<Select
  label="Size"
  optionsArray={["sm","md","lg"]}
  arrayType="string"
  bind:selectedOption={btnSize}
/>

<br>

<Select
  label="Width"
  optionsArray={["auto","full"]}
  arrayType="string"
  bind:selectedOption={btnWidth}
/>

---

## Icon Buttons
You can create buttons that have only icons (i.e. no text). Do not pass any slots in between the opening `<Button>` and closing `</Button>` tags and provide the `btnIcon` and/or `btnIconDisabled` props.

<Button
  btnIcon="ion:save-sharp" 
  size="lg" 
  disabled={savingData} 
  --custom-btn-padding="7px 10px"
  on:click={handleSaveData}
></Button>

```svelte
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
  --custom-btn-padding="7px 10px"
  on:click={handleSaveData}
></Button>
```

---

## Custom Button Styles
There are situations where you might want to tweak (or even completely overhaul) the look of a button. For example, you might need uniquely styled buttons when creating a login page that has buttons for different authentication providers or maybe you want to make some minor modifications to the styles of buttons in your header or footer.

You can set the following custom variables: 
* `--custom-btn-padding`
* `--custom-btn-border-width`
* `--custom-btn-border-style`
* `--custom-btn-border-color`
* `--custom-btn-border-radius`
* `--custom-btn-background-color`
* `--custom-btn-text-color`
* `--custom-btn-font-size`
* `--custom-btn-font-weight`
* `--custom-btn-icon-margin`
* `--custom-btn-box-shadow`
* `--custom-btn-disabled-bg-color`
* `--custom-btn-disabled-text-color`
* `--custom-btn-icon-rotate`
* `--custom-btn-icon-disabled-rotate`

*NOTE: Your custom styles can conflict with the `size` and `inverted` props. So if you are customizing any padding, size, or color values, then it might be best to leave the `size` and `inverted` props out of your buttons, but you will have to try different style and prop combinations to see what works best for your needs.*

<Button
  --custom-btn-padding="7px 14px"
  --custom-btn-border-width="5px"
  --custom-btn-border-style="solid"
  --custom-btn-border-color="palevioletred"
  --custom-btn-border-radius="25px"
  --custom-btn-background-color="white"
  --custom-btn-text-color="palevioletred"
  --custom-btn-font-size="20px"
  --custom-btn-font-weight="bold"
  --custom-btn-icon-margin="25px"
  --custom-btn-box-shadow="0 0 0 5px palevioletred"
  --custom-btn-disabled-bg-color="gray"
  --custom-btn-disabled-text-color="white"
  --custom-btn-icon-rotate="45deg"
  --custom-btn-icon-disabled-rotate="-45deg"
  width="auto"
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

```svelte
<Button
  --custom-btn-padding="7px 14px"
  --custom-btn-border-width="5px"
  --custom-btn-border-style="solid"
  --custom-btn-border-color="palevioletred"
  --custom-btn-border-radius="25px"
  --custom-btn-background-color="white"
  --custom-btn-text-color="palevioletred"
  --custom-btn-font-size="20px"
  --custom-btn-font-weight="bold"
  --custom-btn-icon-margin="25px"
  --custom-btn-box-shadow="0 0 0 5px palevioletred"
  --custom-btn-disabled-bg-color="gray"
  --custom-btn-disabled-text-color="white"
  --custom-btn-icon-rotate="45deg"
  --custom-btn-icon-disabled-rotate="-45deg"
  width="auto"
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
```

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `id` (optional) | `string` | Any string | `""` (empty string) | You can give your `<Button>` components an `id` value, if necessary, just like you can with regular `<button>` elements. |
| `type` | `string` | `button`, `submit`, `reset` | `button` | Specify the type of button. |
| `btnColor` | `string` | `primary`, `secondary`, `tertiary` | `primary` | The main button color. For regular buttons, this is the background color. For inverted buttons this is the border and text color. |
| `inverted` | `boolean` | `true`, `false` | `false` | Inverted buttons have a transparent background and their text and border colors are either the `primary`, `secondary`, or `tertiary` colors. |
| `size` | `string` | `sm`, `md`, `lg` | `md` | Alter the padding and font size of the button. |
| `width` | `string` | `auto`, `full` | `auto` | `auto` will be wide enough to fit the contents of the button. `full` will fill the width of the button's parent element. |
| `disabled` | `boolean` | `true`, `false` | `false` | This will disable the button and display the `btnTextDisabled` text and the `btnIconDisabled` (if it has been set). |
| `btnIcon` | `string` | Any icon name from the Iconify library. | The default value can be set in the `/src/fpui-theme.ts` file. | See the heading [Enable JavaScript Variables](/get-started#enable-js-vars) on the Get Started page for instructions on how to set the default value. <br><br> You can pass an empty string to remove the button icon. If either the `btnIcon` or `btnIconDisabled` is set to an empty string, then no button icons or disabled button icons will be displayed with the button. This is intentional by design because it could look strange if you have a button icon during a regular state and then no icon during a disabled state and vice versa. If you don't want icons on your buttons, but would like to change the button text when a button is disabled, then refer to the `btnTextDisabled` slot below. |
| `btnIconDisabled` | `string` | See `btnIcon`. | See `btnIcon`. | See `btnIcon`. |
| `btnIconDisabledShouldSpin` | `boolean` | `true`, `false` | `true` | A value of `true` will cause the icon on a disabled button to spin which would provide user feedback for loading states (e.g. saving data, loading page content). A value of `false` will prevent the icon on a disabled button from spinning. |
| `btnIconSide` | `string` | `left`, `right` | `left` | This sets the icon to either the left or right side of the button. |

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
Depending on the colors that you use as your `primary`, `secondary`, and `tertiary` colors, you might need to change the values for the button text colors in your `fpui-theme.css` file. These are the default button text colors:

```css
--fpui-btn-primary-text-color: white;
--fpui-btn-secondary-text-color: white;
--fpui-btn-tertiary-text-color: var(--fpui-primary-color);
```


<style>
  .interactive {
    display: flex;

    & .light-bg, & .dark-bg {
      flex: 1;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
    }

    & .light-bg {
      background-color: #e5e5e5;
      border-radius: var(--fpui-border-radius) 0 0 var(--fpui-border-radius);
    }

    & .dark-bg {
      background-color: #000;
      border-radius: 0 var(--fpui-border-radius) var(--fpui-border-radius) 0;
    }
  }
</style>
