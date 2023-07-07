import React, {useEffect} from 'react';
import {DashboardPageLayout, TeamMemberList, TeamMemberCard, LandingScrollLayout} from "../../component";
import {Box, Typography} from "@mui/material";
import {teamDashboardAction, useAppDispatch, useTeamDashboardState} from "../../redux";
import {MOCK_TEAM_MEMBERS} from "../../mock/MOCK_TEAM_MEMBERS";


export const TeamPage = () => {

    const dispatch = useAppDispatch()
    const {teamMembers, selectedTeamMemberId} = useTeamDashboardState()

    useEffect(() => {
        dispatch(teamDashboardAction.setTeamMembers({
            teamMembers: MOCK_TEAM_MEMBERS
        }))
    }, [dispatch])

    useEffect(()=>{
        if(!selectedTeamMemberId && teamMembers.length > 0) {
            dispatch(teamDashboardAction.setSelectedTeamId({
                teamMemberId: teamMembers[0].id
            }))
        }
    },[dispatch, teamMembers])

    return (
        <DashboardPageLayout pageName="Team">
            <LandingScrollLayout>
                <Box sx={{
                    px: 2,
                    py: 3,
                }}>
                    <Typography sx={{
                        marginBottom: 4,
                        fontWeight: 600,
                    }}>
                        Team Members
                    </Typography>
                    <TeamMemberList/>
                </Box>
            </LandingScrollLayout>
            <TeamMemberCard/>
        </DashboardPageLayout>
    );
};
