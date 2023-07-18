// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    IReactFlowNode,
    INodeData,
    IReactFlowEdge,
    IDiagramConnectionData,
    EElementType, IReactFlowEdgeConnection
} from "../../interface";
// eslint-disable-next-line import/named
import {addEdge, applyEdgeChanges, applyNodeChanges, NodeChange, EdgeChange} from "reactflow";
import {Optionalize} from "../../utils";
import {Graph, RunManager} from "../../service";

export interface IDiagramEditorState {
    currentDiagramId?: string
    name?: string
    description?: string
    diagramTags?: { id: string, name: string }[]
    diagramNodes: IReactFlowNode[]
    diagramEdges: IReactFlowEdge[],
    currentEditElement?: {
        elementType: EElementType
        id: string
    }
}

const initialState: IDiagramEditorState = {
    diagramNodes: [],
    diagramEdges: []
}

const graph = new Graph()
const runManager = new RunManager(graph)
graph.attachRunManager(runManager)

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
            const length = state.diagramNodes.push(payload)
            graph.addOrGetNode(state.diagramNodes[length - 1].data)
        },
        onNodesChange: (state, {payload}: PayloadAction<NodeChange[]>) => {
            state.diagramNodes = applyNodeChanges<INodeData>(payload, state.diagramNodes)
        },
        setEditElement: (state, {payload}: PayloadAction<{
            elementType: EElementType
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
            const edge = state.diagramEdges.find(edge => edge.id === payload.id)
            graph.updateEdgeData(payload)
            if (edge && edge.data && edge.data.type === payload.type) {
                edge.data = {
                    ...edge.data,
                    ...payload
                }
            }
        },
        updateEdge: (state, {payload}: PayloadAction<IReactFlowEdge>) => {
            const edgeToUpdateIndex = state.diagramEdges.findIndex(edge => edge.id === payload.id)
            const oldEdge = state.diagramEdges[edgeToUpdateIndex]
            if (oldEdge && payload.data) {
                graph.updateEdgeData(payload.data)
                state.diagramEdges = [
                    ...state.diagramEdges.slice(0, edgeToUpdateIndex),
                    payload,
                    ...state.diagramEdges.slice(edgeToUpdateIndex + 1)
                ]
            }
        },
        addEdge: (state, {payload}: PayloadAction<EdgeChange[]>) => {
            state.diagramEdges = applyEdgeChanges(payload, state.diagramEdges)
        },
        onConnect: (state, {payload}: PayloadAction<IReactFlowEdge | IReactFlowEdgeConnection>) => {
            state.diagramEdges = addEdge(payload, state.diagramEdges)
            if (payload.target && payload.source && payload.data) {
                graph.addEdge({
                    sourceId: payload.source,
                    targetId: payload.target,
                    edgeData: payload.data,
                })
                updateNodes(state.diagramNodes)
            }
        },
        invokeStep: (state) => {
            runManager.invokeStep()
            updateNodes(state.diagramNodes)
        },
        resetDiagramRun: (state) => {
            graph.resetNodeValues()
        }
    }
})

export const diagramEditorActions = diagramEditorSlice.actions
