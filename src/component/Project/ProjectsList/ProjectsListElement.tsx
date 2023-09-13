import React from 'react';
import {projectDashboardAction, useAppDispatch, useProjectDashboardState} from "../../../redux";
import {MView} from "../../base";
import {useNavigate} from "react-router-dom";
import {ELinks} from "../../../service";

export const ProjectsListElement: React.FC<{
    projectName: string
    projectId: string
    isBig: boolean
}> = ({projectName, projectId, isBig}) => {
    const dispatch = useAppDispatch()
    const selectedProjectId = useProjectDashboardState().selectedProjectId
    const navigate = useNavigate()

    const isSelected = selectedProjectId === projectId
    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (event.detail === 2) {
            navigate(`${ELinks.project}/${projectId}`)
        }
        dispatch(projectDashboardAction.setSelectedProjectId({
            projectId: projectId
        }))
    }
    return (
        <MView.Simple
            isBig={isBig}
            isSelected={isSelected}
            onClick={onClick}
            title={projectName}
        />
    );
};
