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
import {addEdge, applyEdgeChanges, applyNodeChanges, NodeChange, EdgeChange, updateEdge} from "reactflow";
import {Optionalize} from "../../utils";
import {Graph, RunManager} from "../../service";

export interface IDiagramEditorState {
    currentDiagramId?: string
    name?: string
    description?: string
    diagramTags?: { id: string, name: string }[]
    diagramNodes: IReactFlowNode[]
    diagramEdges: IReactFlowEdge[],
    stateLess: {
        stateLessNodes: IReactFlowNode[]
        stateLessEdges: IReactFlowEdge[]
    }
    currentEditElement?: {
        elementType: EElementType
        id: string
    }
}

const initialState: IDiagramEditorState = {
    diagramNodes: [],
    diagramEdges: [],
    stateLess: {
        stateLessNodes: [],
        stateLessEdges: []
    }
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
            state.stateLess.stateLessNodes.push(payload)
            graph.addOrGetNode(state.diagramNodes[length - 1].data)
        },
        onNodesChange: (state, {payload}: PayloadAction<NodeChange[]>) => {
            // state.diagramNodes = applyNodeChanges<INodeData>(payload, state.diagramNodes)
            // state.stateLess.stateLessNodes = applyNodeChanges<INodeData>(payload, state.stateLess.stateLessNodes)
        },
        onEdgeUpdateEnd: (state, {payload}: PayloadAction<IReactFlowEdge>) => {
            // console.log('onEdgeUpdateEnd1', payload)
            // state.diagramEdges = state.diagramEdges.filter(edge => edge.id !== payload.id)
            // graph.deleteEdge(payload.id)
        },
        onEdgeUpdate: (state, {payload}: PayloadAction<{
            oldEdge: IReactFlowEdge, newConnection: IReactFlowEdgeConnection
        }>) => {
            // state.diagramEdges = updateEdge(payload.oldEdge, payload.newConnection, state.diagramEdges)
        },
        addEdge: (state, {payload}: PayloadAction<EdgeChange[]>) => {
            // state.diagramEdges = applyEdgeChanges(payload, state.diagramEdges)
            // state.stateLess.stateLessEdges = applyEdgeChanges(payload, state.stateLess.stateLessEdges)
        },
        onConnect: (state, {payload}: PayloadAction<IReactFlowEdge | IReactFlowEdgeConnection>) => {
            // state.diagramEdges = addEdge(payload, state.diagramEdges)
            // state.stateLess.stateLessEdges = addEdge(payload, state.stateLess.stateLessEdges)
            // if (payload.target && payload.source && payload.data) {
            //     graph.addEdge({
            //         sourceId: payload.source,
            //         targetId: payload.target,
            //         edgeData: payload.data,
            //     })
            //     updateNodes(state.diagramNodes)
            //     updateNodes(state.stateLess.stateLessNodes)
            // }
        },
        setEditElement: (state, {payload}: PayloadAction<{
            elementType: EElementType
            id: string
        }>) => {
            state.currentEditElement = payload
        },
        updateNodeData: (state, {payload}: PayloadAction<Optionalize<INodeData, 'id'>>) => {
            // graph.updateNodeData(payload.id, payload)
            // updateNodes(state.diagramNodes)
            // updateNodes(state.stateLess.stateLessNodes)
        },
        updateEdgeData: (state, {payload}: PayloadAction<Optionalize<IDiagramConnectionData, 'id' | 'type'>>) => {
            // const edge = state.diagramEdges.find(edge => edge.id === payload.id)
            // graph.updateEdgeData(payload)
            // if (edge && edge.data && edge.data.type === payload.type) {
            //     edge.data = {
            //         ...edge.data,
            //         ...payload
            //     }
            // }
            // const stateLessEdge = state.stateLess.stateLessEdges.find(edge => edge.id === payload.id)
            // if (stateLessEdge && stateLessEdge.data && stateLessEdge.data.type === payload.type) {
            //     stateLessEdge.data = {
            //         ...stateLessEdge.data,
            //         ...payload
            //     }
            // }
        },
        updateEdge: (state, {payload}: PayloadAction<IReactFlowEdge>) => {
            // const edgeToUpdateIndex = state.diagramEdges.findIndex(edge => edge.id === payload.id)
            // const oldEdge = state.diagramEdges[edgeToUpdateIndex]
            // if (oldEdge && payload.data) {
            //     graph.replaceEdgeData(payload.data)
            //     state.diagramEdges = [
            //         ...state.diagramEdges.slice(0, edgeToUpdateIndex),
            //         payload,
            //         ...state.diagramEdges.slice(edgeToUpdateIndex + 1)
            //     ]
            // }
            // const stateLessEdgeToUpdateIndex = state.stateLess.stateLessEdges.findIndex(edge => edge.id === payload.id)
            // const oldStateLessEdge = state.stateLess.stateLessEdges[stateLessEdgeToUpdateIndex]
            // if (oldStateLessEdge && payload.data) {
            //     state.stateLess.stateLessEdges = [
            //         ...state.stateLess.stateLessEdges.slice(0, stateLessEdgeToUpdateIndex),
            //         payload,
            //         ...state.stateLess.stateLessEdges.slice(stateLessEdgeToUpdateIndex + 1)
            //     ]
            // }
        },
        setDiagram: (state, {payload}: PayloadAction<{
            diagramId: string,
            name: string
            nodes?: IReactFlowNode[]
            edges?: IReactFlowEdge[]
        }>) => {
            console.log('setDiagram', graph.edges.length, graph.edges)
            console.log('setDiagram', graph.nodes.length, graph.nodes)
            state.currentDiagramId = payload.diagramId
            state.name = payload.name
            state.diagramNodes = payload.nodes || []
            state.diagramEdges = payload.edges || []
            state.stateLess.stateLessNodes = payload.nodes || []
            state.stateLess.stateLessEdges = payload.edges || []

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
            graph.resetNodeValues()
        },
        // using this action to render new values like variableName
        renderState: (state) => {
            runManager.updateState()
            updateNodes(state.diagramNodes)
        },
    }
})

export const diagramEditorActions = diagramEditorSlice.actions
