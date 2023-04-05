const express = require("express");
const { Blogmodel } = require("../Models/Blogmodel");
const { Usermodel } = require("../Models/Usermodel");
const { BlogValidator } = require("../Middlewares/Blogmiddle");
const blogRouter = express.Router();

blogRouter.post("/blog",BlogValidator,async(req,res)=>{

    try{
const blog=new Blogmodel(req.body)
await blog.save()
res.status(200).json({msg:"new blog created"})
    }catch(err){
res.status(400).send("blog post have some error")
    }
})
blogRouter.get("/blog",async(req,res)=>{
const {page,limit}=req.query
console.log(page,limit)
    try{
        if(req.query.title){
        const blog=await Blogmodel.find({title:req.query.title}).limit(limit).skip(page*limit)

res.status(200).json({msg:"blog get request",blog})}
else{
    const blog=await Blogmodel.find().limit(limit).skip(page*limit)
    res.status(200).json({msg:"blog get request",blog})
    
}
    }catch(err){
res.status(400).send("blog post have some error")
    }
})
blogRouter.get("/blog/:id",async(req,res)=>{

    try{
const blog=await Blogmodel.findOne({_id:req.params.id})


res.status(200).json({msg:"single blog is here",blog})
    }catch(err){
res.status(400).send("blog post have some error")
    }
})
blogRouter.delete("/blog/:id",async(req,res)=>{
const {userid}=req.headers;
console.log(req.headers.userid,req.ha)
    try{
   const user=await Usermodel.findOne({_id:userid}) 
   const blogs=await Blogmodel.findOne({userId:userid,_id:req.params.id})
   console.log(user,blogs)

   if(user.admin){
    const blog=await Blogmodel.findByIdAndDelete({_id:req.params.id})
res.status(200).json({msg:" blog is deleted by admin",blog})
   } 
   else if(blogs){
    const blog=await Blogmodel.findByIdAndDelete({_id:req.params.id})

    res.status(200).json({msg:"blog is deleted by authorized user",blog})
   }   
else{
    res.status(400).json({msg:"unauthorized user"})
}
}catch(err){
res.status(400).send("you have to login first")
    }
})
blogRouter.patch("/blog/:id",async(req,res)=>{
    const {userid}=req.headers;
    
    console.log(req.headers)
        try{
       const user=await Usermodel.findOne({_id:userid}) 
       const blogs=await Blogmodel.findOne({userId:userid,_id:req.params.id})
       console.log(user,blogs)
    
       if(user.admin){
        const blog=await Blogmodel.findByIdAndUpdate({_id:req.params.id},req.body)
    res.status(200).json({msg:" blog is updated by admin",blog})
       } 
       else if(blogs){
        const blog=await Blogmodel.findByIdAndUpdate({_id:req.params.id},req.body)
    
        res.status(200).json({msg:"blog is updated by authorized user",blog})
       }   
    else{
        res.status(400).json({msg:"unauthorized user"})
    }
    }catch(err){
    res.status(400).send("you have to login first")
        }
    })
    blogRouter.patch("/blogcomment/:id",async(req,res)=>{

        try{
            let blog=await Blogmodel.find({_id:req.params.id})
           let x= blog[0].comment.push(req.body)
           await Blogmodel.findByIdAndUpdate({_id:req.params.id},x)
            // await blog[0].save()
            res.status(200).json({msg:"comment done",blog})
        }catch(err){
            res.status(400).send("you have to login first") 
        }
    })
module.exports = { blogRouter };
