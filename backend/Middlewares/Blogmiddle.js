const BlogValidator = (req, res, next) => {
    const { title, content,userId ,Image} = req.body;
    if(!userId){
        return res.status(400).json({ msg: "You have to Login first" });

    }
   else if (!title || !content) {
      return res.status(400).json({ msg: "All fields are mandatory!" });
    }
    next();
  };
  
  module.exports = { BlogValidator };
  