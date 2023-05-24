import React, { useEffect } from 'react';
import "./App.css";
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Routes } from 'react-router-dom';
import Quora from './components/Quora';
import { login, selectUser } from "./feature/userSlice"
import Login from './components/auth/Login';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth"

export default function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(login({
          userName: authUser.displayName,
          photo: authUser.photoURL,
          email: authUser.email,
          uid: authUser.uid


        }))
        console.log("authUser", authUser);
      }
    })
  }, [dispatch])

  return (
    <div className='App'>
      {user ? <Quora /> : <Login />}
    </div>

  )
};