import { AlertCircle, CheckCircle, Clock, HelpCircle } from "lucide-react";

 const GetAssignmentStatusBadge = (status) => {
        switch (status) {
            case 'Confirming':
            case 'Pending':
                return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit"><AlertCircle size={12}/> รอดำเนินการ</span>;
            case 'In Progress':
                return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit"><Clock size={12}/> กำลังทำ</span>;
            case 'Complete':
            case 'Completed':
                return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit"><CheckCircle size={12}/> เสร็จสิ้น</span>;
            default:
                return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit"><HelpCircle size={12}/> {status || 'ไม่มีสถานะ'}</span>;
        }
    };
  
    export default GetAssignmentStatusBadge