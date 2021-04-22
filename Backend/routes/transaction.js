const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/User");
const Group = require("../models/Group");
const Bill = require("../models/Bills");
const Transaction = require("../models/Transaction");


router.post("/amountowed/", async (req, res) => {
    try{
        console.log("Inside Amount I am owed")
        var useremail=req.body.useremail
        let owed= await Transaction.aggregate([
            {$match:{"sender":useremail}},
            {$group : {"_id": "$receiver", "splitamount":{$sum:"$splitamount"}}}
         
         ])
       
        res.status(200).json({amountowed: owed});
          
}catch (error)
{
    res.writeHead(400, {'Content-Type': 'text/plain'})
}
});

router.post("/amountowe/", async (req, res) => {
    try{
        console.log("Inside Amount I owe")
       var useremail=req.body.useremail
        let owe= await Transaction.aggregate([
            {$match:{"receiver":useremail}},
            {$group : {"_id": "$sender", "splitamount":{$sum:"$splitamount"}}}
         
         ])
        res.status(200).json({amountowe: owe});
          
}catch (error)
{
    res.writeHead(400, {'Content-Type': 'text/plain'})
}
});

router.post("/userstosettle/", async (req, res) => {
    try{
       console.log("Inside users to settle with")
       var useremail=req.body.useremail
        let userlist=[]
        
            //let allusers= await Transaction.find({receiver:useremail},{sender:1,splitamount:1});
            console.log("here1")
           let results= await Transaction.aggregate([
               {$match:{"receiver":useremail}},
               {$group : {"_id": "$sender", "splitamount":{$sum:"$splitamount"}}}
            
            ])
            console.log("Here")

          res.status(200).json({allusers: results});
          
}catch (error)
{
    res.writeHead(400, {'Content-Type': 'text/plain'})
}
});

router.post("/settleup/", async (req, res) => {
    try{
       console.log("Inside settle up")
       var useremail=req.body.useremail
       var settlemail=req.body.settlemail
        var useramount=req.body.useramount
        
        let transaction= new Transaction();
            
            transaction.sender=useremail
            
            transaction.receiver=settlemail
            transaction.splitamount=useramount
            
            let trans=await transaction.save()
            

          res.status(200).json({Transaction_details: trans});
          
}catch (error)
{
    res.writeHead(400, {'Content-Type': 'text/plain'})
}
});


router.post("/allstats/", async (req, res) => {
    try{
       console.log("Inside All Stats")
       var useremail=req.body.useremail




        let owe= await Transaction.aggregate([
            {$match:{"receiver":useremail}},
            {$group : {"_id": "$sender", "splitamount":{$sum:"$splitamount"}}}
         
         ])


        let owed= await Transaction.aggregate([
            {$match:{"sender":useremail}},
            {$group : {"_id": "$receiver", "splitamount":{$sum:"$splitamount"}}}
         
         ])

         console.log("Owe:",owe)
         console.log("Owed:",owed)


         // Overall stats
        let userbalancearray=[]
        if(owed.length==0 && owe.length>0)
        {
            console.log("Inside only owe")
            console.log("owe.length",owe.length)
            console.log("owed.length",owed.length)
            for(let i=0;i<owe.length;i++)
            {

                console.log("Inside for")
                userbalancearray.push({"user":owe[i]._id,"balance":-Math.abs(owe[i].splitamount)})
            }
            console.log("Printing userbalancearray inside owe",userbalancearray)
        }
        else if(owe.length==0 && owed.length>0)
        {
            console.log("Inside only owed")
            console.log("owed.length",owed.length)
            console.log("owe.length",owe.length)
            for(let i=0;i<owed.length;i++)
            {

                console.log("Inside for")
                userbalancearray.push({"user":owed[i]._id,"balance":Math.abs(owed[i].splitamount)})
            }
            console.log("Printing userbalancearray inside owed",userbalancearray)
        }
        else{
        for(let i=0;i<owed.length;i++)
        {
            var currentowed=owed[i]
            console.log("Current owed",currentowed)
            for(let j=0;j<owe.length;j++)
            {
                console.log("Inside inner")
                var currentowe=owe[j]
                console.log("Current owe",currentowe)
                if(currentowed._id==currentowe._id)
                {
                    var totalbalance=currentowed.splitamount-currentowe.splitamount
                    userbalancearray.push({"user":currentowed._id,"balance":totalbalance})
                }
               
            }
        }
    }
        console.log("Printing user balance array",userbalancearray)
        // allstatsarray=owearray.concat(owedarray)

        res.status(200).json({"Alluserstats":userbalancearray});
          
}catch (error)
{
    res.writeHead(400, {'Content-Type': 'text/plain'})
}
});





module.exports = router;