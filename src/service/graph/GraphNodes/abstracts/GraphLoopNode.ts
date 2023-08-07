import {GraphInvokableNode} from "./GraphInvokable";
import {ILoopNodeData} from "../../../../interface/busines/diagram/node/structures/loopNode";
import {EConnectionMode, IIsEventTriggered} from "../../../../interface";

export abstract class GraphLoopNode<IGenericNodeData extends ILoopNodeData = ILoopNodeData> extends GraphInvokableNode<IGenericNodeData>
implements  IIsEventTriggered{


    protected abstract checkIsLoopActive(): void;

    abstract isEventTriggered(mode?: EConnectionMode): boolean;

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
        this.updateNode({isLoopActive})
    }

    private checkWasLoopActiveOnce() {
        if (!this.isLoopWasActive && this.isLoopActive) {
            this.updateNode({isLoopWasActive: this.isLoopActive})
        }
    }
}
