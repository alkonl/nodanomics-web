import {IReactFlowNode} from "../../../interface";

export const addAdditionalReactFlowData = ({node, addition}: {
    node: IReactFlowNode,
    addition: Partial<Omit<IReactFlowNode,'data'>>,
}): IReactFlowNode => {
    return {
        ...addition,
        ...node,
    }
}
