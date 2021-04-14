const express = require("express");
const router = express.Router();
const multer=require("multer")
const upload = multer({ dest: "uploads/" });
const User = require("../models/User");
const fs = require('fs');
var util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const {uploadFile,getFileStream} = require("../services/file-upload")

// const singleUpload= upload.single('image');


router.post("/imageupload", upload.single("file"), async function (req, res) {
  try{
  const file = req.file;
  console.log(file.path)
  //console.log(file);

  // apply filter
  // resize

  const result = await uploadFile(file);
  
  await unlinkFile(file.path);
  console.log("Hello")
  console.log(result);
  const description = req.body.description;
  // const user= new User();
  // user.profileImg=result.Location
  console.log("I am here")
   res.status(200).json({message: "Picture uploaded successfully"});
  }
catch (error)
{
     res.writeHead(400, {'Content-Type': 'text/plain'})
}
  
});
  
  module.exports = router;
  