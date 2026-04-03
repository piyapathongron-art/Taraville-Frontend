
import { ToastContainer } from 'react-toastify'
import EmployeeTable from '../components/employeeElement/EmployeeTable'
import FooterSystem from '../components/FooterSystem'


function EmployeePage() {

  return (
    <div  className='min-w-full  flex flex-col justify-between'>
      <ToastContainer containerId={"employeePage"}/>
        <div className="w-full  flex justify-center ">
          <EmployeeTable/>
        </div>
        
        <FooterSystem/>
    </div>
  )
}

export default EmployeePage