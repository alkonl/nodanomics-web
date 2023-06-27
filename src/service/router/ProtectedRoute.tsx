import {Navigate} from "react-router-dom";
import React from "react";
import {useShouldLoadRoute} from "../superTokens";
import {ELinks} from "./links";
import {CircularProgress} from "@mui/material";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const canLoad = useShouldLoadRoute();
    if (canLoad.isLoading) {
        return <div>
            <CircularProgress/>
        </div>
    }
    if (canLoad.hasInvalidClaims) {
        return <Navigate to={ELinks.main} replace/>;
    }
    return <>{children}</>
};
