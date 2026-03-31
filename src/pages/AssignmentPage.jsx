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
    // เปลี่ยนจาก h-screen เป็น min-h-screen เพื่อรองรับกรณีที่เนื้อหายาวกว่าหน้าจอ
    <div className='min-w-full min-h-screen flex flex-col'>
      
      {/* ส่วนหัว */}
      <div className="w-full py-8 px-10">
        <h1 className='text-5xl font-medium text-navy mt-10'>งานที่ได้รับมอบหมาย</h1>
      </div>

      {/* ส่วนเนื้อหา (ใส่ flex-1 เพื่อให้กินพื้นที่ว่างตรงกลางทั้งหมด)
        และใส่ items-center เพื่อให้เนื้อหา (Table) อยู่กึ่งกลางหน้าจอ
      */}
      <div className="flex-1 w-full flex flex-col items-center justify-start pb-10">
          <AssignmentTable/>
      </div>
        
      {/* Footer จะถูกดันไปอยู่ล่างสุดเสมอ */}
      <Footer/>
    </div>
  )
}

export default AssignmentPage