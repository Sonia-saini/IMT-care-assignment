import React, { useEffect, useState } from 'react'
import {FiEdit} from "react-icons/fi"
import {RiDeleteBin6Fill} from "react-icons/ri"

import style from "../../styles/Single.module.css";
import { json } from 'react-router-dom';
import { useRouter } from 'next/router';
function single({blogs}) {
    console.log(blogs)
    const [uid,setId]=useState("")
    const [name,setName]=useState("");
    const [cmt,setcmt]=useState("")
    const [comment,setComment]=useState([])
    const router=useRouter()
    useEffect(()=>{
setId(JSON.parse(sessionStorage.getItem("user"))?._id)
setName(JSON.parse(sessionStorage.getItem("user"))?.name)
fetch(`http://localhost:3005/blogcomment/${blogs.blog?._id}`).then(res=>res.json()).then((res)=>(setComment(res.comments))).catch((err)=>console.log(err))
    },[name,comment])
    console.log(uid)
    const delet=(id)=>{
        fetch(`http://localhost:3005/blog/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "userid":`${uid}`
            }
        }).then(res=>res.json()).then((res)=>(alert(res.msg),window.location.reload())).catch((err)=>alert(err))
    }
    const commenton=(id)=>{
      console.log(name)
      if(name===""||!name){
        alert("Please login first")
      }else{
      fetch(`http://localhost:3005/blogcomment/${id}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
           
            
        },
        body:JSON.stringify({name,comment:cmt})
    }).then(res=>res.json()).then((res)=>(window.location.reload())).catch((err)=>console.log(err))
    setcmt("")}
    }
    if(!blogs.blog){
      return <h1>Blog Does not Exist</h1>
    }
    const edit=()=>{
      router.push(`/Editpage/${blogs?.blog?._id}`)
    }
  return (
    <div className={style.single}>
        <div className="space-y-1 mt-5" key={blogs?.blog._id}>
               <div className={style.singlehead}> <h3 className="font-bold">{blogs?.blog?.title}</h3>
                {uid&&<div><button onClick={()=>delet(blogs?.blog?._id)}><RiDeleteBin6Fill/></button>
                <button onClick={edit}><FiEdit/></button></div>}</div>
             <div className={style.singlecontent}>   
             
            <div className="w-full" dangerouslySetInnerHTML={{ __html: blogs?.blog?.content }} />
              
             
             
               
               </div>
                
              </div>
              <hr></hr>
              <div className={style.comment}>
                <textarea cols={"50"} onChange={(e)=>setcmt(e.target.value)} value={cmt}/>
                <button onClick={()=>commenton(blogs.blog?._id)}>Comment</button>
              </div>
             <div> {
comment?.map((el)=>(

  <div className={style.commnt}>
    <img src='https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg' width="30px" height={"30px"}/>
  <div>
  <p>{el.name}</p>
  <p>{el.comment}</p></div>
  
  </div>
))
              }
              </div>
    </div>
  )
}
export async function getServerSideProps(context) {
    let data = await fetch(`http://localhost:3005/blog/${context.params.id}`);
    let res = await data.json();
    return {
      props: { blogs: JSON.parse(JSON.stringify(res)) },
    };
  }
export default single