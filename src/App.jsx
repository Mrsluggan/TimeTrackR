import { useState } from 'react'
import './App.css'
import FetchData from './components/FetchData'
import CreateTask from './components/CreateTask'
import Navbar from './components/Navbar'

function App() {



  return (
    <>

      <h1>Välkommen till TimeTracker!</h1>
      <Navbar />
      <FetchData />
    </>
  )
}

export default App
