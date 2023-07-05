import {createBrowserRouter} from "react-router-dom";
import React from "react";
import {
    AuthGoogle,
    LandingPage,
    ForgotPassword,
    LoginPage,
    ManageUserDataPage,
    RegistrationPage,
    VerificationLink, DiagramEditorPage
} from "../../pages";
import {ELinks} from "./links";
import {DashboardPage} from "../../pages/DashboardPage";
import {AccountLayout} from "../../component";

export const appRouter = createBrowserRouter([
    {
        path: ELinks.main,
        element: <LandingPage/>,
        children: [{
            path: ELinks.accountManageData,
            element: <AccountLayout/>,
            children: [{
                path: ELinks.accountPlan,
                element: <div>accountPlan</div>
            },{
                path: ELinks.accountBilling,
                element: <div>accountBilling</div>
            },{
                path: ELinks.accountNFT,
                element: <div>accountNFT</div>
            },{
                path: ELinks.accountSettings,
                element: <div>accountSettings</div>
            }]
        }]
    }, {
        path: ELinks.register,
        element: <RegistrationPage/>,
    }, {
        path: ELinks.verificationLink,
        element: <VerificationLink/>,
    }, {
        path: ELinks.login,
        element: <LoginPage/>,
    }, {
        path: ELinks.forgotPassword,
        element: <ForgotPassword/>,
    }, {
        path: ELinks.authGoogle,
        element: <AuthGoogle/>,
    }, {
        path: ELinks.dashboard,
        element: <DashboardPage/>
    }, {
        path: `${ELinks.diagram}/:diagramId`,
        element: <DiagramEditorPage/>
    }, {
        path: `${ELinks.diagram}`,
        element: <DiagramEditorPage/>
    }
]);
