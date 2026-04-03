import { OrangeHomeIcon } from '../icon'
import Footer from '../components/Footer'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../validations/schema'
import useUserStore from '../stores/userStore'
import { toast, ToastContainer } from 'react-toastify'
import RegisterModal from '../components/RegisterModal'

function LoginPage() {
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
        defaultValues: { empId: "", password: "" }
    })

    const { errors, isSubmitting ,isValid} = formState

    const login = useUserStore(state => state.login)
    // const user = useUserStore(state => state.user)
    // const navigate = useNavigate()

    const onSubmit = async (body) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            const resp = await login(body)
            // console.log(resp.data)
            // console.log(resp)
            toast.success("Login Success")


        } catch (error) {
            console.dir(error)
            const errMsg = error.response?.data.error || error.message

            toast.error(errMsg, {containerId: "login-page"})
        }
    }

    return (
        <>
            <div className='min-w-full'>
        <ToastContainer containerId={"login-page"}/>
                {/* text & logo */}
                <div className="w-full h-[95vh] flex justify-center items-center">
                    <div className="w-[80%] h-120 bg-white flex justify-evenly items-center">
                        <div className=" flex  items-center">
                            <OrangeHomeIcon className="w-40" />
                            <div className="flex flex-col">
                                <h1 className='text-4xl font-medium text-brand'>Taraville Employee System</h1>
                                <p>ระบบหลังบ้าน ธาราวิล และ บ้านคุณภาพ เพชรบูรณ์</p>
                            </div>
                        </div>

                        {/* login in box */}
                        <div className="flex justify-center self-center">

                            {/* loading spinner */}
                            {isSubmitting && <span className="loading loading-spinner loading-xl i absolute z-5 self-center text-brand brightness-100 w-25 "></span>}

                            {/* login form */}
                            <form onSubmit={handleSubmit(onSubmit)} className={!isSubmitting ? "fieldset bg-base-200  rounded-box w-xs border border-brand p-5 shadow-main" : "brightness-50 fieldset bg-base-200  rounded-box w-xs border border-brand p-5 shadow-main"}>
                                <fieldset disabled={isSubmitting }>

                                    <p className="font-medium mb-2 text-2xl px-1">เข้าสู่ระบบ</p>

                                    {/* employee Id field */}
                                    <label className="label text-black text-[15px]">รหัสพนักงาน</label>
                                    <input type="text" className="input" placeholder="Employee ID"
                                        {...register("empId")} />
                                    <p className='text-sm text-error pl-1'>{errors.empId?.message}</p>

                                    {/* password field */}
                                    <label className="label text-black text-[15px]">รหัสผ่าน</label>
                                    <input type="password" className="input" placeholder="Password"
                                        {...register("password")} />
                                    <p className='text-sm text-error pl-1'>{errors.password?.message}</p>

                                    <div className='flex flex-col'>
                                        {/* button */}
                                        <button className="btn  bg-navy  hover:bg-brand  text-white transition-all ease-in-out duration-500  mt-2" disabled={!isValid || isSubmitting}>ล็อคอิน</button>
                                        <button className="btn bg-white border hover:brightness-80 transition-all ease-in-out duration-500 border-navy mt-2" type='button' onClick={() => document.getElementById("register-form").showModal()}>สร้างบัญชี</button>
                                    </div>

                                </fieldset>
                            </form>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            <dialog id="register-form" className="modal">
                <div className="modal-box">

                    <RegisterModal />
                </div>
            </dialog>

        </>
    )
}

export default LoginPage