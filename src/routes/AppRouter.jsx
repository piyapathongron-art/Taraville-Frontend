import { Component, lazy, Suspense } from "react";

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import useUserStore from '../stores/userStore';


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
            { path: "/allAssignment", Component: AssignmentAdminPage}
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
            { index: true, element: <Navigate to="/login" /> },
            ...publicPages
        ]
    },
    {
        path: "/",
        Component: SystemLayout,
        children: [
            { path: "/login", Component: LoginPage },
            { path: "/assignment", Component: AssignmentPage }
        ]
    },
    //check random url
    { path: "*", element: <Navigate to="/login" /> }
]);

function AppRouter() {
    const user = useUserStore(state => state.user);




    const finalRouter = user?.role === "User" ? userRouter : user?.role === "Admin" ? adminRouter :guestRouter ;
// console.log(user)
    return (
        <Suspense fallback={<div>Loading....</div>}>
            <RouterProvider key={user?.userId || "guest"} router={finalRouter} />
        </Suspense>
    );
}

export default AppRouter;