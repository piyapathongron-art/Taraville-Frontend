import { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown,  Image as ImageIcon } from 'lucide-react';

import HouseCard from './HouseCard';
import useDataStore from '../stores/dataStore';
import CreateHouseModal from './CreateHouseModal';

function HouseElement() {
    // สมมติการดึงข้อมูลจาก Zustand
    const houses = useDataStore(state => state.houses) || [];
    const getHouseData = useDataStore(state=>state.getHouseData)

    useEffect(()=>{
        getHouseData()
    },[])
   

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // กรองข้อมูล
    const filteredHouses = useMemo(() => {
        return houses.filter(h => {
            // แก้ไขปัญหา Cannot read properties of null
            // โดยการใส่ fallback เป็น string ว่าง (|| '') ก่อนใช้งาน
            const safeHouseCode = h.houseCode || '';
            const safeProjectName = h.projectName || '';

            const matchSearch = safeHouseCode.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                safeProjectName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchStatus = statusFilter === '' || h.status === statusFilter;
            
            return matchSearch && matchStatus;
        });
    }, [searchTerm, statusFilter, houses]);

    // ฟังก์ชันจัดการตอนเลือก Dropdown สถานะ
    const handleSelectStatus = (status) => {
        setStatusFilter(status);
        if (document.activeElement) {
            document.activeElement.blur();
        }
    };

    return (
        <>
        <div className=" w-full h-screen bg-gray-50 flex flex-col relative">

            {/* Toolbar สีเทาด้านบน */}
            <div className="bg-[#94A3B8] w-full py-4 px-6  flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm fixed z-2">

                {/* ช่องค้นหา */}
                <div className="relative w-100 ml-10">
                    <input
                        type="text"
                        placeholder="โค้ดบ้าน / ชื่อบ้าน"
                        className="w-full pl-6 pr-10 py-2.5 bg-white rounded-full border-none focus:ring-2 focus:ring-[#D98A2C] outline-none shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>

                <div className="flex w-full sm:w-auto gap-4">

                    {/* ตัวกรองสถานะ แบบ DaisyUI Dropdown */}
                    <div className="dropdown dropdown-bottom sm:dropdown-end w-full sm:w-48">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn w-full bg-white hover:bg-gray-50 border-none shadow-sm text-gray-700 font-normal justify-between px-4 h-11 min-h-[44px] rounded-lg focus:ring-2 focus:ring-[#D98A2C]"
                        >
                            <span className="truncate">{statusFilter === '' ? 'สถานะ' : statusFilter}</span>
                            <ChevronDown size={16} className="text-gray-400 shrink-0" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow-lg mt-1 border border-base-200"
                        >
                            <li>
                                <a onClick={() => handleSelectStatus('')} className={statusFilter === '' ? 'bg-gray-100 font-medium' : ''}>
                                    ทั้งหมด
                                </a>
                            </li>
                            <li>
                                <a onClick={() => handleSelectStatus('Available')} className={statusFilter === 'Available' ? 'bg-gray-100 font-medium' : ''}>
                                    ว่าง
                                </a>
                            </li>
                            <li>
                                <a onClick={() => handleSelectStatus('Book')} className={statusFilter === 'Book' ? 'bg-gray-100 font-medium' : ''}>
                                    จองแล้ว
                                </a>
                            </li>
                            <li>
                                <a onClick={() => handleSelectStatus('Sold')} className={statusFilter === 'Sold' ? 'bg-gray-100 font-medium' : ''}>
                                    ขายแล้ว
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* ปุ่มเพิ่ม */}
                    <button className="bg-[#D98A2C] hover:bg-[#c27a26] text-white px-10 py-2.5 rounded-xl font-medium shadow-sm transition-colors whitespace-nowrap h-11"
                    type="button" onClick={()=> document.getElementById("createHouse").showModal()}>
                        เพิ่ม
                    </button>
                </div>
            </div>

            {/* house card*/}
            <div className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8 mt-15">

                {filteredHouses.length > 0 ? (
                    <div className="flex flex-wrap -mx-3">
                        {filteredHouses.map((house, index) => (
                            <div key={house.id || index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-6">
                                <HouseCard house={house} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full text-center py-20 text-gray-500 bg-white rounded-xl border border-gray-200 shadow-sm mt-4">
                        ไม่พบข้อมูลบ้านที่ค้นหา
                    </div>
                )}

            </div>
          

        </div>
        <dialog id="createHouse" className="modal">
                <div className="modal-box">

                    <CreateHouseModal />
                </div>
            </dialog>

            <dialog id="loading-login" className="modal">
                <div className=" justify-center flex">
                    <span className="loading loading-spinner loading-xl size-50"></span>
                </div>
            </dialog>
    </>);
}

export default HouseElement