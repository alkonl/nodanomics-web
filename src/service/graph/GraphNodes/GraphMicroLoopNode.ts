import {GraphLoopNode} from "./abstracts";
import {EConnectionMode, IMicroLoopNodeData, IUpdateGraphNodeState} from "../../../interface";
import {RunManager} from "../RunManager";

export class GraphMicroLoopNode extends GraphLoopNode<IMicroLoopNodeData>
implements IUpdateGraphNodeState{


    constructor(value: IMicroLoopNodeData, runManager: RunManager) {
        super(value, runManager);
    }

    get loopCurrentCount() {
        return this.data.currentLoopCount || 0;
    }

    get loopCount() {
        return this.data.loopCount || 0;
    }


    protected checkIsLoopActive() {
        console.log('isLoopActive', this.loopCurrentCount, this.loopCount)
        if (this.loopCount === 0) {
            this.setIsLoopActive(false)
        } else {
            const isLoopActive = this.loopCurrentCount < this.loopCount
            this.setIsLoopActive(isLoopActive)
        }
    }



    isEventTriggered(mode: EConnectionMode): boolean  {
        if(EConnectionMode.LoopInnerToChildren === mode){
            return this.isLoopActive
        }else if(EConnectionMode.NodeOutgoing === mode){
            return !this.isLoopActive
        }
        return false
    }

    invokeStep() {
        console.log('invokeStep')
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
