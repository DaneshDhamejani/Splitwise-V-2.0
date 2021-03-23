// import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var mysql = require('mysql');
app.set("view engine", "ejs");
var bcrypt = require('bcryptjs');
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const pipeline = util.promisify(require("stream").pipeline);
app.use(express.static(__dirname + "/public"));


app.use(express.json());
// use cors to allow cross origin resource sharing
app.use(cors({origin: "http://localhost:3000", credentials: true}));


// app.use(express.bodyParser());

// use express session to maintain session data

app.use(session({
    secret: "splitwise",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true


const con = mysql.createConnection
({host: "splitwiselab1db.cuo9mbgyeo0i.us-east-2.rds.amazonaws.com", 
user: "admin", 
password: "danesh123", 
database: "splitwise"});


// const con = mysql.createPool({
//     connectionLimit: 10,
//     host: "splitwiselab1db.cuo9mbgyeo0i.us-east-2.rds.amazonaws.com",
//     user: "admin",
//     password: "danesh123",
//     ssl: true,
//     database: "splitwise",
//   });


app.use(bodyParser.urlencoded({extended: true}));

// con.connect(function (err) {
//     console.log("Connected!");
// });


app.post('/osignup', function (req, res) {
    console.log(req.body)
    console.log("Inside Signup Post");
    const name = req.body.name;
    const email = req.body.email;
    // const properemail = (req.body.email).replace("%40", "@")
    const password = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var encryptedpassword = bcrypt.hashSync(password, salt);


    con.query("INSERT INTO user_table (`name`,`email`,`password`) VALUES (?,?,?)", [
        name, email, encryptedpassword
    ], (err, result) => {
        console.log(err);
        if (result) {
            res.status(200).json({message: "signUp Successful"});
        }

    })
})


app.post('/ologin', function (req, res) {
    console.log("Inside Login Post Request");
    var email = req.body.email;
    var password = req.body.password;
    console.log(email)
    console.log(password)


    con.query("SELECT * FROM user_table WHERE email = ?", [email], (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            con.query("SELECT * FROM user_table WHERE email = ?", [email], function (err, result) {
                if (err) {
                    res.writeHead(400, {'Content-Type': 'text/plain'})
                    res.end("Invalid Credentials");
                } else {

                    console.log(result);
                    if (result[0].password) {
                        

                        bcrypt.compare(req.body.password, result[0].password, function (err, results) {
                            console.log(results);
                            console.log(req.body.password);
                            console.log(result[0].password);

                            if (results) {

                                res.writeHead(200, {'Content-Type': 'text/plain'})
                                res.end("Successful Login");
                            } else {
                                res.end("Password was incorrect")
                            }
                        });
                    }
                }
            });
        }
    });

});

app.get('/odashboard/:useremail', function (req, res) {
    console.log("Inside getgroups get")
    con.query("SELECT group_name FROM user_group where user_email=?", [req.params.useremail], (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            console.log(JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })


})


app.get('/getuserlist/:useremail', function (req, res) {
    console.log("Inside get email id list")
    con.query("SELECT DISTINCT(email) FROM user_table where email NOT IN (?)", [req.params.useremail], (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            // console.log(JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })
})

app.post('/creategroup/:useremail', function (req, res) {

    console.log("Inside Create Group Post Request");
    groupmemberemails = req.body.groupmemberemails[0]
    groupname = req.body.groupname
    console.log(groupname)
    // console.log(groupmemberemails)
    var result = []
    for (var i = 0; i < groupmemberemails.length; i++) {
        result[i] = groupmemberemails[i].value
    }
    result.push(req.params.useremail)
    console.log(result)

    for (let i = 0; i < result.length; i++) {
        console.log("Inside loop")
        con.query("INSERT INTO user_group (`user_email`,`group_name`) VALUES (?,?)", [
            result[i], groupname
        ], (err, result) => {
            if (err) 
                console.log(err);
            
        });

    }

    // res.status(200).json({message: "users added in group Successful"});
    con.query("INSERT INTO group_table (`group_name`) VALUES (?)", [groupname], (err, result) => {
        if (err) 
            console.log(err);
        
    });
    res.status(200).json({message: "users added in group_table and user_group Successful"});
})

app.get('/groups/:groupname', function (req, res) {
    console.log("Inside particular groups page");
    console.log("Group name is:", req.params.groupname);
    con.query("SELECT DISTINCT(A.name) FROM (SELECT name,email FROM user_table)A,(SELECT user_email as tempemail FROM user_group where group_name=?)B WHERE tempemail=A.email", [req.params.groupname], (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            console.log(JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })
})

app.post('/addbill', function (req, res) {
    console.log("Inside add a bill");
    console.log(req.body)
    var description = req.body.expensedescription
    var amount = req.body.amount
    var groupname = req.body.groupname
    var numberofmembers = req.body.numberofmembers
    var membernames = req.body.membernames
    var useremail = req.body.useremail
    var memberemails = req.body.memberemails

    console.log(description)
    console.log(amount)
    console.log(groupname)
    console.log(numberofmembers)
    console.log("User email is", useremail)
    console.log(membernames)
    console.log(memberemails)

    var updatedmemberemails = []
    for (let i = 0; i < memberemails.length; i++) {
        if (memberemails[i].user_email != useremail) 
            updatedmemberemails.push(memberemails[i].user_email)
        
    }

    updated_amount_per_person = amount / numberofmembers
    console.log(updated_amount_per_person)
    console.log("Updated members", updatedmemberemails)
    con.query("INSERT INTO bill_table (`group_name`,`total_amount`,`description`,`email`) VALUES (?,?,?,?)", [
        groupname, amount, description,useremail
    ], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Inserted into bill table")
        }
    })

    for (let i = 0; i < updatedmemberemails.length; i++) {
        con.query("INSERT INTO transaction (`sender`,`receiver`,`final_amount`,`group_name`) VALUES (?,?,?,?)", [
            useremail, updatedmemberemails[i], updated_amount_per_person, groupname
        ], (err, result) => {
            if (err) {
                console.log("Could not insert into transaction table")
            } else {
                console.log("Inserted into transaction table")
            }
        })
    }

})

app.post('/getallbills', function (req, res) {
    var groupname = req.body.groupname
    console.log("Inside get all bills list")
    console.log(groupname)
    con.query("SELECT description,total_amount FROM bill_table where group_name=?", [groupname], (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            // console.log(JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })

})

app.post('/fetchemails', function (req, res) {
    var groupname = req.body.groupname
    console.log("Inside fetching all emails of users in group")
    console.log(groupname)
    con.query("SELECT user_email FROM user_group where group_name=?", [groupname], (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            console.log(JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })

})

app.post("/getnamefordashboard", function (req, res) {
    var useremail = req.body.useremail
    con.query("SELECT name FROM user_table where email=?", [useremail], (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            console.log(JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })


})


app.post('/getmoneytopay', function (req, res) {
    var groupname = req.body.groupname
    var myemail = req.body.useremail
    console.log("Group name:", groupname)
    console.log("My email:", myemail)
    console.log("Inside fetching all money I have to pay")
    con.query("SELECT SUM(A.final_amount) as amount_to_pay FROM (SELECT final_amount FROM transaction WHERE receiver=?)A", [myemail], (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            console.log(JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })

})

app.post('/moneytoget', function (req, res) {
    var groupname = req.body.groupname
    var myemail = req.body.useremail
    console.log("Group name:", groupname)
    console.log("My email:", myemail)
    console.log("Inside fetching all money I have to pay")
    con.query("SELECT SUM(A.final_amount) as amount_to_get FROM (SELECT final_amount FROM transaction WHERE sender=?)A", [myemail], (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            console.log(JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })

})

/*
app.post('/overallmoneytoget', function (req, res) {
    var myemail=req.body.useremail
    console.log("Group name:",groupname)
    console.log("My email:",myemail)
    console.log("Inside fetching all money I have to pay")
    con.query("SELECT SUM(A.final_amount) as amount_to_get FROM (SELECT final_amount FROM transaction WHERE sender=?)A",[myemail] ,(err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
             console.log(JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })
    
})

app.post('/overallgetmoneytopay', function (req, res) {
    var myemail=req.body.useremail
    console.log("Group name:",groupname)
    console.log("My email:",myemail)
    console.log("Inside fetching all money I have to pay")
    con.query("SELECT SUM(A.final_amount) as amount_to_pay FROM (SELECT final_amount FROM transaction WHERE receiver=?)A",[myemail] ,(err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
             console.log(JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })
    
})


*/
 /*Not needed as of now
app.post('/getallstats', function (req, res) {
    var myemail = req.body.useremail
    console.log("My email:", myemail)
    console.log("Inside all stats on dashboard")
    con.query("SELECT IFNULL((overall_amount_to_get-overall_amount_to_pay),0) as Total_Balance,overall_amount_to_get,overall_amount_to_pay FROM (SELECT IFNULL(SUM(A.final_amount),0) as overall_amount_to_get FROM (SELECT final_amount,0 FROM splitwise.transaction WHERE sender=?)A)AA,(SELECT SUM(B.final_amount) as overall_amount_to_pay FROM (SELECT final_amount FROM transaction WHERE receiver=?)B)AB", [
        myemail, myemail
    ], (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            console.log(JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })



})
*/
/*
app.post('/getalluserdues', function (req, res) {
    var myemail=req.body.useremail
    console.log("My email:",myemail)
    console.log("Inside fetching all money I have to pay")
    con.query("select user_table.name,AB.amt_to_get,AB.amt_to_pay from (select A.he_has_to_pay_me as email,IFNULL(A.amount_toget,0) as amt_to_get,IFNULL(B.amount_topay,0) as amt_to_pay from (SELECT SUM(IFNULL(final_amount,0)) as amount_toget,receiver as he_has_to_pay_me from splitwise.transaction group by receiver)A,(select SUM(IFNULL(final_amount,0)) as amount_topay,sender as i_have_to_pay_him from splitwise.transaction where receiver=?)B where A.he_has_to_pay_me=B.i_have_to_pay_him group by A.he_has_to_pay_me)AB inner join user_table on AB.email=user_table.email",[myemail],(err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            console.log(JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })

    
})
*/



// In progress
app.post('/getalluserstats', function (req, res) {
    var myemail = req.body.useremail
    console.log("My email:", myemail)
    console.log("Inside fetching all money I have to pay")
    con.query("select user_table.name,ABC.overallamount from (select emailee,he_owes_me- he_has_paid as overallamount from((select A.receiver as emailee,IFNULL(A.he_owes_me,0) as he_owes_me,B.sender,IFNULL(B.he_has_paid,0) as he_has_paid FROM (select receiver,sum(final_amount) as he_owes_me from splitwise.transaction where sender=? group by receiver)A LEFT JOIN (select sender,sum(final_amount) as he_has_paid from splitwise.transaction where receiver=? group by sender)B on A.receiver=B.sender) UNION ALL (select A.receiver,IFNULL(A.he_owes_me,0),B.sender,IFNULL(B.he_has_paid,0) FROM (select receiver,sum(final_amount) as he_owes_me from splitwise.transaction where sender=? group by receiver)A RIGHT JOIN (select sender,sum(final_amount) as he_has_paid from splitwise.transaction  where receiver=? group by sender)B on A.receiver=B.sender where B.sender is null))AA group by emailee)ABC inner join user_table on ABC.emailee=user_table.email", [
        myemail, myemail, myemail, myemail
    ], (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            console.log("Printing all user dues with me:", JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })

})

app.post('/getalluserstats11', function (req, res) {
    var myemail = req.body.useremail
    console.log("My email:", myemail)
    console.log("Inside fetching all money I have to pay")
    con.query("select * from (select receiver,sum(final_amount) as he_owes_me from splitwise.transaction where sender=? group by receiver)A left join (select sender,sum(final_amount) as he_has_paid from splitwise.transaction  where receiver=? group by sender)B on A.receiver=B.sender UNION ALL select * from (select receiver,sum(final_amount) as he_owes_me from splitwise.transaction where sender=? group by receiver)A right join (select sender,sum(final_amount) as he_has_paid from splitwise.transaction  where receiver=? group by sender)B on A.receiver=B.sender where A.receiver is null", [
        myemail, myemail, myemail, myemail], (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            console.log("Printing all user stats together:", JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })

})



app.post('/emailtosettle', function (req, res) {
    var nametosettle = req.body.nametosettle
    var useremail = req.body.useremail
    console.log("Inside settle up email at backend:", nametosettle)
    console.log("Got my email at the backend:", useremail)

    con.query("SELECT email FROM user_table where name=?", [nametosettle], (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            // console.log(JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })

})


app.post('/settleup',function (req, res) {
    var useremail=req.body.useremail
    var settlemail=req.body.emailtosettleup
    //console.log("Inside settle up at backend:",nametosettle)
    console.log("Inside settle up main")
    console.log("Got my email at the backend:",useremail)
    console.log("Got email to settle with at the backend:",settlemail)
    
    
    con.query("UPDATE transaction SET final_amount = 0 WHERE sender=? AND receiver=?", [settlemail,useremail], (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            // console.log(JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })

 })

 app.post('/profile',function (req, res) {
    console.log("Inside profile page");
    useremail=req.body.useremail
    
    con.query("SELECT name from user_table where email=?", [useremail], (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            // console.log(JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })

 })

 app.post('/activity',function (req, res) {
    console.log("Inside activity page");
    useremail=req.body.email
    console.log("Got useremail",useremail)
    con.query("SELECT * from bill_table where email=?", [useremail], (err, result) => {
        if (err) {
            res.writeHead(400, {'Content-Type': 'text/plain'})
            res.end("Could Not Get Connection Object");
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'})
            console.log("All bill details",JSON.stringify(result))
            res.end(JSON.stringify(result));
        }
    })

 })

//  app.post('/profilepic/:useremail',upload.single("file"),async function (req, res) {
//     console.log("Inside profile pic page");
//     useremail=req.body.email
//     console.log("Got useremail",useremail)
//     const {
//         file,
//         body: { name },
//       } = req;
    
//       Math.floor(Math.random * 1000);
//       const fileName =
//         Math.floor(Math.random(100000) * 100000) + file.detectedFileExtension;
//       await pipeline(
//         file.stream,
//         fs.createWriteStream(`${__dirname}/public/${fileName}`)
//       );
//       db.query(
//         "update user_table set profile_pic=? where email=?",
//         [file, useremail],
//         (err, result) => {
//           if (err != null || err != undefined) {
//             res.status(400).json({ error: "failed to upload image" });
//           } else {
//             res.status(200).json({ message: "success" });
//           }
//         }
//       );
//       // res.status(200).json({ message: "uploaded file" });
//     });
 

app.listen(3001);
console.log("Server Listening on port 3001");

module.exports=app;