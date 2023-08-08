const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
const data =new mongoose.Schema({
  fullname: String,
  username: String,
  email: String,
  password: String,
});

data.plugin(plm);
const user = mongoose.model("userData", data);

module.exports = user;
