import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getAllAssignment, getAllCustomers, getAllEmployee, getAllHouses, getAllSurvey } from "../api/getAllDataApi";
import { getSurveyByIdApi } from "../api/CreateApi";

const useDataStore = create((set, get) => ({

    houses: [],
    assignments: [],
    customers: [],
    surveys: [],
    employee: [],
    isLoading: false,
    setIsLoaing: (value)=> set({isLoading: value}),
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

            // console.log(assignmentsResp)

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            set({ isLoading: false });
        }
    },
    getEmployeeData: async () => {
        set({ isLoading: true });
        const resp = await getAllEmployee()
        set({employee: resp.data.result})
        set({ isLoading: false });
    },
    getHouseData: async () => {
        set({ isLoading: true });
        const resp = await getAllHouses()
        set({houses: resp.data.result})
        set({ isLoading: false });
    },
    getAssignmentData: async () => {
        set({ isLoading: true });
        try {

            const [housesResp, assignmentsResp, employeeResp] = await Promise.all([
                getAllHouses(),
                getAllAssignment(),
                getAllEmployee()
            ]);


            set({
                houses: housesResp.data.result || [],
                assignments: assignmentsResp.data.result || [],
                employee: employeeResp.data.result || [],
                isLoading: false
            });

            // console.log(assignmentsResp)
            // console.log(housesResp)
            // console.log(employeeResp)

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            set({ isLoading: false });
        }
    },
    getAllCustomersData: async () => {
        set({ isLoading: true });
        const resp = await getAllCustomers()
        set({customers: resp.data.result})
        set({ isLoading: false });
    },
    getSurveyData: async () => {
        set({ isLoading: true });
        try {
             const [customersResp, surveysResp] = await Promise.all([
                getAllCustomers(),
                getAllSurvey(),
            ]);
             set({
                customers: customersResp.data.result || [],
                surveys: surveysResp.data.result || [],
            });

            console.log(customersResp)

            set({ isLoading: false });

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            set({ isLoading: false });
        }
    }
}));

export default useDataStore