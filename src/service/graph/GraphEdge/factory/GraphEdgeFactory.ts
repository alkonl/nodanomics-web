import {EConnection, IDiagramConnectionData} from "../../../../interface";
import {GraphBaseNode} from "../../GraphNodes";
import {GraphDataEdge} from "../GraphDataEdge";
import {GraphLogicEdge} from "../GraphLogicEdge";
import {GraphChainEdge} from "../GraphChainEdge";

export class GraphEdgeFactory {
    static createEdge({source, target, edgeData}: {
        source: GraphBaseNode,
        target: GraphBaseNode,
        edgeData: IDiagramConnectionData
    }) {
        const edgeType = edgeData.type;
        switch (edgeType) {
            case EConnection.DataConnection:
                return new GraphDataEdge(source, target, edgeData);
            case EConnection.LogicConnection:
                return new GraphLogicEdge(source, target, edgeData);
            case EConnection.ChainConnection:
                return new GraphChainEdge(source, target, edgeData);
            default:
                throw new Error(`Unknown edge type: ${edgeType}`);
        }
    }
}
