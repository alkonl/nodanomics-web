import {GraphBaseNode} from "../abstracts";
import {IGetNodeExternalValue, IIsEventTriggered, IMicroLoopStartNodeData} from "../../../../interface";
import {RunManager} from "../../RunManager";

export class GraphMicroLoopStartNode extends GraphBaseNode<IMicroLoopStartNodeData>
    implements IGetNodeExternalValue, IIsEventTriggered {

    constructor(value: IMicroLoopStartNodeData, runManager: RunManager) {
        super(value, runManager);
    }

    get nodeExternalValue() {
        return this.data.loopCurrentCount
    }

     isEventTriggered() {
        return this.data.isLoopActive || false
    }

    setIsLoopActive(isLoopActive: boolean) {
        this.updateNode({isLoopActive})
    }

    setLoopCurrentCount(loopCurrentCount: number) {
        this.updateNode({loopCurrentCount})
    }


}
