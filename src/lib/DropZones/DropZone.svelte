<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/env";
  import Icon from "@iconify/svelte";
  import { Button } from "../Buttons";
  import { theme } from "/src/fpui-theme";

  export let dropZoneSelectFilesBtnIcon = theme.dropZoneSelectFilesBtnIcon;
  export let dragAndDropIcon = theme.dropZoneDragAndDropIcon;
  export let dropZoneUploadFilesBtnIcon = theme.dropZoneUploadFilesBtnIcon;
  export let uploadFiles;

  let formData;
  let formDataKeys = [];
  // files is an array of `FormDataEntryValue`s. See https://developer.mozilla.org/en-US/docs/Web/API/FormData/getAll.
  // $: files = formData.getAll("files");
  // let files = [];
  let events = ["dragenter", "dragover", "dragleave", "drop"];
  let fileInput;
  
  let active = false;
  // // This reactive block will reset `active` to false if the user removes all files to be uploaded.
  // $: {
  //   // Refer to the FormData API for information on the FormData methods: https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
  //   // formData.entries() returns an iterator, but I need to work with an array.
  //   // The [...formData.entries()] syntax is how you convert an iterable to an array.
  //   // See https://www.samanthaming.com/tidbits/78-iterables-to-array-using-spread/
  //   if (formData && [...formData.entries()].length > 0) {
  //     active = true;
  //   }
  //   else {
  //     active = false;
  //   }
  // }
  // $: {
  //   if (files.length > 0) {
  //     active = true;
  //   }
  //   else {
  //     active = false;
  //   }
  // }
  
  let uploading = false;

  onMount(() => {
    // formData = new FormData();
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
    addFiles(event.dataTransfer.files);
  }

  function addFiles(newFiles) {
    console.log("New Files:", newFiles);
    formData = new FormData();

    for (let i = 0; i < newFiles.length; i++) {
      console.log("File Name:", newFiles[i].name);
      let id = `${newFiles[i].name}-${newFiles[i].size}-${newFiles[i].lastModified}-${newFiles[i].type}`;
      // Append each file with a unique ID as the key. This key can then be used to remove files.
      formData.append(id, newFiles[i]);

      // if (formData) {
      //   // Use formData.keys() to create an array of formData keys.
      //   for (let key of formData.keys()) {
      //     formDataKeys.push(key);
      //   }
      //   // If the formDataKeys array does not already include the id of the new file (in this iteration of the loop), then append the new file to formData.
      //   // This will remove any duplicate files in the formData.
      //   if (!formDataKeys.includes(id)) {
      //     formData.append(id, newFiles[i]);
      //   }
      // }
      // // formData.append("files", newFiles[i]);
    }

    // console.log("Added Files:", formData.getAll("files"));
	}

  // function addFiles(newFiles) {
  //   console.log("New Files:", newFiles);
	// 	let newUploadableFiles = [...newFiles].map((file) => createUploadableFile(file)).filter((file) => !fileExists(file.id));
	// 	files = files.concat(newUploadableFiles);
  //   console.log("DropZone Files:", files);
	// }

	// function fileExists(otherId) {
	// 	return files.some(({ id }) => id === otherId);
	// }

	// function removeFile(file) {
  //   let index = files.indexOf(file);
	// 	if (index > -1) {
  //     files.splice(index, 1);
  //     console.log("Form Data:", files);
  //     files = files;
  //   }
	// }

  // TODO: Right now I am using unique keys for each file that gets appended to the formData object so I can remove individual files in the DropZone component. However, that seems unnecessary and causes the code to be a bit complex. Maybe I should use the same "files" key for all of these files and have a "Remove Files" button that will clear out all the files. I think if I can access all the files with a formData.getAll("files") method, then it might be much easier to process and upload the files in the API endpoint.
  function removeFile(fileKey) {
    formData.delete(fileKey);
    formData = formData;
  }

  // function createUploadableFile(file) {
  //   return {
  //     lastModified: file.lastModified,
  //     lastModifiedDate: file.lastModifiedDate,
  //     name: file.name,
  //     size: file.size,
  //     type: file.type,
  //     id: `${file.name}-${file.size}-${file.lastModified}-${file.type}`,
  //     url: URL.createObjectURL(file),
  //     status: null,
  //   };
  // }

  async function handleUpload() {
    try {
      uploading = true;

      for (let entry of formData.entries()) {
        console.log("Form Data handleUpload:", `${entry[0]}: ${entry[1]}`);
      }

      await uploadFiles(formData);
      uploading = false;
      // Clear the formData object, which will also clear the list of files in the DropZone.
      formData = null;
    }
    catch(err) {
      console.error("handleUpload Error:", err);
    }
  }
</script>


<div 
  class="drop-zone"
  class:active
  on:drop|preventDefault={(event) => {
    handleDrop(event);
    active = false;
  }}
  on:dragenter|preventDefault={() => active = true}
  on:dragover|preventDefault={() => active = true}
  on:dragleave|preventDefault={() => active = false}
>
  <div class="file-input-container">
    <span class="file-input-btn-container">
      <Button btnIcon={dropZoneSelectFilesBtnIcon} id="file-input-btn" on:click={() => fileInput.click()}>Select Files</Button>
    </span>
    <input
      bind:this={fileInput}
      type="file" 
      class="file-input-field" 
      multiple
      accept="*"
      on:change={(event) => {
        addFiles(event.target.files);
        // If a user adds a file via the input, decides to remove it from their file list, then changes their mind and decides to use the input to add that file again, then the file input will not fire the `change` event because the file input has not changed. By resetting `event.target.value` back to null, we ensure the event will always be fired.
        event.target.value = null;
      }}
    >
  </div>
  <div class="drag-drop-text-container">
    <slot>Or Drag &amp; Drop Files Here</slot>
  </div>
  <div class="drag-drop-icon-container">
    <Icon icon="{dragAndDropIcon}" width="50" />
  </div>

  <!-- {#if files.length > 0} -->
  {#if formData && [...formData.entries()].length > 0}
    <div class="upload-files-container">
      <div class="upload-all-files-btn-container">
        <Button
          btnIcon={dropZoneUploadFilesBtnIcon}
          disabled={uploading}
          on:click={handleUpload}
        >
          Upload Files
        </Button>
      </div>
      <!-- {#each files as file (file.id)} -->
      {#each [...formData.entries()] as file (file[0])}
        <div class="file-container">
          <div class="file-name" class:active>{file[1].name}</div>
          <button class="remove-file-btn" on:click={() => removeFile(file[0])} disabled={uploading}><Icon icon="ri:delete-bin-2-line" width="16" /></button>
        </div>
      {/each}
    </div>
  {/if}
</div>


<style>
  .drop-zone {
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
      background-color: var(--fpui-drop-zone-bg-color-active, white);
    }

    & .file-input-container {
      margin-bottom: 30px;
      pointer-events: none;

      & .file-input-btn-container {
        pointer-events: all;
      }

      /* Hide the file input field. */
      & .file-input-field {
        display: none;
      }
    }

    & .drag-drop-text-container {
      margin-bottom: 10px;
      pointer-events: none;
    }

    & .drag-drop-icon-container {
      margin-bottom: 5px;
      pointer-events: none;
    }

    & .upload-files-container {
      margin: 20px 0;

      & .upload-all-files-btn-container {
        margin-bottom: 20px;
      }

      & .file-container {
        display: flex;
        margin: 10px 0;
        text-align: left;

        & .file-name {
          flex: 1;
          padding: 5px;
          border-radius: 3px;
          background-color: var(--fpui-drop-zone-files-set-for-upload-bg-color, #e5e5e5);
          color: var(--fpui-drop-zone-files-set-for-upload-text-color, #343434);

          &.active {
            background-color: var(--fpui-drop-zone-bg-color, #e5e5e5);
          }
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
            color: #a0a0a0;
            cursor: default;
          }
        }
      }
    }
  }
</style>
