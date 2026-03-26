import { useForm } from 'react-hook-form'
import useCustomerStore from '../stores/customerStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCustomerSchema } from '../validations/schema'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

function FormCustomer() {
    const customerInfo = useCustomerStore(state => state.customerInfo)
    const submitMainCustomer = useCustomerStore(state => state.submitMainCustomer)

    const { register, reset, handleSubmit, formState } = useForm({
        resolver: zodResolver(createCustomerSchema),
        mode: "onSubmit",
        defaultValues: {
            firstName: "", lastName: "", gender: "", occupation: "", incomeRange: "", phone: "", lineId: ""
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
                lineId: customerInfo.lineId || ""
            });
        }
    }, []);

    const { isSubmitting, errors } = formState
    const navigate = useNavigate();

    const onSubmit = async (body) => {
        try {
            // console.log(body)
            await new Promise(resolve => setTimeout(resolve,2000))
            const resp = await submitMainCustomer(body)
            
             console.log(resp)
            toast.success('บันทึกข้อมูลเรียบร้อย')
            navigate("/contact")
          
        } catch (error) {
            console.dir(error)
            const errMsg = error.response?.data.error || error.message
            toast.error(errMsg)
        }
    }
 
    return (
        <div className='w-full py-10 overflow-hidden bg-white h-fit' >

            <div className="flex justify-center" >
                {isSubmitting && <span className="loading loading-spinner loading-xl absolute z-5 text-brand brightness-100 w-25 bottom-250"></span>}
                <div className={!isSubmitting ? "card  w-200 bg-base-100 card-xl shadow-xl border-brand border" : "brightness-50 card  w-200 bg-base-100 card-xl shadow-xl border-brand border"}>
                    <div className="card-body gap-10" >
                        <h2 className="card-title justify-center text-3xl">ลงทะเบียนสนใจโครงการ</h2>

                        <form onSubmit={handleSubmit(onSubmit)} >
                            <fieldset>
                                <div className="flex justify-center gap-10">
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend text-lg font-medium">ชื่อ</legend>
                                        <input type="text" className="input" placeholder="ชื่อจริง"
                                            {...register("firstName")} />
                                        {/* error */}
                                        <p className='text-sm text-error'>{errors.firstName?.message}</p>
                                    </fieldset>

                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend text-lg font-medium">นามสกุล</legend>
                                        <input type="text" className="input" placeholder="นามสกุล"
                                            {...register("lastName")} />
                                        {/* error */}
                                        <p className='text-sm text-error'>{errors.lastName?.message}</p>
                                    </fieldset>
                                </div>

                                {/* Gender */}
                                <div className="flex justify-center gap-10">
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend text-lg font-medium">เพศ</legend>


                                        <div className="flex gap-5">
                                            <label className='flex gap-2 text-lg'>
                                                <input type="radio" value="ชาย"
                                                    {...register("gender")} />ชาย
                                            </label>

                                            <label className='flex gap-2 text-lg'>
                                                <input type="radio" value="หญิง"
                                                    {...register("gender")} />หญิง
                                            </label>
                                        </div>
                                        {/* error */}
                                    </fieldset>

                                    {/* Occupation */}
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend text-lg font-medium">อาชีพ</legend>
                                        <input type="text" className="input" placeholder="ค้าขาย"
                                            {...register("occupation")} />
                                        {/* error */}
                                    </fieldset>

                                    {/* Income Range */}
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend text-lg font-medium">รายได้เฉลี่ยต่อเดือน</legend>
                                        <input type="text" className="input" placeholder="20,000"
                                            {...register("incomeRange")} />
                                        {/* error */}
                                    </fieldset>

                                </div>

                                <div className="flex justify-center gap-10">
                                    {/* Tel Number */}
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend text-lg font-medium">เบอร์โทร</legend>
                                        <input type="text" className="input" placeholder="เบอร์โทรศัพท์"
                                            {...register("phone")} />
                                        {/* error */}
                                        <p className='text-sm text-error'>{errors.phone?.message}</p>
                                    </fieldset>

                                    {/* Line Id */}
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend text-lg font-medium">Lind Id</legend>
                                        <input type="text" className="input" placeholder="Lind id"
                                            {...register("lineId")} />
                                        {/* error */}
                                    </fieldset>
                                </div>
                                <div className="w-full flex justify-end">
                                    <button className='btn bg-brand text-white font-medium mt-10 '>ลงทะเบียนเลย!</button>
                                </div>
                            </fieldset>
                        </form>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default FormCustomer