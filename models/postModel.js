const mongoose = require("mongoose");
const data = mongoose.Schema({
  title: String,
  txtArea:String,
});

const user = mongoose.model("postData",data);
module.exports= user;