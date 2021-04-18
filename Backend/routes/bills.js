const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/User");
const Group = require("../models/Group");
const Bill = require("../models/Bills");
const Transaction = require("../models/Transaction");


router.post("/addbill/", async (req, res) => {
    try{
        // email we will get from localstorage
        var useremail=req.body.useremail
        var groupname=req.body.groupname
        var billdescription= req.body.billdescription
        var billamount=req.body.billamount
        var numberofmembers = req.body.numberofmembers
        var memberemails = req.body.memberemails


        const bill=new Bill()
        bill.billcreatedby=useremail
        bill.groupname=groupname
        bill.billdescription=billdescription
        bill.billamount=billamount
        await bill.save()
        
        var splitamount=billamount/numberofmembers
        splitamount=splitamount.toFixed(2)
        console.log(splitamount)
        let sender=useremail
        let receiverarray=[]

        for(let i=0;i<memberemails.length;i++)
        {
            if(memberemails[i]!=useremail)
            {
                receiverarray.push(memberemails[i])
            }
        }
        console.log(receiverarray)
        for(let i=0;i<receiverarray.length;i++)
        {
            
            let transaction= new Transaction();
            
            transaction.receiver=receiverarray[i]
            
            transaction.sender=useremail
            transaction.splitamount=splitamount
            
            let trans=await transaction.save()
            
            if(trans)
            console.log(trans)
        }
       
        res.status(200).json({message: "Added Bill & Updated Transaction Successfully!"});

        
       
       

}catch (error)
{
    res.writeHead(400, {'Content-Type': 'text/plain'})
}
});

router.post("/getallbills/", async (req, res) => {
    try{
       console.log("Inside Get  All Bills")
        var groupname=req.body.groupname
        const allbillsinfo= await Bill.find({"groupname":groupname},{billamount:1,billdescription:1,_id:0});
        res.status(200).json({allbillsinfo: allbillsinfo});
          
}catch (error)
{
    res.writeHead(400, {'Content-Type': 'text/plain'})
}
});

module.exports = router;