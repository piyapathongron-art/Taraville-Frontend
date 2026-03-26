import React from 'react'
import OurSupervisor from '../components/OurSupervisor'
import Footer from '../components/Footer'

function AboutPage() {
    return (
        <div className='min-w-full'>

            <div className="w-full">
                <div className="flex flex-col my-15 px-12 items-center">
                    <h1 className='text-4xl font-medium text-navy'>เกี่ยวกับเรา</h1>
                    <p className='font-light text-2xl'>ผู้นำด้านอสังหาริมทรัพย์ในจังหวัดเพชรบูรณ์</p>
                </div>

                <div className="border border-base-300 w-[70%] flex flex-col mx-auto p-10 gap-5 rounded-2xl mt-10">
                    <h1 className='text-4xl font-medium text-navy'>ธราวิล และ บ้านคุณภาพ เพชรบูรณ์</h1>
                    <p className='font-light text-md'>บริการครบวงจรตั้งแต่เตรียมดินเตรียมจรรวรพฤิกกษ์ จัดสรรง่ายบนที่เกษตร และรับเงินทำฝั่งที่ได้ได้ในไฟล์ ที่วางบ้านใหม่และสามารถบ้านที่ใกันด้วนสเพชรบูรณ์ต่อยอาชีพ
                        เราคือผู้เชี่ยวชาญด้านอสังหาริมทรัพย์ที่มีประสบการณ์ยาวนานในการพัฒนาโครงการที่อยู่อาศัยคุณภาพสูง ด้วยความมุ่งมั่นที่จะสร้างสรรค์บ้านในฝันให้กับทุกครอบครัว</p>
                </div>

                <div className="border border-base-300 w-[70%] flex flex-col mx-auto p-10 gap-5 rounded-2xl mt-10">
                    <h1 className='text-4xl font-medium text-navy'>วิสัยทัศน์</h1>
                    <p className='font-light text-md'>เราส่งมอบความมาตรฐาน ฟังก์ชั่นทันสมัย ตอบโจทย์ทุกไลฟ์สไตล์ภายในเวลาที่กำหนด</p>
                </div>
            </div>

            <OurSupervisor />
            <Footer/>
        </div>
    )
}

export default AboutPage