// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    EElementType,
    IDiagramConnectionData,
    INodeData,
    IReactFlowEdge,
    IReactFlowEdgeConnection,
    IReactFlowNode,
    isINodeSize,
    IStructuredSpreadsheetsData,
    IUpdateReactflowNode
} from "../../interface";
// eslint-disable-next-line import/named
import {addEdge, applyEdgeChanges, applyNodeChanges, Connection, EdgeChange, NodeChange, updateEdge, EdgeAddChange} from "reactflow";
import {Optionalize} from "../../utils";
import {geAllChildrenNodes, Graph, resetNodeStates, RunManager} from "../../service";
import {canNodeHasChildren} from "../../service/reactflow/node/canNodeHasChildren";
import {ApexOptions} from "apexcharts";
import {DIAGRAM_RUN_DURATION} from "../../constant";

interface IDiagramElements {
    diagramNodes: IReactFlowNode[]
    diagramEdges: IReactFlowEdge[],
}

interface IHistory {
    past: IDiagramElements[],
    future: IDiagramElements[]
    index: number
    limit: number
}

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
    // isStepFinished: boolean
    spreadsheets?: IStructuredSpreadsheetsData
    executionGrid?: {
        options?: ApexOptions
    },
    completedSteps: number
    executionDuration?: number
    // цілове значення кроків
    targetSteps?: number
    history: IHistory
}

const initialHistory: IHistory = {
    past: [],
    future: [],
    index: -1,
    limit: 120,
}

