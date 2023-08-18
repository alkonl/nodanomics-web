import {Navigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useShouldLoadRoute} from "../superTokens";
import {ELinks} from "./links";
import {CircularProgress} from "@mui/material";
import {EColor} from "../../constant";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const canLoad = useShouldLoadRoute();

    if (canLoad.isLoading) {
        return <div>
            <CircularProgress sx={{
                color: EColor.lightPurple,
            }}/>
        </div>
    }
    if (canLoad.hasInvalidClaims) {
        return <Navigate to={ELinks.login} replace/>;
    }
    return <>{children}</>
};
