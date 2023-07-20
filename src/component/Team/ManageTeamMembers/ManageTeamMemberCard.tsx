import React from 'react';
import {Box, ListItem, Typography, Divider} from "@mui/material";
import {ITeamMemberInfo} from "../../../interface";
import {EColor} from "../../../constant";

export const ManageTeamMemberCard: React.FC<{
    teamMember: ITeamMemberInfo
}> = ({teamMember}) => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                px: 2,
                py: 1,
                borderWidth: 1,
                borderColor: EColor.grey2,
                borderStyle: 'solid',
                borderRadius: 1.5,
            }}>
                <Typography>
                    {teamMember.firstName}
                </Typography>
            </Box>
        </>
    );
};
