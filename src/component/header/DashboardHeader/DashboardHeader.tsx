import React, {useEffect, useState} from 'react';
import style from "./DashboardHeader.module.scss";
import {DiagramSearchBar} from "../../searchBar";
import {NewDiagramButton} from "../../button";
import {TagList} from "../../list";
import {AccountDropDownMenu, NotificationBell} from "../../dropDownMenu";
import {DashboardDiagramNavigator} from "./DashboardDiagramNavigator";
import {useGetDiagramTagsQuery} from "../../../api";
import {useAppDispatch, useAppSelector} from "../../../redux";
import {ITag} from "../../../interface";
import {addTags, IDiagramDashboardView, selectTag} from "../../../redux/store";
import {useTagsDashboardView} from "../../../hooks/useTagsDashboardView";

// const mockTags = [{
//     name: 'Mock tag_1',
//     id: '1',
// }, {
//     name: 'Mock tag_2',
//     id: '2',
// }]

const mockDiagramsPages = [{
    name: 'My Diagrams',
    id: '0',
}, {
    name: 'Templates',
    id: '1',
}]

export const DashboardHeader = () => {
    const [selectedDiagramPageId, setDiagramPage] = useState<string>(mockDiagramsPages[0].id)
    const {tags, onTagSelect} = useTagsDashboardView({
        selectedDiagramPageId
    })
    // const {data: apiTags} = useGetDiagramTagsQuery({
    //     diagramsShowPageId: selectedDiagramPageId
    // })
    // const views = useAppSelector(state => state.diagramDashboard.dashboardViews)
    // const tags = views.find((view: IDiagramDashboardView) => view.dashboardViewId === selectedDiagramPageId)?.tags
    // const dispatch = useAppDispatch()
    //
    // useEffect(() => {
    //     if (apiTags) {
    //         dispatch(addTags({
    //             dashboardViewId: selectedDiagramPageId,
    //             tags: apiTags,
    //         }))
    //     }
    // }, [apiTags, dispatch, selectedDiagramPageId])
    // const onTagSelect = (tag: ITag) => {
    //     console.log(selectedDiagramPageId)
    //     dispatch(selectTag({
    //         dashboardViewId: selectedDiagramPageId,
    //         updatedTag: tag,
    //     }))
    // }

    return (
        <div>
            <div className={style.topContainer}>
                <DashboardDiagramNavigator
                    diagramsPages={mockDiagramsPages}
                    onSelect={setDiagramPage}
                    selectedDiagramPageId={selectedDiagramPageId}/>
                <div className={style.rightTopSide}>
                    <DiagramSearchBar/>
                    <NotificationBell/>
                    <AccountDropDownMenu/>
                </div>
            </div>
            <div className={style.bottomContainer}>
                <NewDiagramButton/>
                {tags && <TagList tags={tags} onSelect={onTagSelect}/>}
            </div>

        </div>
    );
};
