import {IReactFlowNode} from "./node";

export type ICreatedCompoundNode = {
    type: 'compound'
    nodes: IReactFlowNode[]
}

export type ICreatedNode = {
    type: 'node'
    node: IReactFlowNode
}
