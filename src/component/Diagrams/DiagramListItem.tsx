import React from 'react';
import {MView} from "../base";
import {IBaseDiagramInfo} from "../../interface";
import {diagramDashboardAction, useAppDispatch, useDiagramDashboardState} from "../../redux";
import {ELinks} from "../../service";
import {useNavigate} from "react-router-dom";

export const DiagramListItem: React.FC<{
    diagram: IBaseDiagramInfo
}> = ({diagram}) => {
    const {selectedDiagramId} = useDiagramDashboardState()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (event.detail === 2) {
            navigate(`${ELinks.diagram}/${diagram.id}`)
        }
        dispatch(diagramDashboardAction.setSelectedDiagramId({
            diagramId: diagram.id
        }))
    }
    const isSelected = diagram.id === selectedDiagramId
    return (
        <MView.Simple
            isSelected={isSelected}
            onClick={onClick}
            title={diagram.name}
        />
    );
};

