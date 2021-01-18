var express = require("express");
var path = require("path");
//var mongo = require("mongoose");
// const bodyParser = require("body-parser");
var morgan = require("morgan");
var db = require("./config.js");
const cors = require("cors");

var app = express();
var port = process.env.port || 7777;
var srcpath = path.join(__dirname, "/public");
app.use(express.static("public"));
// app.use(bodyParser.json({ limit: "5mb" }));
// app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(cors());

var bodyParser = require("body-parser");
app.use(bodyParser.json())

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var pro_details = new Schema(
  {
    name: { type: String },
    address: { type: String },
    email: { type: String },
    contact: { type: String },
  },
  { versionKey: false }
);
var product_master = new Schema(
  {
    product: { type: String },
    manufacture: { type: String },
    hsn: { type: String },
   sch_name: { type: String },
   uom: { type: String },
   strip: { type: String },
   pack: { type: String },
    loc: { type: String },
    rack: { type: String },
    subtrack: { type: String },
    mrp: { type: String },
    major_content: { type: String },
  },
  { versionKey: false }
);

var Sample = mongoose.model("store", pro_details, "store");

var ProductMaster = mongoose.model("product_master", product_master, "product_master");
// var kitty = new ProductMaster({ product: 'Zildjian',manufacture:'macare',hsn:'r456',sch_name:'vfrgt',uom:'vghh',strip:'kkkk',pack:'ttt',loc:'ddd',rack:'trr',subtrack:'ddd',mrp:'200',major_content:'hhhh'});
// kitty.save(function (err) {
//   if (err) // ...
//   console.log('meow');
// });

//api for get data from database
app.get("/api/getdata", cors(), function(req, res) {
  Sample.find({}, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      
      res.send(data);
    }
  });
});


app.post("/api/suggestions", cors(), function(req, res) {
  ProductMaster.find({product: {'$regex': req.body.name.toUpperCase()}}, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      
      res.send(data);
    }
  });
  // const data = db
  //   .collection("product_master")
  //   .find({})
  //   .toArray(function(err, result) {
  //     if (err) throw err;
  //     console.log(result);
  //     db.close();
  //   });
  // res.send(data);
});

app.post("/api/form_data", cors(), function(req, res) {
  var newProduct = new ProductMaster(req.body)
  newProduct.save(function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send({ data: "Record has been Inserted..!!" });
    }
  });
 console.log(req.body);
});

app.post("/api/savedata", function(req, res) {
  var mod = new model(req.body);
  mod.save(function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send({ data: "Record has been Inserted..!!" });
    }
  });
});

// call by default index.html page
app.get("*", function(req, res) {
  res.sendFile(srcpath + "/index.html");
});

//server stat on given port
app.listen(port, function() {
  console.log("server start on port" + port);
});
