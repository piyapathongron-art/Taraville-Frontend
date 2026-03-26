import React from 'react'
import { HomeIcon, UserIcon } from '../icon'
import { NavLink, Link } from 'react-router'
import useUserStore from '../stores/userStore'

function SystemHeaderAdmin() {
    const user = useUserStore(state => state.user)
    const logout = useUserStore(state => state.logout)
    // console.log(user)
    return (
        <div className='w-full flex gap-4 justify-between px-5 h-15 bg-brand fixed top-0 z-10 shadow-lg'>

            <Link to="/dashboard" className="flex-1 flex gap-2 items-center px-2 cursor-pointer">
                <div className="flex-1 flex gap-2 items-center px-2">
                    <div className="w-10"><HomeIcon /></div>
                    <h1 className='font-primary text-white text-2xl text-shadow-2xs'>Taraville System</h1>
                </div>
            </Link>

            {/* Navigation */}

            <div className="flex  justify-center gap-10 max-md:*:w-16 max-md:justify-start items-center">
                <NavLink to="/dashboard" className="text-white text-2xl">แดชรบอร์ด</NavLink>
                <NavLink to="/employee" className="text-white text-2xl">พนักงาน</NavLink>
                <NavLink to="/dashboard" className="text-white text-2xl">บ้าน</NavLink>
                <NavLink to="/dashboard" className="text-white text-2xl">งาน</NavLink>
                <NavLink to="/dashboard" className="text-white text-2xl">ลูกค้า</NavLink>
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
                                <div className="flex gap-5 ">
                                    <button className='btn '>แก้ไขข้อมูล</button>
                                    <button className='btn bg-navy text-white' onClick={logout}>ออกจากระบบ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    }


            </div>

        </div>
    )
}


export default SystemHeaderAdmin