import React from 'react';
import {Box, Typography} from "@mui/material";
import {EColor} from "../../../constant";
import {useAppDispatch, useProjectDashboardState, projectDashboardAction} from "../../../redux";

export const ProjectsListElement: React.FC<{
    projectName: string
    projectId: string
    isBig: boolean
}> = ({projectName, projectId, isBig}) => {
    const dispatch = useAppDispatch()
const selectedProjectId = useProjectDashboardState().selectedProjectId
    const isSelected = selectedProjectId === projectId
    const onClick = () => {
        dispatch(projectDashboardAction.setSelectedProjectId({
            projectId: projectId
        }))
    }
    return (
        <Box
            sx={{
                borderWidth: 1,
                borderColor: EColor.black,
                borderStyle: 'solid',
                width: 250,
                height: isBig ? 120 : 60,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: isSelected ? EColor.grey2 : EColor.white,
            }}
            onClick={onClick}
            component="button"
        >
            <Typography
                sx={{
                    fontSize: 20,
                    fontWeight: 600,
                }}
            >
                {projectName}
            </Typography>
        </Box>
    );
};
