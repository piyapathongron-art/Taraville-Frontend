import useUserStore from '../../stores/userStore';
import { Calendar, MapPin, Phone, User, AlertCircle } from 'lucide-react';
import GetAssignmentStatusBadge from '../GetAssignmentStatusBadge';



function AssignmentTable() {
    
    const assignment = useUserStore(state => state.assignment) || []; 

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-6 animate-fade-up">
            
            {/* Header ของตาราง */}
            <div className="hidden md:flex items-center justify-between bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-4 mb-4 text-gray-800 font-bold text-lg">
                <div className="w-[10%] text-center">รหัสงาน</div>
                <div className="w-[30%] text-left pl-4">หัวข้องาน</div>
                <div className="w-[25%] text-left">สถานที่ (โครงการ)</div>
                <div className="w-[20%] text-center">กำหนดการ</div>
                <div className="w-[15%] text-center">เบอร์ติดต่อ</div>
            </div>

            {/* ส่วนของรายการงาน (List of Rows) */}
            <div className="flex flex-col gap-3 w-full">
                {assignment.length > 0 ? (
                    assignment.map((task, index) => {
                        // ฟอร์แมตวันที่
                        const formattedDate = task?.assignedDate 
                            ? new Date(task.assignedDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }) 
                            : "-";

                        return (
                            <div key={task.assignmentId || index} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white rounded-xl border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-4 transition-all hover:shadow-md hover:border-[#D98A2C]/30 cursor-pointer gap-4 md:gap-0">
                                
                                {/* รหัสงาน */}
                                <div className="w-full md:w-[10%] text-left md:text-center flex flex-col justify-center">
                                    <span className="text-sm text-gray-400 md:hidden mb-1">รหัสงาน</span>
                                    <span className="text-xl font-bold text-gray-800">#{task.assignmentId || index + 1}</span>
                                </div>
                                
                                {/* หัวข้องาน */}
                                <div className="w-full md:w-[30%] text-left text-gray-700 font-medium md:text-lg md:px-4 truncate">
                                    <span className="text-sm text-gray-400 md:hidden block mb-1">หัวข้องาน</span>
                                    {task.taskTitle || '-'}
                                    {task.dutyRole && <div className="text-sm text-[#D98A2C] font-normal mt-0.5">{task.dutyRole}</div>}
                                </div>
                                
                                {/* สถานที่ */}
                                <div className="w-full md:w-[25%] text-left text-gray-600 text-sm flex flex-col justify-center gap-1.5">
                                    <span className="flex items-center gap-1.5">
                                        <MapPin size={16} className="text-gray-400"/> 
                                        บ้านเลขที่: <strong className="text-gray-800">{task.house?.houseCode || '-'}</strong>
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <User size={16} className="text-gray-400"/> 
                                        {/* ใช้ houseName แทน หากไม่มีข้อมูล customer ผูกมา */}
                                        ชื่อบ้าน: <span className="text-gray-700">{task.house?.houseName || 'ไม่ระบุ'}</span>
                                    </span>
                                </div>
                                
                                {/* กำหนดการ & สถานะ */}
                                <div className="w-full md:w-[20%] text-left md:text-center flex flex-row md:flex-col items-center md:justify-center gap-3 md:gap-2">
                                    {GetAssignmentStatusBadge(task.status)}
                                    <span className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                                        <Calendar size={14} className="text-[#D98A2C] hidden md:block"/> 
                                        {formattedDate}
                                    </span>
                                </div>
                                
                                {/* เบอร์ติดต่อ */}
                                <div className="w-full md:w-[15%] text-left md:text-center flex md:justify-center items-center">
                                    <span className="flex items-center gap-1.5 text-sm text-gray-700 font-medium bg-gray-50 px-3 py-1.5 md:bg-transparent md:px-0 md:py-0 rounded-lg">
                                        <Phone size={16} className="text-green-600"/> 
                                        {/* ใช้ ownerPhone จาก house */}
                                        {task.house?.ownerPhone || '-'}
                                    </span>
                                </div>
                                
                            </div>
                        );
                    })
                ) : (
                    // กรณีไม่มีข้อมูล
                    <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2">
                        <AlertCircle size={40} className="text-gray-300 mb-2" />
                        <p className="text-lg font-medium text-gray-600">ยังไม่มีงานที่ได้รับมอบหมาย</p>
                        <p className="text-sm text-gray-400">งานใหม่ของคุณจะแสดงที่นี่</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AssignmentTable;