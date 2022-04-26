<script lang="ts">
  import { DropZone } from "/src/lib";
  import { ToastContent } from "/src/lib";
  import Icon from "@iconify/svelte";

  let containersList = [];
  let filesArray = [];
  let loading = false;

  // Pass a function named "uploadFiles" to the <DropZone /> component.
  // Look at the documentation for your cloud storage service to find out how to upload files to their service. The API code for uploading files to their service is what you will put in this function.
  // Your "uploadFiles" function needs to be an async function and the signature need to match this one.
  async function uploadFiles(formData) {
    try {
      loading = true;

      console.log("Form Data (browser):", formData.getAll("files"));

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

      // TODO: Update the list of files that is displayed below DropZone.

      ToastContent.set({ type: "success", msg: "Files have been uploaded." });

      loading = false;
    }
    catch(err) {
      console.error("uploadFiles Error:", err);
      ToastContent.set({ type: "error", msg: err.message });
    }
  }

  function deleteFile(fileId) {
    try {
      console.log("File ID:", fileId);
    }
    catch(err) {
      console.error("deleteFile Error:", err);
    }
  }
</script>


# Drop Zone (file upload)

---

<em><strong>Shameless Plug</strong>: <a href="https://uploadcare.com/">Uploadcare</a> is one of my favorite cloud storage services because of how easy it is to use and all the features it has. It is also built on top of the Akamai CDN platform, which is one of the leading CDN platforms, and Uploadcare has a pretty generous free tier. I am not writing a tutorial using Uploadcare because their <a href="https://uploadcare.com/docs/integrations/js-upload-client/">browser API</a> is already pretty simple and they also have a really cool <a href="https://uploadcare.com/docs/uploads/file-uploader/">File Uploader</a> widget that you can use off-the-shelf and even customize the styles to match your app. So a custom file upload component might not be necessary if you are using Uploadcare. Uploadcare's File Uploader widget works well with SvelteKit apps, so check it out!</em>

---

File uploads are handled a bit differently in modern web development than they were once upon a time. For example, nowadays you will most likely use a cloud object storage service like Amazon S3, Cloudflare R2, Google Cloud Storage, Azure Storage, Cloudinary, or Uploadcare to handle your file storage (or at least you should use a cloud storage service). Each cloud storage service provides its own APIs and many of them even provide ready-made widgets that you can plug into your web app and use "off-the-shelf" to connect with the cloud storage service.

Given that there are many cloud storage services available, each with their own set of APIs and functionality, it can be pretty difficult to create a file upload component that can be used with any cloud storage service. Since each cloud storage service provides their own APIs (and even widgets), I recommend that you read the docs for your cloud storage service and follow their instructions for creating a file upload component that you can reuse in your own apps. 

Since maintaining consistent branding across your components is a common concern when using off-the-shelf widgets, I have written a tutorial on this page that walks you through creating a custom drop zone component. I will show you the concepts involved with a drop zone component and you can customize it to fit your needs.

