<script lang="ts">
  import { Input } from "/src/lib";

  let textValue = "Change this text";
  let numberValue = 1;
  let email = ""
</script>


# Input (text, number, email)

---

## Example Usage

### Text Input

<Input
  type="text"
  bind:value={textValue}
  label="Enter some text"
  size="md"
  placeholder="Type right here"
  disabled={false}
/>

<p>Entered Text: {textValue}</p>

```svelte
<script>
  import { Input } from "@fanny-pack-ui/svelte-kit";

  let textValue = "Change this text";
</script>

<Input
  type="text"
  bind:value={textValue}
  label="Enter some text"
  size="md"
  placeholder="Type right here"
  disabled={false}
/>
```

### Number Input

<Input
  type="number"
  bind:value={numberValue}
  label="Enter a number"
  size="md"
  placeholder="Type right here"
  disabled={false}
  min="0"
  max="10"
  step="0.5"
/>

<p>Entered Number: {numberValue}</p>

```svelte
<script>
  import { Input } from "@fanny-pack-ui/svelte-kit";

  let number = 1;
</script>

<Input
  type="number"
  bind:value={numberValue}
  label="Enter a number"
  size="md"
  placeholder="Type right here"
  disabled={false}
  min="0"
  max="10"
  step="0.5"
/>
```

### Email Input

<Input
  type="email"
  bind:value={email}
  label="Enter an email address"
  size="md"
  placeholder="Type email here"
  disabled={false}
/>

<p>Entered Email: {email}</p>

```svelte
<script>
  import { Input } from "@fanny-pack-ui/svelte-kit";

  let email = "";
</script>

<Input
  type="email"
  bind:value={email}
  label="Enter an email address"
  size="md"
  placeholder="Type email here"
  disabled={false}
/>
```

---

## Custom Input Styles
The original intention for these custom styles was to set `--custom-input-bg-color="transparent"` so the `<Input>` field would blend into the background even if the background color changed when a user hovered over the background. A few extra custom style rules have been provided for even more customizability.


You can set the following custom variables:
* `--custom-input-border-color`
* `--custom-input-bg-color`
* `--custom-input-text-color`
* `--custom-input-placeholder-text-color`

<Input
  type="text"
  bind:value={textValue}
  placeholder="Enter some text"
  --custom-input-border-color="darkred"
  --custom-input-bg-color="pink"
  --custom-input-text-color="darkred"
  --custom-input-placeholder-text-color="gray"
/>

```svelte
<Input
  type="text"
  bind:value={textValue}
  placeholder="Enter some text"
  --custom-input-border-color="darkred"
  --custom-input-bg-color="pink"
  --custom-input-text-color="darkred"
  --custom-input-placeholder-text-color="gray"
/>
```

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `label` | `string` | Any string | NA | This prop will provide a label for the input field. If no `label` prop is provided, then the label will not be displayed. |
| `id` (optional) | `string` | Any string | `""` (empty string) | You can give your `<Input>` components an `id` value, if necessary, just like you can with regular `<input>` elements. |
| `type` | `string` | `text`, `number`, `email` | `text` | This prop sets the input field type. |
| `bind:value` | `string` | Any string | `""` (empty string) | In order for the input field to be updated with a `string` value, this component's `value` property needs to be bound to a `string` variable. |
| `size` | `string` | `sm`, `md`, `lg` | `md` | This prop will set more or less padding for the input field to give the appearance of a larger or smaller input field. The text size will also increase or decrease based on this `size` prop. |
| `placeholder` | `string` | Any string | NA | This prop will act as the placeholder when the input field is empty. |
| `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the input field. |
| `min` (number input types only) | `string` | Any numeric string value | `null` (i.e. no `min` value is set by default) | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#min |
| `max` (number input types only) | `string` | Any numeric string value | `null` (i.e. no `max` value is set by default) | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#max |
| `step` (number input types only) | `string` | Any numeric string value | `"any"` (i.e. no stepping in implied, and any value is allowed) | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#step |

<br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:change` | This component forwards the `change` event, so you can call an event handler when a user changes the value in the input field and then the input field loses focus. |
| `on:input` | This component forwards the `input` event, so you can call an event handler when a user enters a value into the input field. |
| `on:blur` | This component forwards the `blur` event, so you can call an event handler when this component loses focus. |
| `on:keyup` | This component forwards the `keyup` event, so you can call an event handler when a user presses a key while this component has focus. |
