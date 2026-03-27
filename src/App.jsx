import React from 'react'
import { ToastContainer } from 'react-toastify'
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <>
    <ToastContainer containerId={"mainToast"}/>
    <AppRouter/>
    </>
  )
}

export default App