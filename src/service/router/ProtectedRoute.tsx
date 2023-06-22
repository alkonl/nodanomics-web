import {Navigate} from "react-router-dom";
import React from "react";
import {useShouldLoadRoute} from "../superTokens";
import {ELinks} from "./links";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const canLoad = useShouldLoadRoute();
    if (!canLoad) {
        return <Navigate to={ELinks.main} replace/>;
    }
    return <>{children}</>
};