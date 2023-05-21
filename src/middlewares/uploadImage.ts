import { randomBytes } from "crypto";
import { Options, diskStorage} from "multer";
import { resolve } from "path";

export const multerConfig = {
    dest: resolve(__dirname, 'uploads'),
    storage: diskStorage({
      destination: (request, file, cb) => {
        cb(null, resolve(__dirname, "..",'uploads'))
      },
      filename: (request, file, cb) => {
        const filename = `${Date.now().toString()}${file.originalname}`

        return cb(null, filename)
      }
    }),
    limits: {
      fileSize: 5 * 1024 * 1024
    },
    fileFilter: (request, file, cb) => {
      const formats = [
        'image/jpeg',
        'image/jpg',
        'image/png'
      ];
  
      if (formats.includes(file.mimetype)) {
        cb(null, true)
      }  else {
        cb(null, false)
      }
    }
  } as Options