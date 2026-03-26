import React, { useEffect } from 'react'
import useUserStore from '../stores/userStore'
import AssignmentTable from '../components/AssignmentTable'
import Footer from '../components/Footer'

function AssignmentPage() {
    const user = useUserStore(state=>state.user)
    const getAssignment = useUserStore(state=>state.getAssignment)

    useEffect(()=>{
      getAssignment()
    },[])


  return (
    <div  className='min-w-full h-screen flex flex-col justify-between'>
      <h1 className='text-5xl font-medium text-navy mt-15 mx-10'>งานที่ได้รับมอบหมาย</h1>
        <div className="w-full  flex justify-center ">
          <AssignmentTable/>
        </div>
        
        <Footer/>
    </div>
  )
}

export default AssignmentPage