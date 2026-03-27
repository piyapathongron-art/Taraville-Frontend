import AssignmentElement from '../components/assignmentElement/AssignmentElement'
import FooterSystem from '../components/FooterSystem'

function AssignmentAdminPage() {
    


  return (
    <div  className='min-w-full  flex flex-col justify-between'>
        <div className="w-full  flex justify-center ">
          <AssignmentElement/>
        </div>
        
        <FooterSystem/>
    </div>
  )
}

export default AssignmentAdminPage