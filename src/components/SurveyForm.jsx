import useCustomerStore from '../stores/customerStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { createSurveySchema } from '../validations/schema';
import { toast } from 'react-toastify';

function SurveyForm() {
    const customerInfo = useCustomerStore(state => state.customerInfo)
    const submitSurvey = useCustomerStore(state => state.submitSurvey)
    const customerId = useCustomerStore(state => state.customerId)

const customerIdString = customerId.toString() || null

    const { register, reset, handleSubmit, formState } = useForm({
        resolver: zodResolver(createSurveySchema),
        mode: "onSubmit",
        defaultValues: {
            customerId: customerIdString, interestedPropertyType: "", preferredBathroom: "", preferredBedroom: "", decisionFactors: [], familySize: "", expectedBudget: "", informationSource: "", installmentCapacity: ""
        }
    })


    const { isSubmitting, errors } = formState
    const navigate = useNavigate();

    const onSubmit = async (body) => {
        try {
            // console.log(body)
            await new Promise(resolve => setTimeout(resolve, 2000))
            const resp = await submitSurvey(body)
            console.log(resp)
            toast.success('บันทึกข้อมูลเรียบร้อย')
            navigate("/home")

        } catch (error) {
            console.dir(error)
            const errMsg = error.response?.data.error || error.message
            toast.error(errMsg)
        }
    }
    // console.log(typeof customerId)
    return (
        <div className='w-full  overflow-hidden bg-white h-fit' >

            <div className="flex justify-center" >
                {isSubmitting && <span className="loading loading-spinner loading-xl absolute z-5 text-brand brightness-100 w-25 bottom-150"></span>}
                <div className={!isSubmitting ? "card w-200 bg-base-100 card-xl shadow-xl border-brand border" : "brightness-50 card w-200 bg-base-100 card-xl shadow-xl border-brand border"}>
                    <div className="card-body gap-2" >
                        <h2 className="card-title justify-start text-3xl">แบบสอบถาม</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex justify-center ">
                                <fieldset className="fieldset w-full">
                                    <legend className="fieldset-legend text-sm font-medium">รูปแบบที่อยู่อาศัยที่ท่านกำลังสนใจ :</legend>
                                    <input type="text" className="input w-full" placeholder="รูปแบบที่อยู่อาศัยที่ท่านกำลังสนใจ"
                                        {...register("interestedPropertyType")} />
                                    {/* error */}
                                </fieldset>
                            </div>

                            {/* Gender */}
                            <p className='text-sm font-medium mt-2'>ลักษณะฟังก์ชั่นภายในที่ท่านต้องการ :</p>
                            <div className="flex justify-center gap-5">

                                {/* Occupation */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium ">จำนวนห้องนอน :</legend>
                                    <input type="text" className="input" placeholder="จำนวนห้องนอน"
                                        {...register("preferredBedroom")} />
                                    {/* error */}
                                </fieldset>

                                {/* Income Range */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium">จำนวนห้องน้ำ :</legend>
                                    <input type="text" className="input" placeholder="จำนวนห้องนอน"
                                        {...register("preferredBathroom")} />
                                    {/* error */}
                                </fieldset>

                                {/* Income Range */}
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-sm font-medium">อื่นๆ :</legend>
                                    <input type="text" className="input" placeholder="อื่นๆ"
                                        {...register("remark")} />
                                    {/* error */}
                                </fieldset>

                            </div>

                            <p className='text-sm font-medium mt-2'>ปัจจัยที่ท่านใช้พิจารณาในการตัดสินใจเลือกซื้อที่อยู่อาศัย(สามารถเลือกได้มากกว่า 1 ข้อ) :</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" value="ทำเลที่ตั้ง" {...register("decisionFactors")} className="checkbox checkbox-sm rounded-full border-gray-500" />
                                    <span className="text-sm">ทำเลที่ตั้ง</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" value="ระบบรักษาความปลอดภัย" {...register("decisionFactors")} className="checkbox checkbox-sm rounded-full border-gray-500" />
                                    <span className="text-sm">ระบบรักษาความปลอดภัย</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" value="ราคาที่เหมาะสม" {...register("decisionFactors")} className="checkbox checkbox-sm rounded-full border-gray-500" />
                                    <span className="text-sm">ราคาที่เหมาะสม</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" value="คุณภาพ/รูปแบบที่โดดเด่น1" {...register("decisionFactors")} className="checkbox checkbox-sm rounded-full border-gray-500" />
                                    <span className="text-sm">คุณภาพ/รูปแบบที่โดดเด่น</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    {/* ในภาพมีข้อความซ้ำกัน ยึดตาม UI เดิม */}
                                    <input type="checkbox" value="คุณภาพ/รูปแบบที่โดดเด่น2" {...register("decisionFactors")} className="checkbox checkbox-sm rounded-full border-gray-500" />
                                    <span className="text-sm">คุณภาพ/รูปแบบที่โดดเด่น</span>
                                </label>
                                <div className="hidden md:block"></div> {/* ช่องว่าง */}

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" value="สาธารณูปโภคสิ่งอำนวยความสะดวก" {...register("decisionFactors")} className="checkbox checkbox-sm rounded-full border-gray-500" />
                                    <span className="text-sm">สาธารณูปโภคสิ่งอำนวยความสะดวก</span>
                                </label>

                                <div className="md:col-span-2 flex items-center gap-2">
                                    <span className="text-sm whitespace-nowrap">อื่นๆ :</span>
                                    <input type="text" className="input input-bordered h-8 w-full max-w-sm rounded-md border-gray-300" {...register("otherFactor")} />
                                </div>
                            </div>


                            <div className="flex justify-center gap-10">
                                {/* จำนวนผู้พักอาศัย */}
                                <fieldset className="fieldset flex-1">
                                    <legend className="fieldset-legend text-sm font-medium">จำนวนผู้พักอาศัย</legend>
                                    <input type="text" className="input" placeholder="จำนวนผู้พักอาศัย"
                                        {...register("familySize")} />
                                    {/* error */}
                                </fieldset>

                                {/* ราคาที่ท่านคาดว่าจะซื้อที่อยู่อาศัย */}
                                <fieldset className="fieldset flex flex-2">
                                    <legend className="fieldset-legend text-sm font-medium">ราคาที่ท่านคาดว่าจะซื้อที่อยู่อาศัย</legend>
                                    <input type="text" className="input" placeholder="ราคาที่ท่านคาดว่าจะซื้อที่อยู่อาศัย"
                                        {...register("expectedBudget")} />
                                    {/* error */}
                                </fieldset>
                            </div>
                            <p className='text-sm font-medium mt-2'>ท่านรู้จักและสะดวกที่จะรับข้อมูลข่าวสารจาก “โครงการธาราวิลล์”จากช่องทางใด :</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    {/* เปลี่ยนเป็น radio เพราะ informationSource ใน schema คือ String */}
                                    <input type="radio" value="Line, facebook" {...register("informationSource")} className="radio radio-sm border-gray-500" />
                                    <span className="text-sm">Line, facebook</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" value="สื่อสิ่งพิมพ์,โบว์ชัวร์" {...register("informationSource")} className="radio radio-sm border-gray-500" />
                                    <span className="text-sm">สื่อสิ่งพิมพ์,โบว์ชัวร์</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" value="คนรู้จัก" {...register("informationSource")} className="radio radio-sm border-gray-500" />
                                    <span className="text-sm">คนรู้จัก</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" value="ป้ายไวนิล" {...register("informationSource")} className="radio radio-sm border-gray-500" />
                                    <span className="text-sm">ป้ายไวนิล</span>
                                </label>

                                <div className="md:col-span-2 flex items-center gap-2">
                                    <span className="text-sm whitespace-nowrap">อื่นๆ :</span>
                                    <input type="text" className="input input-bordered h-8 w-full max-w-sm rounded-md border-gray-300" {...register("otherNewsChannel")} />
                                </div>
                            </div>

                            <div className="flex justify-center ">
                                {/* ค่างวดที่สะดวกในการผ่อนชำระต่อเดือน */}
                                <fieldset className="fieldset w-full">
                                    <legend className="fieldset-legend text-sm font-medium w-full">ค่างวดที่สะดวกในการผ่อนชำระต่อเดือน</legend>
                                    <input type="text" className="input w-full" placeholder="ค่างวดที่สะดวกในการผ่อนชำระต่อเดือน"
                                        {...register("province")} />
                                    {/* error */}
                                </fieldset>

                            </div>

                            <div className="w-full flex justify-end">
                                <button className='btn bg-brand text-white w-35 h-12 font-medium mt-10' type='submit'>ลงทะเบียนเลย!</button>
                            </div>

                        </form>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default SurveyForm