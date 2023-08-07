import {GraphLoopNode} from "./abstracts";
import {EConnectionMode, IGetNodeExternalValue, IMicroLoopNodeData, IUpdateGraphNodeState} from "../../../interface";
import {RunManager} from "../RunManager";

export class GraphMicroLoopNode extends GraphLoopNode<IMicroLoopNodeData>
implements IGetNodeExternalValue, IUpdateGraphNodeState{


    constructor(value: IMicroLoopNodeData, runManager: RunManager) {
        super(value, runManager);
    }

    get nodeExternalValue() {
        return this.loopCurrentCount
    }

    get loopCurrentCount() {
        return this.data.currentLoopCount || 0;
    }

    get loopCount() {
        return this.data.loopCount || 0;
    }


    protected checkIsLoopActive() {
        if (this.loopCount === 0) {
            this.setIsLoopActive(false)
        } else {

            const isLoopActive = this.loopCurrentCount < this.loopCount
            this.setIsLoopActive(isLoopActive)
        }
    }

    updateState() {
        this.checkIsLoopActive()
    }

    isEventTriggered(mode: EConnectionMode): boolean  {
        if(EConnectionMode.LoopInToChildren === mode){
            return this.isLoopActive
        }else if(EConnectionMode.LoopOut === mode){
            return !this.isLoopActive
        }
        return false
    }

    invokeStep() {
        super.invokeStep()
        if (this.isLoopActive) {
            this.addStep()
        }
    }

    private addStep() {
        const updatedLoopCount = this.loopCurrentCount + 1
        const isPossibleToAddStep = updatedLoopCount <= this.loopCount
        if(isPossibleToAddStep){
            this.updateNode({currentLoopCount: updatedLoopCount})
        }
    }


}
