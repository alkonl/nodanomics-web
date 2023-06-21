import { createBrowserRouter} from "react-router-dom";
import React from "react";
import {DashboardPage, RegistrationPage, VerificationLink} from "../../pages";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <DashboardPage/>,
    },{
        path: "/register",
        element: <RegistrationPage/>,
    }, {
        path: "/VerificationLink",
        element: <VerificationLink/>,
    }
]);
