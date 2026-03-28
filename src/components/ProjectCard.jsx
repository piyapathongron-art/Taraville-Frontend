import taraville2 from "../assets/taraville2.jpg";
import { HomeIcon, StarIcon } from '../icon';

function ProjectCard() {
    return (
        <div className="card bg-base-100 w-78 shadow-sm relative rounded-xl">
            <div className="px-2 py-0.5 rounded-full bg-brand text-white absolute left-55 top-2 flex w-fit items-end">
                <HomeIcon className="w-5" />
                <p className='text-[12px] text-shadow-2xs'>
                    บ้านเดี่ยว
                </p>
            </div>
            <figure>
                <img
                    className='rounded-t-xl'
                    src={taraville2}
                    alt="taraville" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    Taraville
                    <div className="badge bg-brand text-white py-2">
                        <StarIcon className="w-5"/>
                        โครงการใหม่</div>
                </h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div className="card-actions justify-between">
                    <div className="text-xl self-end">เริ่มต้น 3.2 ล้าน</div>
                    <button className="btn  bg-brand text-white border-none w-25">ดูข้อมูล</button>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard