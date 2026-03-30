import React from 'react'
import { ToastContainer } from 'react-toastify'
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <>
    <ToastContainer containerId={"mainToast"}/>
    
    <AppRouter/>
    {/* <div className="bg-red-500 fixed w-20 h-20 top-10  z-50 right-20  ">
                </div> */}
    </>
  )
}

export default App