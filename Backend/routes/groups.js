const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/User");
const Group = require("../models/Group");

router.post("/creategroup/:useremail", async (req, res) => {
    try{
    console.log("Inside Create Group Post Request");
    const groupExists = await Group.findOne({ groupname: req.body.groupname });
    if (groupExists) 
    res.status(401).json({message: "Group name already exists"});
    
    groupmemberemails = req.body.groupmemberemails
    
    var useremail=req.params.useremail
    console.log(useremail)
    var groupname = req.body.groupname
    
    console.log(groupname)
    console.log(groupmemberemails)
    var groupmembersbeforeinvite = []
    var groupmembersaccepted=[]
    
    for (var i = 0; i < groupmemberemails.length; i++) {
        console.log(groupmemberemails[i])
        if(groupmemberemails[i]!=useremail)
        {
        groupmembersbeforeinvite.push(groupmemberemails[i])
        }
        else
        {
            groupmembersaccepted.push(groupmemberemails[i])
        }
    }
    console.log(groupmembersbeforeinvite)
    console.log(groupmembersaccepted)
    const group= new Group();
    group.groupname=groupname
    group.groupmembers=groupmembersbeforeinvite
    group.groupmembersacceptinvite=groupmembersaccepted

    await User.updateOne({"email":useremail},{$push:{"groups_invited":groupname}})
    
    await group.save()
    res.status(200).json({message: "Group created successfully"});
}catch (error)
{
    res.writeHead(400, {'Content-Type': 'text/plain'})
}
});


router.post("/acceptinvite/:useremail", async (req, res) => {
    try{

}catch (error)
{
    
}
});




  module.exports = router;