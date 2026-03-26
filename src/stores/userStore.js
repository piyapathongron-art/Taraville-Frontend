import {create } from "zustand";
import { apiGetMe, apiLogin } from "../api/MainApi";
import { createJSONStorage, persist } from "zustand/middleware";
import { getMyAssignmentApi } from "../api/AssignmentApi";

const useUserStore = create(persist(
    (set,get) => ({ 
    user: null,
    token: "",
    assignment: null,
    login: async(body) => {
        const resp = await apiLogin(body)
        //เอาtokenลงมาก่อน
        set({token: resp.data.token})
        // console.log(resp)
        //ยิงเอาข้อมูล
        const userInfo = await apiGetMe()
        // console.log(userInfo)
        set({user: {...userInfo?.data, ...resp.data}})
        return resp
    },
    logout: ()=> set({user:null,token:""}),
    getAssignment: async() => {
        const resp = await getMyAssignmentApi()
        // console.log(resp) 
        set({assignment: resp.data.assignment})
    }


}), {
    name: "authStorage",
    storage: createJSONStorage( ()=> localStorage )
}
))

export default useUserStore