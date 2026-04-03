import { HomeIcon, UserIcon } from '../icon'; 
import { NavLink, Link } from 'react-router'; 
import useUserStore from '../stores/userStore';
import HeaderEditModal from './HeaderEditModal';

function SystemHeaderAdmin() {
    const user = useUserStore(state => state.user);
    const role = useUserStore(state => state.role);
    const logout = useUserStore(state => state.logout);
    console.log(user)

    const navLinkClass = ({ isActive }) => 
        isActive 
            ? "text-brand text-2xl font-medium bg-white p-1 rounded-full px-3 transition-all max-md:text-lg" 
            : "text-white text-2xl hover:text-gray-200 hover:scale-105 transition-all max-md:text-lg";

    return (
        <>
        <div className='w-full flex gap-4 justify-between px-5 h-16 bg-brand fixed top-0 z-10 shadow-lg items-center'>

            <Link to="/home" className="flex-1 flex gap-2 items-center px-2 cursor-pointer">
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
                    
                    <div tabIndex={0} className=" menu dropdown-content bg-base-100 rounded-box z-300 w-100 p-2 mt-4 shadow-sm">
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
            <HeaderEditModal user={user} />
        </dialog>
              
        </>
    )
}

export default SystemHeaderAdmin;