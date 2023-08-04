import {GraphInvokableNode} from "./GraphInvokable";
import {ILoopNodeData} from "../../../../interface/busines/diagram/node/structures/loopNode";
import {EConnectionMode, IIsEventTriggered} from "../../../../interface";

export abstract class GraphLoopNode<IGenericNodeData extends ILoopNodeData = ILoopNodeData> extends GraphInvokableNode<IGenericNodeData>
    implements IIsEventTriggered {



    abstract isEventTriggered(mode?: EConnectionMode): boolean;

    protected abstract updateVariables(): void;

    protected abstract checkIsLoopActive(): void;

    get incomingData() {
        return this.data.incomingData
    }

    invokeStep() {
        this.updateState()
        this.checkWasLoopActiveOnce()
    }

    updateState() {
        this.checkIsLoopActive()
        this.updateVariables()
    }

    get isLoopWasActive() {
        return this.data.isLoopWasActive || false
    }

    get isLoopActive() {
        return this.data.isLoopActive || false
    }

    protected setIsLoopActive(isLoopActive: boolean) {
        this.updateNode({
            ...this.data,
            isLoopActive,
        })
    }

    private checkWasLoopActiveOnce() {
        if (!this.isLoopWasActive && this.isLoopActive) {
            this.updateNode({
                ...this.data,
                isLoopWasActive: this.isLoopActive,
            })
        }
    }
}
