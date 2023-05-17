import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import config from "../config/key.js";
const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";

const S3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: config.access_key,
    secretAccessKey: config.secret_key,
  },
});

const setUpload = (bucket) => {
  const upload = multer({
    storage: multerS3({
      s3: S3,
      bucket: bucket,
      acl: "public-read-write",
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname));
      },
    }),
  }).single("file");
  return upload;
};

export default setUpload;
