var express = require("express");  
var path = require("path");  
var mongo = require("mongoose");   
var bodyParser = require('body-parser');   
var morgan = require("morgan");  
var db = require("./config.js");  

var app = express();  
var port = process.env.port || 7777;  
var srcpath  =path.join(__dirname,'/public') ;  
app.use(express.static('public'));  
app.use(bodyParser.json({limit:'5mb'}));    
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));  

var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  
var pro_details = new Schema({      
    store: { type: String   },       
    name: { type: String   },            
    contact: { type: String },       
},{ versionKey: false });

var Sample = mongoose.model('store', pro_details, 'store');  
const NodeJsGuide = new Sample({name : 'MD',address:'mdrew',contact:'d' });
NodeJsGuide.save((err,result)=>{
    if(err) console.log(err)
    console.log(result);
})

app.listen(port,function(){   
    console.log("server start on port"+ port);  
})