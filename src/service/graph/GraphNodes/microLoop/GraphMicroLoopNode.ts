import {GraphBaseNode} from "../abstracts";
import {IMicroLoopNodeData} from "../../../../interface";
import {RunManager} from "../../RunManager";
import {GraphMicroLoopStartNode} from "./GraphMicroLoopStart";

export class GraphMicroLoopNode extends GraphBaseNode<IMicroLoopNodeData> {
    private _startNode: GraphMicroLoopStartNode ;

    constructor(value: IMicroLoopNodeData, runManager: RunManager, startNode: GraphMicroLoopStartNode) {
        super(value, runManager);
        this._startNode = startNode;
    }
}
