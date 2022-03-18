<script lang="ts">
  import { Checkbox } from "/src/lib";

  let haveRead = false;
  let checkboxLabel = "I have read the terms and conditions.";

  function handleChange() {
    alert("Checkbox has been changed");
  }
</script>

# Checkbox
This component will create a single checkbox. If you want to create multiple checkboxes that are part of the same group, then look at the [Checkbox Group](/components/checkbox-group) component.

---

## Example Usage

<Checkbox
  bind:checked={haveRead}
  label={checkboxLabel}
  on:change={handleChange}
/>

<p>Your selection: <strong>{haveRead}</strong></p>

```svelte
<script>
  import { Checkbox } from "fpcl";

  let haveRead = false;
  let checkboxLabel = "I have read the terms and conditions.";

  function handleChange() {
    alert("Checkbox has been changed");
  }
</script>

<Checkbox
  bind:checked={haveRead}
  label={checkboxLabel}
  on:change={handleChange}
/>

<p>Your selection: <strong>{haveRead}</strong></p>
```

<hr>

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `bind:checked` | `boolean` | `true`, `false` | NA | In order for the checkbox to be checked and unchecked, this component's `checked` property needs to be bound to a `boolean` variable. |
| `label` | `string` | any string | NA | This is the text that will be displayed next to the checkbox. |

<br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `on:change` | This component forwards the `change` event, so you can call an event handler when a user checks this `<Checkbox>` component. |
| `on:input` | This component forwards the `input` event, so you can call an event handler when a user checks this `<Checkbox>` component. You would setup and use the `input` event the same way you would setup and use the `change` event. |
