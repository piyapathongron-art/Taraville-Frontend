import React from 'react'
import LandingPage from '../pages/LandingPage'
import Header from '../components/Header'
import { Outlet } from 'react-router'

function MainLayout() {
    return (
        <>
            <div className="min-h-screen">
                <Header />
                <div className="relative flex gap-4  border pt-14">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default MainLayout