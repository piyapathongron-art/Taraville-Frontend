import { HomeIcon, UserIcon } from '../icon'; 
import { NavLink, Link } from 'react-router'; 
import useUserStore from '../stores/userStore';
import { toast, ToastContainer } from 'react-toastify';
import ModalExitButton from './ModalExitButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateEmployeeSchema } from '../validations/schema';
import { useEffect } from 'react';
import { editUserInfo } from '../api/MainApi';

function SystemHeaderAdmin() {
    const user = useUserStore(state => state.user);
    const logout = useUserStore(state => state.logout);
    const {register, handleSubmit,reset,formState} = useForm({
        resolver: zodResolver(updateEmployeeSchema),
        mode: "onSubmit",
    })

    const {errors, isSubmitting} = formState;

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
            
            toast.success(resp.data?.message || "แก้ไขข้อมูลสำเร็จ", { containerId: "editProfileModalId" });
            
            // หากระบบคุณมีฟังก์ชัน fetch ข้อมูล user ใหม่ ให้เรียกใช้ตรงนี้
            // if (updateUser) updateUser(); 

            // ดีเลย์นิดหน่อยก่อนปิด Modal ให้ผู้ใช้เห็นข้อความ Success
            setTimeout(() => {
                document.getElementById("editProfileModalId").close();
            }, 1000);

        } catch (error) {
            console.dir(error);
            const errMsg = error.response?.data?.message || error.message || "เกิดข้อผิดพลาดในการอัปเดต";
            toast.error(errMsg, { containerId: "editProfileModalId" });
        }
    };

      const closeModal = () => {
        document.getElementById("editProfileModalId").close();
        reset(); // รีเซ็ตฟอร์มกลับไปเป็นค่าเดิมหากกดปิด
    };

    
    // ถ้า isActive เป็น true จะใช้สไตล์นึง (เช่น สีทอง และมีเส้นใต้) ถ้า false ก็จะเป็นสีขาวปกติ
    const navLinkClass = ({ isActive }) => 
        isActive 
            ? "text-brand text-2xl font-medium bg-white p-1 rounded-full px-3 transition-all max-md:text-lg" 
            : "text-white text-2xl hover:text-gray-200 hover:scale-105 transition-all max-md:text-lg";

    return (
        <>
        <div className='w-full flex gap-4 justify-between px-5 h-16 bg-brand fixed top-0 z-10 shadow-lg items-center'>

            <Link to="/dashboard" className="flex-1 flex gap-2 items-center px-2 cursor-pointer">
                <div className="flex-1 flex gap-2 items-center px-2">
                    <div className="w-10 flex items-center justify-center"><HomeIcon /></div>
                    <h1 className='font-light text-white text-2xl drop-shadow-md max-[1025px]:text-lg max-[1025px]:text-center max-[1025px]:mr-5'>Taraville System</h1>
                </div>
            </Link>

            {/* Navigation */}
            <div className="flex justify-center gap-10 max-md:gap-4 items-center">
                <NavLink to="/dashboard" className={navLinkClass}>แดชบอร์ด</NavLink>
                <NavLink to="/employee" className={navLinkClass}>พนักงาน</NavLink>
                <NavLink to="/house" className={navLinkClass}>บ้าน</NavLink>
                <NavLink to="/allAssignment" className={navLinkClass}>งาน</NavLink>
                <NavLink to="/customer" className={navLinkClass}>ลูกค้า</NavLink>
            </div>

            {/* Right dropdown menu */}
           <div className="flex-1 flex gap-3 items-center justify-end">
                    { user &&
                <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-circle  bg-navy text-white ">
                            <UserIcon className="w-10" />
                        </div>
                    
                    <div tabIndex={0} className=" menu dropdown-content bg-base-100 rounded-box z-1 w-100 p-2 mt-4 shadow-sm">
                        <div className="flex flex-col gap-2  mt-1 ml-1">
                            <h2 className='text-xl '>{`${user.firstName} ${user.lastName}`}</h2>
                            <div className="flex gap-5">
                                <p> <span className='font-light'>แผนก:</span> {user.department}</p>
                                <p ><span className='font-light'>เบอร์ติดต่อ:</span> {user.phone}</p>
                            </div>
                            <div className="flex justify-between items-center mt-3">
                                <p> <span className='font-light'>รหัสพนักงาน:</span> {user.employeeId}</p>
                                <div className="flex gap-2 ">
                                    <button 
                                  className='btn btn-sm flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border-none' 
                                  onClick={() => document.getElementById("editProfileModalId").showModal()}
                                >
                                  แก้ไขข้อมูล
                                </button>
                                    <button className='btn bg-navy text-white' onClick={logout}>ออกจากระบบ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    }
            </div>

        </div>

       <dialog id={"editProfileModalId"} className="modal">
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

                        {/* แถว 3: ที่อยู่ */}
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
        </dialog>
              
        </>
    )
}

export default SystemHeaderAdmin;