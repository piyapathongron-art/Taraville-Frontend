import { useEffect, useState} from 'react';
import { Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form'; 
import useDataStore from '../../stores/dataStore';
import { updateAssignmentSchema } from '../../validations/schema';
import { deleteAssignmentApi, editAssignmentApi } from '../../api/CreateApi';
import { toast, ToastContainer } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import SearchableDropdown from '../SearchableDropdown';


export default function EditAssignmentModal(props) {
  const { assignmentId, assignment, modalId } = props;
  
  // ดึง state จาก Store
  const houses = useDataStore(state => state.houses);
  const employee = useDataStore(state => state.employee);
  const getAssignmentData = useDataStore(state => state.getAssignmentData)

  // ดึง state มา map เพ่ือ ใส่ option
  const houseOptions = houses?.map(h => ({
    value: h.houseId,
    label: `${h.houseId} - ${h.houseCode}`
  })) || [];


  const employeeOptions = employee?.map(emp => ({
    value: emp.employeeId,
    label: `${emp.firstName} ${emp.lastName}`
  })) || [];

  // เพิ่ม setValue มาใช้กับ dropdownสร้างเอง
  const { register, reset, formState, handleSubmit,setValue } = useForm({
    resolver: zodResolver(updateAssignmentSchema),
    mode: "onSubmit",
  });
  const { errors, isSubmitting } = formState;

 const [selectedHouseId, setSelectedHouseId] = useState("");
  const [selectedEmpId, setSelectedEmpId] = useState("");

  useEffect(() => {
    if (assignment) {
      reset({
          taskTitle: assignment.taskTitle || "",
          taskDescription: assignment.taskDescription || "",
          houseId: assignment.houseId || "",
          empId: assignment.empId || "",
          dutyRole: assignment.dutyRole || "",
          assignedDate: assignment.assignedDate ? assignment.assignedDate.split('T')[0] : "",
          status: assignment.status || "Pending",
      });
    }
    //setvalue ไว้ใช้ใน searchable dropdown
    setSelectedHouseId(assignment.houseId || "");
    setSelectedEmpId(assignment.empId || "");
  }, [assignment, reset]);

  

  const Xbtn = () => {
    document.getElementById(modalId).close();
    reset();
  };

  const onDelete = async () => {
    if (window.confirm("ยืนยันการลบงานนี้?")) {
        try {
            // console.log("Deleting Assignment ID:", assignmentId);
            const resp = await deleteAssignmentApi(assignmentId);
            console.log(resp)
            toast.success("ลบงานสำเร็จ");
            getAssignmentData();
            document.getElementById(modalId).close()

        } catch (error) {
            console.dir(error);
            toast.error("เกิดข้อผิดพลาดในการลบงาน", { containerId: modalId });
        }
    }
  };

  const onSubmit = async (data) => {
    try {
      // console.log("Updating Assignment Data:", data);
      const resp = await editAssignmentApi(data, assignmentId);
      console.log(resp)
      toast.success("แก้ไขงานสำเร็จ",{containerId:"assignmentPage"});
      getAssignmentData();
      document.getElementById(modalId).close()

    } catch (error) {
      console.dir(error);
      toast.error("เกิดข้อผิดพลาดในการอัปเดต", { containerId: modalId });
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg  relative max-w-2xl mx-auto w-full">
      <ToastContainer containerId={modalId}/>
      <form method="dialog">
        <button type='button' onClick={Xbtn} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

      <div className="text-2xl font-bold text-center text-gray-800 mb-2">
        {isSubmitting && <span className="loading loading-spinner loading-md mx-2"></span>}
        แก้ไขข้อมูลงาน
      </div>
      <div className="divider opacity-60 my-2"></div>
      
      <form onSubmit={handleSubmit(onSubmit)} >
        <fieldset disabled={isSubmitting} className='flex flex-col gap-4 p-2'>

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
              <input type='hidden' {...register("houseId")}/>
              <SearchableDropdown 
                options={houseOptions}
                value={selectedHouseId}
                onChange={(val) => {setSelectedHouseId(val); setValue('houseId', val);}} 
                placeholder="-- ค้นหาและเลือกบ้าน --"
              />
              <p className="text-sm text-error">{errors.houseId?.message}</p>
            </div>
            
            <div className="flex flex-col w-1/2">
              <label className='text-sm font-medium text-gray-700 ml-1'>ผู้รับผิดชอบ (Employee)</label>
              <input type='hidden' {...register("empId")}/>
              <SearchableDropdown 
                options={employeeOptions}
                value={selectedEmpId}
                {...register("empId")}
                onChange={(val) => {setSelectedEmpId(val), setValue("empId",val)}} 
                placeholder="-- ค้นหาและเลือกพนักงาน --"
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

          {/* ปุ่ม Action */}
          <div className="flex gap-4 w-full">
            <button className='btn bg-red-500 hover:bg-red-600 text-white flex-1' onClick={onDelete} disabled={isSubmitting} type='button'>
              <Trash2 size={20} /> ลบงานนี้
            </button>
            <button className='btn bg-[#D98A2C] hover:bg-[#c27a26] text-white flex-1' disabled={isSubmitting} type="submit">
              บันทึกการแก้ไข
            </button>
          </div>

        </fieldset>
      </form>
    </div>
  );
}