import React from "react";
import {Grid} from "@mui/material";
import {ParameterLabel} from "../Label";

export const ElementParameterContainer: React.FC<{
    label: string,
    children: React.ReactNode
    firstSize?: number
    secondSize?: number
}> = ({label, children, firstSize = 2.7, secondSize = 5.8}) => {
    return (
        <>
            <Grid item xs={firstSize}>
                <ParameterLabel>
                    {label}
                </ParameterLabel>
            </Grid>
            <Grid item xs={secondSize}>
                {children}
            </Grid>
        </>
    )
};
