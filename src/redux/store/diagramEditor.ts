// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INode} from "../../interface";
import {applyNodeChanges, NodeChange} from "reactflow";


export interface IDiagramEditorState {
    currentDiagramId?: string
    name?: string
    description?: string
    diagramTags?: { id: string, name: string }[]
    diagramNodes: INode[]
}

const initialState: IDiagramEditorState = {
    diagramNodes: []
}

export const diagramEditorSlice = createSlice({
    name: 'diagramEditor',
    initialState,
    reducers: {
        setCurrentDiagram: (state, {payload}: PayloadAction<{
            diagramId: string
            name: string
            description: string
            diagramTags?: { id: string, name: string }[]
        }>) => {
            state.currentDiagramId = payload.diagramId
            state.name = payload.name
            state.description = payload.description
            state.description = payload.description
            state.diagramTags = payload.diagramTags
        },
        addNode: (state, {payload}: PayloadAction<INode>) => {
            state.diagramNodes.push(payload)
        },
        onNodesChange: (state, {payload}: PayloadAction<NodeChange[]>) => {
            state.diagramNodes = applyNodeChanges(payload, state.diagramNodes)
        }
    }
})

export const diagramEditorActions = diagramEditorSlice.actions
