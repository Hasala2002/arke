import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { ArkeProvider } from './components/utilities/Arke.Context.jsx'
import AppRouters from './components/utilities/AppRouters.jsx'

function App() { 
  return ( 
    <Router>
      <ArkeProvider>
          <div className="App">
              <AppRouters />
          </div>
      </ArkeProvider>
    </Router>
  )
}

export default App
