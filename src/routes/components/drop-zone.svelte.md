<script lang="ts">
  import { onMount, tick } from "svelte";
  import { DropZone } from "/src/lib";
  import { ToastContent } from "/src/lib";
  import { BlobServiceClient } from "@azure/storage-blob";
  import Icon from "@iconify/svelte";

  // const { VITE_AZURE_BLOB_SERVICE_SAS_URL } = import.meta.env;

  let containersList = [];
  let filesArray = [];
  let loading = false;

  // Pass a function named "uploadFiles" to the <DropZone /> component.
  // Look at the documentation for your cloud storage service to find out how to upload files to their service. The API code for uploading files to their service is what you will put in this function.
  // Your "uploadFiles" function needs to be an async function and the signature need to match this one.
  async function uploadFiles(formData) {
    try {
      loading = true;

      console.log("Form Data (browser):", [...formData.entries()]);

      let url = "/api/handle-file-uploads";
      let response = await fetch(url, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw Error(response.statusText);
      }
      
      let result = await response.json();
      console.log("uploadFiles Result:", result);

      let filenamesList = "";
      for (let i = 0; i < result.length; i++) {
        let separator;
        // Separate each filename with a comma and a space except for the last filename.
        if (i === result.length - 1) {
          separator = "";
        }
        else {
          separator = ", ";
        }
        filenamesList = filenamesList + result[i] + separator;
      }
      ToastContent.set({ type: "success", msg: "Files have been uploaded." });

      loading = false;
    }
    catch(err) {
      console.error("uploadFiles Error:", err);
      ToastContent.set({ type: "error", msg: err.message });
    }
  }

  // // Pass a function named "uploadFiles" to the <DropZone /> component.
  // // Look at the documentation for your cloud storage service to find out how to upload files to their service. The API code for uploading files to their service is what you will put in this function.
  // // Your "uploadFiles" function needs to be an async function and the signature need to match this one.
  // async function uploadFiles(files) {
  //   try {
  //     const promises = [];
  //     for (const file of files) {
  //       // Get a blockBlobClient from the containerClient.
  //       // NOTE: You might want to add a unique ID to the end of each filename so your users do not accidentally overwrite any files that have the same filename. Or if their is an API setting that does not allow users to overwrite existing files, then you may want to use that.
  //       const blockBlobClient = containerClient.getBlockBlobClient(file.name);
  //       promises.push(blockBlobClient.uploadBrowserData(file));
  //     }
  //     await Promise.all(promises);
  //     await getFiles();
  //     ToastContent.set({ type: "success", msg: "Files have been uploaded." });
  //   }
  //   catch(err) {
  //     console.error("uploadFiles Error:", err);
  //     ToastContent.set({ type: "error", msg: err.message });
  //   }
  // }

  // // Create a new BlobServiceClient.
  // const blobServiceClient = new BlobServiceClient(VITE_AZURE_BLOB_SERVICE_SAS_URL);
  // // Create a unique name for the container by appending the current time to the file name.
  // // const containerName = "container" + new Date().getTime();
  // const containerName = "acmeco";
  // // Get a container client from the BlobServiceClient.
  // const containerClient = blobServiceClient.getContainerClient(containerName);

  // onMount(async () => {
  //   await getContainers();
  //   if (!containersList.includes(containerName)) {
  //     await createContainer();
  //   }
  //   await getFiles();
  // });

  // async function getContainers() {
  //   // Reset the containersList so the DOM will show the current items in the array when this function finishes executing.
  //   containersList.length = 0;

  //   try {
  //     let i = 1;
  //     let containers = blobServiceClient.listContainers();
  //     console.log("List of Containers from getContainers():");
  //     for await (const container of containers) {
  //       console.log(`Container ${i++}: ${container.name}`);
  //       containersList.push(container.name);
  //     }
  //     containersList = containersList;
  //   }
  //   catch(err) {
  //     console.log("getContainers Error:", err);
  //   }
  // }

  // async function createContainer() {
  //   try {
  //     await containerClient.create();
  //   } 
  //   catch(err) {
  //     console.error("createContainer Error:", err);
  //   }
  // }

  // // This code calls the ContainerClient.listBlobsFlat function, then uses an iterator to retrieve the name of each BlobItem returned. For each BlobItem, it updates the Files list with the name property value.
  // async function getFiles() {
  //   let updatedFilesArray = [];

  //   try {
  //     let iter = containerClient.listBlobsFlat();
  //     let blobItem = await iter.next();
  //     while (!blobItem.done) {
  //       updatedFilesArray.push(blobItem);
  //       blobItem = await iter.next();
  //     }
  //     // Use Svelte's reactive assignment to show the current state of filesArray in the DOM.
  //     filesArray = updatedFilesArray;
  //     console.log("FILES ARRAY:", filesArray);
  //   }
  //   catch(err) {
  //     console.error("getFiles Error:", err);
  //   }
  // }

  // // Pass a function named "uploadFiles" to the <DropZone /> component.
  // // Look at the documentation for your cloud storage service to find out how to upload files to their service. The API code for uploading files to their service is what you will put in this function.
  // // Your "uploadFiles" function needs to be an async function and the signature need to match this one.
  // async function uploadFiles(files) {
  //   try {
  //     const promises = [];
  //     for (const file of files) {
  //       // Get a blockBlobClient from the containerClient.
  //       // NOTE: You might want to add a unique ID to the end of each filename so your users do not accidentally overwrite any files that have the same filename. Or if their is an API setting that does not allow users to overwrite existing files, then you may want to use that.
  //       const blockBlobClient = containerClient.getBlockBlobClient(file.name);
  //       promises.push(blockBlobClient.uploadBrowserData(file));
  //     }
  //     await Promise.all(promises);
  //     await getFiles();
  //     ToastContent.set({ type: "success", msg: "Files have been uploaded." });
  //   }
  //   catch(err) {
  //     console.error("uploadFiles Error:", err);
  //     ToastContent.set({ type: "error", msg: err.message });
  //   }
  // }

  // async function deleteFile(file) {
  //   try {
  //     loading = true;
  //     await containerClient.deleteBlob(file);
  //     await getFiles();
  //     loading = false;
  //   }
  //   catch(err) {
  //     console.error("deleteFile Error:", err);
  //   }
  // }
