import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getAllAssignment, getAllCustomers, getAllEmployee, getAllHouses, getAllSurvey } from "../api/getAllDataApi";

const useDataStore = create((set, get) => ({

    houses: [],
    assignments: [],
    customers: [],
    surveys: [],
    employee: [],
    isLoading: false,
    getAllData: async () => {
        set({ isLoading: true });
        try {

            const [housesResp, assignmentsResp, customersResp, surveysResp, employeeResp] = await Promise.all([
                getAllHouses(),
                getAllAssignment(),
                getAllCustomers(),
                getAllSurvey(),
                getAllEmployee(),
            ]);


            set({
                houses: housesResp.data.result || [],
                assignments: assignmentsResp.data.result || [],
                customers: customersResp.data.result || [],
                surveys: surveysResp.data.result || [],
                employee: employeeResp.data.result || [],
                isLoading: false
            });

            console.log(employeeResp)

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            set({ isLoading: false });
        }
    },
    getEmployeeData: async () => {
        const resp = await getAllEmployee()
        set({employee: resp.data.result})
    },
    getHouseData: async () => {
        const resp = await getAllHouses()
        set({houses: resp.data.result})
    }
}));

export default useDataStore