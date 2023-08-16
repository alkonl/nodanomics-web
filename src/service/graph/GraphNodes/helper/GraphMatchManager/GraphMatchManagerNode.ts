import {GraphBaseEdge} from "../../../GraphEdge";
import {GraphLogicManager} from "../GraphLogicManager";
import {GraphMatchManager} from "./GraphMatchManager";

// Match manager for Node
export class GraphMatchManagerNode extends GraphMatchManager {
    private readonly logicManager: GraphLogicManager

    constructor(incomingEdges: GraphBaseEdge[]) {
        super()
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
