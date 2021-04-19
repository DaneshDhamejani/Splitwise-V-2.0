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



// router.post("/recentactivity/", async (req, res) => {
//     try{
//        console.log("Inside Get  All Bills")
//         var useremail=req.body.useremail
//         const allgroupsadded= await User.find({"email":useremail},{groups_added:1,_id:0});
//         //console.log(allgroupsadded[0].groups_added)
//         let grouparray=[]
//         grouparray=allgroupsadded[0].groups_added
//         console.log(grouparray)
//         let recentactivity=[]
//         for(let i=0;i<grouparray.length;i++)
//         {
//             let currentgroup=grouparray[i]
//             console.log(currentgroup)
//             let allbillstats= await Bill.find({"groupname":currentgroup},{billcreatedby:1,billdescription:1,billamount:1,_id:0,billdate:1,groupname:1});
            
//             recentactivity.push(allbillstats)
//         }
//         res.status(200).json({allbills: recentactivity});
          
// }catch (error)
// {
//     res.writeHead(400, {'Content-Type': 'text/plain'})
// }
// });


router.post("/recentactivity/", async (req, res) => {
    try{
       console.log("Inside Get  All Bills")
        var useremail=req.body.useremail
        const allgroupsadded= await User.find({"email":useremail},{groups_added:1,_id:0});
        //console.log(allgroupsadded[0].groups_added)
        let grouparray=[]
        grouparray=allgroupsadded[0].groups_added
        console.log(grouparray)
        let recentactivity=[]
        for(let i=0;i<grouparray.length;i++)
        {
            let currentgroup=grouparray[i]
            console.log(currentgroup)
            let allbillstats= await Bill.find({"groupname":currentgroup},{billcreatedby:1,billdescription:1,billamount:1,_id:0,billdate:1,groupname:1});
            recentactivity.push(allbillstats)
        }
        let resultarray=[]
        let allresponse=recentactivity
        console.log("ALl Response:",allresponse)
        for(let i=0;i<allresponse.length;i++)
                            {
                                let currentresponse=allresponse[i]
                                console.log(allresponse[i])
                                for(let j=0;j<currentresponse.length;j++)
                                {
                                resultarray.push(currentresponse[j])
                                }
                            }
        res.status(200).json({allbills: resultarray});
          
}catch (error)
{
    res.writeHead(400, {'Content-Type': 'text/plain'})
}
});



module.exports = router;