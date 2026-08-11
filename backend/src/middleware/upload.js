import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|svg|webp|gif|ico|mp4|webm|mov|avi|mkv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/') || file.mimetype === 'application/octet-stream';

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only valid image and video files are allowed!'));
  }
}

export const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
