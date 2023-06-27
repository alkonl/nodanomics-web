// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITag} from "../../interface";

export interface IDiagramDashboardView {
    dashboardViewId?: string,
    tags: ITag[],
}

interface IDiagramDashboardViewsState {
    dashboardViews: IDiagramDashboardView[]
}

const initialState: IDiagramDashboardViewsState = {
    dashboardViews: []
}

const initialObject: IDiagramDashboardView = {
    tags: []
}


export const diagramDashboardSlice = createSlice({
    name: 'diagramDashboard',
    initialState,
    reducers: {
        addTags: (state, action: PayloadAction<{
            dashboardViewId: string
            tags: ITag[]
        }>) => {
            const {dashboardViewId, tags} = action.payload
            console.log(dashboardViewId, tags)
            const dashboardView = state.dashboardViews.find(dashboardView => dashboardView.dashboardViewId === dashboardViewId)
            if (!dashboardView) {
                state.dashboardViews.push({
                    ...initialObject,
                    dashboardViewId,
                    tags
                })
            }
        },
        selectTag: (state, action: PayloadAction<{
            dashboardViewId: string
            updatedTag: ITag
        }>) => {
            const {dashboardViewId, updatedTag} = action.payload
            const dashboardView = state.dashboardViews.find(dashboardView => dashboardView.dashboardViewId === dashboardViewId)
            if (!dashboardView) {
                console.error(`dashboardView with id ${dashboardViewId} not found`)
            } else {
                const tagToSelect = dashboardView.tags.find(tag => tag.id === updatedTag.id)
                if (!tagToSelect) {
                    console.error(`tag with id ${updatedTag.id} not found`)
                } else {
                    tagToSelect.isSelected = tagToSelect.isSelected ? !tagToSelect.isSelected : true
                }
            }
        }
    }
})

export const {selectTag, addTags} = diagramDashboardSlice.actions
