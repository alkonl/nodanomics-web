import React from 'react';
import {Box} from "@mui/material";
import {EColor} from "../../../constant";

export const TeamMemberListElementLayout: React.FC<{
    children: React.ReactNode
    isSelected?: boolean
}> = ({children, isSelected}) => {
    return (
        <Box sx={{
            display: 'flex',
            borderWidth: 2,
            borderColor: EColor.black,
            borderStyle: 'solid',
            alignItems: 'center',
            height: 50,
            gap: 2,
            paddingLeft: 2,
            backgroundColor: isSelected ? EColor.grey2 : EColor.white,
        }}>
            {children}
        </Box>
    );
};
