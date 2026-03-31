import { SerchIcon2 } from '../icon'
import Footer from '../components/Footer'
import ProjectCardNotNew from '../components/ProjectCardNotNew'
import useDataStore from '../stores/dataStore'
import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, Loader2 } from 'lucide-react'

function ProjectPage() {
    const getHouseData = useDataStore(state=>state.getHouseData)
    const houses = useDataStore(state=>state.houses)
    const isLoading = useDataStore(state=>state.isLoading)

    useEffect(()=>{
        getHouseData()
    },[])

    const [searchTerm,setSearchTerm] = useState("");
    const [statusFilter,setStatusFilter] = useState("Available");
    const [typeFilter,setTypeFilter] = useState("")

    
    const filterHouseData = useMemo(() => {
        if (!houses) return [];

        return houses.filter(house => {
            const houseTitle = house.houseName || "";
            const matchTitle = houseTitle.toLowerCase().includes(searchTerm.toLowerCase());

            const matchStatus = statusFilter === "" || house.status === statusFilter;
            const matchType = typeFilter === "" || house.houseType === typeFilter;
            
            return matchTitle && matchStatus && matchType;
        });
    }, [houses, searchTerm, statusFilter, typeFilter]);

    const handleSelect = (func,status) => {
        func(status)
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }

  //loading
     if (isLoading) {
        return (
            <div className="w-full h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center bg-base-200/40">
                <Loader2 className="animate-spin text-[#f2b91c] mb-4" size={48} />
                <p className="text-lg text-base-content/60 font-medium">กำลังโหลดข้อมูลบ้าน...</p>
            </div>
        );
    }


    return (
        <div className='min-w-full min-h-[calc(100vh-3.5rem)] flex flex-col'>

            <div className="w-full ">
                <div className="flex flex-col py-8 px-12">
                    <h1 className='text-4xl font-medium'>โครงการทั้งหมด</h1>
                    <p className='font-light text-2xl'>เลือกโครงการบ้านที่เหมาะกับคุณ</p>
                </div>
            </div>
            <div className="w-full flex px-10 h-15 content-center items-center bg-gray-500 gap-10 ">
                <input type="text" 
                className="input rounded-full w-90" 
                placeholder="ค้นหาโครงการ" 
                value={searchTerm}
                onChange={(e)=>{
                    setSearchTerm(e.target.value)
                }}/>
                <SerchIcon2 className="w-7 absolute left-90" />

          <div className="dropdown dropdown-bottom sm:dropdown-end w-full sm:w-48">
            <div
              tabIndex={0}
              role="button"
              className="btn w-full bg-white hover:bg-gray-50 border-none shadow-sm text-gray-700 font-normal justify-between px-4 h-11 min-h-11 rounded-lg focus:ring-2 focus:ring-[#D98A2C]"
            >
              {statusFilter === '' ? 'สถานะทั้งหมด' : statusFilter}
              <ChevronDown size={16} className="text-gray-400" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-full p-2 shadow-lg mt-1 border border-base-200"
            >
              <li><a onClick={() => handleSelect(setStatusFilter,'')} className={statusFilter === '' ? 'bg-gray-100 font-medium' : ''}>สถานะทั้งหมด</a></li>
              <li><a onClick={() => handleSelect(setStatusFilter,'Book')} className={statusFilter === 'Book' ? 'bg-gray-100 font-medium' : ''}>Book (รอดำเนินการ)</a></li>
              <li><a onClick={() => handleSelect(setStatusFilter,'Sold')} className={statusFilter === 'Sold' ? 'bg-gray-100 font-medium' : ''}>Sold (กำลังทำ)</a></li>
              <li><a onClick={() => handleSelect(setStatusFilter,'Available')} className={statusFilter === 'Available' ? 'bg-gray-100 font-medium' : ''}>Available (เสร็จสิ้น)</a></li>
            </ul>
          </div>

          <div className="dropdown dropdown-bottom sm:dropdown-end w-full sm:w-48">
            <div
              tabIndex={0}
              role="button"
              className="btn w-full bg-white hover:bg-gray-50 border-none shadow-sm text-gray-700 font-normal justify-between px-4 h-11 min-h-11 rounded-lg focus:ring-2 focus:ring-[#D98A2C]"
            >
              {typeFilter === '' ? 'รูปแบบทั้งหมด' : typeFilter}
              <ChevronDown size={16} className="text-gray-400" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-full p-2 shadow-lg mt-1 border border-base-200"
            >
              <li><a onClick={() => handleSelect(setTypeFilter,'')} className={typeFilter === '' ? 'bg-gray-100 font-medium' : ''}>สถานะทั้งหมด</a></li>
              <li><a onClick={() => handleSelect(setTypeFilter,'บ้านเดี่ยว')} className={typeFilter === 'บ้านเดี่ยว' ? 'bg-gray-100 font-medium' : ''}>บ้านเดี่ยว (รอดำเนินการ)</a></li>
              <li><a onClick={() => handleSelect(setTypeFilter,'ทาวน์โฮม')} className={typeFilter === 'ทาวน์โฮม' ? 'bg-gray-100 font-medium' : ''}>ทาวน์โฮม (กำลังทำ)</a></li>
              <li><a onClick={() => handleSelect(setTypeFilter,'บ้านแฝด')} className={typeFilter === 'บ้านแฝด' ? 'bg-gray-100 font-medium' : ''}>บ้านแฝด (เสร็จสิ้น)</a></li>
            </ul>
          </div>
          </div>

           <div className="flex-1 w-full p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 animate-fade-up">
                {filterHouseData.length > 0 ? (
                    filterHouseData.map(house => (
                        <ProjectCardNotNew key={house.houseCode || house.houseId} house={house}/>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 py-10">
                        ไม่พบโครงการที่ค้นหา
                    </div>
                )}
                
                
            </div>

        <Footer/>
        </div>
    )
}

export default ProjectPage