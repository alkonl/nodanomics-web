import {GraphBaseEdge} from "../GraphEdge";
import {GraphLogicManager} from "../GraphNodes/helper/GraphLogicManager";
import {GraphMatchManager} from "./GraphMatchManager";
import {GraphNodeManager} from "../NodeManager";
import {GraphTagManager} from "../GraphNodes";

// Match manager for Node
export class GraphMatchManagerNode extends GraphMatchManager {
    private readonly logicManager: GraphLogicManager

    constructor(incomingEdges: GraphBaseEdge[], nodeManager: GraphNodeManager, tagManager: GraphTagManager) {
        super(nodeManager, tagManager)
        this.logicManager = new GraphLogicManager(incomingEdges)
    }


    calculateFormula({formula}: { formula: string }) {
        try {
            const variables = this.logicManager.getVariables()
            return super.calculateFormula({formula, variables})
        } catch (e) {
            console.error(e)
        }

    }
}
