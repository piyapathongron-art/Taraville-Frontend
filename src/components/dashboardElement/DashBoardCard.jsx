import {Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import {TrendingUp, TrendingDown, Minus } from 'lucide-react'

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


const DashboardCard = ({ icon: Icon, title, data, chartType}) => {
    const pieData = data.details.filter(item => item.current > 0);
    const finalPieData = pieData.length > 0 ? pieData : [{ name: 'ไม่มีข้อมูล', current: 1, color: '#E5E7EB' }];
    return (
        <div className="flex flex-row w-full h-full bg-base-100 rounded-xl xl:rounded-2xl shadow-sm border border-base-200 overflow-hidden">
            
            {/* Yellow box*/}
            <div className={`bg-linear-to-br from-[#f2b91c] to-[#e0a210] text-white p-4 flex flex-col justify-center relative overflow-hidden w-1/4 max-w-63`}>
                <div className="border-2 border-white/50 rounded-lg p-2 w-max mb-2">
                    <Icon size={50} strokeWidth={2} />
                </div>
                <div className="z-10">
                    <h3 className="text-xl font-medium text-shadow-2xs">{title}</h3>
                    <p className="text-3xl xl:text-5xl font-bold mt-1 tracking-tight">{data.total.current}</p>
                    <div className="text-white/90 bg-white px-2 py-0.5 rounded-full w-max mt-2 text-xl flex items-center">
                        <TrendIndicator current={data?.total.current} previous={data.total.previous} unit={data.total.unit} />
                    </div>
                </div>
            </div>

            {/* Container Box*/}
            <div className={`p-4 flex flex-1 min-w-0 flex-row items-center gap-4`}>
                
                {/* ฝั่งตัวเลขรายละเอียด */}
                <div className={`w-50 flex flex-col  gap-y-4`}>
                    {data.details.map((item, index) => (
                        <div key={index} className={`flex flex-col px-2 border-l-[3px] border-base-200`} style={{ borderLeftColor: item.color }}>
                            <span className="text-base-content/60 text-lg mb-1">{item.name}</span>
                            <span className="text-2xl font-bold text-base-content leading-none">{item.current}</span>
                            <TrendIndicator current={data?.total.current} previous={data.total.previous} unit={data.total.unit} />
                        </div>
                    ))}
                </div>

                {/* rechart */}
                <div className={`w-[45%] h-[90%]`}>
                    <ResponsiveContainer width="100%" height="100%">
                       
                           <PieChart>
                                <Pie 
                                    data={finalPieData} 
                                    cx="50%" cy="50%" 
                                    innerRadius="60%" 
                                    outerRadius="80%" 
                                    paddingAngle={pieData.length > 1 ? 3 : 0} 
                                    dataKey="current"
                                    stroke="none" 
                                >
                                    {finalPieData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={entry.color} 
                                            stroke="none"
                                        />
                                    ))}
                                </Pie>
                                {pieData.length > 0 && <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px', padding: '4px 8px' }}/>}
                                <Legend verticalAlign="bottom" height={24} iconType="circle" wrapperStyle={{ fontSize: '11px' }}/>
                            </PieChart>
                        
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard