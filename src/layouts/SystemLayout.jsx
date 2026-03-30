import { Outlet } from 'react-router'
import SystemHeader from '../components/SystemHeader'

function SystemLayout() {
    return (
        <>
            <div className="min-h-screen">
                <SystemHeader />
                <div className="relative flex gap-4  border pt-14">
                    <Outlet />
                    
                </div>
            </div>
            
        </>
    )
}

export default SystemLayout