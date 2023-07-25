import {GraphBaseEdge} from "./abstracts";
import {IEventConnectionData} from "../../../interface";
import {GraphBaseNode} from "../GraphNodes";

export class GraphEventEdge extends GraphBaseEdge<IEventConnectionData> {
    constructor(
        source: GraphBaseNode,
        target: GraphBaseNode,
        data: IEventConnectionData,
    ) {
        super(source, target, data);
    }
}
