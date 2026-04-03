import Swal from "sweetalert2";

export function swal01(handleDelete,modalId){
  document.getElementById(modalId).close()
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then ( async (result) => {
  if (result.isConfirmed) 
    await handleDelete()
});
}
export function swal02(func,modalId){
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then ( async (result) => {
  if (result.isConfirmed) 
    location.reload()
});
}