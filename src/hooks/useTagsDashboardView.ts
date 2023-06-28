import {useAppDispatch, useSelectedDashboardViewState} from "../redux";
import {useGetDiagramTagsQuery} from "../api";
import {dashboardViewsActions,} from "../redux/store";
import {useEffect} from "react";
import {ITag} from "../interface";

interface IUseTagsDashboardViewLoadedReturn {
    isLoaded: true,
    tags: ITag[],
    onTagSelect: (tag: ITag) => void
}

interface IUseTagsDashboardViewLoadingReturn {
    isLoaded: false,
    tags: undefined,
    onTagSelect: undefined
}

type IUseTagsDashboardViewReturn = IUseTagsDashboardViewLoadedReturn | IUseTagsDashboardViewLoadingReturn

const loadingReturn: IUseTagsDashboardViewLoadingReturn = {
    isLoaded: false,
    tags: undefined,
    onTagSelect: undefined
}

export const useTagsDashboardView = (params: {
    dashboardViewId: string
}): IUseTagsDashboardViewReturn => {
    const {dashboardViewId} = params

    const dispatch = useAppDispatch()

    const {data: tagsResponse} = useGetDiagramTagsQuery({
        dashboardViewId
    })

    useEffect(() => {
        if (tagsResponse) {
            dispatch(dashboardViewsActions.addTags({
                dashboardViewId: tagsResponse.dashboardViewId,
                tags: tagsResponse.tags,
            }))
        }
    }, [tagsResponse])

    const dashboardView = useSelectedDashboardViewState(dashboardViewId)
    const tags = dashboardView?.tags

    const onTagSelect = (tag: ITag) => {
        console.log(dashboardViewId)
        dispatch(dashboardViewsActions.selectTag({
            dashboardViewId: dashboardViewId,
            updatedTag: tag,
        }))
    }
    if (!tags) {
        return loadingReturn
    }
    return {tags, onTagSelect, isLoaded: true}
}
