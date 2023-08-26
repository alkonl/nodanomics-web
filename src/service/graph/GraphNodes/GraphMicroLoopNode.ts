import {GraphLoopNode} from "./abstracts";
import {EConnectionMode, IMicroLoopNodeData, IUpdateGraphNodeState} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";

export class GraphMicroLoopNode extends GraphLoopNode<IMicroLoopNodeData>
    implements IUpdateGraphNodeState {


    constructor(value: IMicroLoopNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
    }

    get currentLoopCount() {
        return this.data.currentLoopCount;
    }

    get loopCount(): number {
        console.log('loopCount.loopFormula: ', this.data.loopFormula)
        if (this.data.loopFormula) {
            const result = this.matchManager.calculateFormula({
                formula: this.data.loopFormula,
            })
            console.log('totalLoopCount: ', result)

            if (typeof result === 'number') {
                return result
            }
        }
        return 0
    }


    protected checkIsLoopActive() {
        const isLoopActive = this.currentLoopCount < this.loopCount
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
        console.log('resetStep: ', this.data.currentLoopCount)
        this.checkIsLoopActive()
    }

    count = 0

    invokeStep(invokeParams?: {
        addStep?: boolean
    }) {
        this.count += 1
        console.log(`invoke count ${this.data.name}`, this.count)
        super.invokeStep()
        if (this.data.name === 'innerLoop') {
            console.log('invokeStep', this.data)
        }

        if (this.checkIsLoopActive()) {
            this.addStep()
        }
    }

    private addStep() {
        const updatedLoopCount = this.currentLoopCount + 1
        const isPossibleToAddStep = updatedLoopCount <= this.loopCount
        if (isPossibleToAddStep) {
            this.updateNode({currentLoopCount: updatedLoopCount})
        }
    }
}
