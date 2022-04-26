// TODO: Finish this example by uploading files with Cloudflare workers: https://walshy.dev/blog/21_09_10-handling-file-uploads-with-cloudflare-workers.
// I would like to see if Uploadcare has a server-side upload API. I can't find any server-side upload APIs for Uploadcare. Maybe I will just use Backblaze because that is what is shown in the tutorial link above.

import fs from "fs";
import crypto from "crypto";


/** @type {import("@sveltejs/kit").RequestHandler} */
export async function post({ request }) {
  try {
    console.log("CALLED handle-file-uploads");

    let formData = await request.formData();
    
    let files = formData.getAll("files");
    console.log("FORM DATA (server):", files);

    let filesArray = [];

    for (let i = 0; i < files.length; i++) {
      console.log("File Name:", files[i].name);

      let fileHash = await createFileHash(files[i]);

      let fileJson = {
        name: files[i].name,
        type: files[i].type,
        size: files[i].size,
        hash: fileHash,
      }

      console.log("fileJson:", fileJson);

      filesArray.push(fileJson);
    }
  
    return { 
      body: {
        files: filesArray
      }
    };
  }
  catch(err) {
    return { 
      status: 500,
      body: err,
    };
  }
}

// TODO: I will come back to this function later. I don't even know what this function is used for. I need to read the following tutorial and understand it really well before I can finish my tutorial: https://rodneylab.com/sveltekit-s3-compatible-storage/. Maybe I need to do some more research on how to create a hash of your file before I can use a function like the following createFileHash() function. Since I am creating a tutorial for SvelteKit and SvelteKit does not support streams yet, maybe it would be best if I create a tutorial for uploading files from the browser. That is what this tutorial shows how to do: https://rodneylab.com/sveltekit-s3-compatible-storage/. But I would also like to understand how to create a file upload feature through the backend code too because that is what we will be doing at Accelerant, so I might need to know how that works.

// You could calculate a hash of the file before upload and compare that to the hash generated by your storage provider. (https://rodneylab.com/sveltekit-s3-compatible-storage/)
// The following example is taken from https://nodejs.org/api/crypto.html#class-hash
async function createFileHash(file) {
  return;
  try {
    // TODO: Figure out how to convert the File object into a buffer. Look at the accepted answer here: https://stackoverflow.com/questions/32556664/getting-byte-array-through-input-type-file.
    // Once this is done, then keep working through the file upload tutorials until the DropZone docs are finished.
    const fileBuffer = await file.arrayBuffer();
    console.log("fileBuffer:", fileBuffer);
    const hash = crypto.createHash("sha256");
    console.log("HASH1:", hash);

    hash.on("readable", () => {
      data = hash.read();
      if (data) {
        console.log(data.toString("hex"));
      }
    });

    return data;

    // const fileData = await file.arrayBuffer();
    // const digest = await crypto.digest("SHA-1", fileData);
    // const array = Array.from(new Uint8Array(digest));
    // const sha1 =  array.map(b => b.toString(16).padStart(2, "0")).join("")
    // return sha1;
  }
  catch(err) {
    console.error("createFileHash Error:", err);
  }
}
