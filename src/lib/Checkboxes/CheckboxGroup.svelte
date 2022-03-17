<script lang="ts">
  import { createId } from "../utils";

  export let arrayType = "string";
  export let checkboxGroupValues;
  export let group;

  let componentId = createId();
</script>


{#if arrayType === "string" || arrayType === "number"}
  {#each checkboxGroupValues as item}
    <!--
      IMPORTANT NOTE: 
      `bind:group` does not work with nested components: https://github.com/sveltejs/svelte/issues/2308
      So I have just copied and pasted the code from the Checkbox.svelte component into this component.
    -->
    <!-- In Svelte you would use the `bind:group` property if you want to include all the values from a group of checkboxes into a single array of values that would then get sent to the backend for processing. So if the <Checkbox> component is used as part of a group of checkboxes, then use `bind:group` to bind to the `group` prop that is passed into this component. Otherwise, if this is a single checkbox (i.e. not part of a group of checkboxes), then do not use the `bind:group` property. -->
    <!-- <Checkbox bind:group={group} value={item} label={item} on:change /> -->
    <label class="fpcl-checkbox-label-wrapper">
      <input
        type="checkbox"
        class="fpcl-checkbox-input"
        bind:group={group}
        value={item}
        on:change
      > {item}
      <span class="fpcl-checkbox-checkmark"></span>
    </label>
  {/each}
{/if}

{#if arrayType === "objects"}
  {#each checkboxGroupValues as obj}
    <!-- <Checkbox bind:group={group} value={obj.value} label={obj.label} /> -->
    <label class="fpcl-checkbox-label-wrapper">
      <input
        type="checkbox" 
        class="fpcl-checkbox-input"
        bind:group={group} 
        value={obj.value} 
        on:change
      > {obj.label}
      <span class="fpcl-checkbox-checkmark"></span>
    </label>
  {/each}
{/if}


<style>
  @import "checkbox.css";
</style>
