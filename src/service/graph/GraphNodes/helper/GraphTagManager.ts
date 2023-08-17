import {GraphNodeManager} from "../../NodeManager";
import {INumberVariable, isIGetNodeExternalValue} from "../../../../interface";

export class GraphTagManager {
    constructor(
        private readonly nodeManager: GraphNodeManager,
    ) {
    }

    getNodeValueByTag({tag}: { tag: string }) {
        const node = this.nodeManager.getNodeByTag({tag})
        if (isIGetNodeExternalValue(node)) {
            return node.nodeExternalValue
        }
    }

    getNodeTagVariables(): INumberVariable[] {
        const variables: INumberVariable[] = [];

        for (const node of this.nodeManager.nodes) {
            if (isIGetNodeExternalValue(node) && node.tag && node.nodeExternalValue) {
                variables.push({
                    variableName: node.tag,
                    value: node.nodeExternalValue,
                });
            }
        }

        return variables;
    }

}
