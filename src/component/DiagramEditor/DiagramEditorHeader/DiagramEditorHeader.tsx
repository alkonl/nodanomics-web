import React, {useMemo} from 'react';
import {Box, Typography} from "@mui/material";
import {useDiagramEditorState} from "../../../redux";
import {DiagramEditorDropDownMenu} from "../../dropDownMenu";
import {TeamInlineListItem, TeamMembersInlineList} from "../../Team";
import {useGetProjectTeamMembersQuery} from "../../../api";
import {ITeamMemberInfo} from "../../../interface";
import {Optionalize} from "../../../utils";
import {useCurrentUser} from "../../../hooks";

export const DiagramEditorHeader = () => {
    const {name, currentDiagramId} = useDiagramEditorState()
    const {data: resTeamMembers} = useGetProjectTeamMembersQuery({
        diagramId: currentDiagramId
    }, {
        skip: !currentDiagramId
    })
    const {currentUser} = useCurrentUser()

    const owner: Optionalize<ITeamMemberInfo, 'avatar' | 'firstName' | 'lastName'> | undefined = currentUser && {
        avatar: currentUser.avatar,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
    }

    const teamMembers: ITeamMemberInfo[] = useMemo(() => {
        if (resTeamMembers && currentUser) {
            return resTeamMembers.members.filter((teamMember) => teamMember.userId !== currentUser.id)
        }
        return []
    }, [resTeamMembers, currentUser])

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mx: '20px',
                my: 1,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignContent: 'center',
                    gap: '20px',
                }}
            >
                <DiagramEditorDropDownMenu/>
                <Typography sx={{
                    fontSize: 12
                }}>
                    {name}
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 0.8,
                alignItems: 'flex-end'
            }}>
                <TeamMembersInlineList teamMembers={teamMembers}/>
                {owner && <TeamInlineListItem teamMember={owner} size="medium"/>}
            </Box>
        </Box>
    );
};
