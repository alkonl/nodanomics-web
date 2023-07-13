import {EConnection, IDiagramConnectionData} from "../../../interface";
import {GraphBaseNode} from "../GraphNodes";
import {GraphDataEdge} from "./GraphDataEdge";
import {RunManager} from "../Graph";

export class GraphEdgeFactory {
    static createEdge({source, target, edgeData, renderGraph}: {
        source: GraphBaseNode,
        target: GraphBaseNode,
        edgeData: IDiagramConnectionData
        renderGraph: RunManager
    }) {
        switch (edgeData.type) {
            case EConnection.DataConnection:
                return new GraphDataEdge(source, target, edgeData, renderGraph);
            default:
                throw new Error(`Unknown edge type: ${edgeData.type}`);
        }
    }
}
