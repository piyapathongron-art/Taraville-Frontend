import FooterSystem from '../components/FooterSystem'
import EmployeeTable from '../components/EmployeeTable'

function EmployeePage() {
    


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