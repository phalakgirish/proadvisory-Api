import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY_STORAGE',
  useFactory: () => {
    return new CloudinaryStorage({
      cloudinary: cloudinary,
      params: async (req, file) => ({
            folder: 'uploads',  // Cloudinary folder where images will be stored
            format: file.mimetype.split('/')[1], // Automatically set format
            transformation: [{ width: 500, height: 500, crop: 'limit' }],
          }),
    });
  },
};
