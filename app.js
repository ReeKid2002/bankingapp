const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs');
app.use(express.static("public"));

//STORAGE ARRAY
let custArray = [{name:"Izuku Midoriya",email:"detroitsmash@allmight.com",amount:55000,transferlist:[]},{name:"Shoyo Hinata",email:"revisedquick@KarasunoHigh.com",amount:45000,transferlist:[]},{name:"Ron Scott",email:"labox58290@threepp.com",amount:25000,transferlist:[]},{name:"Susie Pena",email:"yllaffeli@yopmail.com",amount:27000,transferlist:[]},{name:"Katie Burke",email:"0t-fogon@exy.email",amount:27500,transferlist:[]}];

//HOME PAGE ROUTE
app.get('/',function(req,res){
    res.render("index");
});

//CUSTOMER LIST PAGE ROUTE
app.get("/customers",function(req,res){
    res.render("customerlist",{custArray:custArray});
});
app.post("/customers",function(req,res){
    let custIndex = req.body.index;
    res.render("transfer",{custList:custArray,index:custIndex});
});

//TRANSFER PAGE ROUTE
app.post("/customerdetail",function(req,res){
    let amt = parseInt(req.body.amt);
    let transferToName = req.body.transferToName;
    let transferFromName = req.body.transferFromName;
    let transferListData = {
        to: custArray[transferToName].name,
        transferAmount: amt
    };
    custArray[transferFromName].transferlist.push(transferListData);
    custArray[transferFromName].amount = custArray[transferFromName].amount - amt;
    custArray[transferToName].amount = custArray[transferToName].amount + amt;
    res.redirect("/customers");
});

//PORT
const port = process.env.PORT || 3000;

//ADD NEW CUSTOMER PAGE ROUTE
app.get("/addcustomer",function(req,res){
    res.render("newcustomer");
});
app.post("/addcustomer",function(req,res){
    let name = req.body.name;
    let email = req.body.email;
    let amount = parseInt(req.body.amount);
    if(isNaN(amount))
        amount = 0;
    let transferDetail = [];
    let newcustomer = {
        name: name,
        email: email,
        amount: amount,
        transferlist: []
    };
    custArray.push(newcustomer);
    res.redirect("/customers");
});

//APP LISTEN
app.listen(port,function(){
    console.log(`Server Started ${port}`);
})