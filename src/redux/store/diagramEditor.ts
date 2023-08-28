// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    EElementType,
    IDiagramConnectionData,
    IExecutionGridProperties,
    INodeData,
    IReactFlowEdge,
    IReactFlowEdgeConnection,
    IReactFlowNode,
    isINodeSize,
    IStructuredSpreadsheetsData,
    IUpdateReactflowNode
} from "../../interface";
// eslint-disable-next-line import/named
import {addEdge, applyEdgeChanges, applyNodeChanges, Connection, EdgeChange, NodeChange, updateEdge} from "reactflow";
import {Optionalize} from "../../utils";
import {Graph, resetNodeStates, RunManager} from "../../service";
import {canNodeHasChildren} from "../../service/reactflow/node/canNodeHasChildren";
import {geAllChildrenNodes} from "../../hooks/useGeAllChildrenNodes";


export interface IDiagramEditorState {
    currentDiagramId?: string
    name?: string
    description?: string
    diagramTags?: {
        id: string,
        name: string
    }[]
    diagramNodes: IReactFlowNode[]
    diagramEdges: IReactFlowEdge[],
    autoSaveCalled: number
    currentEditElement?: {
        elementType: EElementType
        id: string
    }
    currentRunningDiagramStep: number
    isDiagramRunning: boolean
    isDiagramRunningInterval: boolean
    spreadsheets?: IStructuredSpreadsheetsData
    executionGrid?: {
        properties: IExecutionGridProperties
    }
}

const initialState: IDiagramEditorState = {
    diagramNodes: [],
    diagramEdges: [],
    autoSaveCalled: 0,
    isDiagramRunning: false,
    isDiagramRunningInterval: false,
    currentRunningDiagramStep: 0
}

const graph = new Graph()
const runManager = new RunManager(graph)
graph.attachRunManager(runManager)

const updateNodesFromGraph = (diagramNodes: IReactFlowNode[]) => {
    diagramNodes.forEach(node => {
        const updatedData = graph.findNode(node.id)?.data
        if (updatedData) {
            node.data = updatedData
        }
    })
}

