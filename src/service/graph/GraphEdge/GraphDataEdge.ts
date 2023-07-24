import {GraphBaseEdge} from "./abstracts";
import {IDataConnectionData} from "../../../interface";
import {GraphBaseNode} from "../GraphNodes";


export class GraphDataEdge extends GraphBaseEdge<IDataConnectionData> {


    constructor(
        source: GraphBaseNode,
        target: GraphBaseNode,
        data: IDataConnectionData,
    ) {
        super(source, target, data);
    }

    get countOfResource() {
        return Number(this.data.formula);
    }

    static baseEdgeIsData(edge: GraphBaseEdge): edge is GraphDataEdge {
        return edge instanceof GraphDataEdge;
    }
}
