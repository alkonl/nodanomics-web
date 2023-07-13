import {EConnection, IDiagramConnectionData} from "../../../interface";
import {GraphBaseNode} from "../GraphNodes";
import {GraphDataEdge} from "./GraphDataEdge";

export class GraphEdgeFactory {
    static createEdge({source, target, edgeData}: {
        source: GraphBaseNode,
        target: GraphBaseNode,
        edgeData: IDiagramConnectionData
    }) {
        switch (edgeData.type) {
            case EConnection.DataConnection:
                return new GraphDataEdge(source, target, edgeData);
            default:
                throw new Error(`Unknown edge type: ${edgeData.type}`);
        }
    }
}
