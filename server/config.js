var mongo = require("mongoose");  
var db = mongo.connect("mongodb://localhost:27017/carepact_production", function(err, response){  
   if(err){ console.log('Failed to connect to ' ); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
}); 