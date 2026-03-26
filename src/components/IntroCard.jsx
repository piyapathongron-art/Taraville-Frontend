import React from 'react'
import taraville2 from "../assets/taraville2.jpg"

function IntroCard() {
    return (
        <div className="card bg-base-100 image-test  w-100 h-55 shadow-xl">
            <figure >
                <img className='w-100'
                    src={taraville2}
                    alt="taraville" />
            </figure>
            <div className="card-body relative ">
                <div className=" flex flex-col justify-start mt-2 ">
                    <h2 className="card-title">Taraville Phetchabura</h2>
                    <p className=' text-[12px] font-light '>จำนวนบ้าน. 68 หลัง ; แบบบ้านทั้งหมด. 3 แบบ ;
                        เนื้อที่บ้าน. ตั้งแต่ 53 ถึง 114 ตร.ว. ; พื้นที่ใช้สอย. ตั้งแต่ 140 ถึง 295 ตร.ม.</p>
                </div>
                <div className="card-actions justify-end mt-13">
                    <button className="btn  bg-brand text-white border-none">ดูข้อมูล</button>
                </div>
            </div>
        </div>
    )
}

export default IntroCard