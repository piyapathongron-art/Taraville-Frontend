import React from 'react'
import useUserStore from '../stores/userStore'
import TaskList from './taskList'

function AssignmentTable() {
    const assignment = useUserStore(state=>state.assignment)
    console.log(assignment)
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-200 mt-20 w-320 h-fit relative bottom-40">
  <table className="table">
    {/* head */}
    <thead className='text-2xl font-light '>
      <tr className=''>
        <th></th>
        <th>งาน</th>
        <th>โครงการ <span>สถานที่</span></th>
        <th>กำหนดการ</th>
        <th>สถานะ</th>
        <th>เบอร์ติดต่อ</th>
      </tr>
    </thead>
    {assignment.map((el, index) => (<TaskList key={index+1} task={el} index={index}/>))}
    
  </table>
</div>
  )
}

export default AssignmentTable