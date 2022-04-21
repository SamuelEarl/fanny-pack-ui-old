// TODO: Finish this example by uploading files with Cloudflare workers: https://walshy.dev/blog/21_09_10-handling-file-uploads-with-cloudflare-workers.
// I would like to see if Uploadcare has a server-side upload API.

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function post({ request }) {
  try {
    console.log("CALLED handle-file-uploads");
    let formData = await request.formData();
    let files = [...formData.entries()];
    console.log("FORM DATA (server):", files);
    for (let i = 0; i < files.length; i++) {
      console.log("File Name:", files[i][1].name);
    }
  
    return { 
      body: {
        msg: "All is well"
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
