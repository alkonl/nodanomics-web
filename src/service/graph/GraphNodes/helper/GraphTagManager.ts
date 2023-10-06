import {GraphNodeManager} from "../../NodeManager";
import {INumberVariable, isIGetNodeExternalValue} from "../../../../interface";

export class GraphTagManager {

    private readonly tagVariables = new Map<string, number>()

    constructor(
        private readonly nodeManager: GraphNodeManager,
    ) {
    }

    setVariable({
                    name, value
                }: {
        name: string
        value: number
    }) {
        this.tagVariables.set(name, value)
    }

    getNodeValueByTag({tag}: { tag: string }) {
        const node = this.nodeManager.getNodeByTag({tag})
        if (isIGetNodeExternalValue(node)) {
            return node.nodeExternalValue
        }
    }

    getNodeTagVariables(): INumberVariable[] {
        const variables: INumberVariable[] = [];
        this.tagVariables.forEach((value, key) => {
            variables.push({
                value,
                variableName: key
            })
        })
        return variables
        // const variables: INumberVariable[] = [];
        //
        // for (const node of this.nodeManager.nodes) {
        //     if (isIGetNodeExternalValue(node) && node.tag && node.nodeExternalValue !== undefined) {
        //         variables.push({
        //             variableName: node.tag,
        //             value: node.nodeExternalValue,
        //         });
        //     }
        // }
        // return variables;
    }

}
