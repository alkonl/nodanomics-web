import React, {useEffect} from 'react';
import style from "./DashboardHeader.module.scss";
import {DiagramSearchBar} from "../../searchBar";
import {NewDiagramButton} from "../../button";
import {TagList} from "../../list";
import {AccountDropDownMenu, NotificationBell} from "../../dropDownMenu";
import {DashboardDiagramNavigator} from "./DashboardDiagramNavigator";
import {SortDiagramsInput} from "../../input";
import {useAppDispatch, useDashboardViewsState} from "../../../redux";
import {dashboardViewsActions} from "../../../redux/store";


const mockDiagramsPages = [{
    name: 'My Diagrams',
    id: '0',
}, {
    name: 'Templates',
    id: '1',
}]

export const DashboardHeader = () => {

    const dashboardViewId = useDashboardViewsState()?.selectedDashboardViewId
    const dispatch = useAppDispatch()

    // select initial dashboard view
    useEffect(() => {
        dispatch(dashboardViewsActions.updateDashboardView({dashboardViewId: mockDiagramsPages[0].id}))
    }, [])

    return (
        <div>
            <div className={style.topContainer}>
                <DashboardDiagramNavigator
                    diagramsPages={mockDiagramsPages}
                />
                <div className={style.rightTopSide}>
                    <DiagramSearchBar/>
                    <NotificationBell/>
                    <AccountDropDownMenu/>
                </div>
            </div>
            <div className={style.bottomContainer}>
                <NewDiagramButton/>
                {dashboardViewId && <TagList dashboardViewId={dashboardViewId}/>}
                <SortDiagramsInput/>
            </div>

        </div>
    );
};
