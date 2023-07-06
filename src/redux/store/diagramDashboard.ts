// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ESortType, ITag} from "../../interface";

export interface IDiagramDashboardView {
    dashboardViewId?: string,
    tags: ITag[],
    sortType: ESortType
}

export interface IDiagramDashboardViewsState {
    selectedDashboardViewId?: string,
    searchQuery: string,
    dashboardViews: IDiagramDashboardView[]
}

const initialState: IDiagramDashboardViewsState = {
    searchQuery: '',
    dashboardViews: []
}

const initialObject: IDiagramDashboardView = {
    tags: [],
    sortType: ESortType.NameA2Z,
}

// Maybe deprecated
export const diagramDashboardSlice = createSlice({
    name: 'diagramDashboard',
    initialState,
    reducers: {
        addTags: (state, action: PayloadAction<{
            dashboardViewId: string
            tags: ITag[]
        }>) => {
            const {dashboardViewId, tags} = action.payload
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
        },
        updateSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload
        },
        updateDashboardView: (state, action: PayloadAction<{ dashboardViewId: string}>) => {
            const {dashboardViewId} = action.payload
            state.selectedDashboardViewId = dashboardViewId
        },
        updateSortType: (state, action: PayloadAction<{ dashboardViewId: string, sortType: ESortType}>) => {
            const {dashboardViewId, sortType} = action.payload
            const dashboardView = state.dashboardViews
                .find(dashboardView => dashboardView.dashboardViewId === dashboardViewId)
            if (!dashboardView) {
                console.error(`dashboardView with id ${dashboardViewId} not found`)
            } else {
                dashboardView.sortType = sortType
            }
        }
    }
})

export const dashboardViewsActions = diagramDashboardSlice.actions
