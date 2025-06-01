import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directory exists or create it
const uploadDir = path.join(__dirname, '../../uploads/logos');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

export const uploadLogo = multer({ storage });
