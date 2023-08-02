import {EDiagramNode, INodeData} from "../../../../interface";
import {GraphBaseNode} from "../abstracts";
import {GraphFormulaNode} from "../GraphFormulaNode";
import {GraphStaticVariableNode} from "../GraphStaticVariableNode";
import {GraphSourceNode} from "../GraphSourceNode";
import {GraphVariableNode} from "../GraphVariableNode";
import {RunManager} from "../../RunManager";
import {GraphEventTriggerNode} from "../GraphEventTriggerNode";
import {GraphEventListenerNode} from "../GraphEventListenerNode";
import {Graph} from "../../Graph";
import {GraphMicroLoopNode} from "../microLoop";
import {GraphWhileLoopNode} from "../GraphWhileLoopNode";


export type IGraphCreateSimpleNode = {
    value: {
        node: INodeData,
    },
    runManager: RunManager,
    graph: Graph
}








export class GraphNodeFactory {


    static createSimpleNode(params: IGraphCreateSimpleNode): GraphBaseNode {
        const {value, runManager, graph} = params;
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
            case EDiagramNode.WhileLoop:
                return new GraphWhileLoopNode(value.node, runManager);
            case EDiagramNode.MicroLoop:
                return new GraphMicroLoopNode(value.node, runManager);
            default:
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                throw new Error(`Unknown node type: ${value.type}`)
        }
    }
}
