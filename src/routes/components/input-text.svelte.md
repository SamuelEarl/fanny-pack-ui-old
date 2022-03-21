<script lang="ts">
  import { TextInput } from "/src/lib";

  let textValue = "Change this text";
</script>


# Text Input

---

## Example Usage

<TextInput
  bind:value={textValue}
  label="Enter some text"
  size="md"
  placeholder="Type right here"
  disabled={false}
/>

<p>Entered Text: {textValue}</p>

```svelte
<script>
  import { TextInput } from "fpcl";

  let textValue = "Change this text";
</script>

<TextInput
  bind:value={textValue}
  label="Enter some text"
  size="md"
  placeholder="Type right here"
  disabled={false}
/>
```
