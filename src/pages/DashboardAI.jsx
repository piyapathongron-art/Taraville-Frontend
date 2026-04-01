import { Home, Archive, User, Loader2 } from 'lucide-react'; 
import DashboardCard from '../components/dashboardElement/DashBoardCard';
import DashboardCardHouse from '../components/dashboardElement/DashBoardCardHouse';
import { useEffect, useMemo } from 'react';
import useDataStore from '../stores/dataStore';
import { isBeforeThisMonth } from '../utils/dateConverter'; 
import FooterSystem from '../components/FooterSystem';
import { Link } from 'react-router';

export default function DashboardAI() {
    const { houses, assignments, customers, surveys, isLoading, getAllData } = useDataStore();
    
    useEffect(()=>{
        getAllData();
    }, [getAllData]);

    const houseData = useMemo(() => {
        // ยอดรวมสะสมของเดือนที่แล้วลงไป
        const totalBeforeThisMonth = houses.filter(h => isBeforeThisMonth(h.createdAt)).length;
        
        const countStatus = (statusName) => {
            // ทั้งหมดที่มีอยู่ตอนนี้ (Total Now)
            const currentCount = houses.filter(h => (h.status || 'Available') === statusName).length;
            // เฉพาะอันที่เกิดขึ้น ก่อนเดือนนี้ 
            const previousCount = houses.filter(h => (h.status || 'Available') === statusName && isBeforeThisMonth(h.createdAt)).length;
            
            return { current: currentCount, previous: previousCount };
        };

        const countType = (typeName) => {
            const currentCount = houses.filter(h => (h.houseType || 'บ้านเดี่ยว') === typeName).length;
            const previousCount = houses.filter(h => (h.houseType || 'บ้านเดี่ยว') === typeName && isBeforeThisMonth(h.createdAt)).length;
            
            return { current: currentCount, previous: previousCount };
        }

        return {
            total: { current: houses.length, previous: totalBeforeThisMonth, unit: 'หลัง' },
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

    const taskData = useMemo(() => {
        const totalBeforeThisMonth = assignments.filter(a => isBeforeThisMonth(a.createdAt)).length;
        
        const countStatus = (statusName) => {
            const currentCount = assignments.filter(a => (a.status || 'Pending') === statusName).length;
            const previousCount = assignments.filter(a => (a.status || 'Pending') === statusName && isBeforeThisMonth(a.createdAt)).length;
            return { current: currentCount, previous: previousCount };
        };

        return {
            total: { current: assignments.length, previous: totalBeforeThisMonth, unit: 'งาน' },
            details: [
                { name: 'สำเร็จ', ...countStatus('Completed'), color: '#10B981' },
                { name: 'กำลังดำเนินการ', ...countStatus('Pending'), color: '#3B82F6' },
                { name: 'กำลังตรวจสอบ', ...countStatus('Confirming'), color: '#F59E0B' },
            ]
        };
    }, [assignments]);

    const customerData = useMemo(() => {
        
        const totalBeforeThisMonth = customers.filter(c => isBeforeThisMonth(c.createdAt)).length;

        const countSurveyType = (typeName) => {
            const currentCount = surveys.filter(s => s.surveyType === typeName).length;
            const previousCount = surveys.filter(s => s.surveyType === typeName && isBeforeThisMonth(s.createdAt)).length;
            return { current: currentCount, previous: previousCount };
        };

        return {
            total: { current: customers.length, previous: totalBeforeThisMonth, unit: 'คน' },
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
    
    return (
        <div className="w-full h-[calc(100vh-3.5rem)] flex flex-col bg-base-200/40">
            <div className="flex-1 w-full max-w-full mx-auto p-4 gap-5 justify-center flex flex-wrap">
                
                {/* Houses */}
                <div className="flex-1 shadow-main rounded-4xl animate-fade-up">
                    <Link to="/house">
                        <DashboardCardHouse 
                            icon={Home}
                            title="ภาพรวมบ้านทั้งหมด"
                            data={houseData}
                            chartType="bar"
                        />
                    </Link>
                </div>

                <div className="min-h-0 w-full flex flex-col lg:flex-row gap-4 md:gap-6 animate-fade-up">
                    {/* Task */}
                    <div className="flex-1 shadow-main rounded-4xl">
                        <Link to="/allAssignment">
                            <DashboardCard 
                                icon={Archive}
                                title="งานที่รับผิดชอบ"
                                data={taskData}
                                chartType="pie"
                            />
                        </Link>
                    </div>

                    {/* Customer / Survey */}
                    <div className="flex-1 shadow-main rounded-4xl animate-fade-up">
                        <Link to="/customer">
                            <DashboardCard 
                                icon={User}
                                title="ข้อมูลลูกค้า"
                                data={customerData}
                                chartType="pie"
                            />
                        </Link>
                    </div>
                </div>

            </div>
            
            <FooterSystem/>
        </div>
    );
}