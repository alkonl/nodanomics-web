import React from 'react';
import {Button} from "@mui/material";
import {useDashboardViewsState} from "../../../../redux";

export const DashboardDiagramNavigatorItem: React.FC<{
    onSelect: (id: string) => void
    diagramParams: { name: string, id: string }
}> = ({onSelect, diagramParams}) => {
    const selectedDashboardViewId = useDashboardViewsState()?.selectedDashboardViewId

    const isSelected = diagramParams.id === selectedDashboardViewId
    const onSelectHandle = () => {
        onSelect(diagramParams.id)
    }
    return (
        <Button variant={isSelected ? 'contained' : 'outlined'} onClick={onSelectHandle}>
            {diagramParams.name}
        </Button>
    );
};
