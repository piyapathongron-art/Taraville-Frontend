import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, Edit, Plus, Loader2 } from 'lucide-react';
import CustomerRow from './CustomerRow';
import useDataStore from '../../stores/dataStore';
import { ToastContainer } from 'react-toastify';


export default function CustomerBody() {
  const customers = useDataStore(state => state.customers);
  const getSurveyData = useDataStore(state => state.getSurveyData);
  const isLoading = useDataStore(state=>state.isLoading)
  
  useEffect(() => {
    getSurveyData();
  }, []);

  // console.log(customers)
  
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
      
      // กรองจาก Dropdowns (แก้ไขการอ้างอิงให้ชี้เข้าไปใน projectSurveys)
      const surveyInfo = customer.projectSurveys || {};
      
      const matchType = typeFilter === '' || surveyInfo.surveyType === typeFilter;
      const matchHouse = houseFilter === '' || surveyInfo.interestedPropertyType === houseFilter;
      const matchBudget = budgetFilter === '' || surveyInfo.expectedBudget === budgetFilter;
      
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

      //loading
     if (isLoading) {
        return (
            <div className="w-full h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center bg-base-200/40">
                <Loader2 className="animate-spin text-[#f2b91c] mb-4" size={48} />
                <p className="text-lg text-base-content/60 font-medium">กำลังโหลดข้อมูลพนักงาน...</p>
            </div>
        );
    }

  return (
    <div className="w-full h-[calc(92vh-3.5rem)] bg-[#F8F9FA] flex flex-col relative">
      <ToastContainer containerId="CustomerBody"/>
      {/* 1. Toolbar */}
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
            className="select select-bordered px-5 w-[140px] bg-white rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#D98A2C] min-h-0 h-11 shadow-sm text-gray-700 font-normal"
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="">type</option>
            <option value="Online">Online</option>
            <option value="Walkin">Walk-in</option>
          </select>

          {/* Dropdown 2: บ้านที่สนใจ */}
          <select 
            className="select select-bordered w-[160px] px-5 bg-white rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#D98A2C] min-h-0 h-11 shadow-sm text-gray-700 font-normal"
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
            className="select select-bordered w-[160px] px-5 bg-white rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#D98A2C] min-h-0 h-11 shadow-sm text-gray-700 font-normal"
            value={budgetFilter}
            onChange={(e) => { setBudgetFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="">งบ</option>
            <option value="500,000-1,000,000">500,000-1,000,000</option>
            <option value="1,000,000-2,000,000">1,000,000-2,000,000</option>
            <option value="2,000,000-3,000,000">2,000,000-3,000,000</option>
            <option value="3,000,000+">3,000,000+</option>
          </select>

          {/* ปุ่มเพิ่ม (สีส้ม)
          <button 
            className="bg-[#D98A2C] hover:bg-[#c27a26] text-white px-8 py-2.5 h-11 rounded-full font-medium shadow-sm transition-colors whitespace-nowrap"
            type="button" 
            onClick={()=> document.getElementById("createCustomerModal")?.showModal()}
          >
            เพิ่ม
          </button> */}
        </div>
      </div>

      {/* 2. พื้นที่แสดงข้อมูลตาราง */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-6 flex flex-col mt-20">

        {/* Header ของตาราง (อ้างอิง Grid จาก Row) */}
        <div className="grid grid-cols-[1fr_1fr_2fr_2fr_2fr_2fr_auto] gap-4 items-center bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-4 mb-4 text-gray-800 font-bold text-base md:text-lg">
          <div className="text-center">ID</div>
          <div className="text-center">type</div>
          <div className="text-center">ชื่อ</div>
          <div className="text-center">บ้านที่สนใจ</div>
          <div className="text-center">งบที่มี</div>
          <div className="text-center">เบอร์ติดต่อ</div>
          <div className="w-22"></div>
        </div>

        {/* รายการลูกค้า */}
        <div className="flex flex-col gap-2  animate-fade-up">
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

  

    </div>
  );
}