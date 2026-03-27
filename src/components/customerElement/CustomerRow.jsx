import { FileText, User } from "lucide-react";
import EditCustomerModal from "./EditCustomerModal";
import EditSurveyModal from "./EditSurveyModal";


const CustomerRow = ({ customer }) => {
  const editCustomerModalId = `editCustomer-${customer.customerId}`;
  const editSurveyModalId = `editSurvey-${customer.projectSurveys?.surveyId || 'new'}-${customer.customerId}`;

  return (
    <>
      {/* โครงสร้างแถว */}
      <div className="grid grid-cols-[1fr_1fr_2fr_2fr_2fr_2fr_auto] gap-4 items-center bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-3 transition-all hover:shadow-md text-gray-700">
        
        {/* surveyID (ดึงจาก projectSurveys) */}
        <div className="text-center font-bold text-lg">
          {customer.projectSurveys?.surveyId ? String(customer.projectSurveys.surveyId).padStart(2, '0') : '-'}
        </div>

        {/* type */}
        <div className="text-center font-medium">
          {customer.projectSurveys?.surveyType || '-'}
        </div>

        {/* ชื่อ */}
        <div className="text-center truncate px-2">
          {`${customer.firstName || ''} ${customer.lastName || ''}`}
        </div>

        {/* บ้านที่สนใจ */}
        <div className="text-center truncate px-2">
          {customer.projectSurveys?.interestedPropertyType || '-'}
        </div>

        {/* งบที่มี */}
        <div className="text-center text-sm truncate px-2">
           {customer.projectSurveys?.expectedBudget ? Number(customer.projectSurveys.expectedBudget).toLocaleString() : '-'}
        </div>

        {/* เบอร์ติดต่อ */}
        <div className="text-center text-sm truncate px-2">
           {customer.phone || '-'}
        </div>

        {/* ปุ่มแก้ไข 2 ปุ่ม */}
        <div className="flex justify-center gap-2 pr-2">
          {/* ปุ่มแก้ข้อมูล Survey */}
          <button 
            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors tooltip tooltip-top"
            data-tip="แก้ไขแบบสอบถาม"
            type="button" 
            onClick={() => document.getElementById(editSurveyModalId)?.showModal()}
          >
            <FileText size={20} />
          </button>
          
          {/* ปุ่มแก้ข้อมูล Customer */}
          <button 
            className="p-2 hover:bg-orange-50 text-[#D98A2C] rounded-lg transition-colors tooltip tooltip-top"
            data-tip="แก้ไขข้อมูลลูกค้า"
            type="button" 
            onClick={() => document.getElementById(editCustomerModalId)?.showModal()}
          >
            <User size={20} />
          </button>
        </div>
      </div>

      
      <dialog id={editCustomerModalId} className="modal">
                <div className="modal-box">
                    <EditCustomerModal modalId={editCustomerModalId} customer={customer} customerId={customer.customerId}/>
                </div>
            </dialog>
            
      <dialog id={editSurveyModalId} className="modal">
                <div className="modal-box">
                    <EditSurveyModal modalId={editSurveyModalId} customer={customer} customerId={customer.customerId}/>
                </div>
            </dialog>

      
    </>
  );
};

export default CustomerRow