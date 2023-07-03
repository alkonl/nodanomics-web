import React from 'react';
import {Box} from "@mui/material";
import {DashboardHeader, DiagramList} from "../../component";
import {useGetDiagramsByUserIdQuery} from "../../api";


export const DashboardPage = () => {
    const {data: resDiagrams} = useGetDiagramsByUserIdQuery(undefined);

    return (
        <Box style={{
            padding: 10,
        }}>
            <Box>
                <DashboardHeader/>
            </Box>
            {resDiagrams && <DiagramList diagrams={resDiagrams.diagrams}/>}
        </Box>
    );
};
