import Head from 'next/head'
import React, { useEffect, useState } from 'react'

function createPost() {
const [cnt,setCnt]=useState("");
const [title,setTitle]=useState("")
const [img,setImg]=useState("")
const [user,setUser]=useState({})
useEffect(()=>{

setUser(JSON.parse(sessionStorage.getItem("user")))
},[])
console.log(user)
const Submit = async (e) => {
    e.preventDefault();
    const formBody = { content:cnt, title,image:img, userId:user._id };
    try{
    let res = await fetch("http://localhost:3005/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });
      let resp=await res.json();
      alert(resp.msg)
      setCnt("");
      setTitle("");
    setImg("")

    

    
}

          catch(err){
            alert(err)
          }}

  return (
    <div>
        <Head>
            <title>post blog</title>
            
        </Head>
        <main>
            <form onSubmit={Submit} >
                <input type="text" onChange={(e)=>setCnt(e.target.value)} value={cnt} placeholder='enter blog content'/>
                <input type="text"onChange={(e)=>setTitle(e.target.value)} value={title} placeholder='enter blog title'/>
                <input type="file"onChange={(e)=>setImg(e.target.value)} value={img} placeholder='enter blog image'/>
<button>Create Blog</button>
            </form>
        </main>
    </div>
  )
}

export default createPost