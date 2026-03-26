import React from 'react'

function TaskList(props) {
    // console.log(props)
    const {index} = props
    const {assignedDate, taskTitle , house ,status,} = props.task
  return (
    <tbody className='text-xl font'>
      <tr>
        <th>{index+1}</th>
        <td>{taskTitle}</td>
        <td>{`${house.projectName} ${house.houseCode}`}</td>
        <td>{assignedDate}10-02-2002</td>
        <td>{status}</td>
        <td>{house.ownerPhone}999-9999-999</td>
      </tr>
    </tbody>
  )
}

export default TaskList