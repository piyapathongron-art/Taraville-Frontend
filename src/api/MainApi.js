import axios from "axios";
import useUserStore from "../stores/userStore";
import { toast } from "react-toastify";

export const mainApi = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

mainApi.interceptors.request.use(config => {
    const token = useUserStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//check token

mainApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log("Token หมดอายุ หรือไม่มีสิทธิ์เข้าถึง!");

            toast.error("เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่อีกครั้ง", {
                toastId: 'unauthorized-error'
            });

            const logout = useUserStore.getState().logout;
            logout();

            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);


// login api
export async function apiLogin(body) {
    return await mainApi.post("/auth/login", body)
}

//Landing Page Main Customer Submit
export async function apiSubmitCustomer(body) {
    return await mainApi.post("/customers", body)
}

export async function apiSubmitFullCustomer(body, id) {
    return await mainApi.put(`/customers/${id}`, body)
}

export async function apiSubmitSurvey(body) {
    return await mainApi.post("/surveys", body)
}

// get own infomation
export async function apiGetMe() {
    return await mainApi.get("/auth/me")
}

//register api
export async function apiRegisterUser(body) {
    return await mainApi.post("/auth/register", body)
}