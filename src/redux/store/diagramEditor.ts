// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IReactFlowNode, INodeData} from "../../interface";
// eslint-disable-next-line import/named
import {addEdge, applyEdgeChanges, applyNodeChanges, Edge, NodeChange, Connection, EdgeChange} from "reactflow";
import {Optionalize} from "../../utils";
import {Graph} from "../../service";

export interface IDiagramEditorState {
    currentDiagramId?: string
    name?: string
    description?: string
    diagramTags?: { id: string, name: string }[]
    diagramNodes: IReactFlowNode[]
    diagramEdges: Edge[],
    currentEditNodeId?: string
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
        setEditNode: (state, {payload}: PayloadAction<string>) => {
            state.currentEditNodeId = payload
        },
        updateNode: (state, {payload}: PayloadAction<IReactFlowNode>) => {
            const index = state.diagramNodes.findIndex(node => node.id === payload.id)
            state.diagramNodes[index] = payload
        },
        updateNodeData: (state, {payload}: PayloadAction<Optionalize<INodeData, 'id' | 'type'>>) => {
            graph.updateNodeData(payload.id, payload)
            updateNodes(state.diagramNodes)
        },
        addEdge: (state, {payload}: PayloadAction<EdgeChange[]>) => {
            state.diagramEdges = applyEdgeChanges(payload, state.diagramEdges)
        },
        onConnect: (state, {payload}: PayloadAction<Edge | Connection>) => {
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
