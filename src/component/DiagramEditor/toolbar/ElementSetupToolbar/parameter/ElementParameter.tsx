import React from 'react';
import {Parameter} from "../../../../base";
import {Grid} from "@mui/material";

export const ElementParameter: React.FC<{
    label: string,
    children: React.ReactNode
}> = ({label, children}) => {
    return (
        <>
            <Grid item xs={2.7}>
                <Parameter.Label>
                    {label}
                </Parameter.Label>
            </Grid>
            <Grid item xs={5.8}>
                {children}
            </Grid>
        </>
    )
};
