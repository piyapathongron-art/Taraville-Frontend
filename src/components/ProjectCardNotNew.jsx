import { ImageIcon } from "lucide-react";
import taraville2 from "../assets/taraville2.jpg";
import { getHouseStatusBadge } from "./GetStatusBadge";

function ProjectCardNotNew({ house }) {
  console.log(house)
  return (
    <div className="card bg-base-100 w-78 shadow-sm">
      <figure className="h-60">
        {house.images[0]?.imageUrl ? (
          <img src={house.images[0]?.imageUrl} alt={house.houseCode} className="w-full h-full object-cover" />
        ) : (
          // รูป Placeholder กรณีไม่มีรูป
          <ImageIcon size={48} className="text-gray-500 opacity-50" />
        )}
      </figure>
      {/* Badge: ประเภทบ้าน (ขวาบน) */}
      {house.houseType && <span className="absolute top-2 right-2 bg-[#4A7A9A] text-white text-[10px] px-2.5 py-1 rounded-full font-medium shadow-sm">
        {house.houseType}
      </span>}

      {/* Badge: สถานะ (ขวาล่าง) */}
      <div className="card-body w-[312px] h-[236px]">
        <h2 className="card-title">
          <span className="font-light">{house.houseName} </span>
          {house.projectName}
        </h2>
      <span className={`absolute bottom-46 right-2 text-white text-[16px] px-3 py-1 rounded-full font-medium shadow-sm ${getHouseStatusBadge(house.status)} `}>
        {house.status}
      </span>
        <p className="overflow-scroll">{house.details}</p>
        <div className="card-actions justify-between">
          <div className="text-xl self-end">เริ่มต้น {house.price.slice(0,2)} ล้าน</div>
          <button className="btn  bg-brand text-white border-none w-25">ดูข้อมูล</button>
        </div>
      </div>
    </div>
  )
}

export default ProjectCardNotNew