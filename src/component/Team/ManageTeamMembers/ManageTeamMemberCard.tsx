import React from 'react';
import {Box, Typography,} from "@mui/material";
import {ITeamMemberInfo} from "../../../interface";
import {EColor} from "../../../constant";
import {MButton} from "../../base";

export const ManageTeamMemberCard: React.FC<{
    teamMember: ITeamMemberInfo
}> = ({teamMember}) => {
    return (
        <Box sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: EColor.grey2,
            borderStyle: 'solid',
            borderRadius: 1.5,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: 1,
                py: 1,
            }}>
                <Typography>
                    {teamMember.email}
                </Typography>
                <Typography>
                    {teamMember.firstName} {teamMember.lastName}
                </Typography>
            </Box>
            <MButton.Submit>
                Remove
            </MButton.Submit>
        </Box>
    );
};
