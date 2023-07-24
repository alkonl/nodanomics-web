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
import {addEdge, applyEdgeChanges, applyNodeChanges, NodeChange, EdgeChange, updateEdge, Connection} from "reactflow";
import {Optionalize} from "../../utils";
import {Graph, resetNodeStates, RunManager} from "../../service";

export interface IDiagramEditorState {
    currentDiagramId?: string
    name?: string
    description?: string
    diagramTags?: { id: string, name: string }[]
    diagramNodes: IReactFlowNode[]
    diagramEdges: IReactFlowEdge[],
    autoSaveCalled: number
    currentEditElement?: {
        elementType: EElementType
        id: string
    }
}

const initialState: IDiagramEditorState = {
    diagramNodes: [],
    diagramEdges: [],
    autoSaveCalled: 0,
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
        }>) => {
            state.currentDiagramId = payload.diagramId
        },

        addNode: (state, {payload}: PayloadAction<IReactFlowNode>) => {
            const length = state.diagramNodes.push(payload)
            state.autoSaveCalled++
            graph.addOrGetNode(state.diagramNodes[length - 1].data)
        },
        onNodesChange: (state, {payload}: PayloadAction<NodeChange[]>) => {
            state.diagramNodes = applyNodeChanges<INodeData>(payload, state.diagramNodes)
            state.autoSaveCalled++
        },
        onEdgeUpdateEnd: (state, {payload}: PayloadAction<IReactFlowEdge>) => {
            state.diagramEdges = state.diagramEdges.filter(edge => edge.id !== payload.id)
            state.autoSaveCalled++
            graph.deleteEdge(payload.id)
        },
        onEdgeUpdate: (state, {payload}: PayloadAction<{
            oldEdge: IReactFlowEdge, newConnection: Connection
        }>) => {
            state.diagramEdges = updateEdge({
                ...payload.oldEdge,
                data: {
                    ...payload.oldEdge.data,
                    targetId: payload.newConnection.target,
                    sourceId: payload.newConnection.source,
                }
            }, payload.newConnection, state.diagramEdges, {
                shouldReplaceId: false,
            })
            const {source, target} = payload.newConnection
            if (source !== null && target !== null) {
                graph.updateConnectionSourceAndTarget({
                    edgeId: payload.oldEdge.id,
                    newSourceId: source,
                    newTargetId: target,
                })
                state.autoSaveCalled++
            }
        },
        addEdge: (state, {payload}: PayloadAction<EdgeChange[]>) => {
            state.diagramEdges = applyEdgeChanges(payload, state.diagramEdges)
            state.autoSaveCalled++
        },
        onConnect: (state, {payload}: PayloadAction<IReactFlowEdge | IReactFlowEdgeConnection>) => {
            state.diagramEdges = addEdge(payload, state.diagramEdges)
            state.autoSaveCalled++
            if (payload.target && payload.source && payload.data) {
                graph.addEdge({
                    sourceId: payload.source,
                    targetId: payload.target,
                    edgeData: payload.data,
                })
                updateNodes(state.diagramNodes)
                state.autoSaveCalled++
            }
        },
        setEditElement: (state, {payload}: PayloadAction<{
            elementType: EElementType
            id: string
        }>) => {
            state.currentEditElement = payload
        },
        updateNodeData: (state, {payload}: PayloadAction<Optionalize<INodeData, 'id'>>) => {
            graph.updateNodeData(payload.id, payload)
            updateNodes(state.diagramNodes)
            state.autoSaveCalled++
        },
        deleteNode: (state, {payload}: PayloadAction<{ nodeId: string }>) => {
            state.diagramNodes = state.diagramNodes.filter(node => node.id !== payload.nodeId)
            state.autoSaveCalled++
            graph.deleteNode({
                nodeId: payload.nodeId
            })
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
            state.autoSaveCalled++
        },
        updateEdge: (state, {payload}: PayloadAction<IReactFlowEdge>) => {
            const edgeToUpdateIndex = state.diagramEdges.findIndex(edge => edge.id === payload.id)
            const oldEdge = state.diagramEdges[edgeToUpdateIndex]
            if (oldEdge && payload.data) {
                graph.replaceEdgeData(payload.data)
                state.diagramEdges = [
                    ...state.diagramEdges.slice(0, edgeToUpdateIndex),
                    payload,
                    ...state.diagramEdges.slice(edgeToUpdateIndex + 1)
                ]
            }
            state.autoSaveCalled++
        },
        setDiagram: (state, {payload}: PayloadAction<{
            diagramId: string,
            name: string
            nodes?: IReactFlowNode[]
            edges?: IReactFlowEdge[]
        }>) => {
            state.currentDiagramId = payload.diagramId
            state.name = payload.name
            state.diagramNodes = payload.nodes || []
            state.diagramEdges = payload.edges || []
            let filteredEdges: IDiagramConnectionData[] = []
            if (payload.edges) {
                filteredEdges = payload.edges
                    .map(edge => edge.data)
                    .filter(edgeData => edgeData !== undefined) as IDiagramConnectionData[]
            }
            let formattedNodes: INodeData[] = []
            if (payload.nodes) {
                formattedNodes = payload.nodes.map(node => node.data)
            }
            graph.setDiagramElements({
                nodes: formattedNodes,
                edges: filteredEdges
            })
        },
        invokeStep: (state) => {
            runManager.invokeStep()
            updateNodes(state.diagramNodes)
        },
        resetDiagramRun: (state) => {
            const resetNode = resetNodeStates(state.diagramNodes)
            graph.updateNodesState(resetNode.map(node => node.data))
            runManager.updateState()
            updateNodes(state.diagramNodes)
        },
        // using this action to render new values like variableName
        renderState: (state) => {
            runManager.updateState()
            updateNodes(state.diagramNodes)
        },
    }
})

export const diagramEditorActions = diagramEditorSlice.actions
