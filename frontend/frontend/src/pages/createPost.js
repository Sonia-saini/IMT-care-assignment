import Head from 'next/head'
import React, { useEffect, useState } from 'react'
// import Index from '../../component/draft';
import dynamic from 'next/dynamic'


const Index=dynamic(()=>import("../../component/draft"),{ssr:false})
function createPost() {
const [cnt,setCnt]=useState("");
const [img,setImg]=useState("")
const [user,setUser]=useState({})
useEffect(()=>{

setUser(JSON.parse(sessionStorage.getItem("user"))||{})
},[])
console.log(user)
const Submit = async (e) => {
    e.preventDefault();
    const formBody = { content:cnt, title,image:img, userId:user?._id };
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
            <meta charset="utf-8" />
        </Head>
        <main >
        
        
            <Index/>
        </main>
    </div>
  )
}

export default createPost