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

  // Refer to the FormData API for information on the FormData methods used in this component: https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
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
  //   // Refer to the FormData API for information on the FormData methods used in this component: https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
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

  /**
   * This function appends new files to the FormData object.
   * @param {Object} newFiles - newFiles is a FileList object that contains all of the files that the user selected after clicking the file input button or all the files that were dragged and dropped onto the drop zone. Each item in the FileList object is a File object.
   */
  function addFiles(newFiles) {
    // If there is no existing FormData object, then create a new one.
    // This will allow new files to be appended to the end of the existing FormData object.
    // If there was no conditional `if (!formData)` statement, then a new FormData object would be created each time a user selected or dropped new files and all their previously selected files would be removed from the list of files to be uploaded.
    if (!formData) {
      formData = new FormData();
    }

    // Loop over the File objects (that are inside the newFiles FileList object) and append the files that do not already exist in the FormData object.
    for (let i = 0; i < newFiles.length; i++) {
      // Create a unique ID for each file that will be used as the key when the file is appended to the FormData object.
      let id = `${newFiles[i].name}-${newFiles[i].size}-${newFiles[i].lastModified}-${newFiles[i].type}`;
      
      // If the formDataKeys array does not already include the id of the new file (from this iteration of the loop), then append the new file to the FormData object and push the id to the formDataKeys array so this file will not be duplicated in the FormData object.
      if (!formDataKeys.includes(id)) {
        // Append each file with a unique ID as the key. This key can then be used to remove files.
        formData.append(id, newFiles[i]);
        // Push the id to the formDataKeys array.
        formDataKeys.push(id);
      }
    }

    // Use Svelte's reactive assignment to show the current state of the FormData object in the DOM.
    formData = formData;
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

  /**
   * Since each file that is appended to the FormData object has a unique key, 
   * this function can use that key to delete a file from the FormData object. 
   * See https://developer.mozilla.org/en-US/docs/Web/API/FormData/delete
   * @param {string} fileKey - The key that is used to delete the key/value pair from the FormData object.
   */
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
      // Set uploading to true so the "Upload Files" button will be disabled and provide user feedback.
      uploading = true;

      // Before passing the FormData object to the backend (or to a 3rd-party API) for processing, create a new FormData object where each key is "files" instead of each key being a unique file ID. If each entry in the FormData object has the same key, then it should make it easier to loop over and process the files for uploading. 
      // For example, you could simply access the files with formData.getAll("files"), which will return an array of File objects that you can work with easily.

      // Create a new, reformatted FormData object.
      let reformattedFormData = new FormData();
      // Get the values from the FormData object, which are each File objects. formData.values() returns an iterator, but often times you need to work with an array. So the [...formData.values()] syntax is how you convert an iterable to an array. See https://www.samanthaming.com/tidbits/78-iterables-to-array-using-spread/
      let formDataValuesArray = [...formData.values()];
      // Loop over the File objects in the formDataValuesArray and append each File object to the new reformattedFormData object and give each File object a key of "files".
      for (let i = 0; i < formDataValuesArray.length; i++) {
        reformattedFormData.append("files", formDataValuesArray[i]);
      }

      console.log("reformattedFormData:", reformattedFormData.getAll("files"));

      setTimeout(async () => {
        await uploadFiles(reformattedFormData);
        uploading = false;
        formData = null;
        formDataKeys.length = 0;
      }, 10000);

      // // Call the `uploadFiles()` function that is passed in as props to this component and pass it the new reformattedFormData object.
      // await uploadFiles(reformattedFormData);
      // // Once execution returns back to this function, set `uploading` back to false to re-enable the buttons in this component.
      // uploading = false;
      // // Clear the FormData object, which will also clear the list of files in the DropZone.
      // formData = null;
      // // Clear the formDataKeys array so it is reset for a new batch of files to be uploaded.
      // formDataKeys.length = 0;
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
    // If some files are already uploading, then return early so new files cannot be dropped.
    if (uploading) return;
    // You can access the files from a `drop` event through the event.dataTransfer.files property.
    addFiles(event.dataTransfer.files);
    active = false;
  }}
  on:dragenter|preventDefault={() => {
    // If new files are dragged over the drop zone while other files are already uploading,
    // then return early to maintain a "disabled" appearance.
    if (uploading) return;
    active = true;
  }}
  on:dragover|preventDefault={() => {
    // If new files are dragged over the drop zone while other files are already uploading,
    // then return early to maintain a "disabled" appearance.
    if (uploading) return;
    active = true;
  }}
  on:dragleave|preventDefault={() => {
    // It is always ok to set `active` to false when a user drags files away from the drop zone. 
    // So it is not necessary to check if `uploading` is true before setting `active` back to false.
    active = false;
  }}
>
  <div class="file-input-container">
    <span class="file-input-btn-container">
      <Button
        id="file-input-btn" 
        on:click={() => fileInput.click()}
        disabled={uploading}
        btnIcon={dropZoneSelectFilesBtnIcon}
        btnIconDisabled={dropZoneSelectFilesBtnIcon}
        btnIconDisabledShouldSpin={false}
      >
        Select Files
      </Button>
    </span>
    <input
      bind:this={fileInput}
      type="file" 
      class="file-input-field" 
      multiple
      accept="*"
      on:change={(event) => {
        // You can access the files from a file input's `change` event through the event.target.files property.
        addFiles(event.target.files);
        // If a user adds a file via the input, decides to remove it from their file list, then changes their mind and decides to use the input to add that file again, then the file input will not fire the `change` event because the file input has not changed. By resetting `event.target.value` back to null, you ensure the `change` event will always be fired.
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
          <button class="remove-file-btn" on:click={() => removeFile(file[0])} disabled={uploading}>
            <Icon icon="ri:delete-bin-2-line" width="16" />
          </button>
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
