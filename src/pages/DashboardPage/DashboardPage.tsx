import React from 'react';
import {Box} from "@mui/material";
import {DashboardHeader, NewDiagramButton, TagList} from "../../component";



export const DashboardPage = () => {

    return (
        <Box style={{
            padding: 10,
            margin: 20,
        }}>
            <Box>
                <DashboardHeader/>
            </Box>

        </Box>
    );
};
