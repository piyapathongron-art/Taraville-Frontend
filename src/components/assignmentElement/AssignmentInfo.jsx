import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateAssignmentSchema } from '../../validations/schema';
import { zodResolver } from '@hookform/resolvers/zod';


export default function AssignmentInfo(props) {
  const { assignmentId, assignment, modalIdinfo } = props;

  const { register, reset, formState } = useForm({
    resolver: zodResolver(updateAssignmentSchema),
    mode: "onSubmit",
  });
  const { errors } = formState;

  useEffect(() => {
    if (assignment) {
      reset({
        taskTitle: assignment.taskTitle || "",
        taskDescription: assignment.taskDescription || "",
        houseId: `${assignment.houseId}.${assignment.house.houseCode}` || "",
        empId: `${assignment.empId}.${assignment.employee.firstName}` || "",
        dutyRole: assignment.dutyRole || "",
        assignedDate: assignment.assignedDate ? assignment.assignedDate.split('T')[0] : "",
        status: assignment.status || "Pending",
      });
    }

  }, [assignment, reset]);



  const Xbtn = () => {
    document.getElementById(modalIdinfo).close();
    reset();
  };



  return (
    <div className="p-4 bg-white rounded-lg  relative max-w-2xl mx-auto w-full">
      <form method="dialog" >
        <button type='button' onClick={Xbtn} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

      <div className="text-2xl font-bold text-center text-gray-800 mb-2">
        ข้อมูลงาน
      </div>
      <div className="divider opacity-60 my-2"></div>

      <form >
        <fieldset disabled={true} className='flex flex-col gap-4 p-2'>

          {/* แถว 1: ชื่องาน */}
          <div className="w-full">
            <label className='text-sm font-medium text-gray-700 ml-1'>หัวข้องาน (Task Title)</label>
            <input type="text"
              placeholder='หัวข้องาน'
              className='input input-bordered w-full mt-1'
              {...register('taskTitle')}
            />
            <p className="text-sm text-error">{errors.taskTitle?.message}</p>
          </div>

          {/* แถว 2: บ้าน / พนักงาน (Searchable Dropdown) */}
          <div className="w-full flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className='text-sm font-medium text-gray-700 ml-1'>บ้าน (House)</label>
              <input type='text'
                {...register("houseId")}
                className='input input-bordered w-full mt-1'
              />
              <p className="text-sm text-error">{errors.houseId?.message}</p>
            </div>

            <div className="flex flex-col w-1/2">
              <label className='text-sm font-medium text-gray-700 ml-1'>ผู้รับผิดชอบ (Employee)</label>
              <input type='text'
                className='input input-bordered w-full mt-1'
                {...register("empId")}
              />
              <p className="text-sm text-error">{errors.empId?.message}</p>
            </div>
          </div>

          {/* แถว 3: วันที่มอบหมาย / สถานะ */}
          <div className="w-full flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className='text-sm font-medium text-gray-700 ml-1'>วันที่มอบหมาย</label>
              <input type="date"
                className='input input-bordered w-full mt-1'
                {...register('assignedDate')}
              />
              <p className="text-sm text-error">{errors.assignedDate?.message}</p>
            </div>
            <div className="flex flex-col w-1/2">
              <label className='text-sm font-medium text-gray-700 ml-1'>สถานะงาน</label>
              <select className='select select-bordered w-full mt-1' {...register('status')}>
                <option value="Pending">Pending (รอดำเนินการ)</option>
                <option value="In Progress">In Progress (กำลังทำ)</option>
                <option value="Completed">Completed (เสร็จสิ้น)</option>
                <option value="Review">Review (รอตรวจสอบ)</option>
              </select>
              <p className="text-sm text-error">{errors.status?.message}</p>
            </div>
          </div>

          {/* แถว 4: บทบาท (Duty Role) */}
          <div className="w-full flex flex-col">
            <label className='text-sm font-medium text-gray-700 ml-1'>บทบาทหน้าที่ (Duty Role)</label>
            <input type="text"
              placeholder='บทบาทที่ได้รับมอบหมาย'
              className='input input-bordered w-full mt-1'
              {...register('dutyRole')}
            />
            <p className="text-sm text-error">{errors.dutyRole?.message}</p>
          </div>

          {/* แถว 5: รายละเอียดงาน (Task Description) */}
          <div className="w-full flex flex-col">
            <label className='text-sm font-medium text-gray-700 ml-1'>รายละเอียดงาน</label>
            <textarea
              placeholder='ระบุรายละเอียดที่ต้องทำ...'
              className='textarea textarea-bordered w-full mt-1 h-20'
              {...register('taskDescription')}
            />
            <p className="text-sm text-error">{errors.taskDescription?.message}</p>
          </div>

          <div className="divider my-1"></div>


        </fieldset>
      </form>
    </div>
  );
}