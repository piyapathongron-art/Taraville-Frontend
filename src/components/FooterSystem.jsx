import { MapPin, Phone } from 'lucide-react'
import { NavLink } from 'react-router'


function FooterSystem() {
  return (
        <div className="w-full bg-navy text-white  py-4 px-6  flex flex-col  justify-between items-center gap-2 ">
                <div className="flex items-center gap-2">
                    <NavLink to="/home">

                    <span className="text-base font-semibold text-gray-200">TARAVILLE</span>
                    </NavLink>

                </div>

                <div className="flex items-center gap-6 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        <span>เพชรบูรณ์, ประเทศไทย</span>
                    </div>
                    <div className="flex items-center gap-1.5 ">
                        <Phone size={14} />
                        <span>999-999-9999</span>
                    </div>
                </div>
            </div>
  )
}

export default FooterSystem