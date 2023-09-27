import {IChainItem, RunManager} from "./RunManager";
import {GraphStartNode} from "./GraphNodes";

export class NodeExecutionManager {
    executionCount = 0
    current: IChainItem[]
    next: IChainItem[]
    runManager: RunManager
    reason?: string
    countOfExecuted = 0
    diameter: number

    constructor(runManager: RunManager, starters: IChainItem[]) {
        this.runManager = runManager
        this.current = []
        this.next = [...starters]
        const nodes = starters.map(({target}) => target)
        this.diameter = runManager.findLongestBranch(nodes)
    }

    invokeNodesToExecute() {
        if (this.executionCount === 0) {
            console.log('diameter: ', this.diameter)
            console.log('this.executionCount: ', this.executionCount)
            this.current = [...this.next]
            this.executionCount = this.next.length
            this.next = []
            if(this.current.length !== 0) {
                // const isStart = this.current[0]?.target instanceof GraphStartNode

                const notInvoke = this.countOfExecuted !== (this.runManager.currentStep) % this.diameter
                console.log(`notInvoke ${this.countOfExecuted}, ${(this.runManager.currentStep) % this.diameter }`, notInvoke)

                this.countOfExecuted++
                // console.log('this.current: ', this.countOfExecuted)

                for (const argument of this.current) {
                    this.executionCount--
                    this.runManager.executeNode(argument, this, {notInvoke})
                    this.invokeNodesToExecute()
                }
            }



        }

    }


    getOtherNodesToExecute() {
        return this.next
    }

    addNodesToExecute(chainItem: IChainItem[]) {
        this.next.push(...chainItem)
    }
}
