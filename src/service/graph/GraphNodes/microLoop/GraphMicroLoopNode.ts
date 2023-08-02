import {GraphLoopNode} from "../abstracts";
import {IIsEventTriggered, IMicroLoopNodeData, IUpdateGraphNodeState} from "../../../../interface";
import {RunManager} from "../../RunManager";
import {GraphMicroLoopStartNode} from "./GraphMicroLoopStart";

export class GraphMicroLoopNode extends GraphLoopNode<IMicroLoopNodeData>
    implements IUpdateGraphNodeState {

    private _startNode: GraphMicroLoopStartNode;

    constructor(value: IMicroLoopNodeData, runManager: RunManager, startNode: GraphMicroLoopStartNode) {
        super(value, runManager);
        this._startNode = startNode;
    }


    get loopCurrentCount() {
        return this.data.currentLoopCount;
    }

    protected checkIsLoopActive() {
        if (!this.data.loopCount) {
            return false
        }
        return this.data.currentLoopCount <= this.data.loopCount

    }

    isEventTriggered() {
        return !this.isLoopActive
    }

    updateState() {
        this.updateStartNode()
    }

    invokeStep() {
        super.invokeStep()
        this.updateStartNode()
        if (this.isLoopActive) {
            this.addStep()
        }
    }

    updateStartNode() {
        this._startNode.setIsLoopActive(this.isLoopActive)
        this._startNode.setLoopCurrentCount(this.loopCurrentCount)
    }

    private addStep() {
        const currentLoopCount = this.data.currentLoopCount
        this._data = {
            ...this.data,
            currentLoopCount: currentLoopCount + 1,
        }
    }


}
