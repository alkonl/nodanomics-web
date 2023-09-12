import React from 'react';
import {useAppDispatch, useProjectDashboardState, projectDashboardAction} from "../../../redux";
import {MView} from "../../base";

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
        <MView.Simple
            isBig={isBig}
            isSelected={isSelected}
            onClick={onClick}
            title={projectName}
        />
    );
};