Many cloud storage services provide APIs for handling file uploads directly from your browser-side code or from your server-side code. I think the browser-side options might be a better choice for frontend frameworks (e.g. Svelte, Vue, React) and the server-side options might be a better choice for server frameworks (e.g. when you use the built-in template files for your frontend code - e.g. Express.js, FastAPI, Laravel). Also, as of this writing (April 2022), when creating a file upload component for SvelteKit you will probably want to use the browser-side option anyway because SvelteKit does not yet have the ability to handle large file uploads on the server-side. In order to handle large file uploads (on the server-side) you have to implement streams and [handling streams in SvelteKit is still a TODO item](https://github.com/sveltejs/kit/issues/3419) right now. See https://javascript.plainenglish.io/how-to-read-files-with-buffer-stream-in-node-js-d77de6ae6b49.

One additional benefit of using your cloud storage service's APIs is that they will take care of all the security issues for you, so you don't have to handle those things yourself. Cloud storage APIs for the win!

---

## Example Usage

<DropZone {uploadFiles}>File Drop</DropZone>

<br>

<div><b>Files in the storage bucket:</b></div>
{#if filesArray.length > 0}
  {#each filesArray as file (file.id)}
    <div class="file-wrapper">
      <div class="file-name">{file.id}</div>
      {#if loading}
        <button class="remove-file-btn" title="Delete file">
          <Icon icon="icomoon-free:spinner2" width="16" class="fpui-spin" />
        </button>
      {:else}
        <button class="remove-file-btn" on:click={() => deleteFile(file.id)} title="Delete file">
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

<br><br><br><br><br>

# Tutorial

This tutorial will show you how to create a custom drop zone component that integrates with (some cloud storage service).

The final version from this tutorial will be identical to the component in the "Example Usage" section above.

A file upload component is much more than just the frontend code. It might be better to describe the content of this tutorial as a file upload *feature* rather than just a file upload component. Before I can explain how to create a file upload feature, let me start with some foundational concepts.


## What is binary data?
For computers to understand, process, and store data, those data have to be converted to **binary data**, known as **bits** or **binary digits** (i.e. 1's and 0's).

A **byte** is a data type that contains 8 bits. A single character (e.g., `d`, `5`, `!`) takes up one byte of storage space, so you can also think of a byte as one character. For example, the letter "h" is one byte, or eight bits, and the word "hope" has four bytes or 32 bits (4 x 8 bits).

Visually, bits and bytes look like this:

<table id="bits">
  <tr>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
  </tr>
</table>

One box represents one bit. All 8 boxes represents one byte.

Every piece of data sent to the computer is first converted to binary data by a microprocessor before processing and outputting the result.

*NOTE: The number of bits per character is actually a bit more complex than what I explained above, but it works for our purposes. You can read more at this post: [How many bits or bytes are there in a character?](https://stackoverflow.com/a/4850316/9453009)*


## What is a buffer?
Here's a simplified way of explaining what a buffer is:

*Imagine that you're eating candy out of a bowl. You take one piece regularly. To prevent the bowl from running out, someone might refill the bowl before it gets empty, so that when you want to take another piece, there's candy in the bowl. The bowl acts as a buffer between you and the candy bag.*

*If you're watching a movie online, the web service will continually download the next 5 minutes or so into a buffer, that way your computer doesn't have to download the movie as you're watching it (which would cause hanging).*
(Reference: https://stackoverflow.com/a/648324/9453009)

Here's another description:

*The term "buffer" is a very generic term, and is not specific to IT or CS. It's a place to store something temporarily, in order to mitigate differences between input speed and output speed. While the producer is being faster than the consumer, the producer can continue to store output in the buffer. When the consumer gets around to it, it can read from the buffer. The buffer is there in the middle to bridge the gap.* (Reference: https://stackoverflow.com/a/648315/9453009)

**A buffer is a temporary storage location (in memory) that is used to hold a chunk of data. For example, when data are sent to a destination, those data need to be stored somewhere (e.g. a buffer) until the destination is ready to take in more chunks of data for processing.**

In the case of file uploads, the data are the files and the destination is either (1) your cloud storage service (e.g. when uploading files from your browser-side code directly to your cloud storage) or (2.a.) your server and then (2.b.) your cloud storage service (e.g. when uploading files from your browser-side code to your server-side code and then to your cloud storage).

You can think of a buffer like an array of integers, which each represent a byte of data. This is an example of what a buffer looks like:

```
<Buffer 43 68 61 6e 67 65 20 6d 65 20 74 6f 20 62 75 66 66 65 72>
```

So you can imagine a buffer as an array of bytes, like this:

<table id="bits">
  <tr>
    <td class="symbol">[</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td class="symbol">,</td>
    <td>1</td>
    <td>0</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td class="symbol">,</td>
    <td>0</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td class="symbol">,</td>
    <td class="symbol">...</td>
    <td class="symbol">]</td>
  </tr>
</table>

<br>

Node.js has a **[Buffer](https://nodejs.dev/learn/nodejs-buffers)** module that you can use to work with buffers.


## How to read files in Node.js
*You can watch this video for a great explanation of [Streams and Buffers](https://www.youtube.com/watch?v=GlybFFMXXmQ).*

In order for a computer to read files it first needs to convert those files into a form that it can understand, which is binary data. More specifically, you need to convert your files into buffers (because a buffer is a byte array).

In Node.js, you can use the [`fs`](https://nodejs.dev/learn/the-nodejs-fs-module) module to open and read files. There are two ways you can open and read a file using the `fs` module:

* Load all of the contents at once (buffering)
* Incrementally load contents (streaming)

Keep in mind that the `fs` module is used to access and interact with the file system. So any files that you want to read with the `fs` module have to be located in the computer's file system already (or on our server's file system in our case). For example, the `fs.readFile()` method takes a file path as its first argument. You cannot pass a `File` object as the first argument. In order to pass it a 

*NOTE: JavaScript in the browser does not have access to the `fs` module. If you are trying to read a file in the browser, then you would have to use the [`FileReader` API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader). " `FileReader` can only access the contents of files that the user has explicitly selected, either using an HTML `<input type="file">` element or by drag and drop. It cannot be used to read a file by pathname from the user's file system. To read files on the client's file system by pathname, use the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API). To read server-side files, use standard Ajax solutions, with CORS permission if reading cross-domain."*

Buffers are created in memory. So in order to convert files into a buffer you have to create space in memory that is equal to the size of the file being converted. For example, a 1MB file will use 1MB of memory. That might not sound like a big deal, but what happens if you have a lot of users concurrently uploading files to your server? Too much memory usage at one time can slow down or even crash your server.

Streams are a way to read small chunks of data (i.e. buffers) at a time rather than one massive file all at once. So when your programs read a file as a stream they read it piece by piece, processing its content without keeping it all in memory. That means that streams allow your programs to read much larger files while using less memory. If you don't use streams to read files, then you will have to wait for the entire file to be read before it can be processed, which can use up more memory.

*NOTE: Buffers were introduced to help developers deal with binary data in an ecosystem that traditionally only dealt with strings rather than binaries.*

Node.js has a **[Stream](https://nodejs.dev/learn/nodejs-streams)** module that you can use to work with streams. You can read more about streams in Node.js and how to implement them:

* [Node.js Streams](https://nodejs.dev/learn/nodejs-streams)
* [Read Files with Node.js](https://stackabuse.com/read-files-with-node-js/)
* [Node HTTP Servers for Static File Serving](https://stackabuse.com/node-http-servers-for-static-file-serving/)


## Buffer contents with `fs.readFile()`



## References
* [Binary Data](https://www.techopedia.com/definition/17929/binary-data#:~:text=Binary%20data%20is%20a%20type,combination%20of%20zeros%20and%20ones.)
* [Understanding Bits, Bytes and Their Multiples](https://www.techopedia.com/2/29184/development/programming-languages/understanding-bits-bytes-and-their-multiples)
* [Node.js buffer: A complete guide](https://blog.logrocket.com/node-js-buffer-a-complete-guide/)
* [Node.js Buffers](https://nodejs.dev/learn/nodejs-buffers)
* [Node.js Streams](https://nodejs.dev/learn/nodejs-streams)

---

<!-- The `import.meta.env` reference is causing build errors in the following paragraph. I don't know if there is a way around this, but I can test any builds with `npm run build` before I try to deploy this again. -->
SvelteKit uses Vite to bundle its files. Vite uses the `dotenv` package to load your environment variables from `.env` files, so you do not need to install the `dotenv` package in order to load environment variables from `.env` files. However, you do need to remember to prefix each environment variable with `VITE_` and you can access those environment variables in `.svelte` files from Vite's `import[dot]meta[dot]env` object (instead of the `process.env` object).
<!-- `import.meta.env`  -->

TODOS:
* At this point in the Quickstart: [Create a SAS connection string](https://docs.microsoft.com/en-us/azure/storage/blobs/quickstart-blobs-javascript-browser#create-a-sas-connection-string) I need to find out if the Azure Storage "Start and expiry date/time" auto-renews or if that expiration permanent?
* Include this link to the Azure SDK for JavaScript: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob#list-the-containers

* Containers are like folders.
* Blob stands for **B**inary **L**arge **Ob**ject, which includes objects such as images and multimedia files. These are known as unstructured data because they don't follow any particular data model. *(Source: [SnapLogic - Azure Blob Storage](https://www.snaplogic.com/glossary/azure-blob-storage#:~:text=Azure%20Blob%20storage%20is%20a,as%20images%20and%20multimedia%20files.))*



<style>
  table#bits {
    width: auto;
    font-family: mono;

    & tr {
      border: none;
    }

    & td {
      padding: 5px 10px;
      border: 1px solid #c7c7c7;
    }

    & .symbol {
      border: none;
      font-size: 2rem;
      line-height: 1rem;
    }
  }

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
