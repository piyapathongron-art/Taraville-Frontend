import { useState, useEffect } from 'react';
import { Search, ChevronDown, Loader2 } from 'lucide-react';
import useDataStore from '../../stores/dataStore';
import EmployeeList from './EmployeeList';
import CreateEmployeeModal from './CreateEmployeeModal';
import { getPaginateEmployeeApi } from '../../api/paginateApi';


export default function EmployeeTable() {
  const isLoading = useDataStore(state => state.isLoading)

  //state for filter and search
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // State สำหรับ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const itemsPerPage = 5; 

 // ระบบ Debounce 
     useEffect(() => {
         const timer = setTimeout(() => {
             setDebouncedSearch(searchTerm);
             setCurrentPage(1); 
         }, 500); 
         return () => clearTimeout(timer);
     }, [searchTerm]);




     const fetchEmployee  = async () => {
      try {
        const resp = await getPaginateEmployeeApi({
          search: debouncedSearch, 
          department: departmentFilter, 
          page: currentPage, 
          limit: itemsPerPage});
          // console.log("Employee data fetched:", resp.data);
        setTotalEmployees(resp.data.totalEmployee); 
        setEmployees(resp.data.employees)
      }catch (error) {
        console.error("Error fetching employee data:", error);
      };
      
    };

  //fecth data from backend
  useEffect(() => {
    
    fetchEmployee();
  }, [debouncedSearch, departmentFilter, currentPage]);



  // คำนวณ Pagination
  const totalPages = Math.ceil(totalEmployees / itemsPerPage);
  // console.log(totalPages)

  // ฟังก์ชันสร้างเลขหน้าแบบมีจุดไข่ปลา 
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

  // Dropdown แผนก
  const handleSelectDepartment = (dept) => {
    setDepartmentFilter(dept);
    setCurrentPage(1);

    if (document.activeElement) {
      document.activeElement.blur();
    }
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
    <>
      <div className=" w-full h-[calc(100vh-3.5rem)] bg-gray-50 flex flex-col relative">

        {/* Toolbar */}
        <div className="bg-[#94A3B8] w-full py-4 px-6  flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm fixed z-3">

          {/* ช่องค้นหา */}
          <div className="relative w-100 ml-10">
            <input
              type="text"
              placeholder="หาชื่อพนักงาน"
              className="w-full pl-6 pr-10 py-2.5 bg-white rounded-full border-none focus:ring-2 focus:ring-[#D98A2C] outline-none shadow-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); 
              }}
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <div className="flex w-full sm:w-auto gap-4">

            {/* ตัวกรองแผนก */}
            <div className="dropdown dropdown-bottom sm:dropdown-end w-full sm:w-48 z-2">
              <div
                tabIndex={0}
                role="button"
                className="btn w-full bg-white hover:bg-gray-50 border-none shadow-sm text-gray-700 font-normal justify-between px-4 h-11 min-h-11 rounded-lg focus:ring-2 focus:ring-[#D98A2C]"
              >
                {departmentFilter === '' ? 'แผนกทั้งหมด' : departmentFilter}
                <ChevronDown size={16} className="text-gray-400" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-full p-2 shadow-lg mt-1 border border-base-200"
              >
                <li>
                  <a
                    onClick={() => handleSelectDepartment('')}
                    className={departmentFilter === '' ? 'bg-gray-100 font-medium' : ''}
                  >
                    แผนกทั้งหมด
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => handleSelectDepartment('Employee')}
                    className={departmentFilter === 'Employee' ? 'bg-gray-100 font-medium' : ''}
                  >
                    Employee
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => handleSelectDepartment('Staff')}
                    className={departmentFilter === 'Staff' ? 'bg-gray-100 font-medium' : ''}
                  >
                    Staff
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => handleSelectDepartment('Engineer')}
                    className={departmentFilter === 'Engineer' ? 'bg-gray-100 font-medium' : ''}
                  >
                    Engineer
                  </a>
                </li>
              </ul>
            </div>

            {/* ปุ่มเพิ่ม */}
            <button className="bg-[#D98A2C] hover:bg-[#c27a26] text-white px-10 py-2.5 rounded-xl font-medium shadow-sm transition-colors whitespace-nowrap"
              type="button" onClick={() => document.getElementById("createEmployee").showModal()}>
              เพิ่ม
            </button>
          </div>
        </div>

        
        <div className="flex-1 w-full max-w-6xl mx-auto p-6 flex flex-col mt-20">

          {/* Header*/}
          <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-2 mb-6">
            <div className="w-[20%] text-center leading-tight">
              <span className="font-bold text-gray-800 text-lg">รหัสพนักงาน</span><br />
              <span className="text-gray-600 font-medium">ไอดี</span>
            </div>
            <div className="w-[30%] text-center font-bold text-gray-800 text-lg">ชื่อ นามสกุล</div>
            <div className="w-[20%] text-center font-bold text-gray-800 text-lg">แผนก</div>
            <div className="w-[20%] text-center font-bold text-gray-800 text-lg">เบอร์ติดต่อ</div>
            <div className="w-[10%]"></div>
          </div>

          {/* employee row */}
          <div className="flex flex-col gap-1 animate-fade-up z-0">
            {employees.length > 0 ? (
              employees.map((emp, index) => (
                <EmployeeList key={emp.employeeId} employee={emp} fetchEmployee={fetchEmployee} />
              ))
            ) : (
              <div className="text-center py-10 text-gray-500 bg-white rounded-xl border border-gray-200">
                ไม่พบข้อมูลพนักงานที่ค้นหา
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
                <div className="w-full bg-white border mt-5 border-gray-200 z-10 px-6 py-4 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] animate-fade-up">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
                        <span className="text-sm text-gray-500">
                            รวมทั้งหมด <strong className="text-gray-800">{totalEmployees}</strong> รายการ
                        </span>
                        
                        <div className="flex items-center gap-1">
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                &lt;
                            </button>

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

                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

      </div>


      <dialog id="createEmployee" className="modal">
        <div className="modal-box">

          <CreateEmployeeModal fetchEmployee={fetchEmployee} />
        </div>
      </dialog>

      <dialog id="loading-login" className="modal">
        <div className=" justify-center flex">
          <span className="loading loading-spinner loading-xl size-50"></span>
        </div>
      </dialog>

    </>);
}

