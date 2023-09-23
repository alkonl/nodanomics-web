import React, {useMemo} from 'react';
import {Box, Typography} from "@mui/material";
import {useDiagramEditorState} from "../../../redux";
import {DiagramEditorDropDownMenu} from "../../dropDownMenu";
import {TeamInlineListItem, TeamMembersInlineList} from "../../Team";
import {useGetProjectTeamMembersQuery} from "../../../api";
import {ITeamMemberInfo} from "../../../interface";
import {Optionalize} from "../../../utils";
import {useCurrentUser} from "../../../hooks";
import {EColor, EFontColor} from "../../../constant";

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
                backgroundColor: EColor.darkMarineLight,
                display: 'flex',
                justifyContent: 'space-between',
                px: '20px',
                py: 1,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                }}
            >
                <DiagramEditorDropDownMenu/>
                <Typography sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: EFontColor.white,
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
