import React from 'react';
import {LandingRightPanelLayout} from "../layout";
import {Box, Typography} from "@mui/material";
import {EColor} from "../../constant";
import {useTeamDashboardState} from "../../redux";
import {MButton} from "../base";

export const TeamMemberCard = () => {
    const {teamMembers, selectedTeamMemberId} = useTeamDashboardState()

    const teamMember = teamMembers
        .find((teamMember) => teamMember.id === selectedTeamMemberId)


    return (
        <LandingRightPanelLayout>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
            }}>
                <Box sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    aligingItems: 'center',
                    py: 4,
                }}>

                    <Box sx={{
                        height: 100,
                        width: 100,
                        borderRadius: '50%',
                        borderWidth: 2,
                        borderColor: EColor.black,
                        borderStyle: 'solid',
                        marginRight: 2,
                        backgroundColor: EColor.white,
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {teamMember?.avatar && <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                            src={teamMember?.avatar}
                            component="img"
                        />}
                    </Box>
                </Box>
                <Box sx={{
                    width: '100%',
                    height: 2,
                    backgroundColor: 'black',
                }}/>
                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingTop: 4,
                    paddingBottom: 2,
                    px: 3,
                }}>
                    <Box>
                        <Typography sx={{
                            fontSize: 22,
                            fontWeight: 600,
                        }}>
                            {teamMember?.firstName} {teamMember?.lastName}
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        gap: 2,
                        flexDirection: 'row-reverse'
                    }}>
                        <MButton.Submit
                            variant="border">
                            Manage
                        </MButton.Submit>
                    </Box>
                </Box>

            </Box>

        </LandingRightPanelLayout>
    );
};
