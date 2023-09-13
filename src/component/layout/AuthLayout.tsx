import React from 'react';
import {Box} from "@mui/material";
import {EColor} from "../../constant";
import {Svg} from "../../assets";

export const AuthLayout: React.FC<{
    children: React.ReactNode
}> = ({children}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flex: '1',
            }}
        >
            <Box
                sx={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {children}
            </Box>
            <Box
                sx={{
                    flex: '1',
                    backgroundColor: EColor.lightMarine2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={{
                    width: '60%',
                }}>
                    <Svg.NodanomicsLogo/>
                </Box>

            </Box>
        </Box>
    );
};
