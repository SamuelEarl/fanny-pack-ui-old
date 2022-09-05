<script lang="ts">
  import { SelectAlt } from "/src/lib";

  let questions = [
		{ id: 1, text: "Where did you go to school?" },
		{ id: 2, text: "What is your mother's name?" },
		{ id: 3, text: "What is another personal fact that an attacker could easily find with Google?" }
	];

  let selected = questions[0];
</script>

<br>
<SelectAlt bind:value={selected}>
  {#each questions as question}
    <option value={question}>
      {question.text}
    </option>
  {/each}
</SelectAlt>

<br>
{selected.text}

<!-- <select bind:value={selected} on:change={() => console.log("Selected Options:", selected)}>
  {#each questions as question}
    <option value={question}>
      {question.text}
    </option>
  {/each}
</select> -->
