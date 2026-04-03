import { useEffect } from 'react'
import useCustomerStore from '../stores/customerStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { updateCustomerSchema } from '../validations/schema';
import { toast } from 'react-toastify';

function FullFormCustomer() {
    const customerInfo = useCustomerStore(state => state.customerInfo)
    const submitFullCustomer = useCustomerStore(state => state.submitFullCustomer)
    const customerId = useCustomerStore(state=>state.customerId)

    const { register, reset, handleSubmit, formState } = useForm({
        resolver: zodResolver(updateCustomerSchema),
        mode: "onSubmit",
        defaultValues: {
            firstName: "", lastName: "", gender: "", occupation: "", incomeRange: "", phone: "", lineId: "",email:"",houseNo:"",street:"",subDistrict:"",district:"",province:"",zipcode:""
        }
    })

    useEffect(() => {
        
        if (customerInfo) {
            
            reset({
                firstName: customerInfo.firstName || "",
                lastName: customerInfo.lastName || "",
                gender: customerInfo.gender || "",
                occupation: customerInfo.occupation || "",
                incomeRange: customerInfo.incomeRange || "",
                phone: customerInfo.phone || "",
                lineId: customerInfo.lineId || "",
                email: customerInfo.email || "",
                houseNo: customerInfo.houseNo || "",
                street: customerInfo.street || "",
                subDistrict: customerInfo.subDistrict || "",
                district: customerInfo.district || "",
                province: customerInfo.province || "",
                zipcode: customerInfo.zipcode || ""
            });
        }
    }, []);

    const { isSubmitting, errors } = formState
    const navigate = useNavigate();

    const onSubmit = async (body) => {
        try {
            // console.log(body)
            await new Promise(resolve => setTimeout(resolve,2000))
            const resp = await submitFullCustomer(body,customerId)
            console.log(resp)
            toast.success('บันทึกข้อมูลเรียบร้อย')
            navigate("/contact/2")
          
        } catch (error) {
            console.dir(error)
            const errMsg = error.response?.data.error || error.message
            toast.error(errMsg)
        }
    }
    // console.log(customerId)
    return (
        <div className='w-full  overflow-hidden bg-white h-fit' >

            <div className="flex justify-center" >
                {isSubmitting && <span className="loading loading-spinner loading-xl absolute z-5 text-brand brightness-100 w-25 bottom-150"></span>}
                <div className={!isSubmitting ? "card w-200 bg-base-100 card-xl shadow-xl border-brand border" : "brightness-50 card w-200 bg-base-100 card-xl shadow-xl border-brand border"}>
                    <div className="card-body gap-10" >
                        <h2 className="card-title justify-start text-3xl">แบบสอบถาม</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex justify-center gap-10">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium">ชื่อ</legend>
                                    <input type="text" className="input" placeholder="ชื่อจริง" 
                                    {...register("firstName")}/>
                                    {/* error */}
                                </fieldset>

                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium">นามสกุล</legend>
                                    <input type="text" className="input" placeholder="นามสกุล" 
                                    {...register("lastName")}/>
                                    {/* error */}
                                </fieldset>
                            </div>

                            {/* Gender */}
                            <div className="flex justify-center gap-10">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium">เพศ</legend>


                                    <div className="flex gap-5">
                                        <label className='flex gap-2 text-sm'>
                                            <input type="radio" value="ชาย"
                                                    {...register("gender")} />ชาย
                                        </label>
                                        <label className='flex gap-2 text-sm'>
                                            <input type="radio" value="หญิง"
                                                    {...register("gender")} />หญิง
                                        </label>
                                    </div>
                                    {/* error */}
                                </fieldset>

                                {/* Occupation */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium">อาชีพ</legend>
                                    <input type="text" className="input" placeholder="ค้าขาย" 
                                    {...register("occupation")}/>
                                    {/* error */}
                                </fieldset>

                                {/* Income Range */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium">รายได้เฉลี่ยต่อเดือน</legend>
                                    <input type="text" className="input" placeholder="20,000" 
                                    {...register("incomeRange")}/>
                                    {/* error */}
                                </fieldset>

                            </div>

                            <div className="flex justify-center gap-10">
                                {/* Tel Number */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium">เบอร์โทร</legend>
                                    <input type="text" className="input" placeholder="เบอร์โทรศัพท์" 
                                    {...register("phone")}/>
                                    {/* error */}
                                </fieldset>

                                {/* Line Id */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium">Lind Id</legend>
                                    <input type="text" className="input" placeholder="Lind id" 
                                    {...register("lineId")}/>
                                    {/* error */}
                                </fieldset>
                            </div>

                            <div className="flex justify-center gap-10">
                                {/* Email */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium">อีเมล</legend>
                                    <input type="text" className="input w-109" placeholder="อีเมล" 
                                    {...register("email")}/>
                                    {/* error */}
                                </fieldset>
                            </div>

                            <div className="flex justify-center gap-10">
                                {/* House Number */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium">บ้านเลขที่</legend>
                                    <input type="text" className="input" placeholder="บ้านเลขที่" 
                                    {...register("houseNo")}/>
                                    {/* error */}
                                </fieldset>

                                {/* Street */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium">ถนน</legend>
                                    <input type="text" className="input" placeholder="ถนน" 
                                    {...register("street")}/>
                                    {/* error */}
                                </fieldset>
                            </div>

                            <div className="flex justify-center gap-10">
                                {/* ตำบล */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium">ตำบล</legend>
                                    <input type="text" className="input" placeholder="ตำบล" 
                                    {...register("subDistrict")}/>
                                    {/* error */}
                                </fieldset>

                                {/* อำเภอ */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium">อำเภอ</legend>
                                    <input type="text" className="input" placeholder="อำเภอ" 
                                    {...register("district")}/>
                                    {/* error */}
                                </fieldset>
                            </div>

                            <div className="flex justify-center gap-10">
                                {/* จังหวัด */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium">จังหวัด</legend>
                                    <input type="text" className="input" placeholder="จังหวัด" 
                                    {...register("province")}/>
                                    {/* error */}
                                </fieldset>

                                {/* เลขไปรษณีย์ */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium">เลขไปรษณีย์</legend>
                                    <input type="text" className="input" placeholder="เลขไปรษณีย์" 
                                    {...register("zipcode")}/>
                                    {/* error */}
                                </fieldset>
                            </div>




                            {/* footer */}
                            <div className="w-full flex justify-end">
                                <button className='btn bg-brand text-white w-35 h-12 font-medium mt-10 '>หน้าต่อไป</button>
                            </div>

                        </form>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default FullFormCustomer