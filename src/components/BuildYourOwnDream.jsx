import React from 'react'
import { HomeIcon2, InboxIcon, SerchIcon } from '../icon'
import { Link } from 'react-router'

function BuildYourOwnDream() {
    return (
        <div className='w-full bg-brand py-10'>
            <p className='text-3xl font-medium text-center mb-10 text-white text-shadow-xs'>พร้อมสร้างบ้านในฝันของคุณหรือยัง?</p>
            <div className="flex justify-evenly items-center gap-10">
                <div className="flex flex-col w-220 h-90 rounded-3xl items-center ">
                    <InboxIcon className="w-50 h-50" />
                    <p className='text-4xl text-white'>ทำแบบสอบถาม</p>
                    <p className='text-md font-light text-white'>บริการให้คำปรึกษาและออกแบบบ้านตามความต้องการ</p>
                    <a href="#customerform">
                        <button className='btn  text-brand font-medium mt-5 ' >ทำแบบสอบถาม</button>
                        </a>
                </div>
                <div className="flex flex-col w-220 h-90 rounded-3xl items-center ">
                    <HomeIcon2 className="w-50" />
                    <p className='text-4xl text-white'>สนใจโครงการ</p>
                    <p className='text-md font-light text-white'>เลือกดูบ้านสำเร็จรูปในโครงการคุณภาพ</p>
                    <Link to="/projects">
                    <button className='btn  text-brand font-medium mt-5 ' >ดูโครงการทั้งหมด</button>
                    </Link>

                </div>
                <div className="flex flex-col w-220 h-90 rounded-3xl items-center ">
                    <SerchIcon className="w-50" />
                    <p className='text-4xl text-white'>ข้อมูลติดต่อ</p>
                    <p className='text-md font-light text-white'>ติดต่อสอบถามข้อมูลเพิ่มเติมกับทีมงาน</p>
                    <Link to="/contact">
                    <button className='btn  text-brand font-medium mt-5 '>ติดต่อเรา</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BuildYourOwnDream