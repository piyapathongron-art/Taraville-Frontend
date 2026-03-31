import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell} from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const TrendIndicator = ({ current, previous, unit }) => {
    const diff = current - previous;

    if (diff > 0) {
        return (
            <div className="flex items-center text-emerald-500 text-xl  font-medium ">
                <TrendingUp size={12} className="mr-1" />
                เพิ่ม {diff} {unit}
            </div>
        );
    } else if (diff < 0) {
        return (
            <div className="flex items-center text-rose-500 text-xl  font-medium ">
                <TrendingDown size={12} className="mr-1" />
                ลด {Math.abs(diff)} {unit}
            </div>
        );
    } else {
        return (
            <div className="flex items-center text-base-content/40 text-xl  ">
                <Minus size={12} className="mr-1" />
                คงที่
            </div>
        );
    }
};


const DashboardCardHouse = ({ icon: Icon, title, data, chartType }) => {
    return (
        <div className="flex flex-row w-full h-full bg-base-100 rounded-xl xl:rounded-2xl shadow-sm border border-base-200 overflow-hidden">

            {/* Yellow box*/}
            <div className={`bg-gradient-to-br from-[#f2b91c] to-[#e0a210] text-white p-4 flex flex-col justify-center relative overflow-hidden w-1/4 max-w-[250px]`}>
                <div className="border-2 border-white/50 rounded-lg p-2 w-max mb-2">
                    <Icon size={50} strokeWidth={2} />
                </div>
                <div className="z-10">
                    <h3 className="text-2xl font-medium text-shadow-2xs">{title}</h3>
                    <p className="text-3xl xl:text-5xl font-bold mt-1 tracking-tight">{data.total.current}</p>
                    <div className="text-white/90 bg-white px-2 py-0.5 rounded-full w-max mt-2 text-xl flex items-center">
                        <TrendIndicator current={data?.total.current} previous={data.total.previous} unit={data.total.unit} />
                    </div>
                </div>
            </div>

            {/* Container Box*/}
            <div className={`p-4 flex  flex-1 min-w-0 flex-row items-center `}>

                {/* ฝั่งตัวเลขรายละเอียด */}
                <div className={`w-fit max-[1025px]:w-70 flex flex-wrap gap-5`}>
                    {data?.statusDetails.map((item, index) => (
                        <div key={index} className={`flex flex-col w-50 px-2 border-l-[3px] border-base-200 max-[1025px]:w-40`} style={{ borderLeftColor: item.color }}>
                            <span className="text-base-content/60 text-xl mb-0.5 line-clamp-1">{item.name}</span>
                            <span className="text-lg xl:text-xl font-bold text-base-content leading-none">{item.current}</span>
                            <TrendIndicator current={item.current} previous={item.previous} unit={data.total.unit} />
                        </div>
                    ))}
                </div>

                {/* ฝั่งกราฟ */}
                <div className={`w-[70%] h-[90%] `}>
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={150}>
                        
                            <BarChart data={data.typeDetails} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <XAxis dataKey="name" tick={{ fontSize: 16, fill: '#888' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 15, fill: '#888' }} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: '1px solid black', fontSize: '12px' }} />
                                <Bar dataKey="current" radius={[4, 4, 0, 0]} maxBarSize={30}>
                                    {data?.typeDetails.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardCardHouse