import { ImageIcon, MoreHorizontal } from "lucide-react";
import EditHouseModal from "./EditHouseModal";
import { deleteHouseApi } from "../../api/CreateApi";
import { toast } from "react-toastify";
import useDataStore from "../../stores/dataStore";
import Swal from "sweetalert2";
import { swal01 } from "../../utils/swalFire";
import GetHouseStatusBadge from "../GetStatusBadge";



const HouseCard = ({ house }) => {
    const modalId = `editHouse-${house.houseId}`;
    const getHouseData = useDataStore(state => state.getHouseData)

    // ฟังก์ชันจัดรูปแบบตัวเลขให้มีคอมม่า
    const formatPrice = (price) => {
        return new Intl.NumberFormat('th-TH').format(price);
    };

    const hdlDelete = async () => {
        try {
            // console.log(house.houseId)
            const resp = await deleteHouseApi(house.houseId)
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",

            });
            console.log(resp)
            toast.success(resp.data.message, { containerId: "housePage" })
            getHouseData()
        } catch (err) {
            const errMsg = err.response?.data?.error?.message || err.message
            toast.error(errMsg, { containerId: "housePage" })
        }
    }

    const hdlUpdate = () => {
        document.getElementById(modalId).showModal()
    }

    return (
        <>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3 transition-transform hover:-translate-y-1 hover:shadow-md">

                {/* Header: Code & More options */}
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-800">Code : {house.houseCode}</span>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role='button'>
                            <div className="avatar items-center cursor-pointer">
                                <div className="w-10 h-10 rounded-full flex! justify-center items-center hover:bg-gray-200">
                                    <MoreHorizontal size={20} />
                                </div>
                            </div>
                        </div>
                        <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow'>
                            <li onClick={hdlUpdate}><a>Edit</a></li>
                            <li onClick={() => swal01(hdlDelete,modalId)}><a>Delete</a></li>
                        </ul>
                    </div>



                    {/* <button className="text-gray-500 hover:text-gray-800">
                <MoreHorizontal size={20} />
            </button> */}
                </div>

                {/* Image Box (มี Badge ซ้อนอยู่ด้านใน) */}
                <div className="relative w-full aspect-4/3 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {house.images[0]?.imageUrl ? (
                        <img src={house.images[0]?.imageUrl} alt={house.houseCode} className="w-full h-full object-cover" />
                    ) : (
                        // รูป Placeholder กรณีไม่มีรูป
                        <ImageIcon size={48} className="text-gray-300 opacity-50" />
                    )}

                    {/* Badge: ประเภทบ้าน (ขวาบน) */}
                    {house.houseType && <span className="absolute top-2 right-2 bg-[#4A7A9A] text-white text-[10px] px-2.5 py-1 rounded-full font-medium shadow-sm">
                        {house.houseType}
                    </span>}

                    {/* Badge: สถานะ (ขวาล่าง) */}
                    <span className={`absolute bottom-2 right-2 text-white text-[10px] px-3 py-1 rounded-full font-medium shadow-sm ${GetHouseStatusBadge(house.status)} `}>
                        {house.status}
                    </span>
                </div>

                {/* Footer: รายละเอียด */}
                <div className="mt-1">
                    <h3 className="font-bold text-gray-800 text-lg mb-2">{house.projectName || "ไม่มีชื่อ"}</h3>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">ราคา</span>
                        <span className="font-medium text-gray-800">{formatPrice(house.price)}</span>
                    </div>
                </div>
            </div >

            <dialog id={modalId} className="modal">
                <div className="modal-box">

                    <EditHouseModal house={house} houseId={house.houseId} modalId={modalId} images={house.images} />
                </div>
            </dialog>

            <dialog id="loading-login" className="modal">
                <div className=" justify-center flex">
                    <span className="loading loading-spinner loading-xl size-50"></span>
                </div>
            </dialog>
        </>
    );
};

export default HouseCard