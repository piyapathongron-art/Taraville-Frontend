import { Edit } from "lucide-react";
import EditAssignmentModal from "./EditAssignmentModal";
import formattedDate from "../utils/dayjs";
import AssignmentInfo from "./AssignmentInfo";


const AssignmentRow = (props) => {
const {assignment} = props
// console.log(assignment)
const modalId = `editAssignment-${assignment.assignmentId}`
const modalIdinfo = `infoAssignment-${assignment.assignmentId}`

    // color status
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending':
                return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">รอดำเนินการ</span>;
            case 'In Progress':
                return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">กำลังทำ</span>;
            case 'Completed':
                return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">เสร็จสิ้น</span>;
            default:
                return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{status || 'ไม่มีสถานะ'}</span>;
        }
    };

    return (
        <>
        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-4 mb-3 transition-all hover:shadow-md"
        onClick={() => document.getElementById(modalIdinfo).showModal()}>
            {/* รหัสงาน */}
            <div className="w-[15%] text-center flex flex-col justify-center">
                <span className="text-xl font-bold text-gray-800">{assignment.assignmentId}</span>
            </div>

            {/* ชื่องาน */}
            <div className="w-[35%] text-left text-gray-700 font-medium text-lg px-4 truncate">
                {assignment.taskTitle || '-'}
            </div>

            {/* รหัสบ้าน / พนักงาน */}
            <div className="w-[20%] text-center text-gray-600 text-sm flex flex-col">
                <span>รหัสบ้าน: <strong className="text-gray-800">{assignment.house.houseCode}</strong></span>
                <span>พนักงาน: <strong className="text-gray-800">{`${assignment.empId} ${assignment.employee.firstName}`}</strong></span>
            </div>

            {/* สถานะ */}
            <div className="w-[40%] text-center flex flex-col justify-center items-center">
                {getStatusBadge(assignment.status)}
                <p>{formattedDate(assignment?.assignedDate)}</p>
            </div>

            {/* ปุ่มแก้ไข */}
            <div className="w-[10%] flex justify-center">
                <button 
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                    type="button" 
                onClick={() => document.getElementById(modalId).showModal()}>
                    <Edit size={24} />
                </button>
            </div>
        </div>

        <dialog id={modalId} className="modal">
        <div className="modal-box">
          
          <EditAssignmentModal assignment={assignment} assignmentId={assignment.assignmentId} modalId={modalId} />
        </div>
      </dialog>

      <dialog id={modalIdinfo} className="modal">
        <div className="modal-box">
          
          <AssignmentInfo assignment={assignment} assignmentId={assignment.assignmentId} modalIdinfo={modalIdinfo} />
        </div>
      </dialog>

      <dialog id="loading-login" className="modal">
        <div className=" justify-center flex">
          <span className="loading loading-spinner loading-xl size-50"></span>
        </div>
      </dialog>

        </>
    );
};

export default AssignmentRow