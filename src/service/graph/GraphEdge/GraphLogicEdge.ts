import {GraphBaseEdge} from "./GraphBaseEdge";
import {ILogicConnectionData} from "../../../interface";
import {GraphBaseNode} from "../GraphNodes";

export class GraphLogicEdge extends GraphBaseEdge<ILogicConnectionData> {
    constructor(
        source: GraphBaseNode,
        target: GraphBaseNode,
        data: ILogicConnectionData,
    ) {
        super(source, target, data);
    }

    get variableName() {
        return this.data.variableName;
    }
}
