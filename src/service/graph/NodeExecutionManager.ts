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
        const nodes = starters.map(({target}) => target)
    }

    invokeNodesToExecute() {
        if (this.executionCount === 0) {
            this.current = [...this.next]
            this.executionCount = this.next.length
            this.next = []
            if (this.current.length !== 0) {
                // const isStart = this.current[0]?.target instanceof GraphStartNode





                for (const argument of this.current) {
                    const compensation = argument.stepExecutionCompensation
                        ? argument.stepExecutionCompensation
                        : 0
                    const currentLayerTick = this.runManager.diagramRunCount
                    const invoke = this.runManager.countOfExecuted === currentLayerTick - compensation

                    this.executionCount--
                    this.runManager.executeNode(argument, this, {invoke})

                }
                this.runManager.addCountOfExecuted()
                this.invokeNodesToExecute()
            }
        }

    }

    getToCompensation() {

    }

    invokeAll() {
        if (this.executionCount === 0) {

            this.current = [...this.next]
            this.executionCount = this.next.length
            this.next = []
            if (this.current.length !== 0) {
                for (const argument of this.current) {
                    this.executionCount--
                    this.runManager.executeNode(argument, this, {invoke: true})
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
