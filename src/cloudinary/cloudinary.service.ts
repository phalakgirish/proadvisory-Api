import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: 'difi7kjd4',      // Replace with your Cloudinary cloud name
  api_key: '146371124115456',            // Replace with your Cloudinary API key
  api_secret: 'CXyyDp3cnZz3nN3caiyhq7rsrBU',      // Replace with your Cloudinary API secret
});

// console.log(cloudinary.config());


@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File,folder:string): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: folder }, // Cloudinary folder
        (error, result:any) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(file.buffer);
    });
  }

  // async uploadToFolder (imageUrl: string, folderName: string):Promise<any> {
  //   try {
  //     const result = await cloudinary.uploader.upload(imageUrl, {
  //       folder: folderName, // Specify folder here
  //     });
  
  //     // console.log("Uploaded Image URL:", result.secure_url);
  //     return result;
  //   } catch (error) {
  //     console.error("Upload error:", error);
  //   }
  // };
}