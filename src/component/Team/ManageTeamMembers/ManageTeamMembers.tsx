import React, {useMemo} from 'react';
import {Box} from "@mui/material";
import {Text} from "../../base/Text";
import {useDeleteTeamMemberFromProjectTeam} from "../../../hooks";
import {useGetProjectTeamMembersQuery} from "../../../api";
import {ManageTeamMemberCard} from "./ManageTeamMemberCard";
import {ITeamMemberInfo} from "../../../interface";

export const ManageTeamMembers: React.FC<{
    projectId: string;
}> = ({projectId}) => {


    const {data: resProjectTeamMembersData} = useGetProjectTeamMembersQuery({
        projectId
    })

    const projectTeamMembers: ITeamMemberInfo[] = useMemo(() => {
        if (resProjectTeamMembersData) {
            return resProjectTeamMembersData.members
        }
        return []
    }, [resProjectTeamMembersData])

    const {deleteTeamMember} = useDeleteTeamMemberFromProjectTeam({
        projectId
    })

    console.log('deleteTeamMember: ', projectTeamMembers)

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                padding: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                width: 400,
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
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                {projectTeamMembers && deleteTeamMember && projectTeamMembers.map((teamMember) => (
                    <ManageTeamMemberCard
                        deleteTeamMember={deleteTeamMember}
                        teamMember={teamMember}
                        key={teamMember.id}
                    />
                ))}
            </Box>

        </Box>
    );
};
