import React from 'react'
import taraville2 from "../assets/taraville2.jpg"
import { Link } from 'react-router'
import { ImageIcon } from 'lucide-react'

function IntroCard({house}) {
    console.log(house)
    const {projectName,details,houseName,images} = house
    return (
        <div className="card bg-navy image-test  w-100 h-55 shadow-xl">
            <figure >
                {house.images[0]?.imageUrl ? (
                        <img src={house.images[0]?.imageUrl} alt={house.houseCode} className="w-full h-full object-cover" />
                    ) : (
                        // รูป Placeholder กรณีไม่มีรูป
                        <ImageIcon size={48} className="text-gray-300 opacity-50 " />
                    )}

            </figure>
            <div className="card-body relative ">
                <div className=" flex flex-col justify-start  ">
                    <h2 className="card-title">{projectName} <span className='font-light'>{houseName}</span> </h2>
                    <p className=' text-[12px] font-light '>{details}</p>
                </div>
                <div className="card-actions justify-end mt-10">
                    <Link to="/projects">
                    <button className="btn bg-brand text-white border-none">ดูข้อมูล</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default IntroCard