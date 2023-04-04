import Link from 'next/link'
import React from 'react'
import style from "../src/styles/Navbar.module.css"
function Navbar() {
  return (
    <div className={style.main}>
        <h1>Blog app</h1>
        <ul>
            <Link href={"/"}><li>Home</li></Link>
            <Link href={"/login"}><li>Login</li></Link>
            <Link href={"/register"}><li>Register</li></Link>


        
        </ul>
    </div>
  )
}

export default Navbar