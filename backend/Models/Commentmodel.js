const mongoose = require("mongoose");
const cmtschema = mongoose.Schema({
  name: String,
  comment: String,
  blogId: String,
});
const Commentmodel = mongoose.model("comment", cmtschema);
module.exports = { Commentmodel };
