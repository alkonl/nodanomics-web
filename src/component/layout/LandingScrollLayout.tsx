import React from 'react';
import {Box} from "@mui/material";
import {EColor} from "../../constant";

export const LandingScrollLayout: React.FC<{
    children?: React.ReactNode
}> = ({children}) => {
    return (
        <Box sx={{
            display: 'flex',
            flex: 1,
            position: 'relative',
        }}>


            <Box sx={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderColor: EColor.grey2,
                borderWidth: 2,
                borderStyle: 'solid',
                boxSizing: 'border-box',
            }}>
                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    minHeight: '0px',
                }}>
                    <Box sx={{
                        flex: 1,
                        overflow: 'auto',
                    }}>
                        {children}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
