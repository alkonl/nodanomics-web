import React from "react";
import {Grid} from "@mui/material";

export const ParametersContainer: React.FC<{
    children: React.ReactNode
    columns: number
    gap: number
}> = ({children, gap, columns}) => {
    return <Grid container columns={columns} gap={gap} sx={{
        maxWidth: '100%',
    }}>{children}</Grid>
}
