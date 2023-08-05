var express = require('express');
var router = express.Router();
const postData= require("../models/postModel")
/* GET home page. */
router.get('/',async function(req, res, next) {
  try {
    const data=await postData.find();
    res.render('index', { title: 'Home' ,posts:data});
  } catch (error) {
    
  }
});
router.get("/create", function (req, res, next) {
  res.render("create", { title: "Write Post" });
});
router.post("/create",async function (req, res) {
  try {
    data= new postData(req.body)
    await data.save()
    res.redirect("/")
  } catch (error) {
    console.log(error)
  }
});
router.get("/update/:id",async function (req, res, next) {
  try {
    const user =await postData.findById(req.params.id)
    res.render("updateNote", { title: "Write Post",user });
  } catch (error) {
    
  }
});
router.post("/update/:id", async function (req, res) {
  try {
    data =await postData.findByIdAndUpdate(req.params.id,req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});
router.get("/deletePost/:id",async(req,res)=>{
await postData.findByIdAndDelete(req.params.id)
res.redirect("/")
})

module.exports = router;
