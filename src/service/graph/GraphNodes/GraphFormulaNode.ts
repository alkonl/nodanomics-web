import {EDiagramNode, IFormulaNodeData} from "../../../interface";
import {GraphBaseNode} from "./GraphBaseNode";

export class GraphFormulaNode extends GraphBaseNode<IFormulaNodeData> {
    constructor(value: IFormulaNodeData) {
        super(value);
    }

    calculate() {
        console.log('calculate')
        const incoms = this.findIncomingEdges();
        const result = incoms.reduce((acc, edge) => {
            const source = edge.source;
            const sourceNode = source.data;
            if (sourceNode.type === EDiagramNode.Variable && sourceNode.value) {
                acc += sourceNode.value;
            }
            return acc;
        }, 0);
        this.updateNodeData({
            result: {type: 'number', value: result}
        });
        console.log('VariableNode result', result)
        return result;
    }

    onParentUpdate() {
        console.log('VariableNode onUpdate')
        this.calculate();
        // this.updateOutgoingNodes();
    }
}
