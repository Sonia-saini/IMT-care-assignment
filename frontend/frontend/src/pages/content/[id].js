import React, { useEffect, useState } from 'react'
import {FiEdit} from "react-icons/fi"
import {RiDeleteBin6Fill} from "react-icons/ri"

import style from "../../styles/Single.module.css";
function single({blogs}) {
    console.log(blogs)
    const [uid,setId]=useState("")
    useEffect(()=>{
setId(JSON.parse(sessionStorage.getItem("user"))?._id)
    },[])
    console.log(uid)
    const delet=(id)=>{
        fetch(`http://localhost:3005/blog/${id}`,{
            method:"DELETE",
            headers:{
                // "Content-Type":"application/json",
                "userid":`${uid}`
            }
        }).then(res=>res.json()).then((res)=>(alert(res.msg),window.location.reload())).catch((err)=>alert(err))
    }
    if(!blogs.blog){
      return <h1>Blog Does not Exist</h1>
    }
  return (
    <div className={style.single}>
        <div className="space-y-1 mt-5" key={blogs?.blog._id}>
               <div className={style.singlehead}> <h3 className="font-bold">{blogs?.blog?.title}</h3>
                {uid&&<div><button onClick={()=>delet(blogs?.blog?._id)}><RiDeleteBin6Fill/></button>
                <button><FiEdit/></button></div>}</div>
             <div className={style.singlecontent}>   <p>{blogs?.blog?.content}...</p>
                <img src={blogs?.blog?.image} /></div>
                
              </div>
              <hr></hr>
              <div className={style.comment}>
                <textarea cols={"50"}/>
                <button>Comment</button>
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