require('dotenv').config();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const httpStatus = require('http-status');
const otherHelper = require('./others.helper');
const multer = require('multer');

const maxFileSize = process.env.MAX_FILE_SIZE || 10 * 1024 * 1024; // 10MB default

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_END_POINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const mimeType = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'image/gif': 'gif',
  'video/mp4': 'mp4',
  'video/mpeg': 'mpeg',
};

const uploaderHelper = {};

uploaderHelper.uploadFiles = (folderName = 'uploads', fieldName = 'file') => {
  const upload = multer({
    storage: multer.memoryStorage(), 
    limits: { fileSize: maxFileSize },
    fileFilter: (req, file, cb) => {
      if (mimeType[file.mimetype]) cb(null, true);
      else cb(new Error('Only image/video files are allowed'), false);
    },
  }).single(fieldName);

  return async (req, res, next) => {
    upload(req, res, async (err) => {
      if (err) {
        const msg =
          err.code === 'LIMIT_FILE_SIZE'
            ? `File must be smaller than ${maxFileSize / (1024 * 1024)}MB`
            : err.message;
        return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, msg, null);
      }

      if (!req.file) return next(); 

      try {
        const fileName = `${folderName}/${Date.now()}-${req.file.originalname}`;
        const uploadParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: fileName,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
          ACL: 'public-read', 
        };

        const command = new PutObjectCommand(uploadParams);
        await s3.send(command);

        req.file.location = `${process.env.AWS_END_POINT}/${process.env.AWS_S3_BUCKET_NAME}/${fileName}`;

        next(); 
      } catch (error) {
        return otherHelper.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, false, error, null, 'S3 upload failed', null);
      }
    });
  };
};

module.exports = uploaderHelper;