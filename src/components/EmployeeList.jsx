import { Edit } from "lucide-react";
import EditEmployeeModal from "./EditEmployeeModal";

const EmployeeList = (props) => {
  const { employee } = props
  const name = `${employee.firstName} ${employee.lastName}`
  const modalId = `editEmployee-${employee.employeeId}`;
  
  return (
    <>
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-4 mb-3 transition-all hover:shadow-md">
        {/* คอลัมน์ 1: ID */}
        <div className="w-[20%] text-center flex flex-col justify-center">
          <span className="text-xl font-bold text-gray-800">{employee.employeeId}</span>
          <span className="text-xs text-gray-500">{employee.user?.userId || null}</span>
        </div>

        {/* คอลัมน์ 2: ชื่อ */}
        <div className="w-[30%] text-center text-gray-700 text-lg">
          {name}
        </div>

        {/* คอลัมน์ 3: แผนก */}
        <div className="w-[20%] text-center text-gray-700 text-lg">
          {employee.department}
        </div>

        {/* คอลัมน์ 4: เบอร์ติดต่อ */}
        <div className="w-[20%] text-center text-gray-700 text-lg">
          {employee.phone}
        </div>

        {/* คอลัมน์ 5: ปุ่มแก้ไข */}
        <div className="w-[10%] flex justify-center">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            type="button" onClick={() => document.getElementById(modalId).showModal()}>
            <Edit size={24} />
          </button>
        </div>
      </div>

      <dialog id={modalId} className="modal">
        <div className="modal-box">
          
          <EditEmployeeModal employee={employee} employeeId={employee.employeeId} modalId={modalId} />
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

export default EmployeeList