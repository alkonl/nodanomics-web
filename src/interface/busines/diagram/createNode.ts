import {EDiagramNode, INodeData, IReactFlowNode} from "./node";


export enum ECreatedNodeType {
    Simple = 'Simple',
    MicroLoop = 'MicroLoop',
}


export type ICreatedMicroLoopNode<T> = {
    type: ECreatedNodeType.MicroLoop
    nodes: {
        microLoop: T,
        startNode: T,
    }
}

export type IReactFlowCreatedCompoundNode = ICreatedMicroLoopNode<IReactFlowNode>

export type IGraphCreatedCompoundNode = ICreatedMicroLoopNode<INodeData>

export type ICreatedSimpleNode = {
    type: ECreatedNodeType.Simple
    node: IReactFlowNode
}

export type ICreatedNode = ICreatedSimpleNode | IReactFlowCreatedCompoundNode
