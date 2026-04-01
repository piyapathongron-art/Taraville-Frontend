import { useState, useEffect } from 'react';
import { Search, ChevronDown, ArrowUpDown, Loader2 } from 'lucide-react';
import AssignmentRow from './AssignmentRow';
import useDataStore from '../../stores/dataStore';
import { ToastContainer } from 'react-toastify';
import CreateAssignmentModal from './CreateAssignmentModal';
import { getPaginateAssignmentApi } from '../../api/paginateApi';





export default function AssignmentElement() {
  const [assignments, setAssignments] = useState([]);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const isLoading = useDataStore(state => state.isLoading)
  const setIsLoading = useDataStore(state => state.setIsLoaing)

  
  // const getAssignmentData = useDataStore(state => state.getAssignmentData);
  // const assignment = useDataStore(state => state.assignments);

  // State สำหรับค้นหาและกรอง
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      try {
        const resp = await getPaginateAssignmentApi({
          search: debouncedSearchTerm,
          status: statusFilter,
          sortAssignedDate: sortOrder,
          page: currentPage,
          limit: itemsPerPage
        });
        setAssignments(resp?.data.result || []);
        setTotalAssignments(resp?.data.total || 0);
        // console.log(resp)
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setAssignments([]);
        setTotalAssignments(0);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAssignments();

  }, [debouncedSearchTerm, statusFilter, currentPage,sortOrder]);

  


  // ฟังก์ชันสร้างเลขหน้าแบบมีจุดไข่ปลา (...)
  const totalPages = Math.ceil(totalAssignments / itemsPerPage);
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

  const handleSelectStatus = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    
    // console.log("Sort order toggled:", sortOrder);
  };

  

  return (
    <>
      <div className="w-full h-[calc(100vh-3.5rem)] bg-gray-50 flex flex-col relative">
        <ToastContainer containerId="assignmentPage" />

        {/* Toolbar*/}
        <div className="bg-[#94A3B8] w-full py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm fixed">

          {/* ช่องค้นหา */}
          <div className="relative w-full sm:w-96 md:ml-10">
            <input
              type="text"
              placeholder="ค้นหาชื่องาน..."
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
            {/* ตัวกรองสถานะ*/}
            <div className="dropdown dropdown-bottom sm:dropdown-end w-full sm:w-48">
              <div
                tabIndex={0}
                role="button"
                className="btn w-full bg-white hover:bg-gray-50 border-none shadow-sm text-gray-700 font-normal justify-between px-4 h-11 min-h-[44px] rounded-lg focus:ring-2 focus:ring-[#D98A2C]"
              >
                {statusFilter === '' ? 'สถานะทั้งหมด' : statusFilter}
                <ChevronDown size={16} className="text-gray-400" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow-lg mt-1 border border-base-200"
              >
                <li><a onClick={() => handleSelectStatus('')} className={statusFilter === '' ? 'bg-gray-100 font-medium' : ''}>สถานะทั้งหมด</a></li>
                <li><a onClick={() => handleSelectStatus('Pending')} className={statusFilter === 'Pending' ? 'bg-gray-100 font-medium' : ''}>Pending (รอดำเนินการ)</a></li>
                <li><a onClick={() => handleSelectStatus('In Progress')} className={statusFilter === 'In Progress' ? 'bg-gray-100 font-medium' : ''}>In Progress (กำลังทำ)</a></li>
                <li><a onClick={() => handleSelectStatus('Completed')} className={statusFilter === 'Completed' ? 'bg-gray-100 font-medium' : ''}>Completed (เสร็จสิ้น)</a></li>
              </ul>
            </div>

            {/* ปุ่มเพิ่ม */}
            <button className="bg-[#D98A2C] hover:bg-[#c27a26] text-white px-10 py-2.5 rounded-xl font-medium shadow-sm transition-colors whitespace-nowrap"
              type="button" onClick={() => document.getElementById("createAssignment").showModal()}>
              มอบหมายงาน
            </button>
          </div>
        </div>

        {/* ส่วนของรายการงาน */}
        <div className="flex-1 w-full max-w-6xl mx-auto p-6 flex flex-col">

          {/* Header ของตาราง */}
          <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3 mb-6 mt-20">
            <div className="w-[15%] text-center font-bold text-gray-800 text-lg">รหัสงาน</div>
            <div className="w-[35%] text-left pl-4 font-bold text-gray-800 text-lg">หัวข้องาน</div>
            <div className="w-[20%] text-center font-bold text-gray-800 text-lg">มอบหมาย</div>
            <div
              className="w-[40%] flex justify-center items-center gap-2 font-bold text-gray-800 text-lg cursor-pointer hover:bg-gray-50 py-1 rounded-lg transition-colors select-none"
              onClick={toggleSortOrder}
              title={sortOrder === 'desc' ? "กำลังเรียง: ใหม่ไปเก่า (คลิกเพื่อสลับ)" : "กำลังเรียง: เก่าไปใหม่ (คลิกเพื่อสลับ)"}
            >
              กำหนดการ
              <ArrowUpDown size={16} className={`transition-transform ${sortOrder === 'asc' ? 'rotate-180 text-[#D98A2C]' : 'text-gray-400'}`} />
            </div>
            <div className="w-[10%]"></div>
          </div>

          {/* รายการแถว (List of Rows) */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center flex-1 py-20">
              <Loader2 className="animate-spin text-[#D98A2C] mb-4" size={48} />
              <p className="text-lg text-gray-500 font-medium">กำลังโหลดข้อมูลงาน...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1 animate-fade-up">
              {assignments.length > 0 ? (
                assignments.map((task) => (
                  <AssignmentRow key={task.assignmentId} assignment={task} />
                ))
              ) : (
                <div className="text-center py-10 text-gray-500 bg-white rounded-xl border border-gray-200 shadow-sm">
                  ไม่พบข้อมูลงานที่ค้นหา
                </div>
              )}
            </div>
          )}

          {/* UI ปุ่มเปลี่ยนหน้า (Pagination) แยกออกมาอยู่นอกพื้นที่ Scroll ทำให้ติดขอบล่างเสมอ */}
          {!isLoading && totalPages > 0 && (
            <div className="w-full bg-white border mt-5 border-gray-200 z-10 px-6 py-4 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] animate-fade-up">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
                <span className="text-sm text-gray-500">
                  รวมทั้งหมด <strong className="text-gray-800">{totalAssignments}</strong> รายการ
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

      {/* Modals  */}
      <dialog id="createAssignment" className="modal">
        <div className="modal-box">
          <CreateAssignmentModal />
        </div>
      </dialog>


    </>);
}