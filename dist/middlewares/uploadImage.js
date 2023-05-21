"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
exports.multerConfig = {
    dest: (0, path_1.resolve)(__dirname, 'uploads'),
    storage: (0, multer_1.diskStorage)({
        destination: (request, file, cb) => {
            cb(null, (0, path_1.resolve)(__dirname, "..", 'uploads'));
        },
        filename: (request, file, cb) => {
            const filename = `${Date.now().toString()}${file.originalname}`;
            return cb(null, filename);
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
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    }
};
