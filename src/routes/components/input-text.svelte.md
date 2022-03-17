<script lang="ts">
  import { TextInput } from "/src/lib";

  let textValue = "Change the text in the input field";
</script>


# Text Input

---

## Example Usage

<p>Entered Text: {textValue}</p>

<TextInput
  bind:value={textValue}
  label="Enter some text"
  size="md"
  placeholder="Type right here"
  disabled={false}
/>

<input type="text" placeholder="This is not showing up" />

```svelte
<script>
  import { TextInput } from "fpcl";

  let textValue = "Change the text in the input field";
</script>

<TextInput
  bind:value={textValue}
  label="Enter some text"
  size="md"
  placeholder="Type right here"
  disabled={false}
/>
```
