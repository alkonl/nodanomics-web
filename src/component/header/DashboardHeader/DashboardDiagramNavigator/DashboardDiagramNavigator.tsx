import React from 'react';
import {ButtonGroup} from "@mui/material";
import {DashboardDiagramNavigatorItem} from "./DashboardDiagramNavigatorItem";

interface IDashboardDiagramNavigatorProps {
    diagramsPages: { name: string, id: string }[]
    onSelect: (id: string) => void
    selectedDiagramPageId: string,
}

export const DashboardDiagramNavigator: React.FC<IDashboardDiagramNavigatorProps> = ({
                                                                                         diagramsPages,
                                                                                         selectedDiagramPageId,
                                                                                         onSelect
                                                                                     }) => {

    return (

        <ButtonGroup>
            {diagramsPages.map(params => {
                const isSelected = params.id === selectedDiagramPageId
                return (<DashboardDiagramNavigatorItem
                    isSelected={isSelected}
                    onSelect={onSelect}
                    diagramParams={params}
                    key={params.id}
                />)
            })}

        </ButtonGroup>
    );
};
