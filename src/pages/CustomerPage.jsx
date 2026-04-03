import { ToastContainer } from 'react-toastify'
import CustomerBody from '../components/customerElement/CustomerBody'
import FooterSystem from '../components/FooterSystem'

function CustomerPage() {


  return (
     <div  className='min-w-full  flex flex-col justify-between'>
        <div className="w-full  flex justify-center ">
          <ToastContainer containerId={"customerPage"}/>
          <CustomerBody/>
        </div>
        
        <FooterSystem/>
    </div>
  )
}

export default CustomerPage