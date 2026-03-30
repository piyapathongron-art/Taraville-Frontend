import taravilleImg from '../assets/taravilleImg.jpg'
import OurProject from '../components/OurProject'
import ProjectLocation from '../components/ProjectLocation'
import FormCustomer from '../components/FormCustomer'
import BuildYourOwnDream from '../components/BuildYourOwnDream'
import Footer from '../components/Footer'
import useDataStore from '../stores/dataStore'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import GoogleStreetModal from '../components/GoogleStreetModal'


function LandingPage() {
    const getHouseData = useDataStore(state => state.getHouseData)
    const houses = useDataStore(state => state.houses)
    const isLoading = useDataStore(state => state.isLoading)
    useEffect(() => {
        getHouseData()
    }, [])

    if (isLoading) {
        return (
            <div className="w-full h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center bg-base-200/40">
                <Loader2 className="animate-spin text-[#f2b91c] mb-4" size={48} />
                <p className="text-lg text-base-content/60 font-medium">กำลังโหลดข้อมูล</p>
            </div>
        );
    }

    return (
        <>
            <div className='min-w-full  animate-fade-up'>

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
                <OurProject houses={houses}/>
                <ProjectLocation />
                <div id='customerform'></div>
                <FormCustomer />
                <BuildYourOwnDream />
                <Footer />
                
            </div>
        </>
    )
}

export default LandingPage