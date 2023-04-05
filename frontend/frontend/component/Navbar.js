import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import style from "../src/styles/Navbar.module.css"
import { useRouter } from 'next/router'
function Navbar() {
  const [user,setUser]=useState({})
  const router=useRouter()
  useEffect(()=>{
    setUser(JSON.parse(sessionStorage.getItem("user"))||{})
    
  },[])
  const logout=()=>{
    sessionStorage.clear()
    alert("Successfully logout")
    setUser({})
    window.location.reload()
  }
  const home=()=>{
    router.push("/")
  }
  console.log(user)
  return (
    <div className={style.main}>
     <h1 onClick={home} style={{"cursor":"pointer"}}> Blog app </h1>
        <ul>
            <Link href={"/"}><li>HOME</li></Link>
            {!user.name&&<><Link href={"/login"}><li>LOGIN</li></Link>
            <Link href={"/register"}><li>REGISTER</li></Link></>
            }
           { user.name&&<><Link href="#"><li>{user&&user.name?.toUpperCase()}</li></Link>
        <Link href="#">    <li onClick={logout}>LOGOUT</li></Link></>
            }


        
        </ul>
    </div>
  )
}

export default Navbar