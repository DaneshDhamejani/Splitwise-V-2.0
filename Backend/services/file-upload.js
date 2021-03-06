const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = "splitwisebucket1";
const region = "us-east-2";
const accessKeyId = "AKIAQYNXVFMJ4JI6H5HX";

const secretAccessKey = "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";

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename + ".jpg",
    ACL: "public-read",
    ContentType: "image/png",
  };

  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;
