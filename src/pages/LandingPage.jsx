import React from 'react'
import { HomeIcon } from '../icon'
import taravilleImg from '../assets/taravilleImg.jpg'
import OurProject from '../components/OurProject'
import ProjectLocation from '../components/ProjectLocation'
import RealEstateMap from '../components/ProjectLocationTest'
import FormCustomer from '../components/FormCustomer'
import BuildYourOwnDream from '../components/BuildYourOwnDream'
import Footer from '../components/Footer'


function LandingPage() {
    return (
        <>
            <div className='min-w-full'>

                <div className="w-full h-100">

                    <div
                        className="flex flex-col items-center h-full justify-center bg-cover bg-position-[50%_80%] bg-no-repeat relative"
                        style={{ backgroundImage: `url(${taravilleImg})` }} >


                        <div className="absolute inset-0 bg-black/70 z-0"></div>


                        <div className="flex flex-col items-center z-2 text-white gap-2">
                            {/* <HomeIcon className="w-40 text-white " /> */}
                            <p className='font-primary text-6xl text-white font-medium text-shadow-xl'>
                                Taraville
                            </p>
                            <p className='font-primary text-shadow-md font-bold text-2xl'>ธาราวิล <span className='font-normal'>และ</span> บ้านคุณภาพ เพชรบูรณ์ </p>
                            <p className='font-primary text-lg max-[1200px]:text-[16px]'>บริการครบวงจรตั้งแต่บ้านจัดสรร อาคารพาณิชย์ รับสร้างบ้านบนที่ดิน และรีโนเวทเปลี่ยนบ้านเก่าให้เป็นบ้านใหม่ ด้วยทีมงานที่เข้าใจคนเพชรบูรณ์อย่างแท้จริง</p>
                            <h2 className='font-primary text-2xl font-bold'>สร้างความสุขที่ยั่งยืน บนมาตรฐานงานก่อสร้างระดับมืออาชีพ</h2>
                        </div>
                    </div>

                </div>
                <OurProject/>
                <ProjectLocation/>
                <div id='customerform'></div>
                <FormCustomer />
                <BuildYourOwnDream/>
                <Footer/>
            </div>
        </>
    )
}

export default LandingPage