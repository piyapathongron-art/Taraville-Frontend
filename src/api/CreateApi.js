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

export async function createHouseApi(body) {
    return await mainApi.post("/houses",body)
}

export async function editHouseApi(body,id) {
    return await mainApi.put(`/houses/${id}`,body)
}

export async function deleteHouseApi(id){
    return await mainApi.delete(`/houses/${id}`)
}

export async function uploadHouseImageApi(body,id) {
    return await mainApi.post(`/houses/${id}/images`,body)
}

export async function deleteHouseImageApi(id,imageId) {
    return await mainApi.post(`/houses/${id}/images/${imageId}`)
}

export async function createAssignmentApi(body){
    return await mainApi.post("/assignments",body)
}

export async function editAssignmentApi(body,id){
    return await mainApi.put(`/assignments/${id}`,body)
}

export async function deleteAssignmentApi(id){
    return await mainApi.delete(`/assignments/${id}`)
}