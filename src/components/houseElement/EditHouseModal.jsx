import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { UploadCloud, X, Home } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateHouseSchema } from '../../validations/schema';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { editHouseApi, uploadHouseImageApi } from '../../api/CreateApi';
import useDataStore from '../../stores/dataStore';
import uploadCloudinary from '../../utils/uploadcloud';


function EditHouseModal(props) {
    const { houseId, house, modalId } = props;
    const getHouseData = useDataStore(state=>state.getHouseData)
    
// console.log(house)
    const { register, reset, formState, handleSubmit } = useForm({
        resolver: zodResolver(updateHouseSchema),
        mode: "onSubmit",
    });
    
    const { errors, isSubmitting } = formState;

    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        if (house) {
            reset({
                houseCode: house.houseCode || "",
                houseName: house.houseName || "",
                projectName: house.projectName || "",
                houseType: house.houseType || "",
                price: house.price || "",
                status: house.status || "",
                ownerPhone: house.ownerPhone || "",
                details: house.details || ""
            });
            
            const dbImages = house.images || []; 
            const existingImages = dbImages.map(img => ({
                file: null,
                url: img.imageUrl, 
                isNew: false 
            }));
            setImageList(existingImages);
        }
    }, [house, reset]);


    
    const Xbtn = () => {
        document.getElementById(modalId).close();
        reset();
    };

    //checkว่ามีการaddไฟล์มามั้ย
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newImages = files.map(file => ({
                file: file,
                url: URL.createObjectURL(file), 
                isNew: true 
            }));
            setImageList(prev => [...prev, ...newImages]);
            console.log(newImages)
        }
    };


    const removeImage = (indexToRemove) => {
        setImageList(prev => prev.filter((_, index) => index !== indexToRemove));
    };


    const onSubmit = async (data) => {
        try {
            // เอารูปภาพใหม่ อัปโหลดขึ้น Cloudinary
            const newFilesToUpload = imageList.filter(img => img.isNew).map(img => img.file);
            const uploadPromises = newFilesToUpload.map(file => uploadCloudinary(file));
            //เพราะมีหลายรูปรอ promise all ให้หมดก่อน
            const uploadedUrls = await Promise.all(uploadPromises);

            // หารูปเก่า
            const existingUrls = imageList.filter(img => !img.isNew).map(img => img.url);

            // รวมใหม่เป็นก้อน
            const finalImageUrls = [...existingUrls, ...uploadedUrls];

            // API             
            // edithouseinfo
            const respH = await editHouseApi(data, houseId);
            console.log(respH)
            
            // ImageAPI ส่งเป็น Array
            const respHI = await uploadHouseImageApi({ images: finalImageUrls }, houseId);
            // console.log(respHI)
            toast.success("อัปเดตข้อมูลและรูปภาพสำเร็จ!",{containerId:"housePage"});

        
            getHouseData();

            document.getElementById(modalId).close();
          

        } catch (error) {
            console.dir(error);
            const errMsg = error.response?.data?.error || error.message || "เกิดข้อผิดพลาด";
            toast.error(errMsg || "เกิดข้อผิดพลาด", { containerId: modalId });
        }
    };

    return (
        <>
            <ToastContainer containerId={modalId}/>
            <form method="dialog">
                <button type='button' onClick={Xbtn} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <div className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2 mt-2">
                <Home className="text-[#D98A2C]" />
                แก้ไขข้อมูลบ้าน
            </div>
            <div className="divider opacity-60 my-2"></div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset disabled={isSubmitting} className='flex flex-col gap-4 p-2'>

                    {/*  โค้ดบ้าน / ชื่อโครงการ  */}
                    <div className="w-full flex gap-4">
                        <div className="flex flex-col w-1/2">
                            <label className='text-sm font-medium text-gray-700 mb-1 ml-1'>รหัสบ้าน (Code)</label>
                            <input type="text" placeholder='เช่น A01-04' className='input input-bordered w-full' {...register('houseCode')} />
                            {errors.houseCode && <p className="text-xs text-error mt-1">{errors.houseCode.message}</p>}
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className='text-sm font-medium text-gray-700 mb-1 ml-1'>ชื่อโครงการ</label>
                            <input type="text" placeholder='ชื่อโครงการ' className='input input-bordered w-full' {...register('projectName')} />
                        </div>
                    </div>

                    {/*  ชื่อบ้าน / ประเภทบ้าน  */}
                    <div className="w-full flex gap-4">
                        <div className="flex flex-col w-1/2">
                            <label className='text-sm font-medium text-gray-700 mb-1 ml-1'>ชื่อแบบบ้าน</label>
                            <input type="text" placeholder='ชื่อบ้าน' className='input input-bordered w-full' {...register('houseName')} />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className='text-sm font-medium text-gray-700 mb-1 ml-1'>ประเภทบ้าน</label>
                            <select className="select select-bordered w-full" {...register('houseType')}>
                                <option value="" disabled>เลือกประเภท</option>
                                <option value="บ้านเดี่ยว">บ้านเดี่ยว</option>
                                <option value="ทาวน์โฮม">ทาวน์โฮม</option>
                                <option value="บ้านแฝด">บ้านแฝด</option>
                            </select>
                        </div>
                    </div>

                    {/*  ราคา / สถานะ  */}
                    <div className="w-full flex gap-4">
                        <div className="flex flex-col w-1/2">
                            <label className='text-sm font-medium text-gray-700 mb-1 ml-1'>ราคา (บาท)</label>
                            <input type="number" step="0.01" placeholder='0.00' className='input input-bordered w-full' {...register('price')} />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className='text-sm font-medium text-gray-700 mb-1 ml-1'>สถานะ</label>
                            <select className="select select-bordered w-full" {...register('status')}>
                                <option value="" disabled>เลือกสถานะ</option>
                                <option value="Available">ว่าง (Available)</option>
                                <option value="Book">จองแล้ว (Book)</option>
                                <option value="Sold">ขายแล้ว (Sold)</option>
                                <option value="Building">กำลังสร้าง (Building)</option>
                                <option value="Repair">ซ่อมแซม (Repair)</option>
                            </select>
                        </div>
                    </div>

                    {/*  เบอร์ติดต่อ  */}
                    <div className="w-full flex flex-col">
                        <label className='text-sm font-medium text-gray-700 mb-1 ml-1'>เบอร์ติดต่อเจ้าของ</label>
                        <input type="text" placeholder='เบอร์โทรศัพท์' className='input input-bordered w-full' {...register('ownerPhone')} />
                        {errors?.ownerPhone && <p className="text-xs text-error mt-1">{errors.ownerPhone?.message}</p>}
                    </div>

                    {/*  รายละเอียดเพิ่มเติม  */}
                    <div className="w-full flex flex-col">
                        <label className='text-sm font-medium text-gray-700 mb-1 ml-1'>รายละเอียดเพิ่มเติม</label>
                        <textarea className="textarea textarea-bordered w-full h-20" placeholder="รายละเอียดอื่นๆ..." {...register('details')}></textarea>
                    </div>

                    <div className="divider my-1"></div>

                    {/*  image  */}
                    <div className="w-full flex flex-col mb-2">
                        <div className="flex justify-between items-center mb-2">
                            <label className='text-sm font-medium text-gray-700 ml-1'>รูปภาพประกอบ</label>
                            <span className="text-xs text-gray-400">{imageList.length} รูปภาพ</span>
                        </div>
                        
                        {/* Preview */}
                        {imageList.length > 0 && (
                            <div className="grid grid-cols-4 gap-3 mb-4">
                                {imageList.map((imgObj, index) => (
                                    <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                                        <img src={imgObj.url} alt="preview" className="w-full h-full object-cover" />
                                        
                                        {imgObj.isNew && (
                                            <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm">ใหม่</span>
                                        )}

                                        <button 
                                            type="button" 
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-70 hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} strokeWidth={3} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Upload */}
                        <div className="relative w-full border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-gray-50 hover:border-[#D98A2C] transition-colors cursor-pointer group">
                            <UploadCloud className="text-gray-400 group-hover:text-[#D98A2C] mb-2" size={32} />
                            <p className="text-sm text-gray-500 font-medium">คลิกเพื่อเลือกไฟล์รูปภาพ</p>
                            <p className="text-xs text-gray-400 mt-1">รองรับ JPG, PNG (สามารถเลือกได้หลายไฟล์)</p>
                            
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* ปุ่ม บันทึกข้อมูล */}
                    <button className='btn bg-[#D98A2C] hover:bg-[#c27a26] text-lg text-white mt-4 border-none shadow-md' disabled={isSubmitting}>
                        {isSubmitting ? (
                            <span className="loading loading-spinner"></span>
                        ) : "บันทึกข้อมูล"}
                    </button>

                </fieldset>
            </form>
        </>
    );
}

export default EditHouseModal;