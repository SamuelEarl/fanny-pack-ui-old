<script lang="ts">
  import { onMount, tick } from "svelte";
  import { DropZone } from "/src/lib";
  import { BlobServiceClient } from "@azure/storage-blob";

  const { VITE_AZURE_BLOB_SERVICE_SAS_URL } = import.meta.env;

  let fileInput;
  let status;
  let statusMessages = [];
  let message = "";
  let containersArray = [];
  let filesArray = [];

  // Create a new BlobServiceClient.
  const blobServiceClient = new BlobServiceClient(VITE_AZURE_BLOB_SERVICE_SAS_URL);
  // Create a unique name for the container.
  let containerName = "";
  // The container from the list will be bound to selectedContainer.
  let selectedContainer = containersArray[0];
  let containerClient;

  onMount(async () => {
    await listContainers();
    await setContainerClient();
  });

  async function setContainerClient() {
    console.log("setContainerClient selectedContainer:", selectedContainer);
    // Get a container client from the BlobServiceClient.
    containerClient = blobServiceClient.getContainerClient(selectedContainer);
    // Show the files for the currently selected container.
    await listFiles();
  }

  async function reportStatus(newMessage) {
    statusMessages.push(newMessage);
    // Use Svelte's reactive assignment to show the updated messages in the DOM.
    statusMessages = statusMessages;
    // Wait for the DOM to update before setting the scrollTop position.
    await tick();
    // Scroll the status element to the bottom of the content.
    status.scrollTop = status.scrollHeight;
  }

  async function createContainer() {
    try {
      reportStatus(`Creating container "${containerName}"...`);
      // Create a new container with the user-entered name.
      containerClient = blobServiceClient.getContainerClient(containerName);
      await containerClient.create();
      // Show the updated list of containers after this new one has been created.
      await listContainers();
      // Set the selectedContainer to the newly created one.
      selectedContainer = containerName;
      // Reset containerName.
      containerName = "";
      reportStatus(`Done.`);
    } 
    catch(err) {
      reportStatus(`ERROR: ${err.message}`);
    }
  }

  async function listContainers() {
    // Reset the containersArray so the DOM will show the current items in the array when this function finishes executing.
    containersArray.length = 0;

    try {
      let i = 1;
      let containers = blobServiceClient.listContainers();
      for await (const container of containers) {
        console.log(`Container ${i++}: ${container.name}`);
        containersArray.push(container.name);
      }
      containersArray = containersArray;
    }
    catch(err) {
      reportStatus(`ERROR: ${err.message}`);
    }
  }

  async function deleteContainer() {
    try {
      reportStatus(`Deleting container "${containerName}"...`);
      await containerClient.delete();
      // Show the updated list of containers after this one has been deleted.
      await listContainers();
      reportStatus(`Done.`);
    }
    catch(err) {
      reportStatus(`ERROR: ${err.message}`);
    }
  }

  // This code calls the ContainerClient.listBlobsFlat function, then uses an iterator to retrieve the name of each BlobItem returned. For each BlobItem, it updates the Files list with the name property value.
  async function listFiles() {
    // Reset the filesArray array so the DOM will show the current items in the array when this function finishes executing.
    filesArray.length = 0;

    try {
      reportStatus("Retrieving file list...");
      let iter = containerClient.listBlobsFlat();
      let blobItem = await iter.next();
      while (!blobItem.done) {
        filesArray.push(blobItem);
        blobItem = await iter.next();
      }
      // Use Svelte's reactive assignment to show the current state of filesArray in the DOM.
      filesArray = filesArray;
      if (filesArray.length > 0) {
        reportStatus("Done.");
      }
      else {
        reportStatus("The container does not contain any files.");
      }
    }
    catch(err) {
      reportStatus(`ERROR: ${err.message}`);
    }
  }

  async function uploadFiles() {
    try {
      reportStatus("Uploading files...");
      const promises = [];
      for (const file of fileInput.files) {
        // Get a blockBlobClient from the containerClient.
        const blockBlobClient = containerClient.getBlockBlobClient(file.name);
        promises.push(blockBlobClient.uploadBrowserData(file));
      }
      await Promise.all(promises);
      reportStatus("Done.");
      // Show the updated list of files for this container.
      listFiles();
    }
    catch(err) {
      reportStatus(`ERROR: ${err.message}`);
    }
  }

  async function deleteFiles() {
    try {
      if (filesArray.length > 0) {
        reportStatus("Deleting files...");
        for (const file of filesArray) {
          await containerClient.deleteBlob(file.value.name);
        }
        reportStatus("Done.");
        // Show the updated list of files for this container.
        listFiles();
      } 
      else {
        reportStatus("No files selected.");
      }
    }
    catch(err) {
      reportStatus(`ERROR: ${err.message}`);
    }
  }
</script>


<br>
<div>
  <label for="container-name">Enter the name of the new container that you want to create:</label><br>
  <input type="text" id="container-name" bind:value={containerName} placeholder="Enter name of container" />
  <button on:click={createContainer} disabled={!containerName}>Create new container</button>
</div>

<br>

