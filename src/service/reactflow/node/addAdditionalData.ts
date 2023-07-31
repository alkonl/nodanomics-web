import {IReactFlowNode} from "../../../interface";

export const addAdditionalData = ({node, addition}: {
    node: IReactFlowNode,
    addition: Partial<Omit<IReactFlowNode,'data'>>,
}): IReactFlowNode => {
    return {
        ...addition,
        ...node,
    }
}
