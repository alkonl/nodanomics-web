import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {ELinks, useShouldLoadRoute} from "../../service";
import {useCurrentPath} from "../../hooks/useCurrentPath";
import {LandingHeader} from "../../component";
import {ProtectedRoute} from "../../service/router/ProtectedRoute";

export const LandingPage = () => {

    const navigate = useNavigate()
    const path = useCurrentPath()
    const isUserLogged = useShouldLoadRoute();

    useEffect(() => {

        if (path === '/' && !isUserLogged.isLoading && !isUserLogged.hasInvalidClaims) {
            navigate(ELinks.project)
        }
    }, [navigate, path, isUserLogged])



    return (
        <ProtectedRoute>
            <LandingHeader/>
            <Outlet/>
        </ProtectedRoute>
    );
};
