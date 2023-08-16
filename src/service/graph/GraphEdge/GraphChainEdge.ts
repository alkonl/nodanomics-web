import {GraphBaseEdge} from "./abstracts";
import {IChainConnectionData} from "../../../interface";
import {GraphBaseNode} from "../GraphNodes";

export class GraphChainEdge extends GraphBaseEdge<IChainConnectionData> {
    constructor(
        source: GraphBaseNode,
        target: GraphBaseNode,
        data: IChainConnectionData,
    ) {
        super(source, target, data);
    }
}
