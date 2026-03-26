import React from 'react'
import { SerchIcon, SerchIcon2 } from '../icon'
import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'
import ProjectCardNotNew from '../components/ProjectCardNotNew'

function ProjectPage() {
    return (
        <div className='min-w-full'>

            <div className="w-full">
                <div className="flex flex-col py-8 px-12">
                    <h1 className='text-4xl font-medium'>โครงการทั้งหมด</h1>
                    <p className='font-light text-2xl'>เลือกโครงการบ้านที่เหมาะกับคุณ</p>
                </div>
            </div>
            <div className="w-full flex px-10 h-15 content-center items-center bg-gray-500 gap-10">
                <input type="text" className="input rounded-full w-90" placeholder="ค้นหาโครงการ" />
                <SerchIcon2 className="w-7 absolute left-90" />

                <select defaultValue="ประเภท" className="select w-45 rounded-full">
                    <option disabled={true}>ประเภท</option>
                    <option>บ้านเดี่ยว</option>
                    <option>ตึกแถว</option>
                    <option>Velvet</option>
                </select>
            </div>

            <div className=" w-full p-10 flex gap-10 flex-wrap justify-evenly">
                <ProjectCard/>
                <ProjectCardNotNew/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
            </div>
        <Footer/>
        </div>
    )
}

export default ProjectPage