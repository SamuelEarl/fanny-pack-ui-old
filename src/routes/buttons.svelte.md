# Buttons

---

## Example Usage
<Button
  bgColor="primary"
  inverse={false}
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
<Button
  bgColor="primary"
  inverse={false}
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

<script>
  import { Button } from "fpcl";

  let creatingAccount = false;

  function handleCreateAccount() {
    creatingAccount = true;
    setTimeout(() => creatingAccount = false, 3000);
  }
</script>
```

---

<select>
  <option value="Sam">Sam</option>
  <option value="John">John</option>
  <option value="Steve">Steve</option>
</select>

## Interactive Example

<Button
  bgColor={selectedBgColor}
  inverse={isInverse}
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

<br>

<Select
  label="Background color"
  optionsArray={bgColors}
  arrayType="string"
  bind:selectedOption={selectedBgColor}
/>

<br>

<Select
  label="Inverse"
  optionsArray={[false,true]}
  arrayType="boolean"
  bind:selectedOption={isInverse}
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
| `bgColor` | `string` | `primary`, `secondary`, `tertiary` | `primary` | |
| `inverse` | `boolean` | `true`, `false` | `false` |  |
| `size` | `string` | `sm`, `md`, `lg` | `md` | |
| `width` | `string` | `auto`, `full` | `auto` | |
| `disabled` | `boolean` | `true`, `false` | `false` | |
| `btnIcon` | `string` | Any icon name from the Iconify library. | The default value can be set in the `/src/theme.ts` file. | See the README file for instructions on how to set the default value. There is a link on the home page. <br><br> You can pass an empty string to remove the button icon. |
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

<br><br>

<script lang="ts">
  import { Button, Select } from "/src/lib";

  let creatingAccount = false;
  let bgColors = ["primary", "secondary", "tertiary"];
  let selectedBgColor = "primary";
  let isInverse = false;
  let btnSize = "md";
  let btnWidth = "auto";

  function handleCreateAccount() {
    creatingAccount = true;
    setTimeout(() => creatingAccount = false, 3000);
  }
</script>
