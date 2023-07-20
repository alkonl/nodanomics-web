import React from 'react';
import {MButton} from "../../base";
import {EColor} from "../../../constant";
import {Box} from "@mui/material";
import {useToggle} from "../../../hooks";
import {InviteUserPopUp, ManageUserPopUp} from "../../popUp";
import {useProjectDashboardState} from "../../../redux";

export const ProjectDetailsManageList = () => {
    const inviteUserPopUp = useToggle()
    const manageUserPopUp = useToggle()
    const projectDashboardState = useProjectDashboardState()

    return (
        <>
            {projectDashboardState.selectedProjectId &&
                <>
                    <ManageUserPopUp
                        isShow={manageUserPopUp.isOpened}
                        onClose={manageUserPopUp.close}
                    />
                    <InviteUserPopUp
                        isShow={inviteUserPopUp.isOpened}
                        onClose={inviteUserPopUp.close}
                        projectId={projectDashboardState.selectedProjectId}
                    />
                </>
            }
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <MButton.Submit
                    variant="border">
                    File Histroy
                </MButton.Submit>
                <MButton.Submit
                    onClick={inviteUserPopUp.open}
                    variant="border"
                >
                    Invite user
                </MButton.Submit>
                <MButton.Submit
                    onClick={manageUserPopUp.open}
                    variant="border"
                >
                    Manage user
                </MButton.Submit>
                <MButton.Submit
                    sx={{
                        color: EColor.red,
                    }}
                    variant="border">
                    Delete
                </MButton.Submit>
            </Box>
        </>
    );
};
