import { Home, Archive, User,Loader2} from 'lucide-react'; 

import DashboardCard from '../components/dashboardElement/DashBoardCard';
import DashboardCardHouse from '../components/dashboardElement/DashBoardCardHouse';
import { useEffect, useMemo } from 'react';
import useDataStore from '../stores/dataStore';
import { isLastMonth, isThisMonth } from '../utils/dateConverter';
import FooterSystem from '../components/FooterSystem';


// dashboard
export default function DashboardAI() {

    //state from useDataStore
    const { houses, assignments, customers, surveys, isLoading, getAllData } = useDataStore();
    
    //fetch data from db
    useEffect(()=>{
        getAllData()
    },[getAllData])

    
// seperate all house data
    const houseData = useMemo(() => {
        //seperate this month and last month by use date converter
        const totalThisMonth = houses.filter(h => isThisMonth(h.createdAt)).length;
        const totalLastMonth = houses.filter(h => isLastMonth(h.createdAt)).length;
        
        //seperate house status
        const countStatus = (statusName) => {

            const currentCount = houses.filter(h => {
                //if null mark available
                const currentStatus = h.status || 'Available'; 
                //if status = (status) & isThisMonth true count
                return currentStatus === statusName && isThisMonth(h.createdAt);
            }).length;

            const previousCount = houses.filter(h => {
                const currentStatus = h.status || 'Available'; 
                return currentStatus === statusName && isLastMonth(h.createdAt);
            }).length;
            //if status = (status) & isThisMonth true count
            return { current: currentCount, previous: previousCount };
        };


const countType = (statusName) => {
            const currentCountType = houses.filter(h => {
                const currentType = h.houseType || 'บ้านเดี่ยว';
                return currentType === statusName && isThisMonth(h.createdAt);
            }).length;

                const previousCountType = houses.filter(h => {
                    const currentType = h.houseType || 'บ้านเดี่ยว';
                    return currentType === statusName && isLastMonth(h.createdAt);
                }).length;
            return { current: currentCountType, previous: previousCountType };
            }


        //return prepared data for use with recharts
        return {
            //current = everyhouse , pervious = everyhouse - thismonth + lastmonth , unit for data
            total: { current: houses.length, previous: houses.length - totalThisMonth + totalLastMonth, unit: 'หลัง' },
            //name for dashboardCard , data , color for chart and easy to serperate
            statusDetails: [
                { name: 'ขายแล้ว', ...countStatus('Sold'), color: '#10B981' }, 
                { name: 'จอง', ...countStatus('Book'), color: '#3B82F6' }, 
                { name: 'ว่าง', ...countStatus('Available'), color: '#F59E0B' }, 
                { name: 'กำลังสร้าง', ...countStatus('Building'), color: '#8B5CF6' }, 
                { name: 'ซ่อมแซม', ...countStatus('Repair'), color: '#EF4444' }, 
            ],
            typeDetails: [
                { name: 'บ้านเดี่ยว', ...countType('บ้านเดี่ยว'), color: '#EC4899' }, 
                { name: 'ทาวน์โฮม', ...countType('ทาวน์โฮม'), color: '#8B5CF6' }, 
                { name: 'บ้านแฝด', ...countType('บ้านแฝด'), color: '#3B82F6' }, 
            ]
        };
    }, [houses]);

console.log(houseData)
  const taskData = useMemo(() => {
        const totalThisMonth = assignments.filter(a => isThisMonth(a.createdAt)).length;
        const totalLastMonth = assignments.filter(a => isLastMonth(a.createdAt)).length;
        
        const countStatus = (statusName) => {
            const currentCount = assignments.filter(a => {
                const currentStatus = a.status || 'Pending'; 
                return currentStatus === statusName && isThisMonth(a.createdAt);
            }).length;

            const previousCount = assignments.filter(a => {
                const currentStatus = a.status || 'Pending';
                return currentStatus === statusName && isLastMonth(a.createdAt);
            }).length;

            return { current: currentCount, previous: previousCount };
        };

        return {
            total: { current: assignments.length, previous: assignments.length - totalThisMonth + totalLastMonth, unit: 'งาน' },
            details: [
                { name: 'สำเร็จ', ...countStatus('Completed'), color: '#10B981' },
                { name: 'กำลังดำเนินการ', ...countStatus('Pending'), color: '#3B82F6' },
                { name: 'กำลังตรวจสอบ', ...countStatus('Confirming'), color: '#F59E0B' },
            ]
        };
    }, [assignments]);

     const customerData = useMemo(() => {
        const countSurveyType = (typeName) => {
            const currentCount = surveys.filter(s => s.surveyType === typeName && isThisMonth(s.createdAt)).length;
            const previousCount = surveys.filter(s => s.surveyType === typeName && isLastMonth(s.createdAt)).length;
            return { current: currentCount, previous: previousCount };
        };

        return {
            total: { current: customers.length, previous: customers.length, unit: 'คน' },
            details: [
                { name: 'ออนไลน์', ...countSurveyType('Online'), color: '#8B5CF6' },
                { name: 'วอล์คอิน', ...countSurveyType('Walkin'), color: '#EC4899' },
            ]
        };
    }, [customers, surveys]);

    if (isLoading) {
        return (
            <div className="w-full h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center bg-base-200/40">
                <Loader2 className="animate-spin text-[#f2b91c] mb-4" size={48} />
                <p className="text-lg text-base-content/60 font-medium">กำลังโหลดข้อมูลแดชบอร์ด...</p>
            </div>
        );
    }
    
    // console.log(houseData)

    return (
        
        <div className="w-full h-[calc(100vh-3.5rem)] flex flex-col bg-base-200/40  ">
            <div className="flex-1 w-full max-w-full mx-auto p-4 gap-5 justify-center flex flex-wrap     ">
                
                {/* Houses */}
                <div className="flex-1 shadow-main rounded-4xl animate-fade-up ">
                    <DashboardCardHouse 
                        icon={Home}
                        title="ภาพรวมบ้านทั้งหมด"
                        data={houseData}
                        chartType="bar"
                    />
                </div>

                <div className=" min-h-0 w-full flex flex-col lg:flex-row gap-4 md:gap-6 animate-fade-up">
                {/* Task */}
                <div className="flex-1 shadow-main rounded-4xl ">
                    <DashboardCard 
                        icon={Archive}
                        title="งานที่รับผิดชอบ"
                        data={taskData}
                        chartType="pie"
                    />
                </div>

                {/* Customer / Survey */}
                <div className="flex-1 shadow-main rounded-4xl animate-fade-up">
                    <DashboardCard 
                        icon={User}
                        title="ข้อมูลลูกค้า"
                        data={customerData}
                        chartType="pie"
                    />
                </div>
                </div>

            </div>
            
            <FooterSystem/>
        </div>
    );
}