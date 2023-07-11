// eslint-disable-next-line import/named
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EDiagramNode, INode, INodeData} from "../../interface";
// eslint-disable-next-line import/named
import {addEdge, applyEdgeChanges, applyNodeChanges, Edge, NodeChange, Connection, EdgeChange} from "reactflow";
import {Optionalize} from "../../utils";
import {Graph} from "../../utils/graph";

export interface IDiagramEditorState {
    currentDiagramId?: string
    name?: string
    description?: string
    diagramTags?: { id: string, name: string }[]
    diagramNodes: INode[]
    diagramEdges: Edge[],
    currentEditNodeId?: string
}

const initialState: IDiagramEditorState = {
    diagramNodes: [],
    diagramEdges: []
}

const graph = new Graph()

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
            graph.addNode(payload.data)
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
        updateNodeData: (state, {payload}: PayloadAction<Optionalize<INodeData, 'id' | 'type'>>) => {
            const index = state.diagramNodes.findIndex(node => node.id === payload.id)
            const node = state.diagramNodes[index]
            const nodeData = node.data
            if (payload.type === nodeData.type) {
                node.data = {
                    ...nodeData,
                    ...payload
                }
            }
            graph.updateNodeData(payload.id, node.data)
            console.log('graph.updateNodeData: ', graph)
        },
        addEdge: (state, {payload}: PayloadAction<EdgeChange[]>) => {
            state.diagramEdges = applyEdgeChanges(payload, state.diagramEdges)
            // graph.addNode(payload)
        },
        onConnect: (state, {payload}: PayloadAction<Edge | Connection>) => {
            state.diagramEdges = addEdge(payload, state.diagramEdges)
            const payloadEdge = payload as Connection
            if (typeof payloadEdge.target === 'string' && typeof payloadEdge.source === 'string') {
                const nodeTarget = graph.findNode(payloadEdge.target)
                const nodeSource = graph.findNode(payloadEdge.source)
                if (nodeTarget && nodeSource) {
                    graph.addEdge(nodeTarget, nodeSource)
                }
                console.log('state.diagramEdges: ', state.diagramEdges);
                const changedNode = graph.findNode(payloadEdge.target)
                if (changedNode) {
                    console.log('changedNode.neighbors: ', changedNode.neighbors)
                    const w = changedNode.neighbors.reduce((acc, node) => {
                        console.log('node.value: ', node.value)
                        if (node.value.type === EDiagramNode.Variable) {
                            const value = node.value.value
                            if (value) {
                                acc += value
                            }
                        }
                        return acc
                    }, 0)
                    if (changedNode.value.type === EDiagramNode.Formula) {
                        changedNode.value = {
                            ...changedNode.value,
                            result: {
                                type: 'number',
                                value: w
                            }
                        }
                    }
                    const index = state.diagramNodes.findIndex(node => node.id === changedNode.value.id)
                    const node = state.diagramNodes[index]
                    const nodeData = node.data
                    if (changedNode.value.type === nodeData.type) {
                        node.data = {
                            ...nodeData,
                            ...changedNode.value
                        }
                    }
                    console.log('w: ', w)
                }
            }
        }
    }
})

export const diagramEditorActions = diagramEditorSlice.actions
