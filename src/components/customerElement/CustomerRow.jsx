import { Edit } from "lucide-react";

const CustomerRow = ({ customer }) => {
  // สร้าง id สำหรับ Modal ตามรูปแบบตัวอย่าง
  const modalId = `editCustomer-${customer.customerId}`;

  return (
    <>
      {/* โครงสร้างแถวอ้างอิงตาม Grid */}
      <div className="grid grid-cols-[1fr_1fr_2fr_2fr_2fr_2fr_auto] gap-4 items-center bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-3 transition-all hover:shadow-md text-gray-700">
        
        {/* surwayID (ใช้ customerId แทน) */}
        <div className="text-center font-bold text-lg">
          {String(customer.customerId).padStart(2, '0')}
        </div>

        {/* type */}
        <div className="text-center font-medium">
          {customer.type || 'online'}
        </div>

        {/* ชื่อ */}
        <div className="text-center truncate px-2">
          {`${customer.firstName} ${customer.lastName}`}
        </div>

        {/* บ้านที่สนใจ */}
        <div className="text-center truncate px-2">
          {customer.interestedHouse || '-'}
        </div>

        {/* งบที่มี */}
        <div className="text-center text-sm truncate px-2">
           {customer.budget || '-'}
        </div>

        {/* เบอร์ติดต่อ */}
        <div className="text-center text-sm truncate px-2">
           {customer.phone || '-'}
        </div>

        {/* ปุ่มแก้ไข */}
        <div className="flex justify-center pr-2">
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            type="button" 
            // onClick={() => document.getElementById(modalId).showModal()}
          >
            <Edit size={20} />
          </button>
        </div>
      </div>

      {/* Modal จำลอง (ยังไม่มีเนื้อหา) */}
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">แก้ไขข้อมูลลูกค้า: {customer.firstName}</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default CustomerRow