import {useAppDispatch, useAppSelector} from "../redux";
import {useGetDiagramTagsQuery} from "../api";
import {addTags, IDiagramDashboardView, selectTag} from "../redux/store";
import {useEffect} from "react";
import {ITag} from "../interface";

export const useTagsDashboardView = (params: {
    selectedDiagramPageId: string
}) => {
    const {selectedDiagramPageId} = params
    const dispatch = useAppDispatch()

    const {data: apiTags} = useGetDiagramTagsQuery({
        diagramsShowPageId: selectedDiagramPageId
    })

    useEffect(() => {
        if (apiTags) {
            dispatch(addTags({
                dashboardViewId: selectedDiagramPageId,
                tags: apiTags,
            }))
        }
    }, [apiTags, dispatch, selectedDiagramPageId])

    const dashboardViews = useAppSelector(state => state.diagramDashboard.dashboardViews)
    const tags = dashboardViews.find((view: IDiagramDashboardView) => view.dashboardViewId === selectedDiagramPageId)?.tags

    const onTagSelect = (tag: ITag) => {
        console.log(selectedDiagramPageId)
        dispatch(selectTag({
            dashboardViewId: selectedDiagramPageId,
            updatedTag: tag,
        }))
    }

    return {tags, onTagSelect}
}