<div>
  <label for="container-list">Select the name of the container that you want to manage:</label><br>
  {#if containersArray.length === 0}
    <div><em>No containers exist. Please create a container.</em></div>
  {:else}
    <select id="container-list" bind:value={selectedContainer} on:change={setContainerClient}>
      {#each containersArray as container}
        <option value={container}>{container}</option>
      {/each}
    </select>
  {/if}
</div>

<br>

<div>
  <button on:click={() => fileInput.click()} disabled={containersArray.length === 0}>Select and upload files</button>
  <input type="file" multiple style="display: none;" bind:this={fileInput} on:change={uploadFiles} />
  <!-- <button on:click={listFiles} disabled={containersArray.length === 0}>List files</button> -->
  <button on:click={deleteFiles} disabled={containersArray.length === 0}>Delete selected files</button>
  <!-- <button on:click={listContainers}>List all containers</button> -->
  <button on:click={deleteContainer} disabled={containersArray.length === 0}>Delete container</button>
</div>

<br>

<div><b>Status:</b></div>
<div bind:this={status} style="height: 160px; width: 593px; border: 1px solid black; overflow: scroll;">
  {#each statusMessages as message}
  <p>{message}</p>
  {/each}
</div>

<br>

<div><b>Files in the <em>{selectedContainer}</em> container:</b></div>
<select multiple style="height:222px; width: 593px; overflow: scroll;">
  {#each filesArray as file}
    <option value={file.value.name}>{file.value.name}</option>
  {/each}
</select>

---

# Drop Zone (file upload)

---

<em><strong>Shameless Plug</strong>: <a href="https://uploadcare.com/">Uploadcare</a> is one of my favorite cloud storage services because of how easy it is to use and all the features it has. It is also built on top of the Akamai CDN platform, which is one of the leading CDN platforms, and Uploadcare has a pretty generous free tier. I am not writing a tutorial using Uploadcare because their <a href="https://uploadcare.com/docs/integrations/js-upload-client/">browser API</a> is already pretty simple and they also have a really cool <a href="https://uploadcare.com/docs/uploads/file-uploader/">File Uploader</a> widget that you can use off-the-shelf and even customize the styles to match your app. I have used Uploadcare's File Uploader widget in a SvelteKit app and it is awesome!</em>

---

File uploads are handled a bit differently in modern web development than they were once upon a time. For example, nowadays you will most likely use a cloud object storage service like Amazon S3, Cloudflare R2, Google Cloud Storage, Azure Storage, Cloudinary, or Uploadcare to handle your file storage (or at least you should use a cloud storage service). Each cloud storage service provides its own APIs and many of them even provide widgets that you can plug into your web app and use "off-the-shelf" to connect with the cloud storage service.

Given that there are many cloud storage services available, each with their own set of APIs and functionality, it can be pretty difficult to create a file upload component that can be used with any cloud storage service. Since each cloud storage service provides their own APIs (and even widgets), I recommend that you read the docs for your cloud storage service and follow their instructions for creating a file upload component that you can reuse in your own apps. 

Since maintaining consistent branding across your components is a common concern when using off-the-shelf widgets, I have written a tutorial on this page that walks you through creating a custom drop zone component. I will show you the concepts involved with a drop zone component and you can customize it to fit your needs.

Many cloud storage services provide APIs for handling file uploads directly from your browser-side code or from your server-side code. I think the browser-side options might be a better choice for frontend frameworks (e.g. Svelte, Vue, React) and the server-side options might be a better choice for server frameworks (e.g. when you use the built-in template files for your frontend code - e.g. Express.js, FastAPI, Laravel). Also, as of this writing (April 2022), when creating a file upload component for SvelteKit you will probably want to use the browser-side option anyway because SvelteKit does not yet have the ability to handle large file uploads on the server-side. In order to handle large file uploads (on the server-side) you have to implement streams and [handling streams in SvelteKit is still a TODO](https://github.com/sveltejs/kit/issues/3419) right now.

One additional benefit of using your cloud storage service's APIs is that they will take care of all the security issues for you, so you don't have to handle those things yourself. Cloud storage APIs for the win!

---

## Tutorial

This tutorial will show you how to create a custom drop zone component that integrates with Azure Storage. I am following this article: [Quickstart: Manage blobs with JavaScript v12 SDK in a browser](https://docs.microsoft.com/en-us/azure/storage/blobs/quickstart-blobs-javascript-browser)

This will be the final product:

<DropZone
  uploadUrl="/api/drop-zone-file-uploads"
/>

---

SvelteKit uses Vite to bundle its files. Vite uses the `dotenv` package to load your environment variables from `.env` files, so you do not need to install the `dotenv` package in order to load environment variables from `.env` files. However, you do need to remember to prefix each environment variable with `VITE_` and you can access those environment variables in `.svelte` files from Vite's `import.meta.env` object (instead of the `process.env` object).

TODOS:
* At this point in the Quickstart: [Create a SAS connection string](https://docs.microsoft.com/en-us/azure/storage/blobs/quickstart-blobs-javascript-browser#create-a-sas-connection-string) I need to find out if the Azure Storage "Start and expiry date/time" auto-renews or if that expiration permanent?
* Include this link to the Azure SDK for JavaScript: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob#list-the-containers

* Containers are like folders.
* Blob stands for **B**inary **L**arge **Ob**ject, which includes objects such as images and multimedia files. These are known as unstructured data because they don't follow any particular data model. *(Source: [SnapLogic - Azure Blob Storage](https://www.snaplogic.com/glossary/azure-blob-storage#:~:text=Azure%20Blob%20storage%20is%20a,as%20images%20and%20multimedia%20files.))*