const updateEdgesFromGraph = (diagramEdges: IReactFlowEdge[]) => {
    diagramEdges.forEach(edge => {
        const updatedData = graph.findEdge(edge.id)?.data
        if (updatedData) {
            edge.data = updatedData
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

        // updateNodeData: (state, {payload}: PayloadAction<INodeData>) => {
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
            oldEdge: IReactFlowEdge,
            newConnection: Connection
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
                runManager.updateState()
                updateNodesFromGraph(state.diagramNodes)
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
            runManager.updateState()
            updateNodesFromGraph(state.diagramNodes)
            state.autoSaveCalled++
        },
        bulkUpdateNodes: (state, {payload}: PayloadAction<IUpdateReactflowNode[]>) => {
            payload.forEach(updatedNode => {
                const stateNodeIndex = state.diagramNodes.findIndex(node => node.id === updatedNode.id)
                const stateNode = state.diagramNodes[stateNodeIndex]
                if (updatedNode.data) {
                    graph.updateNodeData(updatedNode.id, updatedNode.data)
                }
                state.diagramNodes[stateNodeIndex] = {
                    ...stateNode,
                    ...updatedNode,
                }
            })
            updateNodesFromGraph(state.diagramNodes)
            state.autoSaveCalled++
        },
        updateNodeParent: (state, {payload}: PayloadAction<{
            node: IReactFlowNode,
            parentNode: IReactFlowNode
        }>) => {
            graph.updateNodeData(payload.node.data.id, {
                ...payload.node.data,
                parentId: payload.parentNode.data.id,
            })
            updateNodesFromGraph(state.diagramNodes)
            const node = state.diagramNodes.find(node => node.id === payload.node.id)
            if (node && node.parentNode === undefined) {

                node.data = {
                    ...node.data,
                    parentId: payload.parentNode.id,
                }
                node.parentNode = payload.parentNode.id
                const parentPosition = payload.parentNode.positionAbsolute || payload.parentNode.position
                node.position = {
                    x: payload.node.position.x - parentPosition.x,
                    y: payload.node.position.y - parentPosition.y,
                }
                node.zIndex = payload.parentNode.zIndex ? payload.parentNode.zIndex + 1 : 10
                node.extent = 'parent'
                state.autoSaveCalled++
            }

        },
        updateNodeSize: (state, {payload}: PayloadAction<{
            nodeId: string,
            size: {
                width: number,
                height: number
            }
        }>) => {
            const stateNodeIndex = state.diagramNodes.findIndex(node => node.id === payload.nodeId)
            const stateNode = state.diagramNodes[stateNodeIndex]
            if (stateNode && isINodeSize(stateNode.data.style)) {
                const newNode = {
                    ...stateNode,
                    data: {
                        ...stateNode.data,
                        style: {
                            ...stateNode.data.style,
                            width: payload.size.width,
                            height: payload.size.height,
                        }
                    },
                }
                graph.updateNodeData(payload.nodeId, newNode.data)
                updateNodesFromGraph(state.diagramNodes)
                state.autoSaveCalled++
            }
        },
        deleteNode: (state, {payload}: PayloadAction<{
            nodeId: string
        }>) => {
            const node = state.diagramNodes.find(node => node.id === payload.nodeId)
            if (node && canNodeHasChildren(node.data.type)) {
                const nodesToDelete = geAllChildrenNodes({
                    parentId: payload.nodeId,
                    nodes: state.diagramNodes,
                })
                nodesToDelete.push(node)
                state.diagramNodes = state.diagramNodes.filter(node => {
                    return !nodesToDelete.some(childNode => childNode.id === node.id)
                })
                const toDeleteNodes: string[] = nodesToDelete.map(node => node.id)
                graph.deleteBulkNodes(toDeleteNodes)

            } else {
                state.diagramNodes = state.diagramNodes.filter(node => node.id !== payload.nodeId)
                graph.deleteNode({
                    nodeId: payload.nodeId
                })
            }
            state.autoSaveCalled++
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
        bulkUpdateEdges: (state, {payload}: PayloadAction<Optionalize<IReactFlowEdge, 'id'>[]>) => {
            payload.forEach(updatedEdge => {
                const stateEdgeIndex = state.diagramEdges.findIndex(node => node.id === updatedEdge.id)
                const stateEdge = state.diagramEdges[stateEdgeIndex]
                if (stateEdge) {
                    if (stateEdge.data) {
                        stateEdge.data = {
                            ...stateEdge.data,
                            ...updatedEdge.data,
                        }
                    }
                    state.diagramEdges[stateEdgeIndex] = {
                        ...stateEdge,
                        ...updatedEdge,
                    }
                }

            })
        },
        replaceEdge: (state, {payload}: PayloadAction<IReactFlowEdge>) => {
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
            updateNodesFromGraph(state.diagramNodes)
            updateEdgesFromGraph(state.diagramEdges)
            state.currentRunningDiagramStep = runManager.currentStep
        },
        setIsDiagramRunning: (state, {payload: {isDiagramRunningInterval, isRunning}}: PayloadAction<{
            isRunning?: boolean
            isDiagramRunningInterval?: boolean
        }>) => {
            if (isRunning !== undefined) {
                state.isDiagramRunning = isRunning
            }
            if (isDiagramRunningInterval !== undefined) {
                state.isDiagramRunningInterval = isDiagramRunningInterval
            }

        },
        setSpreadsheets: (state, {payload}: PayloadAction<{
            spreadsheets: IStructuredSpreadsheetsData
        }>) => {
            state.spreadsheets = payload.spreadsheets
            graph.setSpreadsheetsData({
                spreadsheetData: payload.spreadsheets
            })
        },
        resetDiagramRun: (state) => {
            const resetNode = resetNodeStates(state.diagramNodes)
            graph.resetResourcesToProvide()
            graph.updateNodesState(resetNode.map(node => node.data))
            runManager.updateState()
            runManager.resetCurrentStep()
            updateNodesFromGraph(state.diagramNodes)
            state.currentRunningDiagramStep = runManager.currentStep
        },
        // using this action to render new values like variableName
        renderState: (state) => {
            runManager.updateState()
            updateNodesFromGraph(state.diagramNodes)
        },
        setExecutionGridProperties: (state, {payload}: PayloadAction<IExecutionGridProperties>) => {
            state.executionGrid = {
                properties: payload
            }
        }
    }
})

export const diagramEditorActions = diagramEditorSlice.actions
