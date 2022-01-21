<h1>SvelteKit Component Library</h1>

<p>Components made for SvelteKit</p>

<Button on:click={handleClick}>My Button</Button>

```svelte
<h1>Buttons</h1>
```

<script lang="ts">
  import { Button } from "$/lib";

  function handleClick() {
    alert("Svelte components inside Markdown files");
  }
</script>
