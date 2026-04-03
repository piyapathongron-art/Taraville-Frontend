import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, ToastContainer } from 'react-toastify';
import useDataStore from '../../stores/dataStore';
import { deleteCustomer, deleteSurveyApi, editCustomerApi } from '../../api/CreateApi';
import { updateCustomerSchema } from '../../validations/schema';
import { User, Trash2, Save } from 'lucide-react';
import Swal from "sweetalert2";
import { swal01 } from "../../utils/swalFire"

function EditCustomerModal(props) {
  const { customerId, customer, modalId } = props;


  const getSurveyData = useDataStore(state => state.getSurveyData);

  const { register, reset, formState, handleSubmit } = useForm({
    resolver: zodResolver(updateCustomerSchema),
    mode: "onSubmit",
  });
  const { errors, isSubmitting } = formState;


  useEffect(() => {
    if (customer) {
      reset({
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        phone: customer.phone || "",
        lineId: customer.lineId || "",
        email: customer.email || "",
        houseNo: customer.houseNo || "",
        street: customer.street || "",
        subDistrict: customer.subDistrict || "",
        district: customer.district || "",
        province: customer.province || "",
        zipcode: customer.zipcode || "",
        gender: customer.gender || "",
        occupation: customer.occupation || "",
        incomeRange: customer.incomeRange || "",
      });
    }
  }, [customer, reset]);

  const Xbtn = () => {
    document.getElementById(modalId).close();
    reset();
  };

  const onDeleteCustomer = async () => {
    try {
      const surveyId = customer?.projectSurveys?.surveyId;
      if (surveyId) {
        await deleteSurveyApi(surveyId);
      }

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",

      });

      const resp = await deleteCustomer(customerId);
      toast.success(resp.data?.message || "ลบข้อมูลลูกค้าสำเร็จ", { containerId:"CustomerBody" });
      console.log(resp)
      getSurveyData()

    } catch (error) {
      console.dir(error);
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg, { containerId: modalId });
    }
  };

  const onSubmitCustomer = async (data) => {
    try {
      const resp = await editCustomerApi(data, customerId);
      toast.success(resp.data?.message || "อัปเดตข้อมูลสำเร็จ", { containerId: "CustomerBody" });

      
      getSurveyData()
      document.getElementById(modalId).close();

    } catch (error) {
      console.dir(error);
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg, { containerId: modalId });
    }
  };

  return (
    <>
      <ToastContainer containerId={modalId} />

      
      <form method="dialog">
        <button type='button' onClick={Xbtn} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

      {/* Header */}
      <div className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-2">
        {isSubmitting && <span className="loading loading-spinner loading-md"></span>}
        <User className="text-[#D98A2C]" size={28} />
        แก้ไขข้อมูลลูกค้า
      </div>
      <div className="divider opacity-60 my-2"></div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmitCustomer)}>
        <fieldset disabled={isSubmitting} className='flex flex-col gap-4 p-2'>

          {/*ชื่อ นามสกุล */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">ชื่อ <span className="text-red-500">*</span></span></label>
              <input type="text" placeholder='ชื่อ' className={`input input-bordered w-full ${errors.firstName ? 'input-error' : ''}`} {...register('firstName')} />
              {errors.firstName && <span className="text-sm text-error mt-1">{errors.firstName.message}</span>}
            </div>
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">นามสกุล <span className="text-red-500">*</span></span></label>
              <input type="text" placeholder='นามสกุล' className={`input input-bordered w-full ${errors.lastName ? 'input-error' : ''}`} {...register('lastName')} />
              {errors.lastName && <span className="text-sm text-error mt-1">{errors.lastName.message}</span>}
            </div>
          </div>

          {/* เบอร์โทร  Line ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">เบอร์โทรศัพท์</span></label>
              <input type="text" placeholder='08x-xxx-xxxx' className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`} {...register('phone')} />
              {errors.phone && <span className="text-sm text-error mt-1">{errors.phone.message}</span>}
            </div>
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">Line ID</span></label>
              <input type="text" placeholder='Line ID' className={`input input-bordered w-full ${errors.lineId ? 'input-error' : ''}`} {...register('lineId')} />
              {errors.lineId && <span className="text-sm text-error mt-1">{errors.lineId.message}</span>}
            </div>
          </div>

          {/* อีเมล เพศ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">อีเมล</span></label>
              <input type="email" placeholder='example@email.com' className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`} {...register('email')} />
              {errors.email && <span className="text-sm text-error mt-1">{errors.email.message}</span>}
            </div>
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">เพศ</span></label>
              <select className={`select select-bordered w-full ${errors.gender ? 'select-error' : ''}`} {...register('gender')}>
                <option value="">ไม่ระบุ</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
              </select>
              {errors.gender && <span className="text-sm text-error mt-1">{errors.gender.message}</span>}
            </div>
          </div>

          {/* อาชีพ รายได้ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">อาชีพ</span></label>
              <input type="text" placeholder='อาชีพ' className={`input input-bordered w-full ${errors.occupation ? 'input-error' : ''}`} {...register('occupation')} />
              {errors.occupation && <span className="text-sm text-error mt-1">{errors.occupation.message}</span>}
            </div>
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">ช่วงรายได้</span></label>
              <input type="text" placeholder='เช่น 15000-30000' className={`input input-bordered w-full ${errors.incomeRange ? 'input-error' : ''}`} {...register('incomeRange')} />
              {errors.incomeRange && <span className="text-sm text-error mt-1">{errors.incomeRange.message}</span>}
            </div>
          </div>

          <div className="divider my-0 opacity-50">ที่อยู่</div>

          {/* บ้านเลขที่ ซอย/ถนน */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">บ้านเลขที่ / หมู่</span></label>
              <input type="text" placeholder='บ้านเลขที่' className={`input input-bordered w-full ${errors.houseNo ? 'input-error' : ''}`} {...register('houseNo')} />
              {errors.houseNo && <span className="text-sm text-error mt-1">{errors.houseNo.message}</span>}
            </div>
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">ถนน / ซอย</span></label>
              <input type="text" placeholder='ถนน / ซอย' className={`input input-bordered w-full ${errors.street ? 'input-error' : ''}`} {...register('street')} />
              {errors.street && <span className="text-sm text-error mt-1">{errors.street.message}</span>}
            </div>
          </div>

          {/* แขวง/ตำบล เขต/อำเภอ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">ตำบล / แขวง</span></label>
              <input type="text" placeholder='ตำบล' className={`input input-bordered w-full ${errors.subDistrict ? 'input-error' : ''}`} {...register('subDistrict')} />
              {errors.subDistrict && <span className="text-sm text-error mt-1">{errors.subDistrict.message}</span>}
            </div>
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">อำเภอ / เขต</span></label>
              <input type="text" placeholder='อำเภอ' className={`input input-bordered w-full ${errors.district ? 'input-error' : ''}`} {...register('district')} />
              {errors.district && <span className="text-sm text-error mt-1">{errors.district.message}</span>}
            </div>
          </div>

          {/* จังหวัด รหัสไปรษณีย์ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">จังหวัด</span></label>
              <input type="text" placeholder='จังหวัด' className={`input input-bordered w-full ${errors.province ? 'input-error' : ''}`} {...register('province')} />
              {errors.province && <span className="text-sm text-error mt-1">{errors.province.message}</span>}
            </div>
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">รหัสไปรษณีย์</span></label>
              <input type="text" placeholder='รหัสไปรษณีย์' className={`input input-bordered w-full ${errors.zipcode ? 'input-error' : ''}`} {...register('zipcode')} />
              {errors.zipcode && <span className="text-sm text-error mt-1">{errors.zipcode.message}</span>}
            </div>
          </div>

          {/* ปุ่มบันทึก ปุ่มลบ */}
          <div className="flex gap-4 mt-4">
            <button
              className='btn bg-red-500 hover:bg-red-600 text-white flex-1'
              onClick={()=>swal01(onDeleteCustomer,modalId)}
              disabled={isSubmitting}
              type='button'
            >
              <Trash2 size={20} /> ลบลูกค้า
            </button>
            <button
              className='btn bg-[#D98A2C] hover:bg-[#c27a26] text-white flex-1'
              disabled={isSubmitting}
              type='submit'
            >
              <Save size={20} /> บันทึกการเปลี่ยนแปลง
            </button>
          </div>

        </fieldset>
      </form>
    </>
  );
}

export default EditCustomerModal;