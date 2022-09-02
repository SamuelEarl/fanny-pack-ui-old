<script lang="ts">
  import { Textarea } from "/src/lib";

  let textValue = "Change this text";
  let isDisabled = false;
</script>


# Textarea

---

## Example Usage

<Textarea
  label="Textarea label"
  id="textarea-id"
  bind:value={textValue}
  size="md"
  placeholder="Enter description"
  disabled={isDisabled}
  on:keyup={() => console.log("EVENT FIRED")}
/>

<p>Entered Text: {textValue}</p>

```svelte
<script>
  import { Textarea } from "@fanny-pack-ui/svelte-kit";

  let textValue = "Change this text";
  let isDisabled = false;
</script>

<Textarea
  label="Textarea label"
  id="textarea-id"
  bind:value={textValue}
  size="md"
  placeholder="Enter description"
  disabled={isDisabled}
/>
```

---

## Custom Textarea Styles
The original intention for these custom styles was to set `--custom-textarea-bg-color="transparent"` so the `<Textarea>` field would blend into the background even if the background color changed when a user hovered over the background. A few extra custom style rules have been provided for even more customizability.


You can set the following custom variables:
* `--custom-textarea-border-color`
* `--custom-textarea-bg-color`
* `--custom-textarea-text-color`
* `--custom-textarea-placeholder-text-color`

<Textarea
  bind:value={textValue}
  size="md"
  placeholder="Write a note"
  --custom-textarea-border-color="darkred"
  --custom-textarea-bg-color="pink"
  --custom-textarea-text-color="darkred"
  --custom-textarea-placeholder-text-color="gray"
/>

```svelte
<Textarea
  bind:value={textValue}
  size="md"
  placeholder="Write a note"
  --custom-textarea-border-color="darkred"
  --custom-textarea-bg-color="pink"
  --custom-textarea-text-color="darkred"
  --custom-textarea-placeholder-text-color="gray"
/>
```

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `label` (optional) | `string` | Any string | NA | This prop will provide a label for the `textarea` field. If no `label` prop is provided, then the label will not be displayed. |
| `id` (optional) | `string` | Any string | `""` (empty string) | You can give your `<Textarea>` components an id value, if necessary, just like you can with regular `<textarea>` elements. |
| `bind:value` | `string` | Any string | `""` (empty string) | In order for the `textarea` field to be updated with a string value, this component’s value property needs to be bound to a string variable. |
| `size` | `string` | `sm`, `md`, `lg` | `md` | This prop will set more or less padding for the `textarea` field to give the appearance of a larger or smaller `textarea` field. The text size will also increase or decrease based on this `size` prop. |
| `placeholder` | `string` | Any string | NA | This prop will act as the placeholder when the `textarea` field is empty. |
| `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the `textarea` field. |

<br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:input` | This component forwards the `input` event, so you can call an event handler when a user enters a value into the `textarea` field. |
| `on:keyup` | This component forwards the `keyup` event, so you can call an event handler when a user presses a key while this component has focus. |
| `on:blur` | This component forwards the `blur` event, so you can call an event handler when this component loses focus. |
