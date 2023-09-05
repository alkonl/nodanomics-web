import {GraphBaseEdge} from "./abstracts";
import {IChainConnectionData} from "../../../interface";
import {GraphBaseNode} from "../GraphNodes";
import {GraphNodeManager} from "../NodeManager";
import {GraphMatchManagerConnections} from "../GraphMatchManager";

export class GraphChainEdge extends GraphBaseEdge<IChainConnectionData> {

    private readonly matchManager: GraphMatchManagerConnections

    constructor(
        source: GraphBaseNode,
        target: GraphBaseNode,
        data: IChainConnectionData,
        nodesManager: GraphNodeManager,
    ) {
        super(source, target, data);
        this.matchManager = new GraphMatchManagerConnections(this, nodesManager);
    }


    onExecute() {
        this.updateEdge({isExecuted: true})
    }


    get isMeetCondition(): boolean {
        const condition = this.condition;
        if (condition === undefined || condition === 'true' || Number(condition) === 1) {
            return true;
        } else if (condition === 'false' || Number(condition) === 0) {
            return false;
        } else {
            const res = this.matchManager.calculateFormula({formula: condition})
            if (typeof res === 'boolean') {
                return res;
            }
        }
        return false;
    }

    private get condition(): string | undefined {
        return this.data.condition;
    }
}
