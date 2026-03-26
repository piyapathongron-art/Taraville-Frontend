import React from 'react'
import { useForm } from 'react-hook-form'
import { registerSchema } from '../validations/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { apiRegisterUser } from '../api/MainApi'
import { toast, ToastContainer } from 'react-toastify'

function RegisterModal() {

  const { register, reset, formState, handleSubmit } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    defaultValues: { empId: "", password: "", confirmPassword: "" }
  })
  const { errors, isSubmitting, isValid } = formState

  const Xbtn = () => {
    document.querySelector("#register-form").close()
    reset()
  }

  const onSubmit = async (data) => {
    try {
      const resp = await apiRegisterUser(data)
      console.log(resp)
      toast.success(resp.data.message)
      document.querySelector("#register-form").close()
    } catch (error) {
      console.dir(error)
      const errMsg = error.response?.data.error || error.message
      toast.error(errMsg, {containerId: 'registerform'})
    }
  }

  return (
    <>
      <ToastContainer containerId="registerform"/>
      <form method="dialog">
        <button type='button' onClick={Xbtn} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

      <div className="text-3xl text-center opacity-70">
        {isSubmitting && <span className="loading loading-spinner loading-xl mx-5"></span>}
        สร้างบัญชี
      </div>
      <div className="divider opacity-60"></div>
      <form onSubmit={handleSubmit(onSubmit)} >

        <fieldset disabled={isSubmitting} className='flex flex-col gap-5 p-4 pt-3'>


          <div className="w-full flex flex-col ">
            <p className='ml-1'>รหัสพนักงาน</p>
            <input type="text"
              placeholder='รหัสพนักงาน'
              className='input input-bordered w-full mt-1'
              {...register('empId')}
            />
            <p className="text-sm text-error">{errors.empId?.message}</p>
            <p className='text-end text-nav underline cursor-pointer mt-2'>ไม่ทราบรหัสพนักงาน?</p>
          </div>

          <div className="w-full">
            <p className='ml-1'>รหัสผ่าน</p>
            <input type="password"
              placeholder='รหัสผ่าน'
              className='input input-bordered w-full'
              {...register('password')}
            />
            <p className="text-sm text-error">{errors.password?.message}</p>
          </div>

          <div className="w-full">

            <input type="password"
              placeholder='ยืนยันรหัสผ่าน'
              className='input input-bordered w-full'
              {...register('confirmPassword')} />
            <p className="text-sm text-error">{errors.confirmPassword?.message}</p>
          </div>

          <button className='btn bg-brand text-xl text-white' disabled={isSubmitting}>Sign up</button>

        </fieldset>

      </form>
    </>
  )
}

export default RegisterModal