
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updateEmployeeSchema } from '../validations/schema';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ModalExitButton from './ModalExitButton';
import useUserStore from '../stores/userStore';

function HeaderEditModal({ user }) {
    const editUserInfo = useUserStore((state) => state.editUserInfo);
    // console.log(user)
    const {register, handleSubmit,reset,formState} = useForm({
            resolver: zodResolver(updateEmployeeSchema),
            mode: "onSubmit",
        })
    
        const {errors, isSubmitting} = formState;
        
          const closeModal = () => {
        document.getElementById("editProfileModalId").close();
        reset(); 
    };
    
        useEffect(() => {
            if (user) {
                reset({
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    phone: user.phone || "",
                    email: user.email || "",
                    address: user.address || "",
                });
            }
        }, [user, reset]);
    
        const onSubmit = async (data) => {
            try {
                const resp = await editUserInfo(data, user.employeeId);
                console.log(resp);
                
                toast.success(resp.data?.message || "แก้ไขข้อมูลสำเร็จ", { containerId: "editProfileModalId" });
                
                
                setTimeout(() => {
                    document.getElementById("editProfileModalId").close();
                }, 1000);
    
            } catch (error) {
                console.dir(error);
                const errMsg = error.response?.data?.message || error.message || "เกิดข้อผิดพลาดในการอัปเดต";
                toast.error(errMsg, { containerId: "editProfileModalId" });
            }
        };
  return (
    <div className="modal-box max-w-2xl relative">
                <ToastContainer containerId={"editProfileModalId"} position="top-right" autoClose={2000} />
                
                <ModalExitButton modalId={"editProfileModalId"} />

                <div className="text-2xl font-bold text-center text-gray-800 mb-2">
                    {isSubmitting && <span className="loading loading-spinner loading-md mx-2 text-[#D98A2C]"></span>}
                    แก้ไขข้อมูลส่วนตัว
                </div>
                <div className="divider opacity-60 my-2"></div>
                
                {/* โครงสร้าง Form แก้ไขข้อมูล */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset disabled={isSubmitting} className="flex flex-col gap-4 p-2">
                        
                        {/* แถว 1: ชื่อ - นามสกุล */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium text-gray-700">ชื่อ <span className="text-error">*</span></span></label>
                                <input type="text" placeholder="ชื่อ" className={`input input-bordered w-full ${errors.firstName ? 'input-error' : ''}`} {...register('firstName')} />
                                <p className="text-sm text-error mt-1">{errors.firstName?.message}</p>
                            </div>
                            
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium text-gray-700">นามสกุล <span className="text-error">*</span></span></label>
                                <input type="text" placeholder="นามสกุล" className={`input input-bordered w-full ${errors.lastName ? 'input-error' : ''}`} {...register('lastName')} />
                                <p className="text-sm text-error mt-1">{errors.lastName?.message}</p>
                            </div>
                        </div>

                        {/* แถว 2: เบอร์ติดต่อ - อีเมล */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium text-gray-700">เบอร์ติดต่อ</span></label>
                                <input type="text" placeholder="08x-xxx-xxxx" className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`} {...register('phone')} />
                                <p className="text-sm text-error mt-1">{errors.phone?.message}</p>
                            </div>

                            <div className="form-control w-full">
                                <label className="label"><span className="label-text font-medium text-gray-700">อีเมล</span></label>
                                <input type="email" placeholder="example@email.com" className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`} {...register('email')} />
                                <p className="text-sm text-error mt-1">{errors.email?.message}</p>
                            </div>
                        </div>

                        {/* ที่อยู่ */}
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-medium text-gray-700">ที่อยู่</span></label>
                            <textarea 
                                placeholder="รายละเอียดที่อยู่..." 
                                className={`textarea textarea-bordered h-24 w-full ${errors.address ? 'textarea-error' : ''}`} 
                                {...register('address')} 
                            />
                            <p className="text-sm text-error mt-1">{errors.address?.message}</p>
                        </div>
                        
                        <div className="divider my-1"></div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 w-full justify-end mt-2">
                            <button type="button" onClick={closeModal} className="btn bg-gray-200 text-gray-700 border-none hover:bg-gray-300 w-28" disabled={isSubmitting}>
                                ยกเลิก
                            </button>
                            <button type="submit" className="btn bg-[#D98A2C] hover:bg-[#c27a26] text-white border-none w-36" disabled={isSubmitting}>
                                บันทึกข้อมูล
                            </button>
                        </div>

                    </fieldset>
                </form>

            </div>
  )
}

export default HeaderEditModal