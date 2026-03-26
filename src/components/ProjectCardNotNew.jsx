import React from 'react'
import taraville2 from "../assets/taraville2.jpg";

function ProjectCardNotNew() {
  return (
    <div className="card bg-base-100 w-78 shadow-sm">
  <figure>
    <img
      src={taraville2}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      Taraville
      
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

export default ProjectCardNotNew