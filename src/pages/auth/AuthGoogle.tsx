import React, {useEffect} from 'react';
import {useThirdPartySignInAndUpQuery} from "../../api";
import {useNavigate} from "react-router-dom";
import {ELinks} from "../../service/router";
import {Box, CircularProgress} from "@mui/material";

export const AuthGoogle = () => {
    const navigate = useNavigate();
    const {data} = useThirdPartySignInAndUpQuery({})
    useEffect(() => {
        if (data && data.status === 'OK') {
            navigate(ELinks.main)
        }
    }, [data])
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
            }}
        >

            <CircularProgress/>
        </Box>
    );
};
