import {GraphBaseEdge} from "./abstracts";
import {ILogicConnectionData} from "../../../interface";
import {GraphBaseNode, GraphMatchManagerConnections} from "../GraphNodes";
import {GraphNodeManager} from "../NodeManager";

export class GraphLogicEdge extends GraphBaseEdge<ILogicConnectionData> {

    // private readonly matchManager: GraphMatchManagerConnections

    constructor(
        source: GraphBaseNode,
        target: GraphBaseNode,
        data: ILogicConnectionData,
        nodesManager: GraphNodeManager,
    ) {
        super(source, target, data);
        // this.matchManager = new GraphMatchManagerConnections(this, nodesManager);
    }

    get variableName() {
        return this.data.variableName;
    }

    // calcFormula() {
    //     if (this.data.variableName) {
    //         return this.matchManager.calculateFormula({formula: this.data.variableName})
    //     }
    // }
    //
    // get value() {
    //     return this.calcFormula();
    // }


}
