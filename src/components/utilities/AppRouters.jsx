import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { CreateRoom, Help, JoinRoom, MainApp, NavBar, Settings, SignIn, SignUp, ThemeSettings, GeneralSettings, Playground } from '../imports'
import { useArke } from './Arke.Context'
import { AnimatePresence } from "framer-motion"
import DynamicFavicon from './DynamicFavicon'

const AppRouters = () => {

  const { ArkeToast } = useArke()

  const location = useLocation();
  const [previousMainRoute, setPreviousMainRoute] = useState(null);

  // Update the previous main route whenever a new main route is visited
  useEffect(() => {
    if (!location.pathname.includes('/settings')) {
      setPreviousMainRoute(location.pathname);
    }
  }, [location.pathname]);

  return (
    <>
      <NavBar />
      <ArkeToast />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path={"/chat/:id"} element={<MainApp />} />
          <Route path={"/join"} element={<JoinRoom />} />
          <Route path={"/createroom"} element={<CreateRoom />} />
          <Route path={"/playground"} element={<Playground />} />
          <Route path={"/settings"} element={<Settings prevRoute={previousMainRoute} />}>
            <Route path="theme" element={<ThemeSettings />} />
            <Route path="general" element={<GeneralSettings />} />
            <Route path="help" element={<Help />} />
          </Route>
          <Route path="*" element={<Navigate to="/createroom" />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default AppRouters