const initialState: IDiagramEditorState = {
    diagramNodes: [],
    diagramEdges: [],
    autoSaveCalled: 0,
    isDiagramRunning: false,
    isDiagramRunningInterval: false,
    // isStepFinished: false,
    currentRunningDiagramStep: 0,
    completedSteps: 0,
    executionDuration: DIAGRAM_RUN_DURATION,
    history: initialHistory,
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

const updateHistory = (state: IDiagramEditorState) => {
    const index = state.history.index
    const pastHistory = state.history.past
    const futureHistory = state.history.future
    const historyItem: IDiagramElements | undefined = futureHistory[index] || pastHistory[index]
    // const pastItem = pastHistory[pastHistory.length - 1]
    // const isEquals = lodash.isEqual(historyItem?.diagramNodes, state.diagramNodes)
    const historyJsonNodes = JSON.stringify(historyItem?.diagramNodes)
    const stateJson = JSON.stringify(state.diagramNodes)
    const historyJsonEdges = JSON.stringify(historyItem?.diagramEdges)
    const stateJsonEdges = JSON.stringify(state.diagramEdges)
    const isDiagramEquals = historyJsonNodes === stateJson
    const isEdgesEquals = historyJsonEdges === stateJsonEdges
    const isEquals = isDiagramEquals && isEdgesEquals


    if (!isEquals || state.history.index === -1) {
        state.history.past.push({
            diagramNodes: state.diagramNodes,
            diagramEdges: state.diagramEdges,
        })
        state.history.future = []
        state.history.index = -1
    }
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
            updateHistory(state)
            graph.addOrGetNode(state.diagramNodes[length - 1].data)
        },
        addManyNodes: (state, {payload}: PayloadAction<IReactFlowNode[]>) => {
            state.diagramNodes.push(...payload)
            updateHistory(state)
            payload.forEach(node => graph.addOrGetNode(node.data))
            state.autoSaveCalled++
        },
        // updateNodeData: (state, {payload}: PayloadAction<INodeData>) => {
        onNodesChange: (state, {payload}: PayloadAction<NodeChange[]>) => {
            state.diagramNodes = applyNodeChanges<INodeData>(payload, state.diagramNodes)
            state.autoSaveCalled++
            updateHistory(state)
        },
        onEdgeUpdateEnd: (state, {payload}: PayloadAction<IReactFlowEdge>) => {
            state.diagramEdges = state.diagramEdges.filter(edge => edge.id !== payload.id)
            state.autoSaveCalled++
            updateHistory(state)
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
                updateHistory(state)
            }
        },
        addEdge: (state, {payload}: PayloadAction<EdgeChange[]>) => {
            state.diagramEdges = applyEdgeChanges(payload, state.diagramEdges)
            state.autoSaveCalled++
            updateHistory(state)
        },
        addManyEdges: (state, {payload}: PayloadAction<IReactFlowEdge[]>) => {
            const edges: EdgeAddChange[] = payload.map(edge => ({
                type: 'add',
                item: edge,
            }))
            state.diagramEdges = applyEdgeChanges(edges, state.diagramEdges)
            payload.forEach(edge => {
                if (edge.data) {
                    console.log('edge.data', edge.data)
                    graph.addEdge({
                        sourceId: edge.source,
                        targetId: edge.target,
                        edgeData: edge.data,
                    })
                }
            })
            state.autoSaveCalled++
            updateHistory(state)
        },
        onConnect: (state, {payload}: PayloadAction<IReactFlowEdge | IReactFlowEdgeConnection>) => {
            state.diagramEdges = addEdge(payload, state.diagramEdges)
            if (payload.target && payload.source && payload.data) {
                graph.addEdge({
                    sourceId: payload.source,
                    targetId: payload.target,
                    edgeData: payload.data,
                })
                runManager.updateState()
                updateNodesFromGraph(state.diagramNodes)
                state.autoSaveCalled++
                updateHistory(state)
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
            updateHistory(state)
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
            updateHistory(state)
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
                updateHistory(state)
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
                updateHistory(state)
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
            updateHistory(state)
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
            updateHistory(state)
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
            updateHistory(state)
        },
        setDiagram: (state, {payload}: PayloadAction<{
            diagramId: string,
            name: string
            nodes?: IReactFlowNode[]
            edges?: IReactFlowEdge[]
        }>) => {
            state.history = initialHistory
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
            // if (isStepFinished !== undefined) {
            //     state.isStepFinished = isStepFinished
            // }
        },
        updateCompletedSteps: (state, {payload}: PayloadAction<number | undefined>) => {
            if (typeof payload === 'number') {
                state.completedSteps = payload
            } else {
                state.completedSteps++
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
            updateEdgesFromGraph(state.diagramEdges)
            state.currentRunningDiagramStep = runManager.currentStep
        },
        // using this action to render new values like variableName
        renderState: (state) => {
            runManager.updateState()
            updateNodesFromGraph(state.diagramNodes)
            updateEdgesFromGraph(state.diagramEdges)
        },
        setExecutionGridProperties: (state, {payload}: PayloadAction<ApexOptions>) => {
            state.executionGrid = {
                ...state.executionGrid,
                options: payload
            }
        },
        setExecutionDuration(state, {payload}: PayloadAction<number | undefined>) {
            state.executionDuration = payload
        },
        setExecutionTargetStep(state, {payload}: PayloadAction<number | undefined>) {
            state.targetSteps = payload
        },
        setDiagramElements: (state, {payload}: PayloadAction<IDiagramElements>) => {
            graph.setDiagramElements({
                nodes: payload.diagramNodes.map(node => node.data),
                edges: payload.diagramEdges.map(edge => edge.data)
                    .filter(Boolean) as IDiagramConnectionData[]
            })
        },
        undo: (state) => {
            if (state.history.past.length > 0) {
                state.history.index++
                const past = state.history.past[state.history.past.length - 1]

                state.history.future.push(past)
                state.diagramNodes = past.diagramNodes
                state.diagramEdges = past.diagramEdges
                state.history.past.pop()

            }
        },
        redo: (state) => {
            const future = state.history.future[state.history.future.length - 1]
            if (future && future !== null) {


                state.diagramNodes = future.diagramNodes
                state.diagramEdges = future.diagramEdges
                state.history.past.push(future)
                state.history.future.pop()
                state.history.index--

            }

        }
    }
})

export const diagramEditorActions = diagramEditorSlice.actions
