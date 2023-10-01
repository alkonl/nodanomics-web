import {IChainItem} from "./ChainItem";
import {RunManager} from "./RunManager";

export class NodeExecutionManager {
    executionCount = 0
    current: IChainItem[]
    next: IChainItem[]
    runManager: RunManager

    constructor(runManager: RunManager, starters: IChainItem[]) {
        this.runManager = runManager
        this.current = []
        this.next = [...starters]
    }

    invokeNodesToExecute() {
        this.current = [...this.next]
        this.executionCount = this.next.length
        this.next = []

        for (const argument of this.current) {
            this.executionCount--
            this.runManager.executeNode(argument, this, {invoke: true})
        }

        this.runManager.addCountOfExecuted()
    }


    invokeAll() {

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

    addNodesToExecute(chainItems: IChainItem[]) {
        this.next.push(...chainItems)
    }

    addNodesToCurrent(chainItem: IChainItem[]) {
        this.current.push(...chainItem)
        this.executionCount += chainItem.length

    }
}
