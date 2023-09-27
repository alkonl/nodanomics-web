import {IChainItem, RunManager} from "./RunManager";

export class NodeExecutionManager {
    executionCount = 0
    current: IChainItem[] = []
    next: IChainItem[] = []
    runManager: RunManager
    reason?: string
    countOfExecuted = 0

    constructor(runManager: RunManager) {
        this.runManager = runManager
    }

    invokeNodesToExecute() {
        if (this.executionCount === 0 && this.countOfExecuted <= this.runManager.currentStep) {
            this.current = [...this.next]
            this.executionCount = this.next.length
            this.next = []
            this.countOfExecuted++

            for (const argument of this.current) {
                this.executionCount--
                this.runManager.executeNode(argument, this)

            }
        }
    }

    addNodesToExecute(chainItem: IChainItem[]) {
        this.next.push(...chainItem)
    }
}
