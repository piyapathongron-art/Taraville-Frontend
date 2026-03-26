import React, { useEffect } from 'react'
import useUserStore from '../stores/userStore'
import FooterSystem from '../components/FooterSystem'
import EmployeeTable from '../components/EmployeeTable'

function EmployeePage() {
    
    const getAssignment = useUserStore(state=>state.getAssignment)

    useEffect(()=>{
      getAssignment()
    },[])


  return (
    <div  className='min-w-full  flex flex-col justify-between'>
        <div className="w-full  flex justify-center ">
          <EmployeeTable/>
        </div>
        
        <FooterSystem/>
    </div>
  )
}

export default EmployeePage