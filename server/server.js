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

var sub_master = new Schema(
  {
    itemcode: { type: String },
    item: { type: String },
    batchno: { type: String },
    manufacture: { type: String },
   qty: { type: String },
   mrp: { type: String },
   pur_rate: { type: String },
   exp_date: { type: String },
    hsn: { type: String },
    invoiceno: { type: String },
    invoicedate: { type: String },
    supplier: { type: String },
    payment: { type: String },
    taxamount: { type: String },
    disper: { type: String },
    disamnt: { type: String },
    sgst: { type: String },
    cgst: { type: String },
    cess: { type: String },
    total_gst: { type: String },
    taxableamnt: { type: String },
    netamnt: { type: String },

  },
  { versionKey: false }
);
var sale_master = new Schema(
  {
    customer: { type: String },
    name: { type: String },
    address: { type: String },
    referred: { type: String },
    rname: { type: String },
    addr: { type: String },
    note: { type: String },
   date: { type: String },
   time: { type: String },
   item: { type: String },
   invoiceno: { type: String },
   invoicedate: { type: String },
   quantity: { type: String },
   mrp: { type: String },
   taxpercent: { type: String },
   discountper: { type: String },
   discountamnt: { type: String },
   taxamnt: { type: String },
   taxableamnt: { type: String },
   netamnt: { type: String }

   
  },
  { versionKey: false }
);



var Sample = mongoose.model("store", pro_details, "store");

var ProductMaster = mongoose.model("product_master", product_master, "product_master");
var sub_master = mongoose.model("sub_master", sub_master, "sub_master");
var sale_master = mongoose.model("sale_master", sale_master, "sale_master");
 
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

app.post("/api/mainform_data", cors(), function(req, res) {
  var newProduct = new sub_master(req.body)
  newProduct.save(function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send({ data: "Record has been Inserted..!!" });
    }
  });
 console.log(req.body);
});

app.post("/api/sale_form_data", cors(), function(req, res) {
  var newProduct = new sale_master(req.body)
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
