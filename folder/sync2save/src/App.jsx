import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LeakAnalyticsStatic from './components/LeakAnalyticsStatic'
import LeakAnalyticsDynamic from './components/LeakAnalyticsDynamic'

function App() {
  

  return (
  
    <div>
      <h2>Water Leak Dashboard</h2>
      < LeakAnalyticsDynamic />
    </div>
     
   /*  <div>
      <h2>Water Leak Dashboard</h2>
      < LeakAnalyticsStatic />
    </div> */
  
  )
}

export default App
