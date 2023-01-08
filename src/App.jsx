import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { ArkeProvider } from './components/utilities/Arke.Context.jsx'
import AppRouters from './components/utilities/AppRouters.jsx'
import { SettingsProvider } from './components/utilities/Settings.Context.jsx'

function App() { 
  return ( 
    <Router>
      <SettingsProvider>
      <ArkeProvider>
          <div className="App">
              <AppRouters />
          </div>
      </ArkeProvider>
      </SettingsProvider>
    </Router>
  )
}

export default App
