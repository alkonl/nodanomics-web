import React from 'react';
import {Box, IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const ManageUserDataHeader = () => {
    const navigate = useNavigate();
    const onGoBack = () => {
        navigate(-1)
    }
    return (
        <Box sx={{
            paddingLeft: 2,
        }}>
            <IconButton
                onClick={onGoBack}
            >
                <ArrowBackIosIcon/>
            </IconButton>
        </Box>
    );
};

