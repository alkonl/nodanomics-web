import {ECreatedNodeType, EDiagramNode, INodeData} from "../../../../interface";
import {GraphBaseNode} from "../abstracts";
import {GraphFormulaNode} from "../GraphFormulaNode";
import {GraphStaticVariableNode} from "../GraphStaticVariableNode";
import {GraphSourceNode} from "../GraphSourceNode";
import {GraphVariableNode} from "../GraphVariableNode";
import {RunManager} from "../../RunManager";
import {GraphEventTriggerNode} from "../GraphEventTriggerNode";
import {GraphEventListenerNode} from "../GraphEventListenerNode";
import {Graph} from "../../Graph";
import {GraphMicroLoopNode, GraphMicroLoopStartNode} from "../microLoop";
import {GraphWhileLoopNode} from "../GraphWhileLoopNode";

export type IAdditionalMicroLoopData = {
    type: EDiagramNode.MicroLoop,
    startNode: GraphMicroLoopStartNode,
}

export type ICreateNodeAdditionalData = IAdditionalMicroLoopData;

export type IGraphCreateSimpleNode = {
    type: ECreatedNodeType.Simple,
    value: {
        node: INodeData,
        additionalData?: ICreateNodeAdditionalData
    },
    runManager: RunManager,
    graph: Graph
}

export type IGraphCreateMicroLoopNode = {
    type: ECreatedNodeType.MicroLoop,
    value: {
        nodes: {
            microLoopNodeData: INodeData,
            startNodeData: INodeData,
        },
    },
    runManager: RunManager,
    graph: Graph
}

export type IGraphCreateCompoundNodeParams = IGraphCreateMicroLoopNode

export type IGraphCreateNode = IGraphCreateSimpleNode | IGraphCreateCompoundNodeParams;

export type IGraphCreatedNode = {
    type: 'Node',
    node: GraphBaseNode,
}

export type IGraphCreatedNodes = {
    type: 'Nodes',
    nodes: GraphBaseNode[],
}

export class GraphNodeFactory {

    static createNode(params: IGraphCreateNode) {
        if (params.type === ECreatedNodeType.Simple) {
            return this.createSimpleNode(params)
        } else {
            return this.createCompoundNode(params)
        }
    }


    static createSimpleNode(params: IGraphCreateSimpleNode): GraphBaseNode {
        const {value, runManager, graph} = params;
        if (EDiagramNode.MicroLoop === value.node.type) {
            if (value.additionalData && value.additionalData.startNode) {
                return new GraphMicroLoopNode(value.node, runManager, value.additionalData.startNode);
            }
            throw new Error(`MicroLoopStartNode must have additionalData with startNode`);
        }
        switch (value.node.type) {
            case EDiagramNode.Formula:
                return new GraphFormulaNode(value.node, runManager);
            case EDiagramNode.StaticVariable:
                return new GraphStaticVariableNode(value.node, runManager);
            case EDiagramNode.Source:
                return new GraphSourceNode(value.node, runManager);
            case EDiagramNode.Variable:
                return new GraphVariableNode(value.node, runManager);
            case EDiagramNode.EventTrigger:
                return new GraphEventTriggerNode(value.node, runManager);
            case EDiagramNode.EventListener:
                return new GraphEventListenerNode(value.node, runManager, graph.nodesManager);
            case EDiagramNode.MicroLoopStartNode:
                return new GraphMicroLoopStartNode(value.node, runManager);
            case EDiagramNode.WhileLoop:
                return new GraphWhileLoopNode(value.node, runManager);
            default:
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                throw new Error(`Unknown node type: ${value.type}`)
        }
    }

    static createCompoundNode(params: IGraphCreateMicroLoopNode): GraphBaseNode[] {
        const {value, runManager, graph} = params;
        switch (params.type) {
            case ECreatedNodeType.MicroLoop: {
                const {microLoopNodeData, startNodeData} = value.nodes;
                const startNodeNode = GraphNodeFactory.createSimpleNode({
                    value: {
                        node: startNodeData,
                    },
                    graph,
                    runManager,
                    type: ECreatedNodeType.Simple,
                });

                if (startNodeNode instanceof GraphMicroLoopStartNode) {
                    const microLoopNode = GraphNodeFactory.createSimpleNode({
                        value: {
                            node: microLoopNodeData,
                            additionalData: {
                                type: EDiagramNode.MicroLoop,
                                startNode: startNodeNode,
                            }
                        },
                        graph,
                        runManager,
                        type: ECreatedNodeType.Simple,
                    });
                    return [microLoopNode, startNodeNode];
                }
                throw new Error(`Start node is not a micro loop start node`)
            }
            default:
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                throw new Error(`Unknown ECreatedNodeType type: ${compoundNode.type}`)
        }
    }
}
