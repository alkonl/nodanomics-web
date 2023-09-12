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
        setDiagrams: (state, action: PayloadAction<{
            diagrams?: IBaseDiagramInfo[]
        }>) => {
            state.diagrams = action.payload.diagrams || []
        },
        setSelectedDiagramId: (state, action: PayloadAction<{
            diagramId: string
        }>) => {
            state.selectedDiagramId = action.payload.diagramId
        },
        addDeleteDiagramId: (state, action: PayloadAction<{
            diagramId: string
        }>) => {
            if (!state.deleteDiagramIds) {
                state.deleteDiagramIds = []
            }
            state.deleteDiagramIds.push(action.payload.diagramId)
        }
    }
})

export const diagramDashboardAction = diagramDashboardSlice.actions
