import {GraphBaseEdge} from "./GraphBaseEdge";
import {IDataConnectionData} from "../../../interface";
import {GraphBaseNode} from "../GraphNodes";

export class GraphDataEdge extends GraphBaseEdge<IDataConnectionData> {

    constructor(source: GraphBaseNode, target: GraphBaseNode, data: IDataConnectionData) {
        super(target, source, data);
    }


}
