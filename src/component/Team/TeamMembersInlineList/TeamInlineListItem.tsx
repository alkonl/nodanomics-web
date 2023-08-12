import React from 'react';
import {Avatar, Tooltip, Typography, Box} from "@mui/material";
import {TeamMemberListElementIconLayout} from "../layout";
import {ITeamMemberInfo} from "../../../interface";
import {Optionalize} from "../../../utils";

export const TeamInlineListItem: React.FC<{
    teamMember: Optionalize<ITeamMemberInfo, 'firstName' | 'lastName'>,
    size: 'small' | 'medium' | 'large'
}> = ({teamMember, size}) => {
    const {avatar, firstName, lastName} = teamMember
    return (
        <Tooltip title={`${firstName} ${lastName}`} arrow>
            <Box>
                <TeamMemberListElementIconLayout size={size}>
                    <Avatar
                        sx={{
                            width: '100%',
                            height: '100%',
                        }}
                        src={avatar}
                        alt={`${firstName} ${lastName}`}
                        variant="rounded"
                    >
                        <Typography sx={{
                            fontSize: 10,
                        }}>
                            {firstName[0]}{lastName && lastName[0]}
                        </Typography>
                    </Avatar>
                </TeamMemberListElementIconLayout>
            </Box>
        </Tooltip>
    );
};
