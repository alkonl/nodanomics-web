import React from 'react';
import {Box} from "@mui/material";
import {EColor} from "../../../constant";

export const TeamMemberListElementIconLayout: React.FC<{
    children?: React.ReactNode
}> = ({children}) => {
    return (
        <Box sx={{
            position: 'relative',
            width: 60,
            height: 60,
        }}>
            <Box sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                borderWidth: 2,
                borderColor: EColor.black,
                borderStyle: 'solid',
                marginRight: 2,
                backgroundColor: EColor.white,
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {children}
            </Box>
        </Box>
    );
};
