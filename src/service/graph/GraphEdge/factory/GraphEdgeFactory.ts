import {EConnection, IDiagramConnectionData} from "../../../../interface";
import {GraphBaseNode} from "../../GraphNodes";
import {GraphDataEdge} from "../GraphDataEdge";
import {GraphLogicEdge} from "../GraphLogicEdge";
import {GraphChainEdge} from "../GraphChainEdge";
import {Graph} from "../../Graph";

export class GraphEdgeFactory {
    static createEdge({source, target, edgeData, graph}: {
        source: GraphBaseNode,
        target: GraphBaseNode,
        edgeData: IDiagramConnectionData,
        graph: Graph,
    }) {
        const edgeType = edgeData.type;
        switch (edgeType) {
            case EConnection.DataConnection:
                return new GraphDataEdge(source, target, edgeData, graph.nodesManager, graph.graphTagManager);
            case EConnection.LogicConnection:
                return new GraphLogicEdge(source, target, edgeData, graph.nodesManager);
            case EConnection.ChainConnection:
                return new GraphChainEdge(source, target, edgeData, graph.nodesManager);
            default:
                throw new Error(`Unknown edge type: ${edgeType}`);
        }
    }
}
