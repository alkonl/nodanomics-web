import React from 'react';
import {Button} from "@mui/material";

export const DashboardDiagramNavigatorItem: React.FC<{
    isSelected: boolean,
    onSelect: (id: string) => void
    diagramParams: { name: string, id: string }
}> = ({isSelected, onSelect, diagramParams}) => {

    const onSelectHandle = () => {
        onSelect(diagramParams.id)
    }
    return (
        <Button variant={isSelected ? 'contained': 'outlined'} onClick={onSelectHandle}>
            {diagramParams.name}
        </Button>
    );
};
