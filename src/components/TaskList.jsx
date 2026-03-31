import formattedDate from '../utils/dayjs'
import GetAssignmentStatusBadge from './GetAssignmentStatusBadge'


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
        <td>{formattedDate(assignedDate)}</td>
        <td>{GetAssignmentStatusBadge(status)}</td>
        <td>{house.ownerPhone}</td>
      </tr>
    </tbody>
  )
}

export default TaskList