// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EDiagramNode, INode, INodeData} from "../../interface";
// eslint-disable-next-line import/named
import {applyNodeChanges, NodeChange} from "reactflow";
import {Optionalize} from "../../utils";


export interface IDiagramEditorState {
    currentDiagramId?: string
    name?: string
    description?: string
    diagramTags?: { id: string, name: string }[]
    diagramNodes: INode[]
    currentEditNodeId?: string
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
            const nodes = applyNodeChanges(payload, state.diagramNodes)
            state.diagramNodes = nodes
        },
        setEditNode: (state, {payload}: PayloadAction<string>) => {
            state.currentEditNodeId = payload
        },
        updateNode: (state, {payload}: PayloadAction<INode>) => {
            const index = state.diagramNodes.findIndex(node => node.id === payload.id)
            state.diagramNodes[index] = payload
        },
        updateNodeData: (state, {payload}: PayloadAction<Optionalize<INodeData, 'id'| 'type'>>) => {
            const index = state.diagramNodes.findIndex(node => node.id === payload.id)
            const node = state.diagramNodes[index]
            const nodeData = node.data
            if(payload.type === nodeData.type) {
                node.data = {
                    ...nodeData,
                    ...payload
                }
            }
        }
    }
})

export const diagramEditorActions = diagramEditorSlice.actions
