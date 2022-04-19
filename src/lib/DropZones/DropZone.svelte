<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/env";
  import Icon from "@iconify/svelte";
  import { Button } from "../Buttons";
  import { theme } from "/src/fpui-theme";

  export let dragAndDropIcon = theme.dropZoneDragAndDropIcon;
  export let dropZoneUploadFileBtnIcon = theme.dropZoneUploadFileBtnIcon;
  export let uploadFiles;

  let events = ["dragenter", "dragover", "dragleave", "drop"];
  let dropZone;
  let active = false;
  let uploading = false;

  onMount(() => {
    // Loop over the list of events and prevent the default behavior for each event on the document body.
    // If you do not do this, then if a user drops files on your web app, but outside of the drop zone, then the browser's default behavior might download the file through the browser or it might open a new tab in the browser. So preventing these default behaviors will also help to prevent confusion for your users.
    events.forEach((eventName) => {
      document.body.addEventListener(eventName, preventDefaults);
    });
  });

  onDestroy(() => {
    // The onDestroy hook also runs on the server, so `document` will throw an undefined error. You can prevent that by checking if the environment is a browser. See https://github.com/sveltejs/kit/discussions/2741.
    if (browser) {
      // Remove the event listeners when this component is destroyed.
      events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults);
      });
    }
  });

  function preventDefaults(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    active = false;
    addFiles(event.dataTransfer.files);
  }

  let files = [];
  // let files = [
  //   { id: "1", name: "really-long-file-name-right-here.csv", },
  //   { id: "2", name: "another-file.csv",},
  //   { id: "3", name: "really-long-file-name-right-here.csv", },
  // ];

  function addFiles(newFiles) {
		let newUploadableFiles = [...newFiles].map((file) => createUploadableFile(file)).filter((file) => !fileExists(file.id));
		files = files.concat(newUploadableFiles);
	}

	function fileExists(otherId) {
		return files.some(({ id }) => id === otherId);
	}

	function removeFile(file) {
		let index = files.indexOf(file);
		if (index > -1) {
      files.splice(index, 1);
      files = files;
    }
	}

  function createUploadableFile(file) {
    return {
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.name,
      size: file.size,
      type: file.type,
      id: `${file.name}-${file.size}-${file.lastModified}-${file.type}`,
      url: URL.createObjectURL(file),
      status: null,
    };
  }

  async function handleUpload() {
    try {
      uploading = true;
      await uploadFiles(files);
      uploading = false;
      // Clear/reset the files array so the file uploader does not list any more files.
      files.length = 0;
    }
    catch(err) {
      console.error("handleUpload Error:", err);
    }
  }
</script>


<div 
  id="drop-zone"
  class:active
  bind:this={dropZone} 
  on:drop|preventDefault={handleDrop}
  on:dragenter|preventDefault={() => active = true}
  on:dragover|preventDefault={() => active = true}
  on:dragleave|preventDefault={() => active = false}
>
  <div id="file-input-wrapper">
    <input 
      type="file" 
      id="file-input" 
      multiple
      accept="*"
      on:change={(event) => {
        addFiles(event.target.files);
        // If a user adds a file via the input, decides to remove it from their file list, then changes their mind and decides to use the input to add that file again, then the file input will not fire the `change` event because the file input has not changed. By resetting `event.target.value` back to null, we ensure the event will always be fired.
        event.target.value = null;
      }}
    >
  </div>
  <div id="drag-drop-text-wrapper">
    <slot>Or Drag &amp; Drop Files Here</slot>
  </div>
  <div id="drag-drop-icon-wrapper">
    <Icon icon="{dragAndDropIcon}" width="50" />
  </div>

  {#if files.length > 0}
    <div id="upload-files-container">
      <div id="upload-all-files-btn-wrapper">
        <Button
          btnIcon={dropZoneUploadFileBtnIcon}
          disabled={uploading}
          on:click={handleUpload}
        >
          Upload Files
        </Button>
      </div>
      {#each files as file (file.id)}
        <div class="file-wrapper">
          <div class="file-name">{file.name}</div>
          <button class="remove-file-btn" on:click={() => removeFile(file)} disabled={uploading}><Icon icon="ri:delete-bin-2-line" width="16" /></button>
        </div>
      {/each}
    </div>
  {/if}
</div>


<style>
  #drop-zone {
    padding: 20px;
    padding-bottom: 5px;
    border: 2px dashed;
    border-color: var(--fpui-drop-zone-border-and-text-color, #797979);
    border-radius: var(--fpui-drop-zone-border-radius, 3px);
    text-align: center;
    background-color: var(--fpui-drop-zone-bg-color, #e5e5e5);
    color: var(--fpui-drop-zone-border-and-text-color, #797979);
    outline: none;
    transition: border 0.25s ease-in-out;

    &.active {
      border-color: var(--fpui-drop-zone-border-and-text-color-drag-over, #343434);
      color: var(--fpui-drop-zone-border-and-text-color-drag-over, #343434);
    }

    & #file-input-wrapper {
      margin-bottom: 30px;
      pointer-events: none;

      /* Custom File Input Styling: https://css-tricks.com/snippets/css/custom-file-input-styling-webkitblink/ */
      & #file-input {
        width: 200px;
        pointer-events: all;

        &::file-selector-button {
          width: 0;
        }

        &::-webkit-file-upload-button {
          visibility: hidden;
        }

        &::before {
          width: 100%;
          padding: 10px 20px;
          display: inline-block;
          text-align: center;
          /* content: "✓ Select Files"; */
          content: "Select Files";
          background-color: var(--fpui-drop-zone-border-and-text-color, #797979);
          color: var(--fpui-drop-zone-button-text-color, white);
          border-radius: var(--fpui-drop-zone-border-radius, 3px);
          outline: none;
          white-space: nowrap;
          -webkit-user-select: none;
          cursor: pointer;
        }
        &:hover::before {
          background-color: var(--fpui-drop-zone-border-and-text-color-drag-over, #343434);
        }
      }
    }

    & #drag-drop-text-wrapper {
      margin-bottom: 10px;
      pointer-events: none;
    }

    & #drag-drop-icon-wrapper {
      margin-bottom: 5px;
      pointer-events: none;
    }

    & #upload-files-container {
      margin: 20px 0;

      & .file-wrapper {
        display: flex;
        margin: 10px 0;
        text-align: left;

        & .file-name {
          flex: 1;
          padding: 3px;
          border-radius: 3px;
          color: #343434;
          background-color: white;
        }

        & .remove-file-btn {
          padding: 0;
          border: none;
          margin-left: 5px;
          outline: none;
          background-color: transparent;
          color: inherit;
          cursor: pointer;

          &:disabled {
            color: white;
            cursor: default;
          }
        }
      }
    }
  }
</style>
