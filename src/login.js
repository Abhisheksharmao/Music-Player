import React from 'react'
import { Link } from 'react-router-dom'
import './login.css'
export default function Login() {
    return (
        <div className='login'>
            <h1>Hello Welcome to Vlancy</h1>
            <img src="./logo512.png" alt="" width="300px"/>
            <Link to="/Home"><button >Login</button></Link>
        </div>
    )
}
