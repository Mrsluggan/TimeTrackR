import { useState } from 'react'
import './App.css'
import FetchData from './components/FetchData'
import CreateTask from './components/CreateTask'

function App() {

  return (
    <>
      <CreateTask />
      <FetchData />
    </>
  )
}

export default App
