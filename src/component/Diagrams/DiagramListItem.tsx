import React from 'react';
import {MView} from "../base";
import {IBaseDiagramInfo} from "../../interface";
import {diagramDashboardAction, useAppDispatch, useDiagramDashboardState} from "../../redux";

export const DiagramListItem: React.FC<{
    diagram: IBaseDiagramInfo
}> = ({diagram}) => {
    const {selectedDiagramId} = useDiagramDashboardState()
    const dispatch = useAppDispatch()
    const onClick = () => {
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

