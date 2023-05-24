import React from 'react'
import "./Login.css"
import { signInWithPopup } from "firebase/auth"
import { auth, Provider } from "../../firebase"
const Login = () => {
    const handelSubmit = async () => {
        await signInWithPopup(auth, Provider)
            .then((res) => {
                console.log(res)
            }).catch((e) => {
                console.log(e)
            })
    }
    return (
        <div className='login-container'>
            <div className='login-content'>
                <img
                    src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
                    alt="logo"
                />
                <button className='btn-login' onClick={handelSubmit}>Login to continue</button>

            </div>

        </div>
    )
}

export default Login
