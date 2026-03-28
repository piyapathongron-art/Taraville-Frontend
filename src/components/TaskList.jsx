import formattedDate from '../utils/dayjs'
import getStatusBadge from './GetStatusBadge'

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
        <td>{getStatusBadge(status)}</td>
        <td>{house.ownerPhone}</td>
      </tr>
    </tbody>
  )
}

export default TaskList