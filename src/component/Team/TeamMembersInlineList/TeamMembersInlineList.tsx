import React from 'react';
import {Box} from "@mui/material";
import {ITeamMemberInfo} from "../../../interface";
import {TeamInlineListItem} from "./TeamInlineListItem";

export const TeamMembersInlineList: React.FC<{
    teamMembers?: ITeamMemberInfo[]
}> = ({teamMembers}) => {
    return (
        <Box sx={{
            display: 'flex',
            gap: 1,
        }}>
            {teamMembers && teamMembers.map((teamMember) => (
                <TeamInlineListItem
                    teamMember={teamMember}
                    size="small"
                    key={teamMember.id}
                />
            ))}

        </Box>
    );
};
