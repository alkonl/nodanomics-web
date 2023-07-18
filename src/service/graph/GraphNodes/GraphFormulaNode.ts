import {IFormulaNodeData} from "../../../interface";
import {GraphBaseNode} from "./GraphBaseNode";
import {GraphVariableNode} from "./GraphVariableNode";
import {RunManager} from "../RunManager";

export class GraphFormulaNode extends GraphBaseNode<IFormulaNodeData> {
    constructor(value: IFormulaNodeData, runManager: RunManager) {
        super(value, runManager);
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