</script>


# Drop Zone (file upload)

---

<em><strong>Shameless Plug</strong>: <a href="https://uploadcare.com/">Uploadcare</a> is one of my favorite cloud storage services because of how easy it is to use and all the features it has. It is also built on top of the Akamai CDN platform, which is one of the leading CDN platforms, and Uploadcare has a pretty generous free tier. I am not writing a tutorial using Uploadcare because their <a href="https://uploadcare.com/docs/integrations/js-upload-client/">browser API</a> is already pretty simple and they also have a really cool <a href="https://uploadcare.com/docs/uploads/file-uploader/">File Uploader</a> widget that you can use off-the-shelf and even customize the styles to match your app. So a custom file upload component might not be necessary if you are using Uploadcare. I have used Uploadcare's File Uploader widget in a SvelteKit app and it is awesome!</em>

---

File uploads are handled a bit differently in modern web development than they were once upon a time. For example, nowadays you will most likely use a cloud object storage service like Amazon S3, Cloudflare R2, Google Cloud Storage, Azure Storage, Cloudinary, or Uploadcare to handle your file storage (or at least you should use a cloud storage service). Each cloud storage service provides its own APIs and many of them even provide ready-made widgets that you can plug into your web app and use "off-the-shelf" to connect with the cloud storage service.

Given that there are many cloud storage services available, each with their own set of APIs and functionality, it can be pretty difficult to create a file upload component that can be used with any cloud storage service. Since each cloud storage service provides their own APIs (and even widgets), I recommend that you read the docs for your cloud storage service and follow their instructions for creating a file upload component that you can reuse in your own apps. 

Since maintaining consistent branding across your components is a common concern when using off-the-shelf widgets, I have written a tutorial on this page that walks you through creating a custom drop zone component. I will show you the concepts involved with a drop zone component and you can customize it to fit your needs.

