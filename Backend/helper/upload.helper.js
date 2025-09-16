require('dotenv').config();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const httpStatus = require('http-status');
const otherHelper = require('./others.helper');
const multer = require('multer');
const maxFileSize = process.env.MAX_FILE_SIZE || 10000000;


const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploaderHelper = {};

let mimeType = {
  'image/png': 'png',
  'image/webp': 'webp',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/svg': 'svg',
  'image/svg+xml': 'svg+xml',
  'image/gif': 'gif',
  'video/mp4': 'mp4',
  'video/mpeg': 'mpeg',
};

const memoryStorage = multer.memoryStorage();


uploaderHelper.uploadFiles = (destinationPath, uploadType, fieldData) => {
  const temp = maxFileSize / (1024 * 1024);
 
  const uploader = multer({
    storage: memoryStorage,
    fileFilter: function (req, file, callback) {
      const isValid = !!mimeType[file.mimetype]; //check if the valid mime type is submitted
      let error = isValid ? null : new Error('Only images and video files  allowed!');
      callback(error, isValid);
    },
    limits: { fileSize: maxFileSize },
  });

  
  let upload;
  if (uploadType === 'array') {
    upload = uploader.array(fieldData, 10);
  } else if (uploadType === 'fields') {
    upload = uploader.fields(fieldData);
  } else if (uploadType === 'single') {
    upload = uploader.single(fieldData);
  } else if (uploadType === 'any') {
    upload = uploader.any(fieldData);
  }

  return (fileUpload = (req, res, next) => {
    upload(req, res,async function (error) {
      if (error) {
        //instanceof multer.MulterError
        if (error.code == 'LIMIT_FILE_SIZE') {
          return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, error, null, `FileSize must be greater than ${temp}MB`, null);
        } else {
          return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, error, null, `${error}`, null);
        }
      } else {
        if (req.file) {
          try {
            const fileExtension = mimeType[req.file.mimetype] || 'jpg';
            const fileName = `${folderName}/${Date.now()}-${req.file.originalname}`;

            const uploadParams = {
              Bucket: process.env.AWS_S3_BUCKET_NAME,
              Key: fileName,
              Body: req.file.buffer,
              ContentType: req.file.mimetype,
              ACL: 'public-read', // Optional: make file public
            };

            const command = new PutObjectCommand(uploadParams);
            await s3.send(command);

            // Add file URL to request object
            req.file.location = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
          } catch (err) {
            return otherHelper.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, false, err, null, 'S3 upload failed', null);
          }
        }
        next();
      }
    });
  });
};

module.exports = uploaderHelper;