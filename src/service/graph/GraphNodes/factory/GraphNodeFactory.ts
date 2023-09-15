import {EDiagramNode, INodeData} from "../../../../interface";
import {GraphBaseNode} from "../abstracts";
import {GraphFormulaNode} from "../GraphFormulaNode";
import {GraphStaticVariableNode} from "../GraphStaticVariableNode";
import {GraphOriginNode} from "../GraphOriginNode";
import {GraphDataNode} from "../GraphDataNode";
import {RunManager} from "../../RunManager";
import {GraphEventTriggerNode} from "../GraphEventTriggerNode";
import {GraphEventListenerNode} from "../GraphEventListenerNode";
import {Graph} from "../../Graph";
import {GraphWhileLoopNode} from "../GraphWhileLoopNode";
import {GraphMicroLoopNode} from "../GraphMicroLoopNode";
import {GraphDatasetDatafieldNode} from "../GraphDatasetDatafieldNode";
import {GraphStartNode} from "../GraphStartNode";
import {GraphSinkNode} from "../GraphSinkNode";
import {GraphTransferNode} from "../GraphTransferNode";


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
                return new GraphFormulaNode(value.node, runManager, graph.nodesManager);
            case EDiagramNode.StaticVariable:
                return new GraphStaticVariableNode(value.node, runManager, graph.nodesManager);
            case EDiagramNode.Origin:
                return new GraphOriginNode(value.node, runManager, graph.nodesManager);
            case EDiagramNode.Data:
                return new GraphDataNode(value.node, runManager, graph.nodesManager);
            case EDiagramNode.EventTrigger:
                return new GraphEventTriggerNode(value.node, runManager, graph.nodesManager);
            case EDiagramNode.EventListener:
                return new GraphEventListenerNode(value.node, runManager, graph.nodesManager);
            case EDiagramNode.WhileLoop:
                return new GraphWhileLoopNode(value.node, runManager, graph.nodesManager);
            case EDiagramNode.MicroLoop:
                return new GraphMicroLoopNode(value.node, runManager, graph.nodesManager);
            case EDiagramNode.DatasetDatafield:
                return new GraphDatasetDatafieldNode(value.node, runManager, graph.nodesManager, graph.spreadsheetManager);
            case EDiagramNode.Start:
                return new GraphStartNode(value.node, runManager, graph.nodesManager);
            case EDiagramNode.Sink:
                return new GraphSinkNode(value.node, runManager, graph.nodesManager);
            case EDiagramNode.Transfer:
                return new GraphTransferNode(value.node, runManager, graph.nodesManager);
            default:
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                throw new Error(`Unknown node type: ${value.type}`)
        }
    }
}
