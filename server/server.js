var express = require("express");
var path = require("path");
var mongo = require("mongoose");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var db = require("./config.js");
const cors = require("cors");

var app = express();
var port = process.env.port || 7777;
var srcpath = path.join(__dirname, "/public");
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(cors());

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

var Sample = mongoose.model("store", pro_details, "store");

var ProductMaster = mongoose.model("store", pro_details, "store");

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

app.get("/api/suggestions", cors(), function(req, res) {
  
  const data = db
    .collection("product_master")
    .find({})
    .toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  res.send(data);
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
