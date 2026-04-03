import { useState, useEffect} from 'react';
import { Search ,Loader2 } from 'lucide-react';
import CustomerRow from './CustomerRow';
import useDataStore from '../../stores/dataStore';
import { ToastContainer } from 'react-toastify';
import { getPaginateCustomerApi } from '../../api/paginateApi';


export default function CustomerBody() {
  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const isLoading = useDataStore(state => state.isLoading)
  const setIsLoading = useDataStore(state => state.setIsLoaing)
  // const customers = useDataStore(state => state.customers);
  // const getSurveyData = useDataStore(state => state.getSurveyData);

  // States for search
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [typeFilter, setTypeFilter] = useState('');
  const [houseFilter, setHouseFilter] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('');

  // States for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //debouce for search
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);  
    },500)
    return () => clearTimeout(timer);
  },[searchTerm])

  useEffect(()=>{
    const fetchCustomers = async () => {
      setIsLoading(true);
      try {
        const resp = await getPaginateCustomerApi({
          search: debouncedSearchTerm,
          type: typeFilter,
          house: houseFilter,
          budget: budgetFilter,
          page: currentPage, 
        })
        setCustomers(resp.data.customers || []);
        setTotalCustomers(resp.data.total || 0);
        console.log("Fetched customers:", resp.data);
      } catch (error) {
        console.error("Error fetching customers:", error);  
        setCustomers([]);
        setTotalCustomers(0);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCustomers();
  }, [debouncedSearchTerm, typeFilter, houseFilter, budgetFilter, currentPage]);

  //paginate logic
  const totalPages = Math.ceil(totalCustomers / itemsPerPage);
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
    <div className="w-full h-[calc(100vh-3.5rem)] bg-[#F8F9FA] flex flex-col relative">
      <ToastContainer containerId="CustomerBody" />
      {/* Toolbar */}
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

          {/* Type */}
          <select
            className="select select-bordered px-5 w-[140px] bg-white rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#D98A2C] min-h-0 h-11 shadow-sm text-gray-700 font-normal"
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="">type</option>
            <option value="Online">Online</option>
            <option value="Walkin">Walk-in</option>
          </select>

          {/* บ้านที่สนใจ */}
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

          {/* งบ */}
          {/* <select
            className="select select-bordered w-[160px] px-5 bg-white rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#D98A2C] min-h-0 h-11 shadow-sm text-gray-700 font-normal"
            value={budgetFilter}
            onChange={(e) => { setBudgetFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="">งบ</option>
            <option value="500,000-1,000,000">500,000-1,000,000</option>
            <option value="1,000,000-2,000,000">1,000,000-2,000,000</option>
            <option value="2,000,000-3,000,000">2,000,000-3,000,000</option>
            <option value="3,000,000+">3,000,000+</option>
          </select> */}

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

      {/* body*/}
      <div className="flex-1 w-full max-w-7xl mx-auto p-6 flex flex-col mt-20">

        {/* Header */}
        <div className="grid grid-cols-[1fr_1fr_2fr_2fr_2fr_2fr_auto] gap-4 items-center bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-4 mb-4 text-gray-800 font-bold text-base md:text-lg">
          <div className="text-center">ID</div>
          <div className="text-center">type</div>
          <div className="text-center">ชื่อ</div>
          <div className="text-center">บ้านที่สนใจ</div>
          <div className="text-center">งบที่มี</div>
          <div className="text-center">เบอร์ติดต่อ</div>
          <div className="w-22"></div>
        </div>

        {/* รายการลูกค้า // isLoading*/}
        {isLoading ? (
            <div className="flex flex-col items-center justify-center flex-1 py-20">
              <Loader2 className="animate-spin text-[#D98A2C] mb-4" size={48} />
              <p className="text-lg text-gray-500 font-medium">กำลังโหลดข้อมูลงาน...</p>
            </div>
          ) : (
        <div className="flex h-123 flex-col gap-2  animate-fade-up">
          {customers.length > 0 ? (
            customers.map((customer) => (
              <CustomerRow key={customer.customerId} customer={customer} />
            ))
          ) : (
            <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-200 shadow-sm text-lg">
              ไม่พบข้อมูลลูกค้า
            </div>
          )}
        </div>
        )}

        {/* Pagination  */}
       {!isLoading && totalPages > 0 && (
            <div className="w-full bg-white border mt-5 border-gray-200 z-10 px-6 py-4 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] animate-fade-up">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
                <span className="text-sm text-gray-500">
                  รวมทั้งหมด <strong className="text-gray-800">{totalCustomers}</strong> รายการ
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
  );
}