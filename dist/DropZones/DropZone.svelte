<!--
  This component was created following these tutorials:
  * https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
  * https://www.smashingmagazine.com/2022/03/drag-drop-file-uploader-vuejs-3/
-->
<!-- If I want to enhance this component, then I can refer to the second part of this tutorial (which uses the HTML Drag and Drop API):
https://blog.logrocket.com/create-drag-and-drop-component-react-dropzone/ -->

<script>import { onMount, onDestroy } from "svelte";
import { browser } from "$app/environment";
import Icon from "@iconify/svelte";
import { Button } from "../Buttons";
export let handleFileUploads;
export let accept = "*";
export let dropZoneSelectFilesBtnIcon = "lucide:mouse-pointer-2";
export let dragAndDropIcon = "pixelarticons:drag-and-drop";
export let dropZoneUploadFilesBtnIcon = "mdi:cloud-upload";
let formData;
let events = ["dragenter", "dragover", "dragleave", "drop"];
let fileInput;
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
function addFilesToStage(stagedFiles) {
    console.log("STAGED FILES:", stagedFiles);
    if (!formData) {
        formData = new FormData();
    }
    for (let i = 0; i < stagedFiles.length; i++) {
        let id = `${stagedFiles[i].name}-${stagedFiles[i].size}-${stagedFiles[i].lastModified}-${stagedFiles[i].type}`;
        if (!formData.has(id)) {
            formData.append(id, stagedFiles[i]);
        }
    }
    formData = formData;
}
function removeFile(fileKey) {
    formData.delete(fileKey);
    formData = formData;
}
async function handleUpload() {
    try {
        uploading = true;
        let reformattedFormData = new FormData();
        let formDataValuesArray = [...formData.values()];
        for (let i = 0; i < formDataValuesArray.length; i++) {
            reformattedFormData.append("files", formDataValuesArray[i]);
        }
        await handleFileUploads(reformattedFormData);
        uploading = false;
        formData = null;
    }
    catch (err) {
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
    addFilesToStage(event.dataTransfer.files);
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
  <!-- Use enctype="multipart/form-data" if the form contains <input type="file"> elements (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-enctype). -->
  <form on:submit|preventDefault={handleUpload} enctype="multipart/form-data">
    <div class="file-input-container">
      <!-- Wrap the #file-input-btn in a span so you can reset the `pointer-events` to `auto` in the CSS. -->
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
        {accept}
        on:change={(event) => {
          // You can access the files from a file input's `change` event through the event.target.files property.
          addFilesToStage(event.target.files);
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

    {#if formData && [...formData.entries()].length > 0}
      <div class="upload-files-container">
        <div class="upload-all-files-btn-container">
          <Button
            type="submit"
            btnIcon={dropZoneUploadFilesBtnIcon}
            disabled={uploading}
          >
            Upload Files
          </Button>
        </div>
        {#each [...formData.entries()] as file (file[0])}
          <div class="staged-file-container">
            <div class="file-name" class:active>{file[1].name}</div>
            <button class="remove-file-btn" on:click={() => removeFile(file[0])} disabled={uploading}>
              <Icon icon="ri:delete-bin-2-line" width="16" />
            </button>
          </div>
        {/each}
      </div>
    {/if}
  </form>
</div>


<style>
  .drop-zone {
    padding: 20px;
    padding-bottom: 5px;
    border: 2px dashed;
    border-color: var(--neutral-8);
    border-radius: var(--border-radius);
    text-align: center;
    background-color: var(--bg-color-element-default);
    color: var(--text-color-default);
    outline: none;
    -webkit-transition: border 0.25s ease-in-out;
    transition: border 0.25s ease-in-out;
  }.drop-zone.active {
      background-color: var(--white);
    }.drop-zone .file-input-container {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      margin-bottom: 30px;
      /* The pointer-events CSS property sets under what circumstances (if any) a particular graphic element can become the target of pointer events. (https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events) */
      /* What does the `pointer-events: none` rule do? The .drop-zone element is configured to change state from inactive to active when a user drags files over the top of it. But the .drop-zone element has child elements nested inside of it. Each time a user drags files over the top of any of those child elements the browser acts as if the user leaves the .drop-zone element and enters the child element for a moment. However, the drag events bubble up from the child elements and are handled by the .drop-zone element. The drag events that the .drop-zone element handles each fire at different times, which causes the active state to switch back and forth causing the UI to flicker. */
      /* The pointer-events rules provide specific instructions to specific elements telling them which ones can receive pointer events (e.g. hover events) and which ones cannot. Setting some elements to `pointer-events: none` tells them that they cannot receive any pointer events. So pointer events won't fire on those elements when they are being hovered, which eliminates the flickering issue. */
      pointer-events: none;
    }.drop-zone .file-input-container .file-input-btn-container {
        /* Pointer events rules trickle down to child elements. So if you have any child elements that need to have pointer events enabled, then you have to specifically state which child elements should have pointer events. */
        pointer-events: auto;
      }/* Hide the file input field. */.drop-zone .file-input-container .file-input-field {
        display: none;
      }.drop-zone .drag-drop-text-container {
      margin-bottom: 20px;
      pointer-events: none;
    }.drop-zone .drag-drop-icon-container {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      margin-bottom: 5px;
      pointer-events: none;
    }.drop-zone .upload-files-container {
      margin: 20px 0;
    }.drop-zone .upload-files-container .upload-all-files-btn-container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        margin-bottom: 20px;
      }.drop-zone .upload-files-container .staged-file-container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin: 10px 0;
        text-align: left;
      }.drop-zone .upload-files-container .staged-file-container .file-name {
          -webkit-box-flex: 1;
              -ms-flex: 1;
                  flex: 1;
          padding: 5px;
          border-radius: 3px;
          background-color: var(--white);
          color: inherit;
        }.drop-zone .upload-files-container .staged-file-container .file-name.active {
            background-color: var(--bg-color-element-default);
          }.drop-zone .upload-files-container .staged-file-container .remove-file-btn {
          padding: 0;
          border: none;
          margin-left: 5px;
          outline: none;
          background-color: transparent;
          color: inherit;
          cursor: pointer;
        }.drop-zone .upload-files-container .staged-file-container .remove-file-btn:disabled {
            color: #a0a0a0;
            cursor: default;
          }</style>
