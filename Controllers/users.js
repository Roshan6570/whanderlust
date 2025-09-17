
const User = require("../models/user.js");


module.exports.renderSignupForm=(req,res)=>{
  res.render("users/signup.ejs");
};

module.exports.renderLoginForm=(req,res)=>{
  res.render("users/login.ejs");
};


module.exports.signUpRoute=async(req,res)=>{
 try{
     let {username,email,password}=req.body;
  const newUser=new User({email,username});
  const registedUser=await User.register(newUser,password);
  console.log(registedUser);
  req.login(registedUser,(err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","Wellcome to Wanderlust!");
  res.redirect("/listings");
  })
  
 }catch (e){
    req.flash("error",e.message)
    res.redirect("/signup");
 }
};

module.exports.login=(req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl=res.locals.savesRedirectUrl || "/listings";
    res.redirect(redirectUrl);
  };

module.exports.logOut=(req,res,next)=>{
  req.logOut((err)=>{
    if(err){
    return next(err);
    }
    req.flash("error","you are logged out!");
    res.redirect("/listings");
  });

};  