Many cloud storage services provide APIs for handling file uploads directly from your browser-side code or from your server-side code. I think the browser-side options might be a better choice for frontend frameworks (e.g. Svelte, Vue, React) and the server-side options might be a better choice for server frameworks (e.g. when you use the built-in template files for your frontend code - e.g. Express.js, FastAPI, Laravel). Also, as of this writing (April 2022), when creating a file upload component for SvelteKit you will probably want to use the browser-side option anyway because SvelteKit does not yet have the ability to handle large file uploads on the server-side. In order to handle large file uploads (on the server-side) you have to implement streams and [handling streams in SvelteKit is still a TODO item](https://github.com/sveltejs/kit/issues/3419) right now.

One additional benefit of using your cloud storage service's APIs is that they will take care of all the security issues for you, so you don't have to handle those things yourself. Cloud storage APIs for the win!

---

## Example Usage

<DropZone {uploadFiles}>File Drop</DropZone>

<br>

<div><b>Files in the storage bucket:</b></div>
{#if filesArray.length > 0}
  {#each filesArray as file (file.value.name)}
    <div class="file-wrapper">
      <div class="file-name">{file.value.name}</div>
      {#if loading}
        <button class="remove-file-btn" title="Delete file">
          <Icon icon="icomoon-free:spinner2" width="16" class="fpui-spin" />
        </button>
      {:else}
        <button class="remove-file-btn" on:click={() => deleteFile(file.value.name)} title="Delete file">
          <Icon icon="ri:delete-bin-2-line" width="16" />
        </button>
      {/if}
    </div>
  {/each}
{:else}
  <div class="empty-container">Your container does not contain any files.</div>
{/if}

<br><br>

The only thing you have to do to get this component to work is pass it a function named "uploadFiles". Look at the documentation for your cloud storage service to find out how to upload files to their service. The API code for uploading files to there service is what you will put in this function. Your "uploadFiles" function needs to be an async function and the signature need to match this one.

---

## Slots
| Slot name | Default value | Description |
| --------- | ------------- | ----------- |
| Default slot (optional) | `Or Drag & Drop Files Here` | The text/instructions that will be displayed in the drop zone. |

<br>

## Tutorial

This tutorial will show you how to create a custom drop zone component that integrates with Azure Storage. I am following this article: [Quickstart: Manage blobs with JavaScript v12 SDK in a browser](https://docs.microsoft.com/en-us/azure/storage/blobs/quickstart-blobs-javascript-browser)

The final version from this tutorial will be identical to the component in the "Example Usage" section above.

SvelteKit uses Vite to bundle its files. Vite uses the `dotenv` package to load your environment variables from `.env` files, so you do not need to install the `dotenv` package in order to load environment variables from `.env` files. However, you do need to remember to prefix each environment variable with `VITE_` and you can access those environment variables in `.svelte` files from Vite's `import.meta.env` object (instead of the `process.env` object).

TODOS:
* At this point in the Quickstart: [Create a SAS connection string](https://docs.microsoft.com/en-us/azure/storage/blobs/quickstart-blobs-javascript-browser#create-a-sas-connection-string) I need to find out if the Azure Storage "Start and expiry date/time" auto-renews or if that expiration permanent?
* Include this link to the Azure SDK for JavaScript: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob#list-the-containers

* Containers are like folders.
* Blob stands for **B**inary **L**arge **Ob**ject, which includes objects such as images and multimedia files. These are known as unstructured data because they don't follow any particular data model. *(Source: [SnapLogic - Azure Blob Storage](https://www.snaplogic.com/glossary/azure-blob-storage#:~:text=Azure%20Blob%20storage%20is%20a,as%20images%20and%20multimedia%20files.))*


<style>
  .file-wrapper {
    display: flex;
    border-bottom: 1px dotted #343434;
    margin: 10px 0;
    text-align: left;

    & .file-name {
      flex: 1;
      padding: 5px;
      padding-left: 0;
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
    }
  }

  .empty-container {
    margin: 10px 0;
  }
</style>
