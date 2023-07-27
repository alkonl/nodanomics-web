import React from 'react';
import {Parameter} from "../styledComponents";
import {Grid} from "@mui/material";

export const ElementParameter: React.FC<{
    label: string,
    children: React.ReactNode
}> = ({label, children}) => {
    return (
        <>
            <Grid item xs={2.5}>
                <Parameter.Label>
                    {label}
                </Parameter.Label>
            </Grid>
            <Grid item xs={6}>
                {children}
            </Grid>
        </>
    )
};
