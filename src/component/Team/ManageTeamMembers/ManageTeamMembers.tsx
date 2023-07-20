import React from 'react';
import {Box, List} from "@mui/material";
import {Text} from "../../base/Text";
import {ManageTeamMemberCard} from "./ManageTeamMemberCard";
import {ITeamMemberInfo} from "../../../interface";
import {MOCK_TEAM_MEMBERS} from "../../../mock/MOCK_TEAM_MEMBERS";

export const ManageTeamMembers = () => {


    const projectTeamMembers: ITeamMemberInfo[] | undefined = MOCK_TEAM_MEMBERS


    return (
        <Box
            sx={{
                backgroundColor: 'white',
                padding: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
            onSubmit={(e) => {
                e.preventDefault()
            }}
            component="form"
        >
            <Text.Label>
                Manage User
            </Text.Label>
            <Box
            sx={{
                display:'flex',
                flexDirection: 'column',
                gap: 1,
            }}
            >
                {projectTeamMembers && projectTeamMembers.map((teamMember) => (
                    <ManageTeamMemberCard teamMember={teamMember} key={teamMember.id}/>
                ))}
            </Box>

        </Box>
    );
};
