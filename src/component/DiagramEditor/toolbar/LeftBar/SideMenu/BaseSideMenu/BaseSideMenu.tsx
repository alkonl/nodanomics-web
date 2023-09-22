import React from 'react';
import {Box} from "@mui/material";
import {EColor} from "../../../../../../constant";

export const BaseSideMenu: React.FC<{
    isOpen: boolean;
    children: React.ReactNode
}> = ({isOpen, children}) => {

    return (
        <Box
            sx={{
                position: 'absolute',
                backgroundColor: EColor.darkMarineLight,
                width: isOpen ? '100%' : 0,
                height: '100%',
                transition: '0.2s ease-in-out width',
                overflow: 'hidden',
            }}
        >
            {children}
        </Box>
    );
};
