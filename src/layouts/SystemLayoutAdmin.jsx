import { Outlet } from 'react-router'
import SystemHeaderAdmin from '../components/SystemHeaderAdmin'

function SystemLayoutAdmin() {
    return (
        <>
            <div className="min-h-screen max-h-screen">
                <SystemHeaderAdmin />
                <div className="relative flex gap-4 border pt-14 ">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default SystemLayoutAdmin