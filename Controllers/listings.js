// const Listing=require("../models/listing")
// const maptiler = require("@maptiler/client");
// require("dotenv").config();

// const MAP_TOKEN = process.env.MAP_TOKEN;   
// maptiler.config.apiKey = MAP_TOKEN;  


// module.exports.index=async(req,res)=>{
//    const allListings = await Listing.find({});
//    res.render("listings/index.ejs",{allListings});
  
// };

// module.exports.newRoute=(req,res)=>{
//     res.render("listings/new.ejs");
// };

// module.exports.showRoute=async(req,res)=>{
//       let {id}=req.params;
//       const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
//      if(!listing){
//           req.flash("error"," Listing you requested is does not exsite!")
//           res.redirect("/listings");
//       }else{
//         console.log(listing);
//       res.render("listings/show.ejs" ,{listing});
//       }
// };

// module.exports.createRoute=async(req,res)=>{
  

  
//   let url=req.file.path;
//   let filename=req.file.filename;
//    const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//     newListing.image={url,filename};
//     // newListing.geometry== geoResponse.features[0].geometry.coordinates;
//   let savedListing=  await newListing.save();
//   console.log(savedListing);

//     req.flash("success","New Listing created!")
//      res.redirect("/listings");
     
// };



// module.exports.editRoute=async(req,res)=>{
//        let {id}=req.params;
//       const listing = await Listing.findById(id);
//         if(!listing){
//           req.flash("error"," Listing you requested is does not exsite!")
//           res.redirect("/listings");
//       }else{
//     let originalImageUrl = listing.image.url.replace("/upload","/upload/e_blur:200,w_250"
// );
// res.render("listings/edit.ejs", { listing, originalImageUrl });

//       }
//     };

// module.exports.updateRoute=async(req,res)=>{
//        let {id}=req.params;
//       let listing= await Listing.findByIdAndUpdate(id, {...req.body.listing});
//       if(typeof req.file!=="undefined"){
//         let url=req.file.path;
//         let filename=req.file.filename;
//         listing.image={url,filename};
//         await listing.save();
//       }
//       req.flash("success"," Listing Updated!")
//        res.redirect(`/listings/${id}`);
//  };

// module.exports.deleteRoute=async(req,res)=>{
//      console.log("Logged in user:", req.user);
//     let {id}=req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//      req.flash("success"," Listing Deleted!")
//     res.redirect("/listings");
//   };       


const Listing=require("../models/listing")
const maptiler = require("@maptiler/client");
require("dotenv").config();

const MAP_TOKEN = process.env.MAP_TOKEN;   
maptiler.config.apiKey = MAP_TOKEN;  


module.exports.index=async(req,res)=>{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs",{allListings});
  
};

module.exports.newRoute=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showRoute=async(req,res)=>{
      let {id}=req.params;
      const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
     if(!listing){
          req.flash("error"," Listing you requested is does not exsite!")
          res.redirect("/listings");
      }else{
        console.log(listing);
      res.render("listings/show.ejs" ,{listing});
      }
};

module.exports.createRoute=async(req,res)=>{

 
    const { location } = req.body.listing; // user input from form

    // Call MapTiler geocoding API
    const geoResponse = await maptiler.geocoding.forward(location, { limit: 1 });

    let coordinates = [0, 0]; // fallback
    if (geoResponse.features && geoResponse.features.length > 0) {
      coordinates = geoResponse.features[0].geometry.coordinates; // [lng, lat]
      console.log("Geo Coordinates:", coordinates);
    } else {
      console.log("⚠️ No coordinates found for:", location);
    }


  
  let url=req.file.path;
  let filename=req.file.filename;
   const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image={url,filename};

    newListing.geometry = {
      type: "Point",
      coordinates: coordinates,
    };

  let savedListing=  await newListing.save();
  console.log(savedListing);

    req.flash("success","New Listing created!")
     res.redirect("/listings");
     
};



module.exports.editRoute=async(req,res)=>{
       let {id}=req.params;
      const listing = await Listing.findById(id);
        if(!listing){
          req.flash("error"," Listing you requested is does not exsite!")
          res.redirect("/listings");
      }else{
    let originalImageUrl = listing.image.url.replace("/upload","/upload/e_blur:200,w_250"
);
res.render("listings/edit.ejs", { listing, originalImageUrl });

      }
    };

module.exports.updateRoute=async(req,res)=>{
       let {id}=req.params;
      let listing= await Listing.findByIdAndUpdate(id, {...req.body.listing});
      if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
      }
      req.flash("success"," Listing Updated!")
       res.redirect(`/listings/${id}`);
 };

module.exports.deleteRoute=async(req,res)=>{
     console.log("Logged in user:", req.user);
    let {id}=req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
     req.flash("success"," Listing Deleted!")
    res.redirect("/listings");
  };       