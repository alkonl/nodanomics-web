import React from 'react';
import {ButtonGroup} from "@mui/material";
import {DashboardDiagramNavigatorItem} from "./DashboardDiagramNavigatorItem";
import {useAppDispatch} from "../../../../redux";
import {dashboardViewsActions} from "../../../../redux/store";

interface IDashboardDiagramNavigatorProps {
    diagramsPages: { name: string, id: string }[]
}

export const DashboardDiagramNavigator: React.FC<IDashboardDiagramNavigatorProps> = ({
                                                                                         diagramsPages,
                                                                                     }) => {
    const dispatch = useAppDispatch()

    const onSelect = (id: string) => {
        dispatch(dashboardViewsActions.updateDashboardView({
            dashboardViewId: id
        }))
    }

    return (

        <ButtonGroup>
            {diagramsPages.map(params => {
                return (<DashboardDiagramNavigatorItem
                    onSelect={onSelect}
                    diagramParams={params}
                    key={params.id}
                />)
            })}

        </ButtonGroup>
    );
};
