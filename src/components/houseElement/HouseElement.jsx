import { useState, useEffect } from 'react';
import { Search, ChevronDown, Loader2} from 'lucide-react';
import HouseCard from './HouseCard';
import CreateHouseModal from './CreateHouseModal';
import { getPaginateApi } from '../../api/paginateApi';



function HouseElement() {
    const [houses, setHouses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // State สำหรับตัวกรองต่างๆ
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState(''); 
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState(''); // เพิ่ม State สำหรับรูปแบบบ้าน
    
    // State สำหรับ Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [totalHouses, setTotalHouses] = useState(0); 
    const limit = 8; 

    // ระบบ Debounce ป้องกันการยิง API ถี่เกินไป
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1); 
        }, 500); 
        return () => clearTimeout(timer);
    }, [searchTerm]);

    
  // ฟังก์ชันดึงข้อมูลจาก Backend
    useEffect(() => {
        const fetchHouses = async () => {
            setIsLoading(true);
            try {

                const resp = await getPaginateApi({
                    search: debouncedSearch,
                    type: typeFilter,
                    status: statusFilter,
                    page: currentPage,
                    limit: limit 
                });
                
                setHouses(resp.data.houses.result); 
                setTotalItems(resp.data.houses.total); 
                setTotalHouses(resp.data.totalHouse);
                // console.log("Fetched houses:", resp);
            } catch (error) {
                console.error("Error fetching houses:", error);
                
                setHouses([]);
                setTotalItems(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHouses();
    }, [debouncedSearch, statusFilter, typeFilter, currentPage]);

    // ฟังก์ชันจัดการตอนเลือก Dropdown 
    const handleSelectFilter = (setter, value) => {
        setter(value);
        setCurrentPage(1); // เปลี่ยนตัวกรอง ต้องกลับไปหน้า 1
        if (document.activeElement) {
            document.activeElement.blur();
        }
    };

    // คำนวณตัวเลขสำหรับปุ่ม Pagination
    const totalPages = Math.ceil(totalHouses / limit);
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
        <>
        <div className="w-full h-screen bg-gray-50 flex flex-col relative overflow-hidden">

            {/* Toolbar สีเทาด้านบน */}
            <div className="bg-[#94A3B8] w-full py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm fixed z-10">

                {/* ช่องค้นหา */}
                <div className="relative w-full sm:w-80 sm:ml-10">
                    <input
                        type="text"
                        placeholder="โค้ดบ้าน / ชื่อบ้าน "
                        className="w-full pl-6 pr-10 py-2.5 bg-white rounded-full border-none focus:ring-2 focus:ring-[#D98A2C] outline-none shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>

                <div className="flex flex-wrap w-full sm:w-auto gap-3 items-center">

                    {/* Dropdown 1: ตัวกรองรูปแบบบ้าน */}
                    <div className="dropdown dropdown-bottom sm:dropdown-end flex-1 sm:flex-none sm:w-36">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn w-full bg-white hover:bg-gray-50 border-none shadow-sm text-gray-700 font-normal justify-between px-3 h-11 min-h-[44px] rounded-lg focus:ring-2 focus:ring-[#D98A2C]"
                        >
                            <span className="truncate">{typeFilter === '' ? 'รูปแบบทั้งหมด' : typeFilter}</span>
                            <ChevronDown size={16} className="text-gray-400 shrink-0" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow-lg mt-1 border border-base-200"
                        >
                            <li><a onClick={() => handleSelectFilter(setTypeFilter, '')} className={typeFilter === '' ? 'bg-gray-100 font-medium' : ''}>รูปแบบทั้งหมด</a></li>
                            <li><a onClick={() => handleSelectFilter(setTypeFilter, 'บ้านเดี่ยว')} className={typeFilter === 'บ้านเดี่ยว' ? 'bg-gray-100 font-medium' : ''}>บ้านเดี่ยว</a></li>
                            <li><a onClick={() => handleSelectFilter(setTypeFilter, 'บ้านแฝด')} className={typeFilter === 'บ้านแฝด' ? 'bg-gray-100 font-medium' : ''}>บ้านแฝด</a></li>
                            <li><a onClick={() => handleSelectFilter(setTypeFilter, 'ทาวน์โฮม')} className={typeFilter === 'ทาวน์โฮม' ? 'bg-gray-100 font-medium' : ''}>ทาวน์โฮม</a></li>
                        </ul>
                    </div>

                    {/* Dropdown 2: ตัวกรองสถานะ */}
                    <div className="dropdown dropdown-bottom sm:dropdown-end flex-1 sm:flex-none sm:w-36">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn w-full bg-white hover:bg-gray-50 border-none shadow-sm text-gray-700 font-normal justify-between px-3 h-11 min-h-[44px] rounded-lg focus:ring-2 focus:ring-[#D98A2C]"
                        >
                            <span className="truncate">{statusFilter === '' ? 'สถานะทั้งหมด' : statusFilter}</span>
                            <ChevronDown size={16} className="text-gray-400 shrink-0" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow-lg mt-1 border border-base-200"
                        >
                            <li><a onClick={() => handleSelectFilter(setStatusFilter, '')} className={statusFilter === '' ? 'bg-gray-100 font-medium' : ''}>ทั้งหมด</a></li>
                            <li><a onClick={() => handleSelectFilter(setStatusFilter, 'Available')} className={statusFilter === 'Available' ? 'bg-gray-100 font-medium' : ''}>ว่าง</a></li>
                            <li><a onClick={() => handleSelectFilter(setStatusFilter, 'Book')} className={statusFilter === 'Book' ? 'bg-gray-100 font-medium' : ''}>จองแล้ว</a></li>
                            <li><a onClick={() => handleSelectFilter(setStatusFilter, 'Sold')} className={statusFilter === 'Sold' ? 'bg-gray-100 font-medium' : ''}>ขายแล้ว</a></li>
                        </ul>
                    </div>

                    {/* ปุ่มเพิ่ม */}
                    <button className="bg-[#D98A2C] hover:bg-[#c27a26] text-white px-8 py-2.5 rounded-xl font-medium shadow-sm transition-colors whitespace-nowrap h-11 w-full sm:w-auto"
                    type="button" onClick={()=> document.getElementById("createHouse").showModal()}>
                        เพิ่มข้อมูล
                    </button>
                </div>
            </div>

            {/* พื้นที่หลักสำหรับแสดง Card บ้าน */}
            <div className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8 mt-32 sm:mt-20 overflow-y-auto flex flex-col">
                
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center flex-1">
                        <Loader2 className="animate-spin text-[#D98A2C] mb-4" size={48} />
                        <p className="text-gray-500 font-medium">กำลังโหลดข้อมูล...</p>
                    </div>
                ) : houses && houses.length > 0 ? (
                    <div className="flex-1">
                        <div className="flex flex-wrap -mx-3 animate-fade-up">
                            {houses.map((house, index) => (
                                <div key={house.houseId || index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-6">
                                    <HouseCard house={house} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="w-full text-center py-20 text-gray-500 bg-white rounded-xl border border-gray-200 shadow-sm mt-4 flex-1">
                        ไม่พบข้อมูลบ้านที่ค้นหา
                    </div>
                )}

                {/* UI ปุ่มเปลี่ยนหน้า (Pagination) */}
                {!isLoading && totalPages > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-gray-200 w-full">
                        <span className="text-sm text-gray-500">
                            รวมทั้งหมด <strong className="text-gray-800">{totalHouses}</strong> รายการ
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
                )}

            </div>
        </div>

        <dialog id="createHouse" className="modal">
            <div className="modal-box">
                <CreateHouseModal />
            </div>
        </dialog>

        </>
    );
}

export default HouseElement;