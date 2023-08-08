var express = require("express");
var router = express.Router();
const postData = require("../models/postModel");
const userData = require("../models/userModel");

const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(new LocalStrategy(userData.authenticate()));

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const data = await postData.find();
    res.render("index", { title: "Home", posts: data });
  } catch (error) {}
});
router.get("/create", function (req, res, next) {
  res.render("create", { title: "Write Post" });
});
router.post("/create", async function (req, res) {
  try {
    data = new postData({
      title: req.body.title,
      txtArea: req.body.txtArea,
    });
    await data.save();
    res.redirect("/blogs");
  } catch (error) {
    console.log(error);
  }
});
router.get("/update/:id", async function (req, res, next) {
  try {
    const user = await postData.findById(req.params.id);
    res.render("updateNote", { title: "Write Post", user });
  } catch (error) {
    console.log(error);
  }
});
router.post("/update/:id",isLoggedIn, async function (req, res,next) {
  try {
    data = await postData.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/blogs");
  } catch (error) {
    console.log(error);
  }
});
router.get("/deletePost/:id", async (req, res) => {
  await postData.findByIdAndDelete(req.params.id);
  res.redirect("/blogs");
});
router.get("/signup", async (req, res) => {
  res.render("signup", { title: "signUp" });
});
router.post("/signup", async (req, res, next) => {
  try {
    const { fullname, username, email, password } = req.body;
    const newuser = new userData({ fullname, username, email });

    const user = await userData.register(newuser, password);

    res.redirect("/signin");
  } catch (error) {
    console.log(error);
  }
});
router.get("/signin", async (req, res) => {
  res.render("signin", { title: "signin" });
});

router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/signin",
    successRedirect: "/blogs",
  }),
  (req, res, next) => {}
);

router.get("/blogs",isLoggedIn ,async (req, res,next) => {
  try {
    const data = await postData.find();
    res.render("landing", { title: "Your Blogs", posts: data });
  } catch (error) {
    console.log(error);
  }
});

router.get("/signout",isLoggedIn,async (req,res,next)=>{
  req.logout(()=>{
    res.redirect("/signin");
  });
});



function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/signin")
}

module.exports = router;
