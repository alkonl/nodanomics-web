import React from 'react';
import {Box} from "@mui/material";
import {TeamMemberListElement} from "./TeamMemberListElement";
import {AddNewTeamMember} from "../AddNewTeamMember";
import {useTeamDashboardState} from "../../../redux";

export const TeamMemberList: React.FC = () => {


    const teamMembers = useTeamDashboardState().teamMembers
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
        }}>
            {teamMembers.map((teamMember) => (
                <TeamMemberListElement
                    teamMember={teamMember}
                    key={teamMember.id}
                />
            ))}
            <AddNewTeamMember/>
        </Box>
    );
};
