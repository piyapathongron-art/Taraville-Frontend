import React from 'react'
import { HomeIcon, UserIcon } from '../icon'
import { NavLink, Link, useNavigate } from 'react-router'
import useUserStore from '../stores/userStore'

function Header() {
    const user = useUserStore(state => state.user)
    const logout = useUserStore(state=>state.logout)
    const home = user ? "/home" : '/';
    
    const navigate = useNavigate()
    return (
        <div className='w-full flex gap-4 justify-between px-5 h-15 bg-brand fixed top-0 z-10 shadow-lg'>

            <Link to="/" className="flex-1 flex gap-2 items-center px-2 cursor-pointer">
                <div className="flex-1 flex gap-2 items-center px-2">
                    <div className="w-10"><HomeIcon /></div>
                    <h1 className='font-primary text-white text-2xl text-shadow-2xs'>Taraville</h1>
                </div>
            </Link>

            {/* Navigation */}

            <div className="flex-1 flex gap-2 justify-center *:w-20 max-md:*:w-16 max-md:justify-start">

            </div>

            {/* Right dropdown menu */}
            <div className="flex-1 flex gap-3 items-center justify-end">
                <NavLink className="cursor-pointer" to={home}><p className='font-primary text-white text-lg'>หน้าแรก</p></NavLink>
                <NavLink className="cursor-pointer" to="/projects"><p className='font-primary text-white text-lg'>โครงการ</p></NavLink>
                <NavLink className="cursor-pointer" to="/about"><p className='font-primary text-white text-lg'>เกี่ยวกับ</p></NavLink>
                <NavLink className="cursor-pointer" to="/contact"><p className='font-primary text-white text-lg'>ติดต่อเรา</p></NavLink>

                <div className=" flex gap-3 items-center justify-end">
                    {user &&
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
                                        <div className="flex gap-5 relative">
                                            <button className='btn '>แก้ไขข้อมูล</button>
                                            <button className='btn bg-navy text-white' onClick={logout}>ออกจากระบบ</button>
                                            <button className='btn bg-brand w-25 text-white absolute bottom-20 right-0' onClick={()=>navigate("/dashboard")}>Dashboard</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }


                </div>
            </div>

        </div>
    )
}


export default Header