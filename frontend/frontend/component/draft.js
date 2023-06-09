import React, { useEffect, useState } from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 

function Index(){
    const { quill, quillRef } = useQuill();
    const [value,setValue]=useState("");
    const [title,setTitle]=useState("")

    React.useEffect(() => {
        if (quill) {
          quill.on('text-change', () => {
            setValue(quillRef.current.firstChild.innerHTML)
          });
        }
      }, [quill]);
      const [user,setUser]=useState({})
useEffect(()=>{

setUser(JSON.parse(sessionStorage.getItem("user"))||{})
},[])
      const Submit = async (e) => {
        e.preventDefault();
        const formBody = { content:value, title:title, userId:user?._id };
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
          
          
          setTitle("");
    
          
    }
        catch(err){
alert(err)
console.log(err)
        }
    }
    
        
    
        
        

    return(
        <div className="w-full" style={{width:"80%",margin:"1rem auto",display:"grid",gap:"20px"}}>
            <label style={{fontSize:"20px",fontWeight:"700"}}>Blog Title<span style={{color:"red"}}>*</span></label>
                <input type="text"onChange={(e)=>setTitle(e.target.value)} value={title} placeholder='enter blog title' style={{padding:"10px"}}/>

            <div >
                <div ref={quillRef} />
            </div>
<div style={{margin:"2rem 0",display:"flex",justifyContent:"flex-end"}}>
            <button onClick={Submit} style={{width:"200px",padding:"1rem 2rem",fontSize:"22px",backgroundColor:"black",color:"white",fontWeight:"600",borderRadius:"10px"}}>Post Blog</button>
            </div>  </div>
    );
}
export default Index;