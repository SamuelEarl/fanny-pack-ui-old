<script lang="ts">
  import { Button, Select } from "/src/lib";

  let creatingAccount = false;
  let btnColors = ["primary", "secondary", "tertiary"];
  let selectedBtnColor = "primary";
  let isInverted = false;
  let btnSize = "md";
  let btnWidth = "auto";

  function handleCreateAccount() {
    creatingAccount = true;
    setTimeout(() => creatingAccount = false, 3000);
  }
</script>


# Buttons

---

## Example Usage

<Button
  btnColor="primary"
  inverted={false}
  size="md"
  width="auto"
  disabled={creatingAccount}
  btnIcon="bi:person-plus-fill"
  btnIconDisabled="bi:gear-wide-connected"
  btnIconSide="right"
  btnIconDisabledShouldSpin={true}
  on:click={handleCreateAccount}
>
  <span slot="btnText">Create Account</span>
  <span slot="btnTextDisabled">Creating Account...</span>
</Button>

```svelte
<script>
  import { Button } from "fpcl";

  let creatingAccount = false;

  function handleCreateAccount() {
    creatingAccount = true;
    setTimeout(() => creatingAccount = false, 3000);
  }
</script>

<Button
  btnColor="primary"
  inverted={false}
  size="md"
  width="auto"
  disabled={creatingAccount}
  btnIcon="bi:person-plus-fill"
  btnIconDisabled="bi:gear-wide-connected"
  btnIconSide="right"
  btnIconDisabledShouldSpin={true}
  on:click={handleCreateAccount}
>
  <span slot="btnText">Create Account</span>
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
      btnIconSide="right"
      btnIconDisabledShouldSpin={true}
      on:click={handleCreateAccount}
    >
      <span slot="btnText">Create Account</span>
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
      btnIconSide="right"
      btnIconDisabledShouldSpin={true}
      on:click={handleCreateAccount}
    >
      <span slot="btnText">Create Account</span>
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

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `btnColor` | `string` | `primary`, `secondary`, `tertiary` | `primary` | The main button color. For regular buttons, this is the background color. For inverted buttons this is the border and text color. |
| `inverted` | `boolean` | `true`, `false` | `false` | Invert the background color and text color of the button. |
| `size` | `string` | `sm`, `md`, `lg` | `md` | Alter the padding and font size of the button. |
| `width` | `string` | `auto`, `full` | `auto` | `auto` will be wide enough to fit the contents of the button. `full` will fill the width of the button's parent element. |
| `disabled` | `boolean` | `true`, `false` | `false` | This will disable the button and display the `btnTextDisabled` text and the `btnIconDisabled` (if it has been set). |
| `btnIcon` | `string` | Any icon name from the Iconify library. | The default value can be set in the `/src/theme.ts` file. | See the README file for instructions on how to set the default value. There is a link to the README file on the home page. <br><br> You can pass an empty string to remove the button icon. |
| `btnIconDisabled` | `string` | See `btnIcon`. | See `btnIcon`. | See `btnIcon`. |
| `btnIconSide` | `string` | `left`, `right` | `left` | This sets the icon to either the left or right side of the button. |
| `btnIconDisabledShouldSpin` | `boolean` | `true`, `false` | `true` | A value of `true` will cause the icon on a disabled button to spin which would provide user feedback for loading states (e.g. saving data, loading page content). A value of `false` will prevent the icon on a disabled button from spinning. |

<br><br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:click` | This component forwards the click event, so you can call an event handler when a user clicks this `<Button>` component just like you would with any other `<button>` element in Svelte. |

<br><br>

## Slots
| Slot name | Default value | Description |
| --------- | ------------- | ----------- |
| `btnText` |	`Button Text` | |
| `btnTextDisabled` (optional) | `Disabled Button Text` | If the `btnTextDisabled` slot is not provided, then the text from the `btnText` slot will be used if/when the button is disabled. |


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
      background-color: var(--fpcl-very-light-gray);
      border-radius: var(--fpcl-global-radius) 0 0 var(--fpcl-global-radius);
    }

    & .dark-bg {
      background-color: var(--fpcl-black);
      border-radius: 0 var(--fpcl-global-radius) var(--fpcl-global-radius) 0;
    }
  }
</style>
