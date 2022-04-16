// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";
// import DatauriParser from "datauri/parser";

// let dotenvConfig = dotenv.config();

// // config will read your .env file, parse the contents, assign it to process.env, and return an Object with a parsed key containing the loaded content or an error key if it failed.
// if (dotenvConfig.error) {
//   console.error("dotenv Error:", dotenvConfig.error);
// }

// let parser = new DatauriParser();

// const { 
//   CLOUDINARY_CLOUD_NAME, 
//   CLOUDINARY_API_KEY, 
//   CLOUDINARY_API_SECRET 
// } = process.env;

// cloudinary.config({ 
//   cloud_name: CLOUDINARY_CLOUD_NAME,
//   api_key: CLOUDINARY_API_KEY,
//   api_secret: CLOUDINARY_API_SECRET,
// });

// /**
//  * @type {import("@sveltejs/kit").RequestHandler}
//  */
// export async function post({ request }) {
//   console.log("CALLED file uploads");

//   try {
//     // let payload = JSON.parse(request.body);
//     // console.log("PAYLOAD:", payload);
//     let data = await request.formData();
//     console.log("FORM DATA:", data);

//     // Node.js SDK Uploader function returns a Promise.
//     let response = await cloudinary.uploader.upload(data, {
//       resource_type: "auto",
//     });

//     if (!response.ok) {
//       throw Error(response.statusText);
//     }

//     let result = await response.json();
//     console.log("UPLOAD RESULT:", result);

//     if (result) {
//       return {
//         body: result
//       };
//     }
//   }
//   catch(err) {
//     console.error("drop-zone-uploads Error:", err);
//     return {
//       status: 500,
//       body: err
//     };
//   }
// }
