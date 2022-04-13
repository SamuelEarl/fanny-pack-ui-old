<script lang="ts">
  import Icon from "@iconify/svelte";
  import { theme } from "/src/fpui-theme";

  export let uploadIcon = theme.dropZoneUploadIcon;

  function handleFiles(files) {

  }
</script>


<div id="drop-zone">
  <div id="instructions">
    <slot>Drop files here or click and select files to upload</slot>
  </div>
  <Icon icon="{uploadIcon}" width="50" />
  <input type="file" id="file-input" multiple accept="image/*" on:change={() => handleFiles(files)}>
</div>

<br>

<div id="drop-zone">
  <form id="form">
    <p id="instructions">Drop files here or click and select files to upload</p>
    <input type="file" id="file-input" multiple accept="image/*" on:change={() => handleFiles(files)}>
    <label class="button" for="file-input">Select some files</label>
  </form>
</div>


<style>
  #drop-zone {
    padding: 30px;
    padding-bottom: 15px;
    border: 2px dashed;
    border-color: var(--fpui-drop-zone-border-color, #a0a0a0);
    border-radius: var(--fpui-drop-zone-border-radius, 3px);
    text-align: center;
    background-color: var(--fpui-drop-zone-bg-color, #e5e5e5);
    color: var(--fpui-drop-zone-text-color, #797979);
    outline: none;
    transition: border 0.25s ease-in-out;
    cursor: pointer;

    &.highlight {
      border-color: purple;
    }

    & #form {
      margin-bottom: 10px;
    }

    & #instructions {
      margin-bottom: 10px;
    }

    & #file-input {
      display: none;
    }
  }
      

  #gallery {
    margin-top: 10px;

    & img {
      width: 150px;
      margin-bottom: 10px;
      margin-right: 10px;
      vertical-align: middle;
    }
  }

  .button {
    display: inline-block;
    padding: 10px;
    background: #ccc;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #ccc;

    &:hover {
      background: #ddd;
    }
  }
</style>
