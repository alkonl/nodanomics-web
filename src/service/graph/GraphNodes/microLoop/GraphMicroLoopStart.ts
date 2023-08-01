import {GraphBaseNode} from "../abstracts";
import {IGetNodeExternalValue, IMicroLoopStartNodeData} from "../../../../interface";
import {RunManager} from "../../RunManager";

export class GraphMicroLoopStartNode extends GraphBaseNode<IMicroLoopStartNodeData>
 implements IGetNodeExternalValue{
    constructor(value: IMicroLoopStartNodeData, runManager: RunManager) {
        super(value, runManager);
    }

    setIsLoopActive(isLoopActive: boolean) {
        this.updateNode({isLoopActive})
    }

    setLoopCurrentCount(loopCurrentCount: number) {
        this.updateNode({loopCurrentCount})
    }

    get nodeExternalValue() {
        return this.data.loopCurrentCount
    }

}
