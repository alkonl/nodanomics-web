import {GraphInvokableNode} from "./GraphInvokable";
import {ILoopNodeData} from "../../../../interface/busines/diagram/node/structures/loopNode";
import {EConnectionMode, IIsEventTriggered} from "../../../../interface";

export abstract class GraphLoopNode<IGenericNodeData extends ILoopNodeData = ILoopNodeData> extends GraphInvokableNode<IGenericNodeData>
    implements IIsEventTriggered {


    protected abstract checkIsLoopActive(): void;

    abstract isEventTriggered(mode?: EConnectionMode): boolean;

    get incomingData() {
        return this.data.incomingData
    }

    invokeStep() {
        this.checkIsLoopActive()
        this.checkWasLoopActiveOnce()
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
