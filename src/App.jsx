import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ArkeProvider } from './components/utilities/Arke.Context.jsx'
import AppRouters from './components/utilities/AppRouters.jsx'
import { SettingsProvider } from './components/utilities/Settings.Context.jsx'
import CursorAnimation from './components/utilities/CursorAnimation.jsx'
import { DialogProvider } from './components/utilities/Dialog.context.jsx'

function App() {
  return (
    <Router>
      <SettingsProvider>
        <ArkeProvider>
          <DialogProvider>
            <div className="App">
              <AppRouters />
              {/* <CursorAnimation /> */}
            </div>
          </DialogProvider>
        </ArkeProvider>
      </SettingsProvider>
    </Router>
  )
}

export default App
