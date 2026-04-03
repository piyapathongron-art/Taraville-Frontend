import { lazy, Suspense } from "react";

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import useUserStore from '../stores/userStore';
import { Loader2 } from "lucide-react";


const MainLayout = lazy(() => import("../layouts/MainLayout"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const ProjectPage = lazy(() => import("../pages/ProjectPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/Contact"));
const SystemLayout = lazy(() => import("../layouts/SystemLayout"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const AssignmentPage = lazy(() => import("../pages/AssignmentPage"))
const SystemLayoutAdmin = lazy(()=>import("../layouts/SystemLayoutAdmin"))
const DashboardAI = lazy(()=>import("../pages/DashboardAI"))
const SurveyContactPage = lazy(()=>import("../pages/SurveyContact"))
const EmployeePage = lazy(()=>import("../pages/EmployeesPage"))
const HousePage = lazy(()=>import("../pages/HousePage"))
const AssignmentAdminPage = lazy(()=>import("../pages/AssignmentAdminPage"))
const CustomerPage = lazy(()=>import("../pages/CustomerPage"))


const publicPages = [
    { path: "/home", Component: LandingPage },
    { path: "/projects", Component: ProjectPage },
    { path: "/about", Component: AboutPage },
    { path: "/contact", Component: ContactPage },
    { path: "/contact/2", Component: SurveyContactPage}
];


const guestRouter = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            { index: true, Component: LandingPage },
            ...publicPages
        ]
    },
    {
        path: "/login",
        Component: SystemLayout,
        children: [
            { index: true, Component: LoginPage }
        ]
    },
    //check random url
    { path: "*", element: <Navigate to="/" /> }
]);

//admin role route
const adminRouter = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            { index: true, element: <Navigate to="/dashboard" /> },
            ...publicPages
        ]
    },
    {
        path: "/",
        Component: SystemLayoutAdmin,
        children: [
            { path: "/dashboard", Component: DashboardAI },
            { path: "/assignment", Component: AssignmentPage },
            { path: "/employee", Component: EmployeePage},
            { path: "/house", Component: HousePage},
            { path: "/allAssignment", Component: AssignmentAdminPage},
            { path: "/customer", Component: CustomerPage}
        ]
    },
    //check random url
    { path: "*", element: <Navigate to="/dashboard" /> }
]);


const userRouter = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            { index: true, element: <Navigate to="/assignment" /> },
            ...publicPages
        ]
    },
    {
        path: "/",
        Component: SystemLayout,
        children: [
            { path: "/assignment", Component: AssignmentPage }
        ]
    },
    //check random url
    { path: "*", element: <Navigate to="/assignment" /> }
]);



function AppRouter() {
    const user = useUserStore(state => state.user);
    const finalRouter = user?.role === "User" || user?.role === "Staff" ? userRouter : user?.role === "Admin" ? adminRouter :guestRouter ;
    console.log("Current user:", user);
// console.log(user)
    return (
        <Suspense fallback={<div className="w-full h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center bg-base-200/40">
                <Loader2 className="animate-spin text-[#f2b91c] mb-4" size={68} />
                <p className="text-xl text-base-content/60 font-medium">กำลังโหลดข้อมูล</p>
            </div>}>
            <RouterProvider key={user?.userId || "guest"} router={finalRouter} />
        </Suspense>
    );
}

export default AppRouter;