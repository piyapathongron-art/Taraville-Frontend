import { useForm } from 'react-hook-form'
import { createEmployeeSchema } from '../../validations/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast, ToastContainer } from 'react-toastify'
import { createEmployeeApi } from '../../api/CreateApi'
import useDataStore from '../../stores/dataStore'

function CreateEmployeeModal() {
  const getEmployeeData = useDataStore(state=>state.getEmployeeData)
  const { register, reset, formState, handleSubmit } = useForm({
    resolver: zodResolver(createEmployeeSchema),
    mode: "onSubmit",
    defaultValues: { firstName:"",lastName:"",email:"",phone:"",salary:"",address:"" }
  })
  const { errors, isSubmitting, isValid } = formState

  const Xbtn = () => {
    document.querySelector("#createEmployee").close()
    reset()
  }

  const onSubmit = async (data) => {
    try {
      // console.log(data)
      const resp = await createEmployeeApi(data)
      // console.log(resp)
      toast.success(resp.data.message)
      getEmployeeData()
      document.querySelector("#createEmployee").close()

    } catch (error) {
      console.dir(error)
      const errMsg = error.response?.data.error || error.message
      toast.error(errMsg, { containerId: 'createEmployee' })
    }
  }

  return (
    <>
      <ToastContainer containerId="createEmployee" />
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


          <div className="w-full flex gap-10 ">
            {/* ชื่อ */}
            <div className="flex flex-col">
              <p className='ml-1'>ชื่อ</p>
              <input type="text"
                placeholder='ชื่อ'
                className='input input-bordered w-full mt-1'
                {...register('firstName')}
              />
              <p className="text-sm text-error">{errors.firstName?.message}</p>
            </div>
            {/* นามสกุล */}
            <div className="flex flex-col">
              <p className='ml-1'>นามสกุล</p>
              <input type="text"
                placeholder='นามสกุล'
                className='input input-bordered w-full mt-1'
                {...register('lastName')}
              />
              <p className="text-sm text-error">{errors.lastName?.message}</p>
            </div>
          </div>

          {/* แถว 2  */}
          <div className="w-full flex gap-10 ">
            {/* อีเมล */}
            <div className="flex flex-col">
              <p className='ml-1'>อีเมล</p>
              <input type="text"
                placeholder='อีเมล'
                className='input input-bordered w-full mt-1'
                {...register('email')}
              />
              <p className="text-sm text-error mt-1">{errors.email?.message}</p>
            </div>
            {/* โทรศัพท์ */}
            <div className="flex flex-col">
              <p className='ml-1'>โทรศัพท์</p>
              <input type="text"
                placeholder='โทรศัพท์'
                className='input input-bordered w-full mt-1'
                {...register('phone')}
              />
              <p className="text-sm text-error mt-1">{errors.phone?.message}</p>
            </div>
          </div>
          {/* เงินเดือน */}
          <div className="w-full">
            <p className='ml-1'>เงินเดือน</p>
            <input type="password"
              placeholder='เงินเดือน'
              className='input input-bordered w-full'
              {...register('salary')}
            />
            <p className="text-sm text-error">{errors.salary?.message}</p>
          </div>

          <div className="w-full">
            <p className='ml-1'>ที่อยู่</p>
            <input type="text"
              placeholder='ที่อยู่'
              className='input input-bordered w-full'
              {...register('address')} />
            <p className="text-sm text-error">{errors.address?.message}</p>
          </div>

          <button className='btn bg-brand text-xl text-white' disabled={isSubmitting}>Sign up</button>

        </fieldset>

      </form>
    </>
  )
}

export default CreateEmployeeModal