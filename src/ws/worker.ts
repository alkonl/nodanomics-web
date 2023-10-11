/// <reference lib="webworker" />




import {IDiagramConnectionData, IMicroLoopNodeData, INodeData} from "../interface";
import {Graph} from "../service";

declare const self: DedicatedWorkerGlobalScope;

export const runLoop = async ({loop, edges, nodes}: {
    loop: IMicroLoopNodeData,
    nodes: INodeData[],
    edges: IDiagramConnectionData[]
}) => {

}
