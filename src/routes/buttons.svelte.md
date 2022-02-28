# Buttons

---

## Example Usage
```svelte
<Button
  bgColor="primary"
  size="medium"
  width="auto"
  inverse={false}
  disabled={creatingAccount}
  btnIcon="bi:person-plus-fill"
  btnIconDisabled="bi:gear-wide-connected"
  btnIconSide="left"
  btnIconDisabledShouldSpin={true}
  on:click={handlerFunc}
>
  <span slot="btnText">Create Account</span>
  <span slot="btnTextDisabled">Creating Account...</span>
</Button>

<script>
  import { Button } from "fpcl";
</script>
```

---

<Button
  bgColor={selectedBgColor}
  size="medium"
  width="auto"
  inverse={false}
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
  optionsArray={bgColors}  
  bind:selectedOption={selectedBgColor}
  emptyValueDisplayText="-- Select the background color --"
  defaultValue="primary"
  --background-color="--black"
/>

---

## Props and Slots

<table>
  <thead>
    <tr>
      <th>Slot Names</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>btnText</td>
      <td>The default value is "Button Text".</td>
    </tr>
    <tr>
      <td>btnTextDisabled</td>
      <td>(Optional) If the `btnTextDisabled` slot is not provided, then the text from the `btnText` slot will be used if/when the button is disabled.</td>
    </tr>
  </tbody>
</table>

<br>

<table>
  <thead>
    <tr>
      <th>Props</th>
      <th>Data Type</th>
      <th>Possible Values</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>color</td>
      <td>string</td>
      <td>"primary", "secondary", "tertiary"</td>
      <td>Default: "primary"</td>
    </tr>
    <tr>
      <td>size</td>
      <td>string</td>
      <td>"small", "medium", "large"</td>
      <td>Default: "medium"</td>
    </tr>
    <tr>
      <td>width</td>
      <td>string</td>
      <td>"auto", "full"</td>
      <td>Default: "auto"</td>
    </tr>
    <tr>
      <td>outline</td>
      <td>boolean</td>
      <td>true, false</td>
      <td>Default: false</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>boolean</td>
      <td>true, false</td>
      <td>Default: false</td>
    </tr>
    <tr>
      <td>btnIcon</td>
      <td>string</td>
      <td>$theme.btnIcon</td>
      <td>- The default value can be set in the `/src/stores/theme.js` file.<br>- Pass an empty string to remove the button icon.</td>
    </tr>
    <tr>
      <td>btnIconDisabled</td>
      <td>string</td>
      <td>$theme.btnIconDisabled</td>
      <td>- The default value can be set in the `/src/stores/theme.js` file.</td>
    </tr>
    <tr>
      <td>spinDisabledIcon</td>
      <td>boolean</td>
      <td>true, false</td>
      <td>- A value of true will cause the icon to spin which would provide user feedback for loading states (e.g. saving data, loading page content). A value of false will prevent the disabled button icon from spinning.<br>- Default: true</td>
    </tr>
  </tbody>
</table>

<Button on:click={showAlert}>
  <span slot="btnText">Click to show alert</span>
</Button>

```svelte
<Button on:click={showAlert}>
  <span slot="btnText">Click to show alert</span>
</Button>

<script>
  import { Button } from "fpcl";
  
  function showAlert() {
    alert("You clicked a button");
  }
</script>
```

<hr>

<h2>Example button that explicitly fills all slots and props</h2>

<Button
  color="secondary"
  size="large"
  width="auto"
  outline={false}
  disabled={creatingAccount}
  btnIcon="bi:person-plus-fill"
  btnIconDisabled="bi:gear-wide-connected"
  spinDisabledIcon={true}
  on:click={handleCreateAccount}
>
  <span slot="btnText">Create Account</span>
  <span slot="btnTextDisabled">Creating Account...</span>
</Button>

```svelte
<Button
  color="secondary"
  size="large"
  width="auto"
  outline={false}
  disabled={creatingAccount}
  btnIcon="bi:person-plus-fill"
  btnIconDisabled="bi:gear-wide-connected"
  spinDisabledIcon={true}
  on:click={handleCreateAccount}
>
  <span slot="btnText">Create Account</span>
  <span slot="btnTextDisabled">Creating Account...</span>
</Button>

<script>
  import { Button } from "fpcl";

  function handleCreateAccount() {
    creatingAccount = true;
    setTimeout(() => creatingAccount = false, 3000);
  }
</script>
```

<hr>

<h2>Solid Buttons</h2>
<Button color="primary">Solid Button</Button>
<Button color="secondary">Solid Button</Button>
<Button color="tertiary">Solid Button</Button>

<hr>

<h2>Outline Buttons</h2>
<Button color="primary" outline={true}>Outline Button</Button>
<Button color="secondary" outline={true}>Outline Button</Button>
<Button color="tertiary" outline={true}>Outline Button</Button>

<hr>

<h2>Disabled Buttons</h2>
<!-- <Button disabled={loading}>
  <span slot="btnTextDisabled">Disabled Button Text</span>
</Button> -->

<!-- <Button disabled={loading} btnIcon="bi:check-circle" btnIcondisabled="bi:gear-wide" on:click={setLoadingState}> -->
<Button disabled={loading} on:click={setLoadingState}>
  <span slot="btnText">Click to disable</span>
  <span slot="btnTextDisabled">Disabled Button Text</span>
</Button>

<p>How to dynamically set the disabled state:</p>

```svelte
<Button disabled={loading} on:click={setLoadingState}>
  <span slot="btnText">Click to disable</span>
  <span slot="btnTextDisabled">Disabled Button Text</span>
</Button>

<script lang="ts">
  import { Button } from "fpcl";

  let loading = true;
</script>
```

<p>How to hardcode the disabled state:</p>

```svelte
<Button disabled={true}>Disabled Button</Button>

<script lang="ts">
  import { Button } from "fpcl";
</script>
```

<script lang="ts">
  import { Button, Select } from "/src/lib";

  let creatingAccount = false;
  let loading = false;
  let bgColors = ["primary", "secondary", "tertiary"];
  let selectedBgColor = "";

  function showAlert() {
    alert("You clicked a button");
  }

  function handleCreateAccount() {
    creatingAccount = true;
    setTimeout(() => creatingAccount = false, 3000);
  }

  function setLoadingState() {
    console.log("Set Loading State");
  }
</script>
