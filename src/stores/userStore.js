import { create } from "zustand";
import { apiGetMe, apiLogin, editUserInfo } from "../api/MainApi";
import { createJSONStorage, persist } from "zustand/middleware";
import { getMyAssignmentApi } from "../api/AssignmentApi";

const useUserStore = create(persist(
    (set, get) => ({
        user: null,
        token: "",
        role: null,
        assignment: null,
        login: async (body) => {
            const resp = await apiLogin(body)
            set({ token: resp.data.token, role: resp.data.role })
            const userInfo = await apiGetMe()
            // console.log(resp)
            set({ user: { ...userInfo?.data, ...resp.data } })
            // console.log(userInfo)
            // console.log("login called, user updated:", get().user)
            // console.log("login called, user updated:", get().user)
            // console.log("token:", get().token)
            return resp
        },
        logout: () => set({ user: null, token: "" }),
        getAssignment: async () => {
            // const respGetMe = await apiGetMe()
            // set({ user: respGetMe.data })
            // console.log("getAssignment called, user updated:", respGetMe)
            const resp = await getMyAssignmentApi()
            // console.log(resp) 
            set({ assignment: resp.data.assignment })
        },
        editUserInfo: async (data, employeeId) => {
            const resp = await editUserInfo(data, employeeId)
            // console.log(resp)
            set({ user: { ...get().user, ...data } })
            // console.log(get().user)
            return resp
        }

    }), {
    name: "authStorage",
    storage: createJSONStorage(() => localStorage)
}
))

export default useUserStore