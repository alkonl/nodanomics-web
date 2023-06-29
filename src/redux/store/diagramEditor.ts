// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface IDiagramEditorState {
    currentDiagramId?: string
    diagramName?: string
}

const initialState: IDiagramEditorState = {

}

export const diagramEditorSlice = createSlice({
    name: 'diagramEditor',
    initialState,
    reducers: {
        setCurrentDiagram: (state, action: PayloadAction<{
            diagramId: string
            diagramName: string
        }>) => {
            state.currentDiagramId = action.payload.diagramId
            state.diagramName = action.payload.diagramName
        }
    }
})

export const diagramEditorActions = diagramEditorSlice.actions
