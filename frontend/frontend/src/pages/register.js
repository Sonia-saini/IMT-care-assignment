import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react'

function register() {
    const [username, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handle = (e) => {
      e.preventDefault();
     
      
      if (e.target.name == "username") {
        setuserName(e.target.value);
      }
      if (e.target.name == "email") {
        setEmail(e.target.value);
      }
      if (e.target.name == "password") {
        setPassword(e.target.value);
      }
      
      
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formBody = { name:username, email, password, };
      let res = await fetch("http://localhost:3005/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formBody),
      });
      let response = await res.json();
    //   toast.success("Account Created Successfully", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: true,
    //     closeOnClick: false,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
      setEmail("");
    
      setPassword("");

      setuserName("");
    return  alert(response.msg)

    };
  
    return (
      <>
        <Head>
          <title>Register</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div className="flex items-center justify-center min-h-screen bg-gray-">
            <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
              <h3 className="text-2xl font-bold text-center">Join us</h3>
              <form onSubmit={handleSubmit} method="POST">
<div className="mt-4">
              
                  <div>
                    <label className="block" id="username">
                      Username
                    </label>
                    <input
                      required={true}
                      value={username}
                      id="username"
                      name="username"
                      onChange={handle}
                      type="text"
                      placeholder="Username"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
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
                      Create Account
                    </button>
                  </div>
                  <div className="mt-6 text-grey-dark">
                    Already have an account?
                    <Link className="text-blue-600 hover:underline" href="/login">
                      Log in
                    </Link>
                  </div>
                </div>
              </form>
              
              
            </div>
          </div>
        </main>
      </>
    );
}

export default register