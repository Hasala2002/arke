import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CreateRoom, MainApp, NavBar, SignIn, SignUp } from '../imports'
import { useArke } from './Arke.Context'

const AppRouters = () => {

  const {ArkeToast} = useArke()

  return (
    <>
        <NavBar />
        <ArkeToast />
        <Routes>
            <Route path={"/chat/:id"} element={<MainApp />} />
            <Route path={"/signin"} element={<SignIn />} />
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/createroom"} element={<CreateRoom />} />
            <Route path = "*" element={<Navigate to="/createroom"/>} />
        </Routes>
    </>
  )
}

export default AppRouters