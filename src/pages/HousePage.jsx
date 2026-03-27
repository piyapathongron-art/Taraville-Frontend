import { ToastContainer } from 'react-toastify'
import FooterSystem from '../components/FooterSystem'
import HouseElement from '../components/HouseElement'

function HousePage() {
  return (
     <div  className='min-w-full  flex flex-col justify-between'>
        <ToastContainer containerId={"housePage"}/>
        <div className="w-full  flex justify-center ">
          <HouseElement/>
        </div>
        
        <FooterSystem/>
    </div>
  )
}

export default HousePage