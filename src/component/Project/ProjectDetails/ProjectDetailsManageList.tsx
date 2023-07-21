import React from 'react';
import {MButton} from "../../base";
import {EColor} from "../../../constant";
import {Box} from "@mui/material";
import {useDeleteProject, useDeleteTeamMemberFromProjectTeam, useToggle} from "../../../hooks";
import {InviteUserPopUp, ManageUserPopUp} from "../../popUp";
import {IBaseProject} from "../../../interface";

export const ProjectDetailsManageList: React.FC<{
    projectInfo: IBaseProject
}> = ({projectInfo}) => {
    const inviteUserPopUp = useToggle()
    const manageUserPopUp = useToggle()
    // const projectDashboardState = useProjectDashboardState()

    const {isUserCanDeleteProject, deleteProject} = useDeleteProject({
        projectId: projectInfo.id,
    })

    const {
        isUserCanDeleteTeamMember
    } = useDeleteTeamMemberFromProjectTeam({
        projectId: projectInfo.id,
    })

    return (
        <>
            <ManageUserPopUp
                isShow={manageUserPopUp.isOpened}
                onClose={manageUserPopUp.close}
                projectId={projectInfo.id}
            />
            <InviteUserPopUp
                isShow={inviteUserPopUp.isOpened}
                onClose={inviteUserPopUp.close}
                projectId={projectInfo.id}
            />

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
                {isUserCanDeleteTeamMember && <MButton.Submit
                    onClick={manageUserPopUp.open}
                    variant="border"
                >
                    Manage user
                </MButton.Submit>}
                {isUserCanDeleteProject && <MButton.Submit
                    sx={{
                        color: EColor.red,
                    }}
                    onClick={deleteProject}
                    variant="border">
                    Delete
                </MButton.Submit>}
            </Box>
        </>
    );
};
