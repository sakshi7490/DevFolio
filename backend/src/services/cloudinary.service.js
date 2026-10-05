import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";



const uploadImage = (buffer, folder = "devfolio") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

const uploadRawFile = (
  buffer,
  folder = "devfolio",
  fileName = "resume.pdf"
) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "raw",
        type: "upload",
        
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

export default {
  uploadImage,
  uploadRawFile,
};