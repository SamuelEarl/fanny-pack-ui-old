<script lang="ts">
  import { Input } from "/src/lib";

  let textValue = "Change this text";
  let email = ""
</script>


# Input (text, email)

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

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `bind:value` | `string` | Any string | `""` (an empty string) | In order for the input field to be updated with a `string` value, this component's `value` property needs to be bound to a `string` variable. |
| `label` | `string` | Any string | NA | This prop will provide a label for the input field. |
| `size` | `string` | `sm`, `md`, `lg` | `md` | This prop will set more or less padding for the input field to give the appearance of a larger or smaller input field. The text size will also increase or decrease based on this `size` prop. |
| `placeholder` | `string` | Any string | NA | This prop will act as the placeholder when the input field is empty. |
| `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the input field. |

<br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:change` | This component forwards the `change` event, so you can call an event handler when a user changes the value in the input field and then the input field loses focus. |
| `on:input` | This component forwards the `input` event, so you can call an event handler when a user enters a value into the input field. |
