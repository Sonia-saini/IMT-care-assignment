import React, { useEffect, useState } from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 

function Update({_id,title,content}){
    const { quill, quillRef } = useQuill();
    const [value,setValue]=useState(content);
    const [titl,setTitl]=useState(title)

    React.useEffect(() => {
        if (quill) {
          quill.on('text-change', () => {
            setValue(quillRef.current.firstChild.innerHTML)
          });
        }
      }, [quill]);
      console.log(content,value)
      const [user,setUser]=useState({})
useEffect(()=>{

setUser(JSON.parse(sessionStorage.getItem("user"))||{})
},[])
      const Submit = async (e) => {
        e.preventDefault();
        const formBody = { content:value, title:titl, userId:user?._id };
        try{
        let res = await fetch(`http://localhost:3005/blog/${_id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "userid":user._id
          },
          body: JSON.stringify(formBody),
        });
          let resp=await res.json();
          alert(resp.msg)
          
          
          setTitl("");
    
          
    }
        catch(err){
alert(err)
console.log(err)
        }
    }
    
        
    
        
        

    return(
        <div className="w-full" style={{width:"80%",margin:"1rem auto",display:"grid",gap:"20px"}}>
            <label style={{fontSize:"20px",fontWeight:"700"}}>Blog Title<span style={{color:"red"}}>*</span></label>
                <input type="text"onChange={(e)=>setTitl(e.target.value)} value={titl} placeholder='enter blog title' style={{padding:"10px"}}/>

            <div >
                <div ref={quillRef} />
            </div>
<div style={{margin:"2rem 0",display:"flex",justifyContent:"flex-end"}}>
            <button onClick={Submit} style={{width:"200px",padding:"1rem 2rem",fontSize:"22px",backgroundColor:"black",color:"white",fontWeight:"600",borderRadius:"10px"}}>Update Blog</button>
            </div> 
            <p>{value}</p>

             </div>
    );
}
export default Update;