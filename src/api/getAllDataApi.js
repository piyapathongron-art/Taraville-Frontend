import { mainApi } from "./MainApi";

export async function getAllAssignment() {
    return await mainApi.get("/assignments")
}

export async function getAllHouses() {
    return await mainApi.get("/houses")
}

export async function getAllCustomers(){
    return await mainApi.get("/customers")
}

export async function getAllSurvey() {
    return await mainApi.get("/surveys")
}

export async function getAllEmployee() {
    return await mainApi.get("/employees")
}