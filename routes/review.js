const express = require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js");

const reviewController=require("../Controllers/reviews.js")


 //Review 
  //Post Route
  router.post("/",isLoggedIn, validateReview,wrapAsync(reviewController.postRoute)
);


//Review Delete Route

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteRoute)
);

   module.exports=router;