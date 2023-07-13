import {IFormulaNodeData} from "../../../interface";
import {GraphBaseNode} from "./GraphBaseNode";
import {GraphVariableNode} from "./GraphVariableNode";

export class GraphFormulaNode extends GraphBaseNode<IFormulaNodeData> {
    constructor(value: IFormulaNodeData) {
        super(value);
    }

    calculate() {
        const incoms = this.findIncomingEdges();
        const result = incoms.reduce((acc, edge) => {
            const source = edge.source;
            if (source instanceof GraphVariableNode && source.data.value) {
                acc += source.data.value;
            }
            return acc;
        }, 0);
        this.updateNodeData({
            result: {type: 'number', value: result}
        });
        return result;
    }
}
