import { mainApi } from "./MainApi";

export async function getMyAssignmentApi() {
    return await mainApi.get("/assignments/me")
}