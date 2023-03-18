<script lang="ts">
  import { Input } from "/src/lib";

  let textValue = "Change this text";
  let numberValue = 1;
  let email = ""

  let browsers = [
    "Chrome",
    "Edge",
    "Firefox",
    "Opera",
    "Safari",
  ];
  let browser;

  let numbers = [1, 2, 3, 4, 5];
  let number;
</script>


# Input (text, number, email)

---

## Example Usage

### Text Input

<div style="margin-bottom:20px">
  <Input
    type="text"
    bind:value={textValue}
    label="Enter some text"
    padding=""
    fontSize=""
    placeholder="Type right here"
    disabled={false}
  />
</div>

<p>Entered Text: {textValue}</p>

```svelte
<script>
  import { Input } from "@fanny-pack-ui/svelte-kit";

  let textValue = "Change this text";
</script>

<div style="margin-bottom:20px">
  <Input
    type="text"
    bind:value={textValue}
    label="Enter some text"
    padding="sm"
    fontSize="md"
    placeholder="Type right here"
    disabled={false}
  />
</div>
```

### Number Input

<div style="margin-bottom:20px">
  <Input
    type="number"
    bind:value={numberValue}
    label="Enter a number"
    padding="sm"
    fontSize="md"
    placeholder="Type right here"
    disabled={false}
    min="0"
    max="10"
    step="0.5"
  />
</div>

<p>Entered Number: {numberValue}</p>

```svelte
<script>
  import { Input } from "@fanny-pack-ui/svelte-kit";

  let number = 1;
</script>

<div style="margin-bottom:20px">
  <Input
    type="number"
    bind:value={numberValue}
    label="Enter a number"
    padding="sm"
    fontSize="md"
    placeholder="Type right here"
    disabled={false}
    min="0"
    max="10"
    step="0.5"
  />
</div>
```

### Email Input

<div style="margin-bottom:20px">
  <Input
    type="email"
    bind:value={email}
    label="Enter an email address"
    padding="sm"
    fontSize="md"
    placeholder="Type email here"
    disabled={false}
  />
</div>

<p>Entered Email: {email}</p>

```svelte
<script>
  import { Input } from "@fanny-pack-ui/svelte-kit";

  let email = "";
</script>

<div style="margin-bottom:20px">
  <Input
    type="email"
    bind:value={email}
    label="Enter an email address"
    padding="sm"
    fontSize="md"
    placeholder="Type email here"
    disabled={false}
  />
</div>
```

---

## `<datalist>`

A `<datalist>` allows you to specify a list of predefined options for an `<input>` element, but users can also enter their own data into the `<input>` element. As a user types inside an `<input>` element that has a `<datalist>` element bound to it, the list of predefined options will get filtered based on the user's input. 

NOTE: In order to bind a `<datalist>` element to an `<input>` element, the `<datalist>` element's `id` attribute should match the `<input>` element's `list` attribute.

<br>

<div style="margin-bottom:20px">
  <Input
    type="text"
    bind:value={browser}
    label="Select a browser or enter your own"
    list="browsers"
    placeholder="Enter a browser name"
  />
  <datalist id="browsers">
    {#each browsers as browser}
      <option value={browser}>
    {/each}
  </datalist>
</div>

```svelte
<script lang="ts">
  let browsers = [
    "Chrome",
    "Edge",
    "Firefox",
    "Opera",
    "Safari",
  ];
  let browser;
</script>

<div style="margin-bottom:20px">
  <Input
    type="text"
    bind:value={browser}
    label="Select a browser or enter your own"
    list="browsers"
    placeholder="Enter a browser name"
  />
  <datalist id="browsers">
    {#each browsers as browser}
      <option value={browser}>
    {/each}
  </datalist>
</div>
```

<br>

<div style="margin-bottom:20px">
  <Input
    type="number"
    bind:value={number}
    label="Select a number or enter your own"
    list="numbers"
    placeholder="Enter a number"
  />
  <datalist id="numbers">
    {#each numbers as number}
      <option value={number}>
    {/each}
  </datalist>
</div>

```svelte
<script lang="ts">
  let numbers = [1, 2, 3, 4, 5];
  let number;
</script>

<div style="margin-bottom:20px">
  <Input
    type="number"
    bind:value={number}
    label="Select a number or enter your own"
    list="numbers"
    placeholder="Enter a number"
  />
  <datalist id="numbers">
    {#each numbers as number}
      <option value={number}>
    {/each}
  </datalist>
</div>
```

---

## Custom Input Styles
The original intention for these custom styles was to set `--custom-input-bg-color="transparent"` so the `<Input>` field would blend into the background. A few extra custom style rules have been provided for even more customizability.


You can set the following custom variables:
* `--custom-input-bg-color`
* `--custom-input-border-color`
* `--custom-input-text-color`
* `--custom-input-placeholder-text-color`

<div style="margin-bottom:20px">
  <Input
    type="text"
    bind:value={textValue}
    placeholder="Enter something"
    --custom-input-bg-color="pink"
    --custom-input-border-color="darkred"
    --custom-input-text-color="darkred"
    --custom-input-placeholder-text-color="gray"
  />
</div>

```svelte
<div style="margin-bottom:20px">
  <Input
    type="text"
    bind:value={textValue}
    placeholder="Enter something"
    --custom-input-bg-color="pink"
    --custom-input-border-color="darkred"
    --custom-input-text-color="darkred"
    --custom-input-placeholder-text-color="gray"
  />
</div>
```

---

## Props

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `label`<br>(optional) | `string` | Any string | `""` (an empty string) | This prop will provide a label for the input field. If no `label` prop is provided, then the label will not be displayed. |
| `id` (optional) | `string` | Any string | `""` (empty string) | You can give your `<Input>` components an `id` value, if necessary, just like you can with regular `<input>` elements. |
| `type` | `string` | `text`, `number`, `email` | `text` | This prop sets the input field type. |
| `bind:value` | `string` | Any string | `""` (empty string) | In order for the input field to be updated with a `string` value, this component's `value` property needs to be bound to a `string` variable. |
| `list` | `string` | Any string | `""` (empty string) | See the `<datalist>` example above for details. |
| `padding` | `string` | `xs`, `sm`, `md`, `lg`, `xl` | `md` | This prop will set the padding in the input field. |
| `fontSize` | `string` | `xs`, `sm`, `md`, `lg`, `xl` | `md` | This prop will set the size of the text in the input field. |
| `placeholder` | `string` | Any string | NA | This prop will act as the placeholder when the input field is empty. |
| `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the input field. |
| `min` (number input types only) | `string` | Any numeric string value | `null` (i.e. no `min` value is set by default) | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#min |
| `max` (number input types only) | `string` | Any numeric string value | `null` (i.e. no `max` value is set by default) | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#max |
| `step` (number input types only) | `string` | Any numeric string value | `"any"` (i.e. no stepping in implied, and any value is allowed) | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#step |

<br>
<br>

## Event Forwarding

| Event | Description |
| ----- | ----------- |
| `on:change` | This component forwards the `change` event, so you can call an event handler when a user changes the value in the input field and then the input field loses focus. |
| `on:input` | This component forwards the `input` event, so you can call an event handler when a user enters a value into the input field. |
| `on:blur` | This component forwards the `blur` event, so you can call an event handler when this component loses focus. |
| `on:keyup` | This component forwards the `keyup` event, so you can call an event handler when a user presses a key while this component has focus. |
