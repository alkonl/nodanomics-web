import React, {useEffect} from 'react';
import {LandingHeader} from "../../component";
import {Outlet, useNavigate} from "react-router-dom";
import {ELinks} from "../../service";

export const LandingPage = () => {

    const navigate = useNavigate()

    useEffect(() => {
        navigate(ELinks.projects)
    }, [navigate])

    return (
        <>
            <LandingHeader/>
            <Outlet/>
        </>
    );
};
