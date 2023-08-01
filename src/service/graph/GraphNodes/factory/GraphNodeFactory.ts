import {ECreatedNodeType, EDiagramNode, IGraphCreatedCompoundNode, INodeData} from "../../../../interface";
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

export type IAdditionalMicroLoopData = {
    type: EDiagramNode.MicroLoop,
    startNode: GraphMicroLoopStartNode,
}

export type ICreatedNode = IAdditionalMicroLoopData;

export class GraphNodeFactory {
    static createSimpleNode(value: {
        node: INodeData,
        additionalData?: ICreatedNode
    }, runManager: RunManager, graph: Graph): GraphBaseNode {
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
            default:
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                throw new Error(`Unknown node type: ${value.type}`)
        }
    }


    static createCompoundNode(compoundNode: IGraphCreatedCompoundNode, runManager: RunManager, graph: Graph) {
        switch (compoundNode.type) {
            case ECreatedNodeType.MicroLoop: {
                const {microLoop, startNode} = compoundNode.nodes;
                const startNodeNode = GraphNodeFactory.createSimpleNode({
                    node: startNode,
                }, runManager, graph);
                if (startNodeNode instanceof GraphMicroLoopStartNode) {
                    const microLoopNode = GraphNodeFactory.createSimpleNode({
                        node: microLoop,
                        additionalData: {
                            type:  EDiagramNode.MicroLoop,
                            startNode: startNodeNode,
                        }
                    }, runManager, graph);
                    return [startNodeNode, microLoopNode]
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
