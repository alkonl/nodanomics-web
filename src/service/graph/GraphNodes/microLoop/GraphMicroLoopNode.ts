import {GraphLoopNode} from "../abstracts";
import {IIsEventTriggered, IMicroLoopNodeData, IUpdateGraphNodeState} from "../../../../interface";
import {RunManager} from "../../RunManager";
import {GraphMicroLoopStartNode} from "./GraphMicroLoopStart";

export class GraphMicroLoopNode extends GraphLoopNode<IMicroLoopNodeData>
    implements IIsEventTriggered, IUpdateGraphNodeState {

    private _startNode: GraphMicroLoopStartNode;

    constructor(value: IMicroLoopNodeData, runManager: RunManager, startNode: GraphMicroLoopStartNode) {
        super(value, runManager);
        this._startNode = startNode;
    }

    updateState() {
        this.updateStartNode()
    }

    get loopCurrentCount() {
        return this.data.currentLoopCount;
    }

    invokeStep() {
        this.updateStartNode()
        if (!this.isLoopFinished) {
            this.addStep()
        }
    }

    updateStartNode() {
        this._startNode.setIsLoopActive(!this.isLoopFinished)
        this._startNode.setLoopCurrentCount(this.loopCurrentCount)
    }

    private addStep() {
        const currentLoopCount = this.data.currentLoopCount
        this._data = {
            ...this.data,
            currentLoopCount: currentLoopCount + 1,
        }
    }

    get isLoopFinished() {
        if (!this.data.loopCount) {
            return true
        }
        return this.data.currentLoopCount >= this.data.loopCount
    }

     isEventTriggered() {
        return this.isLoopFinished
    }

}
