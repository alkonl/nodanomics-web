import {IChainItem, RunManager} from "./RunManager";

export class NodeExecutionManager {
    executionCount = 0
    current: IChainItem[]
    next: IChainItem[]
    runManager: RunManager
    reason?: string
    private executePerOneStep = false

    constructor(runManager: RunManager, starters: IChainItem[]) {
        this.runManager = runManager
        this.current = []
        this.next = [...starters]
    }

    invokeNodesToExecute() {
        if (this.executionCount === 0) {
            this.current = [...this.next]
            this.executionCount = this.next.length
            this.next = []
            if (this.current.length !== 0) {
                // const isStart = this.current[0]?.target instanceof GraphStartNode

                const notInvoke = this.runManager.countOfExecuted !== (this.runManager.currentStep) % this.runManager.diameter

                this.runManager.addCountOfExecuted()
                // console.log('this.current: ', this.countOfExecuted)

                for (const argument of this.current) {
                    this.executionCount--
                    this.runManager.executeNode(argument, this, {notInvoke})
                    this.invokeNodesToExecute()
                }
            }
        }

    }

    invokeAll(){
        if (this.executionCount === 0) {

            this.current = [...this.next]
            this.executionCount = this.next.length
            this.next = []
            if (this.current.length !== 0) {
                  for (const argument of this.current) {
                    this.executionCount--
                    this.runManager.executeNode(argument, this)
                    this.invokeAll()
                }
            }
        }
    }


    setExecutePerOneStep(value: boolean) {
        this.executePerOneStep = value
    }

    getOtherNodesToExecute() {
        return this.next
    }

    addNodesToExecute(chainItem: IChainItem[]) {
        this.next.push(...chainItem)
    }
}
