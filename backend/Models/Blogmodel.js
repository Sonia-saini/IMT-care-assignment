const mongoose = require("mongoose");
const blogschema = mongoose.Schema({
  title: String,
  content: String,
  userId: String,

  
  image:String,
    
});
const Blogmodel = mongoose.model("blog", blogschema);
module.exports = { Blogmodel };
