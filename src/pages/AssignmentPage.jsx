import { useEffect } from 'react'
import useUserStore from '../stores/userStore'
import Footer from '../components/Footer'
import AssignmentTable from '../components/assignmentElement/AssignmentTable'

function AssignmentPage() {
    const getAssignment = useUserStore(state=>state.getAssignment)

    useEffect(()=>{
      getAssignment()
    },[])

  return (
  
    <div className='min-w-full min-h-screen flex flex-col'>
      
      
      <div className="w-full py-8 px-10">
        <h1 className='text-5xl font-medium text-navy mt-10'>งานที่ได้รับมอบหมาย</h1>
      </div>

      
      <div className="flex-1 w-full flex flex-col items-center justify-start pb-10">
          <AssignmentTable/>
      </div>
        
      <Footer/>
    </div>
  )
}

export default AssignmentPage