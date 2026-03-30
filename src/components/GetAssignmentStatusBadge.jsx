 const GetAssignmentStatusBadge = (status) => {
        switch (status) {
            case 'Pending':
                return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">รอดำเนินการ</span>;
            case 'Confirming':
                return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">กำลังทำ</span>;
            case 'Complete':
                return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">เสร็จสิ้น</span>;
            default:
                return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{status || 'ไม่มีสถานะ'}</span>;
        }
    };
  
    export default GetAssignmentStatusBadge