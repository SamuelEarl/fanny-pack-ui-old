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

      let fileJson = {
        name: files[i].name,
        type: files[i].type,
        size: files[i].size,
        hash: await createFileHash(files[i]),
      }

      console.log("fileJson:", )

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

async function createFileHash(file) {
  try {
    // TODO: Figure out how to convert the File object into a buffer. Look at the accepted answer here: https://stackoverflow.com/questions/32556664/getting-byte-array-through-input-type-file.
    // Once this is done, then keep working through the file upload tutorials until the DropZone docs are finished.
    const fileBuffer = Buffer.from(file);
    console.log("fileBuffer:", fileBuffer);
    const hashSum = crypto.createHash("sha256");
    hashSum.update(fileBuffer);
    const hex = hashSum.digest("hex");
    return hex;

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
