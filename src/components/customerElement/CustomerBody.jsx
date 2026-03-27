import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, Edit, Plus } from 'lucide-react';
import CustomerRow from './CustomerRow';

// ==========================================
// 1. Mocking Store (สำหรับรันพรีวิวใน Canvas)
// ==========================================
const useDataStore = (selector) => {
  const mockState = {
    getAllCustomersData: () => console.log("Fetching customers..."),
    // จำลองข้อมูลตามโครงสร้างจริง + ฟิลด์สมมติสำหรับ UI
    customers: [
      { customerId: 1, firstName: 'นายสมชาย', lastName: 'ใจดี', phone: '081-111-1111', type: 'online', interestedHouse: 'บ้านเดี่ยว', budget: '500,000-1,000,000' },
      { customerId: 2, firstName: 'test2', lastName: 'test2', phone: '1234567892', lineId: null, type: 'walk-in', interestedHouse: 'ทาวน์โฮม', budget: '1,000,000-2,000,000' },
      { customerId: 18, firstName: 'test5', lastName: 'test2', phone: '2234464152', lineId: '', type: 'online', interestedHouse: 'บ้านแฝด', budget: '2,000,000-3,000,000' },
      { customerId: 19, firstName: 'Piyapat', lastName: 'Hongron', phone: '0938533333', lineId: '', type: 'online', interestedHouse: 'บ้านเดี่ยว', budget: '500,000-1,000,000' },
      // ข้อมูลจำลองเพิ่มเพื่อให้ Pagination ทำงาน
      { customerId: 20, firstName: 'Alice', lastName: 'Wonder', phone: '0999999991', type: 'walk-in', interestedHouse: 'บ้านเดี่ยว', budget: '3,000,000+' },
      { customerId: 21, firstName: 'Bob', lastName: 'Builder', phone: '0999999992', type: 'online', interestedHouse: 'ทาวน์โฮม', budget: '500,000-1,000,000' },
    ]
  };
  return selector(mockState);
};

