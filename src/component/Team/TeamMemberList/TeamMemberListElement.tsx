import React from 'react';
import {Box, Typography} from "@mui/material";
import {IBaseTeamMember, ITeamMemberInfo} from "../../../interface";
import {TeamMemberListElementIconLayout, TeamMemberListElementLayout} from "../layout";
import {useAppDispatch, teamDashboardAction, useTeamDashboardState} from "../../../redux";

export const TeamMemberListElement: React.FC<{
    teamMember: IBaseTeamMember & ITeamMemberInfo
}> = ({teamMember}) => {
    const selectedTeamMemberId = useTeamDashboardState().selectedTeamMemberId
    const isSelected = selectedTeamMemberId === teamMember.id
    const dispatch = useAppDispatch()

    const onClick = () => {
        dispatch(teamDashboardAction.setSelectedTeamId({
            teamMemberId: teamMember.id
        }))
    }

    return (
        <Box
            onClick={onClick}
            sx={{
                cursor: 'pointer',
            }}
            component="button"
        >
            <TeamMemberListElementLayout isSelected={isSelected}>
                <TeamMemberListElementIconLayout>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                        }}
                        src={teamMember.avatar}
                        component="img"
                    />
                </TeamMemberListElementIconLayout>
                <Typography sx={{
                    fontWeight: 600,
                }}>
                    {teamMember.firstName} {teamMember.lastName}
                </Typography>
            </TeamMemberListElementLayout>
        </Box>
    );
};
