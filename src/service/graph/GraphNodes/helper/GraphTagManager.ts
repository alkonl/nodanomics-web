import {GraphNodeManager} from "../../NodeManager";
import {INumberVariable, isIGetNodeExternalValue} from "../../../../interface";

export class GraphTagManager {

    private readonly tagVariables = new Map<string, number>()

    constructor(
        private readonly nodeManager: GraphNodeManager,
    ) {
    }


    updateTagVariable({
                       tag, value
                   }: {
        tag: string
        value: number | undefined
    }) {
        if (value) {
            this.setVariable({tag, value})
        } else {
            this.clearVariable(tag)
        }
    }


    setVariable({
                    tag, value
                }: {
        tag: string
        value: number
    }) {
        this.tagVariables.set(tag, value)
    }

    clearVariable(tag: string) {
        this.tagVariables.delete(tag)
    }

    getNodeValueByTag({tag}: { tag: string }) {
        const node = this.nodeManager.getNodeByTag({tag})
        if (isIGetNodeExternalValue(node)) {
            return node.nodeExternalValue
        }
    }

    // getNodeTagVariables(): INumberVariable[] {
    //     const variables: INumberVariable[] = [];
    //     this.tagVariables.forEach((value, key) => {
    //         variables.push({
    //             value,
    //             variableName: key
    //         })
    //     })
    //     return variables
    //     // const variables: INumberVariable[] = [];
    //     //
    //     // for (const node of this.nodeManager.nodes) {
    //     //     if (isIGetNodeExternalValue(node) && node.tag && node.nodeExternalValue !== undefined) {
    //     //         variables.push({
    //     //             variableName: node.tag,
    //     //             value: node.nodeExternalValue,
    //     //         });
    //     //     }
    //     // }
    //     // return variables;
    // }
    getNodeTagVariables(): INumberVariable[] {
        const variables: INumberVariable[] = [];

        for (const node of this.nodeManager.nodes) {
            if (isIGetNodeExternalValue(node) && node.tag && node.nodeExternalValue !== undefined) {
                variables.push({
                    variableName: node.tag,
                    value: node.nodeExternalValue,
                });
            }
        }
        return variables;
    }

}
