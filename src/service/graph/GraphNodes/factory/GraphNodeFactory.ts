import {EDiagramNode, INodeData} from "../../../../interface";
import {GraphBaseNode} from "../abstracts";
import {GraphFormulaNode} from "../GraphFormulaNode";
import {GraphVariableNode} from "../GraphVariableNode";
import {GraphSourceNode} from "../GraphSourceNode";
import {GraphPoolNode} from "../GraphPoolNode";
import {RunManager} from "../../RunManager";
import {GraphEventTriggerNode} from "../GraphEventTriggerNode";
import {GraphEventListenerNode} from "../GraphEventListenerNode";
import {Graph} from "../../Graph";

export class GraphNodeFactory {
    static createNode(value: INodeData, runManager: RunManager, graph: Graph): GraphBaseNode {
        switch (value.type) {
            case EDiagramNode.Formula:
                return new GraphFormulaNode(value, runManager);
            case EDiagramNode.Variable:
                return new GraphVariableNode(value, runManager);
            case EDiagramNode.Source:
                return new GraphSourceNode(value, runManager);
            case EDiagramNode.Pool:
                return new GraphPoolNode(value, runManager);
            case EDiagramNode.EventTrigger:
                return new GraphEventTriggerNode(value, runManager);
            case EDiagramNode.EventListener:
                return new GraphEventListenerNode(value, runManager, graph.nodesManager);
            default:
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                throw new Error(`Unknown node type: ${value.type}`)
        }
    }
}
