import React from 'react'
import LandingPage from '../pages/LandingPage'
import Header from '../components/Header'
import { Link, Outlet } from 'react-router'
import lineIcon from '../assets/line02.webp'
import facebookIcon from '../assets/facebook2.png'
import ContactUsIcon from '../assets/contact.png'

function MainLayout() {
    return (
        <>
            <div className="min-h-screen">
                <Header />
                <div className="relative flex gap-4  border pt-14">
                    <Outlet />
                </div>
            </div>
            <div className="btn-ghost bg-white fixed w-40 h-15 bottom-10  z-50 right-20  rounded-full flex items-center justify-around px-3 shadow-main animate-fade-up ">
                <Link to={"https://line.me/ti/p/KkR4ltcphx"}>
                <div className=" opacity-100 cursor-pointer hover:scale-120 transition ease-in-out duration-500">
                <img src={lineIcon} className='w-10 opacity-100'/>
                </div>
                </Link>

                <Link to={"https://www.facebook.com/QualityhomePhetchabun/?locale=th_TH"}>
                <div className=" opacity-100 cursor-pointer hover:scale-120 transition ease-in-out duration-500 ml-1">
                <img src={facebookIcon} className='w-10 opacity-100 rounded-xl'/>
                </div>
                </Link>

                <Link to={"/contact"}>
                <div className=" opacity-100 cursor-pointer hover:scale-120 transition ease-in-out duration-500">
                <img src={ContactUsIcon} className='w-10 opacity-100 rounded-xl'/>
                </div>
                </Link>
                </div>
        </>
    )
}

export default MainLayout