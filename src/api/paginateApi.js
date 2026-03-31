import { mainApi } from "./MainApi";

export async function getPaginateApi({search, type , status,page, limit}) {
    const quueryParams = new URLSearchParams({
        search: search || '',
        type: type || '',
        status: status || '',
        page: page || 1,
        limit: limit || 5
    }).toString();
    return await mainApi.get(`/houses/search?${quueryParams}`)
}