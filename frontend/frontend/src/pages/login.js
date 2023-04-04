import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import style from "../styles/Login.module.css"

function login() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router=useRouter()
  const handle = (e) => {
    e.preventDefault();

    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
    if (e.target.name == "password") {
      setPassword(e.target.value);
    } 
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formBody = { email, password };
    try{
    let res = await fetch("http://localhost:3005/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });
      let resp=await res.json();
      alert(resp.msg)
      setEmail("");
      
    setPassword("");
sessionStorage.setItem("user",JSON.stringify({...resp.user,token:resp.token}))
router.push("/")
}

          catch(err){
            alert(err)
          }
         
    //   toast.success("Log in Successfully", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: true,
    //     closeOnClick: false,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
        
    
   
    
    //   toast.error((resp.error), {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: true,
    //     closeOnClick: false,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    
}
  return (
    <>
        <Head>
          <title>Login</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={style.login}>
          
         <form onSubmit={handleSubmit} method="POST">
<div className="mt-4">
          <h1>Login</h1>
              
                 
                  <div className="mt-4">
                    <label className="block" id="email">
                      Email
                    </label>
                    <input
                      required={true}
                      value={email}
                      id="email"
                      name="email"
                      onChange={handle}
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block" id="password">
                      Password
                    </label>
                    <input
                      required={true}
                      value={password}
                      id="password"
                      name="password"
                      onChange={handle}
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>


  
                  
                  
  
                  <div className="flex">
                    <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                      Login
                    </button>
                  </div>
                  <div className="mt-6 text-grey-dark">
                    New User?
                    <Link className="text-blue-600 hover:underline" href="/register">
                      Register
                    </Link>
                  </div>
                </div>
              </form>
              </main>
    </>
  )
}

export default login