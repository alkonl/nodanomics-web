import {GraphMatchManager} from "./GraphMatchManager";
import {GraphBaseEdge} from "../GraphEdge";
import {INumberVariable, isIGetNodeExternalValue} from "../../../interface";
import {GraphNodeManager} from "../NodeManager";

export class GraphMatchManagerConnections extends GraphMatchManager {


    constructor(
        private readonly edge: GraphBaseEdge,
        nodeManager: GraphNodeManager
    ) {
        super(nodeManager);
    }

    calculateFormula({formula}: { formula: string }) {
        const source = this.edge.source;
        const variables: INumberVariable[] = [];
        let formattedFormula = formula;

        const pattern = /[a-zA-Z]/; // Regular expression for any letter (uppercase or lowercase)
        // letter could be a variable name
        const isAnyLetterInFormula = pattern.test(formattedFormula)
        if (isIGetNodeExternalValue(source) && !isAnyLetterInFormula) {
            const variableName = `_${source.data.name.replace(/\s/g, '')}Inner`;
            formattedFormula = `${variableName} ${formula}`;
            if (source.nodeExternalValue) {
                variables.push({
                    variableName: variableName,
                    value: source.nodeExternalValue
                })
            }

        }

        try {
            return super.calculateFormula({formula: formattedFormula, variables});
        } catch (e) {
            console.error(e);
        }
    }
}
