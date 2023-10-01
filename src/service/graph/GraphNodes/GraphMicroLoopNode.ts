import {GraphLoopNode} from "./abstracts";
import {EConnectionMode, IMicroLoopNodeData, IResetBeforeStep, IUpdateGraphNodeState} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";

export class GraphMicroLoopNode extends GraphLoopNode<IMicroLoopNodeData>
    implements IUpdateGraphNodeState, IResetBeforeStep {


    constructor(value: IMicroLoopNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
    }

    get isAccumulative() {
        return this.data.isAccumulative || false
    }

    get currentLoopCount() {
        return this.data.currentLoopCount;
    }

    get loopCount(): number {
        if (this.data.loopFormula) {
            const result = this.matchManager.calculateFormula({
                formula: this.data.loopFormula,
            })
            if (typeof result === 'number') {
                return result
            }
        }
        return 0
    }

    resetBeforeStep() {
        super.resetBeforeStep();
        // const hasParent = this.data.parentId !== undefined
        // if (hasParent) {
        //     this.resetLoopStep()
        // }
    }

    protected checkIsLoopActive() {
        const isLoopActive = this.currentLoopCount <= this.loopCount
        console.log('checkIsLoopActive', this.data.name, isLoopActive, this.currentLoopCount, this.loopCount)
        this.setIsLoopActive(isLoopActive)
        return isLoopActive
    }

    isEventTriggered(mode: EConnectionMode): boolean {

        if (EConnectionMode.LoopInnerToChildren === mode) {
            return this.checkIsLoopActive()
        }
        return true
    }

    resetLoopStep() {
        this.updateNode({currentLoopCount: 0})
        this.checkIsLoopActive()
    }

    invokeStep() {
        super.invokeStep()
        this.addStep()

    }

    private addStep() {
        const updatedLoopCount = this.currentLoopCount + 1
        const isPossibleToAddStep = updatedLoopCount <= this.loopCount
        // if (isPossibleToAddStep) {
            this.updateNode({currentLoopCount: updatedLoopCount})
        // }
    }
}
