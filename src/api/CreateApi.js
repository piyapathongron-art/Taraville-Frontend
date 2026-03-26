import { mainApi } from "./MainApi";


export async function createEmployeeApi(body) {
        return await mainApi.post("/employees",body)
}

export async function editEmployeeApi(body,id) {
    return await mainApi.put(`/employees/${id}`,body)
}

export async function deleteEmployeeApi(id) {
    return await mainApi.delete(`/employees/${id}`)
}