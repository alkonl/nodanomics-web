import {EDiagramNode, INodeData} from "../../../interface";
import {GraphBaseNode} from "./GraphBaseNode";
import {GraphFormulaNode} from "./GraphFormulaNode";
import {GraphVariableNode} from "./GraphVariableNode";

export class GraphNodeFactory {
    static createNode(value: INodeData): GraphBaseNode {
        switch (value.type) {
            case EDiagramNode.Formula:
                return new GraphFormulaNode(value);
            case EDiagramNode.Variable:
                return new GraphVariableNode(value);
            default:
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                throw new Error(`Unknown node type: ${value.type}`)
        }
    }
}
