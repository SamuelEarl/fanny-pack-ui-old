<!-- Add a file type filter. See https://www.smashingmagazine.com/2022/03/drag-drop-file-uploader-vuejs-3/ under the heading "Possible Improvements" and research how to do this. Do I need to use the `accept` attribute on the file input? -->

<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { browser } from "$app/env";
  import Icon from "@iconify/svelte";
  import { Button } from "../Buttons";
  import { theme } from "/src/fpui-theme";

  export let dragAndDropIcon = theme.dropZoneDragAndDropIcon;
  export let dropZoneUploadFileBtnIcon = theme.dropZoneUploadFileBtnIcon;
  export let uploadUrl = "";

  const dispatch = createEventDispatcher();
  let events = ["dragenter", "dragover", "dragleave", "drop"];
  let dropZone;
  let active = false;
  let uploading = false;

  onMount(() => {
    events.forEach((eventName) => {
      document.body.addEventListener(eventName, preventDefaults);
    });
  });

  onDestroy(() => {
    if (browser) {
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
    console.log("EVENT:", event);
    // dispatch("files-dropped", [...event.dataTransfer.files]);
    addFiles(event.dataTransfer.files);
  }

  // File List
  let uploadProgress = 10;

  let files = [];
  // let files = [
  //   { id: "1", name: "really-long-file-name-right-here.csv", },
  //   { id: "2", name: "another-file.csv",},
  //   { id: "3", name: "really-long-file-name-right-here.csv", },
  // ];

  function addFiles(newFiles) {
		let newUploadableFiles = [...newFiles].map((file) => createUploadableFile(file)).filter((file) => !fileExists(file.id));
		files = files.concat(newUploadableFiles);
    console.log("FILES:", files);
	}

	function fileExists(otherId) {
		return files.some(({ id }) => id === otherId);
	}

	function removeFile(file) {
		let index = files.indexOf(file);
    console.log("index:", index);
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

  async function uploadSingleFile(file) {
    // Set up the request data.
    let formData = new FormData();
    formData.append("file", file);

    // for (let entry of formData.entries()) {
    //   console.log("Form Data Entry:", entry[1].stream());
    // }

    // Track status and upload file.
    file.status = "loading";
    let response = await fetch(uploadUrl, { method: "POST", body: formData });

    // Change status to indicate the success of the upload request.
    file.status = response.ok;

    // return response;

    let result = await response.json();
    console.log("single result:", result);
    return result;
  }

  function uploadMultipleFiles() {
    // let promise = Promise.all(files.map((file) => uploadSingleFile(file)));
    // console.log("promise:", promise);

    // let promise = files.map((file) => uploadSingleFile(file));
    // console.log("promise:", promise);

    return Promise.all(files.map((file) => uploadSingleFile(file)));
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
        console.log("UPLOAD FILES:", event.target.files);
        addFiles(event.target.files);
        // If a user adds a file via the input, decides to remove it from their file list, then changes their mind and decides to use the input to add that file again, then the file input will not fire the `change` event because the file input has not changed. By resetting `event.target.value` back to null, we ensure the event will always be fired.
        event.target.value = null;
      }}
    >
  </div>
  <div id="drag-drop-text-wrapper">
    <slot>Or Drag &amp; Drop Files Here</slot>
  </div>
  <div id="icon-wrapper">
    <Icon icon="{dragAndDropIcon}" width="50" />
  </div>

  {#if files.length > 0}
    <div id="upload-progress-container">
      {#if !uploading}
        <div id="upload-all-files-btn-wrapper">
          <Button
            btnIcon={dropZoneUploadFileBtnIcon}
            on:click={() => {
              uploading = true;
              uploadMultipleFiles();
            }}
          >
            Upload Files
          </Button>
        </div>
      {/if}
      {#each files as file (file.id)}
        <!-- <div class="progress-item-wrapper">
          <div class="label-wrapper">
            <label for={file.id}>{file.name}</label>
          </div>
          <progress id={file.id} max="100" value="50">long-file-name-goes-here.csv</progress>
        </div> -->
        <div class="progress-item-wrapper">
          <div class="label-wrapper">
            {#if !uploading}
              <button class="remove-file-btn" on:click={() => removeFile(file)}>&times</button>
            {/if}
            <label for={file.id}>{file.name}</label>
          </div>
          {#if uploading}
            <div class="progress-bar-wrapper">
              <div id={file.id} class="outer">
                <div class="inner" style={`width: ${uploadProgress}%`}>&nbsp;&nbsp;{uploadProgress}%&nbsp;&nbsp;</div>
              </div>
            </div>
          {/if}
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

    & #form {
      margin-bottom: 10px;
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

    & #icon-wrapper {
      margin-bottom: 5px;
      pointer-events: none;
    }

    & #upload-progress-container {
      margin: 20px 0;
      
      /* & .progress-item-wrapper {
        text-align: left;
      
        & .label-wrapper {
          margin-bottom: 5px;
        }

        Styling progress bars: https://css-tricks.com/html5-progress-element/
        & progress[value] {
          Reset the default appearance
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 20px;

          &::-webkit-progress-bar {
            background-color: white;
            border-radius: 3px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
          }

          &::-webkit-progress-value {
            background-color: #603cba;
            border-radius: 3px;
          }
        }
      } */

      & .progress-item-wrapper {
        margin-bottom: 10px;
        text-align: left;

        & .label-wrapper {
          display: flex;
          margin-bottom: 5px;

          & .remove-file-btn {
            padding: 0;
            border: none;
            margin-right: 5px;
            outline: none;
            background-color: transparent;
            font-size: 1.75rem;
            line-height: 1rem;
            color: #343434;
            cursor: pointer;
          }
        }

        & .progress-bar-wrapper {
          display: flex;

          & .outer {
            flex: 1;
            display: flex;
            border-radius: 20px;
            background-color: white;

            & .inner {
              border-radius: 20px;
              background-color: #603cba;
              color: #e5e5e5;
              text-align: right;
              line-height: 1.5em;
            }
          }
        }
      }
    }
  }
</style>
