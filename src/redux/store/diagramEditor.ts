// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    IReactFlowNode,
    INodeData,
    IReactFlowEdge,
    IDiagramConnectionData,
    EElementType
} from "../../interface";
// eslint-disable-next-line import/named
import {addEdge, applyEdgeChanges, applyNodeChanges, NodeChange, Connection, EdgeChange} from "reactflow";
import {Optionalize} from "../../utils";
import {Graph} from "../../service";

export interface IDiagramEditorState {
    currentDiagramId?: string
    name?: string
    description?: string
    diagramTags?: { id: string, name: string }[]
    diagramNodes: IReactFlowNode[]
    diagramEdges: IReactFlowEdge[],
    currentEditElement?: {
        type: EElementType
        id: string
    }
}

const initialState: IDiagramEditorState = {
    diagramNodes: [],
    diagramEdges: []
}

const graph = new Graph()

const updateNodes = (diagramNodes: IReactFlowNode[]) => {
    diagramNodes.forEach(node => {
        const updatedData = graph.findNode(node.id)?.data
        if (updatedData) {
            node.data = updatedData
        }
    })
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
        addNode: (state, {payload}: PayloadAction<IReactFlowNode>) => {
            const lenth = state.diagramNodes.push(payload)
            graph.addOrGetNode(state.diagramNodes[lenth - 1].data)
            console.log('graph.addOrGetNode: ', graph)
        },
        onNodesChange: (state, {payload}: PayloadAction<NodeChange[]>) => {
            state.diagramNodes = applyNodeChanges<INodeData>(payload, state.diagramNodes)
        },
        setEditNode: (state, {payload}: PayloadAction<{
            type: EElementType
            id: string
        }>) => {
            state.currentEditElement = payload
        },
        updateNode: (state, {payload}: PayloadAction<IReactFlowNode>) => {
            const index = state.diagramNodes.findIndex(node => node.id === payload.id)
            state.diagramNodes[index] = payload
        },
        updateNodeData: (state, {payload}: PayloadAction<Optionalize<INodeData, 'id'>>) => {
            graph.updateNodeData(payload.id, payload)
            updateNodes(state.diagramNodes)
        },
        updateEdgeData: (state, {payload}: PayloadAction<Optionalize<IDiagramConnectionData, 'id' | 'type'>>) => {
            console.log('updateEdgeData: ', payload)
            const edge = state.diagramEdges.find(edge => edge.id === payload.id)
            // graph.updateEdgeData(payload.id, payload)
            console.log('updateEdgeData: ', edge)
            if (edge && edge.data && edge.data.type === payload.type) {
                console.log('updateEdgeData: ', JSON.stringify(edge.data, null, 2))
                edge.data = {
                    ...edge.data,
                    ...payload
                }
            }
        },
        addEdge: (state, {payload}: PayloadAction<EdgeChange[]>) => {
            state.diagramEdges = applyEdgeChanges(payload, state.diagramEdges)
        },
        onConnect: (state, {payload}: PayloadAction<IReactFlowEdge | Connection>) => {
            state.diagramEdges = addEdge(payload, state.diagramEdges)

            if (payload.target && payload.source) {
                graph.addEdge({
                    sourceId: payload.source,
                    targetId: payload.target
                })
                updateNodes(state.diagramNodes)
            }
        }
    }
})

export const diagramEditorActions = diagramEditorSlice.actions
