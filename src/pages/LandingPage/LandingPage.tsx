import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {ELinks} from "../../service";
import {useCurrentPath} from "../../hooks/useCurrentPath";
import {LandingHeader} from "../../component";

export const LandingPage = () => {

    const navigate = useNavigate()
    const path = useCurrentPath()

    useEffect(() => {
        if (path === '/') {
            navigate(ELinks.projects)
        }
    }, [navigate, path])

    return (
        <>
            <LandingHeader/>
            <Outlet/>
        </>
    );
};
