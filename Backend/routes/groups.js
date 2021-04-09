const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/User");
const Group = require("../models/Group");

router.post("/creategroup", async (req, res) => {
    try{
    console.log("Inside Create Group Post Request");
    groupmemberemails = req.body.groupmemberemails
    groupname = req.body.groupname
    console.log(groupname)
    console.log(groupmemberemails)
    var result = []
    for (var i = 0; i < groupmemberemails.length; i++) {
        result[i] = groupmemberemails[i].value
    }
    const group= new Group();
    group.groupname=groupname
    group.groupmembers=groupmemberemails
    await group.save()
    res.status(200).json({message: "Group created successfully"});
}catch (error)
{
    res.writeHead(400, {'Content-Type': 'text/plain'})
}
});

  module.exports = router;