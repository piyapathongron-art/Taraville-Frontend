import ProjectLocation from '../components/ProjectLocation'
import FullFormCustomer from '../components/FullFormCustomer'
import { FacebookIcon, LocationIcon, MailIcon, MessageIcon, PhoneIcon } from '../icon'
import LineIcon from "../assets/line.png"
import FooterContact from '../components/FooterContact'

function Contact() {
  return (
    <div className='min-w-full'>

      <div className="w-full">
        <div className="flex flex-col my-15 px-12 items-center">
          <h1 className='text-4xl font-medium text-navy'>ติดต่อเรา</h1>
          <p className='font-light text-2xl'>เราพร้อมให้บริการและตอบคำถามของคุณ</p>
        </div>

        <div className="flex  gap-10 mx-auto w-fit pb-10">

          <div className="w-130  rounded-2xl ">

            <FullFormCustomer />

          </div>

          <div className="w-120 h-fit pb-8 rounded-2xl bg-brand shadow-2xs">
            <h1 className='text-3xl font-medium text-white text-shadow-2xs p-8'>ข้อมูลติตต่อ</h1>
            <div className="flex flex-col mx-10 text-white ">

              {/* ที่อยู่ */}
              <div className="  flex items-center gap-2">
                <LocationIcon className="w-10" />
                <h1 className='text-2xl'>ที่อยู่</h1>
              </div>
              <h1 className='text-xl mx-12 font-light'>เพชรบูรณ์, ประเทศไทย</h1>

              {/* เบอร์โทร */}
              <div className="  flex items-center gap-2 mt-8">
                <PhoneIcon className="w-10" />
                <h1 className='text-2xl'>เบอร์โทร</h1>
              </div>
              <h1 className='text-xl mx-12 font-light'>099-999-9999</h1>

              {/* อีเมล */}
              <div className="  flex items-center gap-2 mt-8">
                <MailIcon className="w-10" />
                <h1 className='text-2xl'>อีเมล</h1>
              </div>
              <h1 className='text-xl mx-12 font-light'>taraville@mail.co.th</h1>

              {/* ไลน์ */}
              <div className="  flex items-center gap-2 mt-8">
                <MessageIcon className="w-10" />
                <h1 className='text-2xl'>ไลน์</h1>
              </div>
              <h1 className='text-xl mx-12 font-light'>@taraville</h1>

              {/* Facebook Page */}
              <div className="  flex items-center gap-2 mt-8">
                <FacebookIcon className="w-10" />
                <h1 className='text-2xl'>Facebook Page</h1>
              </div>
              <h1 className='text-xl mx-12 font-light'>@taraville</h1>

            </div>
          </div>

        </div>

      <ProjectLocation/>
      </div>

    </div>
  )
}

export default Contact