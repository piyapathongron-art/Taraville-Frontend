import {create } from "zustand";
import { apiSubmitCustomer, apiSubmitFullCustomer, apiSubmitSurvey} from "../api/MainApi";
import { createJSONStorage, persist } from "zustand/middleware";

const useCustomerStore = create(persist(
    (set,get) => ({ 
    customerId:null,
    customerInfo: null,
    submitMainCustomer: async(body) => {
        const resp = await apiSubmitCustomer(body)
        set({customerInfo: resp.data.customer ,customerId: resp.data.customer.customerId})
        return resp
    },
    submitFullCustomer: async(body,id) => {
        const resp = await apiSubmitFullCustomer(body,id)
        set({cusomterInfo: resp.data.cusomter })
        return resp
    },
    submitSurvey: async(body) => {
        const resp = await apiSubmitSurvey(body)
        set({customerInfo:null,customerId:null})
        return resp
    }
}), {
    name: "customerStorage",
    storage: createJSONStorage( ()=> localStorage )
}
))

export default useCustomerStore