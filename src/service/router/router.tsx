import { createBrowserRouter} from "react-router-dom";
import React from "react";
import {DashboardPage, RegistrationPage, VerificationLink} from "../../pages";
import {ELinks} from "./links";

export const appRouter = createBrowserRouter([
    {
        path: ELinks.main,
        element: <DashboardPage/>,
    },{
        path: ELinks.register,
        element: <RegistrationPage/>,
    }, {
        path: ELinks.verificationLink,
        element: <VerificationLink/>,
    }
]);
