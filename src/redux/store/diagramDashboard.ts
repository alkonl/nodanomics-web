import {IBaseDiagramInfo} from "../../interface";
import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice,} from "@reduxjs/toolkit";

export interface IDiagramDashboardState {
    diagrams: IBaseDiagramInfo[];
    deleteDiagramIds?: string[];
    selectedDiagramId?: string;
}

const initialState: IDiagramDashboardState = {
    diagrams: [],
}

export const diagramDashboardSlice = createSlice({
    name: 'diagramDashboard',
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<{
            projects: IBaseDiagramInfo[]
        }>) => {
            state.diagrams = action.payload.projects
        },
        setSelectedDiagramId: (state, action: PayloadAction<{
            projectId: string
        }>) => {
            state.selectedDiagramId = action.payload.projectId
        },
        addDeleteDiagramId: (state, action: PayloadAction<{
            projectId: string
        }>) => {
            if (!state.deleteDiagramIds) {
                state.deleteDiagramIds = []
            }
            state.deleteDiagramIds.push(action.payload.projectId)
        }
    }
})

export const diagramDashboardAction = diagramDashboardSlice.actions
