import {GraphBaseEdge} from "./abstracts";
import {ILogicConnectionData} from "../../../interface";
import {GraphBaseNode} from "../GraphNodes";
import {GraphNodeManager} from "../NodeManager";

export class GraphLogicEdge extends GraphBaseEdge<ILogicConnectionData> {

    constructor(
        source: GraphBaseNode,
        target: GraphBaseNode,
        data: ILogicConnectionData,
        nodesManager: GraphNodeManager,
    ) {
        super(source, target, data);
    }

    get variableName() {
        return this.data.variableName;
    }
}
