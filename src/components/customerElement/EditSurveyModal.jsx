import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, ToastContainer } from 'react-toastify';
import useDataStore from '../../stores/dataStore';
import { deleteSurveyApi, editSurveyApi } from '../../api/CreateApi';
import { updateSurveySchema } from '../../validations/schema';
import { FileText, Trash2, Save } from 'lucide-react';
import Swal from 'sweetalert2';
import { swal01 } from '../../utils/swalFire';

function EditSurveyModal(props) {
  const { customerId, customer, modalId } = props;

  const survey = customer?.projectSurveys;
  const surveyId = survey?.surveyId;
  const isDeleted = survey?.deletedAt;
  // console.log(isDeleted)
  const getSurveyData = useDataStore(state => state.getSurveyData);

  const { register, reset, formState, handleSubmit } = useForm({
    resolver: zodResolver(updateSurveySchema), 
    mode: "onSubmit",
  });
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    

    if (isDeleted) {
      return reset({
        customerId: String(customerId),
        userId: "",
        visitDate: "",
        interestedPropertyType: "",
        preferredBedroom: "",
        preferredBathroom: "",
        decisionFactors: [],
        familySize: "",
        expectedBudget:  "",
        informationSource: "",
        installmentCapacity: "",
        otherNewsChannel:  "",
        remark:  "",
        surveyType: "Online", 
      }) 
    } else  {
      reset({
        customerId: String(customerId),
        userId: survey?.userId ? String(survey?.userId) : "",
        visitDate: survey?.visitDate ? survey?.visitDate.split('T')[0] : "",
        interestedPropertyType: survey?.interestedPropertyType || "",
        preferredBedroom: survey?.preferredBedroom ? String(survey?.preferredBedroom) : "",
        preferredBathroom: survey?.preferredBathroom ? String(survey?.preferredBathroom) : "",
        decisionFactors: survey?.decisionFactors?.map(df => df.decisionFactor) || [],
        familySize: survey?.familySize ? String(survey?.familySize) : "",
        expectedBudget: survey?.expectedBudget || "",
        informationSource: survey?.informationSource || "",
        installmentCapacity: survey?.installmentCapacity || "",
        otherNewsChannel: survey?.otherNewsChannel || "",
        remark: survey?.remark || "",
        surveyType: survey?.surveyType || "Online", 
      });
    }
  }, []);

  const Xbtn = () => {
    document.getElementById(modalId).close();
  };

  const onDeleteSurvey = async () => {
    if (!survey?.surveyId) {
      toast.error("ไม่พบข้อมูลแบบสอบถามให้ลบ", { containerId: modalId });
      return;
    }
    try {
      const resp = await deleteSurveyApi(surveyId);

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
            
      toast.success(resp.data?.message || "ลบแบบสอบถามสำเร็จ", { containerId: "CustomerBody" });

      if (getSurveyData) getSurveyData();
      document.getElementById(modalId).close();
    } catch (error) {
      console.dir(error);
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg, { containerId: modalId });
    }
  };

  const onSubmitForm = async (data) => {
    if (!surveyId) {
      toast.error("ไม่พบรหัสแบบสอบถาม (Survey ID)", { containerId: modalId });
      return;
    }

    try {
      const resp = await editSurveyApi(data, surveyId);
      toast.success(resp.data?.message || "อัปเดตแบบสอบถามสำเร็จ", { containerId: "CustomerBody" });

      if (getSurveyData) getSurveyData();
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

      <div className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-2">
        {isSubmitting && <span className="loading loading-spinner loading-md"></span>}
        <FileText className="text-blue-600" size={28} />
        แก้ไขข้อมูลแบบสอบถาม
      </div>
      <div className="divider opacity-60 my-2"></div>

      <form onSubmit={handleSubmit(onSubmitForm)}>
        {/* ส่ง customerId ไปด้วยแบบซ่อนตาม Schema ที่ required ไว้ */}
        <input type="hidden" {...register('customerId')} />

        <fieldset disabled={isSubmitting} className='flex flex-col gap-4 p-2'>

          {/* แถว 1: ประเภทติดต่อ - วันที่เข้าชม - พนักงานที่ดูแล */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">ประเภทการติดต่อ</span></label>
              <select className={`select select-bordered w-full ${errors.surveyType ? 'select-error' : ''}`} {...register('surveyType')}>
                <option value="Online">Online</option>
                <option value="Walkin">Walk-in</option>
              </select>
              {errors.surveyType && <span className="text-sm text-error mt-1">{errors.surveyType.message}</span>}
            </div>
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">วันที่เข้าชม </span></label>
              <input type="date" className={`input input-bordered w-full ${errors.visitDate ? 'input-error' : ''}`} {...register('visitDate')} />
              {errors.visitDate && <span className="text-sm text-error mt-1">{errors.visitDate.message}</span>}
            </div>
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">พนักงานที่ดูแล </span></label>
              <input type="text" placeholder='รหัสพนักงาน' className={`input input-bordered w-full ${errors.userId ? 'input-error' : ''}`} {...register('userId')} />
              {errors.userId && <span className="text-sm text-error mt-1">{errors.userId.message}</span>}
            </div>
          </div>

          {/* แถว 2: ประเภทบ้าน - งบประมาณ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">ประเภทบ้านที่สนใจ</span></label>
              <input type="text" placeholder='เช่น บ้านเดี่ยว, ทาวน์โฮม' className={`input input-bordered w-full ${errors.interestedPropertyType ? 'input-error' : ''}`} {...register('interestedPropertyType')} />
              {errors.interestedPropertyType && <span className="text-sm text-error mt-1">{errors.interestedPropertyType.message}</span>}
            </div>
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">งบประมาณที่คาดหวัง</span></label>
              <input type="text" placeholder='งบประมาณ (บาท)' className={`input input-bordered w-full ${errors.expectedBudget ? 'input-error' : ''}`} {...register('expectedBudget')} />
              {errors.expectedBudget && <span className="text-sm text-error mt-1">{errors.expectedBudget.message}</span>}
            </div>
          </div>

          {/* แถว 3: ห้องนอน - ห้องน้ำ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">ห้องนอน (ห้อง)</span></label>
              <input type="number" placeholder='จำนวน' className={`input input-bordered w-full ${errors.preferredBedroom ? 'input-error' : ''}`} {...register('preferredBedroom')} />
            </div>
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">ห้องน้ำ (ห้อง)</span></label>
              <input type="number" placeholder='จำนวน' className={`input input-bordered w-full ${errors.preferredBathroom ? 'input-error' : ''}`} {...register('preferredBathroom')} />
            </div>
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">ขนาดครอบครัว (คน)</span></label>
              <input type="text" placeholder='จำนวนคน' className={`input input-bordered w-full ${errors.familySize ? 'input-error' : ''}`} {...register('familySize')} />
            </div>
          </div>

          <div className="divider my-0 opacity-50">ปัจจัยและแหล่งข้อมูล</div>

          {/* แถว 4: ปัจจัยในการตัดสินใจ (Checkbox array) */}
          <div className="form-control w-full">
            <label className='label'><span className="label-text font-medium">ปัจจัยในการตัดสินใจเลือกซื้อ (Decision Factors)</span></label>
            <div className="flex flex-wrap gap-4 mt-1">
              <label className="cursor-pointer flex items-center gap-2">
                <input type="checkbox" value="ทำเลที่ตั้ง" className="checkbox checkbox-sm" {...register('decisionFactors')} />
                <span className="label-text">ทำเลที่ตั้ง</span>
              </label>
              <label className="cursor-pointer flex items-center gap-2">
                <input type="checkbox" value="คุณภาพ/รูปแบบที่โดดเด่น1" className="checkbox checkbox-sm" {...register('decisionFactors')} />
                <span className="label-text">คุณภาพ/รูปแบบ</span>
              </label>
              <label className="cursor-pointer flex items-center gap-2">
                <input type="checkbox" value="สาธารณูปโภคสิ่งอำนวยความสะดวก" className="checkbox checkbox-sm" {...register('decisionFactors')} />
                <span className="label-text">สิ่งอำนวยความสะดวก</span>
              </label>
              <label className="cursor-pointer flex items-center gap-2">
                <input type="checkbox" value="ราคาและความคุ้มค่า" className="checkbox checkbox-sm" {...register('decisionFactors')} />
                <span className="label-text">ราคา/ความคุ้มค่า</span>
              </label>
            </div>
          </div>

          {/* แถว 5: แหล่งข้อมูล - สื่ออื่นๆ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">รู้จักโครงการจากสื่อใด</span></label>
              <input type="text" placeholder='เช่น Facebook, ป้ายโฆษณา' className={`input input-bordered w-full ${errors.informationSource ? 'input-error' : ''}`} {...register('informationSource')} />
            </div>
            <div className="form-control w-full">
              <label className='label'><span className="label-text font-medium">สื่ออื่นๆ (ระบุ)</span></label>
              <input type="text" placeholder='โปรดระบุ' className={`input input-bordered w-full ${errors.otherNewsChannel ? 'input-error' : ''}`} {...register('otherNewsChannel')} />
            </div>
          </div>

          {/* แถว 6: ความสามารถในการผ่อน */}
          <div className="form-control w-full">
            <label className='label'><span className="label-text font-medium">ความสามารถในการผ่อนชำระ (บาท/เดือน)</span></label>
            <input type="text" placeholder='เช่น 10000-15000' className={`input input-bordered w-full ${errors.installmentCapacity ? 'input-error' : ''}`} {...register('installmentCapacity')} />
          </div>

          {/* แถว 7: หมายเหตุ */}
          <div className="form-control w-full">
            <label className='label'><span className="label-text font-medium">หมายเหตุเพิ่มเติม (Remark)</span></label>
            <textarea placeholder='ระบุหมายเหตุ' className={`textarea textarea-bordered h-24 ${errors.remark ? 'textarea-error' : ''}`} {...register('remark')}></textarea>
          </div>

          {/* ปุ่มบันทึก และ ปุ่มลบ */}
          <div className="flex gap-4 mt-4">
            <button
              className='btn bg-red-500 hover:bg-red-600 text-white flex-1'
              onClick={() => swal01(onDeleteSurvey, modalId)}
              disabled={isSubmitting || !surveyId}
              type='button'
            >
              <Trash2 size={20} /> ลบแบบสอบถาม
            </button>
            <button
              className='btn bg-blue-600 hover:bg-blue-700 text-white flex-1'
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

export default EditSurveyModal;