// ==========================================
// 3. Main Component (CustomerBody)
// ==========================================
export default function CustomerBody() {
  const customers = useDataStore(state => state.customers);
  const getAllCustomersData = useDataStore(state => state.getAllCustomersData);
  
  useEffect(() => {
    getAllCustomersData();
  }, []);
  
  // States สำหรับค้นหาและตัวกรอง
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [houseFilter, setHouseFilter] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('');

  // States สำหรับ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ตรรกะการกรองข้อมูล (ดัดแปลงจาก AssignmentElement)
  const filteredCustomers = useMemo(() => {
    return (customers || []).filter(customer => {
      // ค้นหาจากชื่อ นามสกุล หรือ เบอร์โทร
      const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
      const phone = customer.phone || '';
      const matchSearch = fullName.includes(searchTerm.toLowerCase()) || phone.includes(searchTerm);
      
      // กรองจาก Dropdowns (จำลองการกรอง)
      const matchType = typeFilter === '' || customer.type === typeFilter;
      const matchHouse = houseFilter === '' || customer.interestedHouse === houseFilter;
      const matchBudget = budgetFilter === '' || customer.budget === budgetFilter;
      
      return matchSearch && matchType && matchHouse && matchBudget;
    });
  }, [searchTerm, typeFilter, houseFilter, budgetFilter, customers]);

  // ตรรกะ Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="w-full h-[calc(92vh-3.5rem)] bg-[#F8F9FA] flex flex-col relative font-sans">
      
      {/* 1. Toolbar (ตรงกับแถบสีเทาด้านบนของรูป) */}
      <div className="bg-[#94A3B8] w-full py-4 px-6  flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm fixed">
        
        {/* ช่องค้นหา */}
        <div className="relative w-full md:w-[30%] max-w-sm">
          <input
            type="text"
            placeholder="ชื่อลูกค้า"
            className="w-full pl-6 pr-10 py-2.5 bg-white rounded-full border-none focus:ring-2 focus:ring-[#D98A2C] outline-none shadow-sm text-gray-700"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); 
            }}
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        </div>

        {/* Dropdowns & Button Group */}
        <div className="flex flex-wrap w-full md:w-auto gap-3 justify-center items-center">
          
          {/* Dropdown 1: Type */}
          <select 
            className="select select-bordered w-[140px] bg-white rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#D98A2C] min-h-0 h-11 shadow-sm text-gray-700 font-normal"
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="">type</option>
            <option value="online">online</option>
            <option value="walk-in">walk-in</option>
          </select>

          {/* Dropdown 2: บ้านที่สนใจ */}
          <select 
            className="select select-bordered w-[160px] bg-white rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#D98A2C] min-h-0 h-11 shadow-sm text-gray-700 font-normal"
            value={houseFilter}
            onChange={(e) => { setHouseFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="">บ้านที่สนใจ</option>
            <option value="บ้านเดี่ยว">บ้านเดี่ยว</option>
            <option value="บ้านแฝด">บ้านแฝด</option>
            <option value="ทาวน์โฮม">ทาวน์โฮม</option>
          </select>

          {/* Dropdown 3: งบ */}
          <select 
            className="select select-bordered w-[160px] bg-white rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#D98A2C] min-h-0 h-11 shadow-sm text-gray-700 font-normal"
            value={budgetFilter}
            onChange={(e) => { setBudgetFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="">งบ</option>
            <option value="500,000-1,000,000">500,000-1,000,000</option>
            <option value="1,000,000-2,000,000">1,000,000-2,000,000</option>
            <option value="2,000,000-3,000,000">2,000,000-3,000,000</option>
            <option value="3,000,000+">3,000,000+</option>
          </select>

          {/* ปุ่มเพิ่ม (สีส้ม) */}
          <button 
            className="bg-[#D98A2C] hover:bg-[#c27a26] text-white px-8 py-2.5 h-11 rounded-full font-medium shadow-sm transition-colors whitespace-nowrap"
            type="button" 
            onClick={()=> document.getElementById("createCustomerModal")?.showModal()}
          >
            เพิ่ม
          </button>
        </div>
      </div>

      {/* 2. พื้นที่แสดงข้อมูลตาราง */}
      <div className="flex-1 w-full max-w-6xl mx-auto p-6 flex flex-col mt-20">

        {/* Header ของตาราง (อ้างอิง Grid จาก Row) */}
        <div className="grid grid-cols-[1fr_1fr_2fr_2fr_2fr_2fr_auto] gap-4 items-center bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-4 mb-4 text-gray-800 font-bold text-base md:text-lg">
          <div className="text-center">surwayID</div>
          <div className="text-center">type</div>
          <div className="text-center">ชื่อ</div>
          <div className="text-center">บ้านที่สนใจ</div>
          <div className="text-center">งบที่มี</div>
          <div className="text-center">เบอร์ติดต่อ</div>
          <div className="w-8"></div> {/* พื้นที่เผื่อปุ่ม Edit */}
        </div>

        {/* รายการลูกค้า */}
        <div className="flex flex-col gap-2">
          {currentItems.length > 0 ? (
            currentItems.map((customer) => (
              <CustomerRow key={customer.customerId} customer={customer} />
            ))
          ) : (
            <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-200 shadow-sm text-lg">
              ไม่พบข้อมูลลูกค้า
            </div>
          )} 
        </div>

        {/* 3. Pagination (จัดวางมุมขวาล่างตามรูป) */}
        {totalPages > 0 && (
          <div className="flex justify-end items-center gap-1 mt-auto pt-8">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                disabled={page === '...'}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                                    ${page === currentPage
                    ? 'bg-[#1F2937] text-white shadow-md'
                    : page === '...'
                      ? 'text-gray-500 cursor-default'
                      : 'text-gray-600 hover:bg-gray-200 bg-transparent'
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal เพิ่มลูกค้า */}
      <dialog id="createCustomerModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">เพิ่มข้อมูลลูกค้า</h3>
          <p className="py-4">ฟอร์มสำหรับเพิ่มลูกค้า...</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">ปิด</button>
            </form>
          </div>
        </div>
      </dialog>

    </div>
  );
}