import {GraphInvokableNode} from "../abstracts";
import {IMicroLoopNodeData} from "../../../../interface";
import {RunManager} from "../../RunManager";
import {GraphMicroLoopStartNode} from "./GraphMicroLoopStart";

export class GraphMicroLoopNode extends GraphInvokableNode<IMicroLoopNodeData> {

    private _startNode: GraphMicroLoopStartNode;

    constructor(value: IMicroLoopNodeData, runManager: RunManager, startNode: GraphMicroLoopStartNode) {
        super(value, runManager);
        this._startNode = startNode;
    }

    get loopCurrentCount() {
        return this.data.currentLoopCount;
    }

    invokeStep() {
        if(!this.isLoopFinished){
            this.addStep()
            this._startNode.setIsLoopActive(true)
            this._startNode.setLoopCurrentCount(this.loopCurrentCount)
        }
    }

    private addStep() {
        const currentLoopCount = this.data.currentLoopCount || 0;
        this._data = {
            ...this.data,
            currentLoopCount: currentLoopCount + 1,
        }
    }

    get isLoopFinished() {
        if(!this.data.loopCount){
            return  true
        }
        return this.data.currentLoopCount >= this.data.loopCount
    }


}
