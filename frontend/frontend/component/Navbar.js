import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import style from "../src/styles/Navbar.module.css"
function Navbar() {
  const [user,setUser]=useState({})
  useEffect(()=>{
    setUser(JSON.parse(sessionStorage.getItem("user"))||{})
    
  },[])
  const logout=()=>{
    sessionStorage.clear()
    alert("Successfully logout")
    setUser({})
    window.location.reload()
  }
  console.log(user)
  return (
    <div className={style.main}>
        <h1>Blog app</h1>
        <ul>
            <Link href={"/"}><li>HOME</li></Link>
            {!user.name&&<><Link href={"/login"}><li>LOGIN</li></Link>
            <Link href={"/register"}><li>REGISTER</li></Link></>
            }
           { user.name&&<><li>{user&&user.name?.toUpperCase()}</li>
            <li onClick={logout}>LOGOUT</li></>
            }


        
        </ul>
    </div>
  )
}

export default Navbar